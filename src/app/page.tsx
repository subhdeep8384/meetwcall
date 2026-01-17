"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";


export default function Home() {
  const { data: session } = authClient.useSession();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async () => {
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
    }, {
      onRequest: () => {
        //show loading
      },
      onSuccess: () => {
        window.alert("success")
      },
      onError: (ctx) => {
        // display the error message
        alert(ctx.error.message);
      },
    });

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  }

  if (session) {
    return <div>
      logged in as {session.user.name}

      <Button
        onClick={() => authClient.signOut()}
      >logout</Button>
    </div>
  }

  return (
    <div className="text-4xl bg-red-400">
      hello world

      <Input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button variant={"ghost"}
        onClick={handleSubmit}
      >click me</Button>

    </div>
  );
}
