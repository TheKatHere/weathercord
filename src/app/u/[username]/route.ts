import { accountsTable, sessionsTable } from "@/db/schema";
import cryptoRandomString from "crypto-random-string";
import { db } from "@/db";
import { count, eq } from "drizzle-orm";
import { hash } from "bcrypt";
import { cookies } from "next/headers";

interface POSTBody {
  email: string;
  password: string;
};

const generateUID = (sequential: number) => `${Math.floor(sequential).toString(16)}w${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16).padStart(14, "0")}`;

export async function POST(req: Request, { params }: { params: Promise<{ username: string }> }) {
  const username = (await params).username;

  const { email, password }: Partial<POSTBody> = await req.json();

  // if (!email) return new Response("Email is required", { status: 400 });
  if (!password) return new Response("Password is required", { status: 400 });
  if (!username) return new Response("Username is required", { status: 400 });

  if (username.length < 1) return new Response("Username is too short", { status: 400 });
  if (username.length > 20) return new Response("Username is too long", { status: 400 });

  // if (email.length > 40) return new NextResponse("Email is too long", { status: 400 });

  if (password.length < 8) return new Response("Password is too short", { status: 400 });
  if (password.length > 50) return new Response("Password is too long", { status: 400 });

  const usernameTaken = (await db.select().from(accountsTable).where(eq(accountsTable.username, username))).values().toArray()[0];
  console.log(usernameTaken);
  if (usernameTaken) return new Response("Username is taken", { status: 400 });

  const id = generateUID((await db.select({ count: count() }).from(accountsTable))[0].count);

  const authCode = cryptoRandomString({ length: 100 });
  (await cookies()).set("auth", authCode);
  db.insert(sessionsTable).values({
    code: authCode,
    date: Date.now(),
    id,
    userAgent: req.headers.get("User-Agent")
  });

  const passwordHash = await hash(password, 10);
  await db.insert(accountsTable).values({
    email: "",
    id,
    joined: Date.now(),
    password: passwordHash,
    username
  }).execute();

  return new Response();
}
