"use client";

import { useState } from "react";
import Modal from "../Modal/Modal";

const pictures = 10;

let picture1 = Math.floor(Math.random() * pictures);
let picture2;
do {
  picture2 = Math.floor(Math.random() * pictures);
} while (picture1 === picture2);

let picture1Top = Math.random();
let picture1Width = Math.random();
let picture2Top = Math.random();
let picture2Width = Math.random();

const Pictures = () => (
  <>
    <img className="rounded-2xl absolute z-[-1] -translate-x-1/2 -translate-y-1/2 transition hover:scale-105" src={"/signup/" + picture1 + ".png"} aria-hidden style={{
      top: `calc(55% + ${picture1Top * 10}%)`,
      left: "calc(50% - 15rem)",
      width: `${picture1Width * 7 + 14}rem`
    }} />
    <img className="rounded-2xl absolute z-[-1] -translate-x-1/2 -translate-y-1/2 transition hover:scale-105" src={"/signup/" + picture2 + ".png"} aria-hidden style={{
      top: `calc(35% + ${picture2Top * 10}%)`,
      left: "calc(50% + 15rem)",
      width: `${picture2Width * 7 + 14}rem`
    }} />
  </>
);

const SignUpModal = () => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [password2, setPassword2] = useState("");

  let [error, setError] = useState("");

  return (
    <>
      <Modal>
        <Pictures />
        <img className="w-12 m-auto" src="/Weathercord.svg" alt="Weathercord" />
        <h1 className="text-center">Join Weathercord</h1>
        <form onSubmit={async (event) => {
          event.preventDefault();
          if (password !== password2) {
            setError("Passwords don't match");
            return;
          }

          const res = await fetch(`/u/create`, {
            method: "POST",
            body: JSON.stringify({
              username,
              password
            })
          });

          if (!res.ok) {
            error = await res.text();
            return;
          }
        }}>
          <label>
            <div>Username</div>
            <input type="text" value={username} onChange={(event) => setUsername(event.currentTarget.value)} />
          </label>
          <label>
            <div>Password</div>
            <input type="password" value={password} onChange={(event) => setPassword(event.currentTarget.value)} />
          </label>
          <label>
            <div>Re-type Password</div>
            <input type="password" value={password2} onChange={(event) => setPassword2(event.currentTarget.value)} />
          </label>
          <input type="submit" value="Create Account" />
        </form>
        <div style={{
          boxSizing: "content-box",
          height: `${error.length > 0 ? 1 : 0}lh`,
          overflow: "hidden",
          paddingTop: `${error.length > 0 ? 1 : 0}rem`,
          transition: "0.25s"
        }}>{error}</div>
      </Modal>
    </>
  );
};

export default SignUpModal;
