"use client"

import { useState } from "react";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const {data: session} = authClient.useSession()
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
 
  const onSubmit = () => {
    authClient.signUp.email({
      email,
      name,
      password
    }, {
      onError: () => {
        window.alert("문제가 발생했습니다.");
      },
      onSuccess: () => {
        window.alert("Success");
      }
    })
  }

  const onLogin = () => {
    authClient.signIn.email({
      email,
      password
    }, {
      onError: () => {
        window.alert("문제가 발생했습니다.");
      },
      onSuccess: () => {
        window.alert("Success");
      }
    })
  }

  if (session) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>로그인된 {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>Sign out</Button>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-y-10">
      <div className="p-4 flex flex-col gap-y-4">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" />
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" />
        <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="비밀번호" />
        <Button onClick={onSubmit}>Create user</Button>
      </div>
      <div className="p-4 flex flex-col gap-y-4">
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" />
        <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="비밀번호" />
        <Button onClick={onLogin}>Login</Button>
      </div>
    </div>
  );
}
