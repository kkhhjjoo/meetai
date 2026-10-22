"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";




export default function HomePage() {
  const router = useRouter();
  const {data: session, isPending} = authClient.useSession();
  
  if (isPending) return <p>로딩중...</p>
  if (!session) return <p>로그인이 필요합니다.</p>
  
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
