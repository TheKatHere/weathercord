import { accountsTable, sessionsTable } from "@/db/schema";
import { cookies } from "next/headers";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export async function PUT(req: Request, { params }: { params: Promise<{ username: string }> }) {
  const authCookie = (await cookies()).get("auth")?.value;

  if (!authCookie) return new Response("Missing required cookie \"auth\"", { status: 401 });

  const sessionList = (await db.select().from(sessionsTable).where(eq(sessionsTable.code, authCookie))).values().toArray();
  if (!sessionList[0]) return new Response("Authorization token showed no results", { status: 401 });
  const session = sessionList[0];
  const requester = (await db.select().from(accountsTable).where(eq(accountsTable.id, session.id))).values().toArray()[0];
  if (!requester) return new Response("this is weird", { status: 404 });

  const accountToChange = (await db.select().from(accountsTable).where(eq(accountsTable.username, (await params).username))).values().toArray()[0];
  if (requester.id !== accountToChange.id && !requester.admin) return new Response("You cannot edit this account", { status: 403 });

  const { lang }: { lang: string } = await req.json();

  if (typeof lang !== "string") return new Response("Missing bio field", { status: 400 });

  await db.update(accountsTable).set({
    lang
  }).where(eq(accountsTable.id, accountToChange.id)).execute();

  return new Response();
};
