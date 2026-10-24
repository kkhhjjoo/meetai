"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const {data: session, isPending} = authClient.useSession();
  
  if (isPending) return <p>로딩중...</p>
  if (!session) {
    return (
      <div>
        <p>로그인이 필요합니다.</p>
        <Button asChild>
          <Link href="/login">로그인</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/signup">회원가입</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      로그인된 {session.user.name}
      <Button onClick={() => 
        authClient.signOut({
          fetchOptions: {onSuccess: () => router.push("/login")}
        })
      }>
      Sign out
      </Button>
    </div>
  );
}
