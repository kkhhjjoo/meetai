import { auth } from "@/lib/auth";
import HomePage from "@/modules/components/Home";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/login");
  }
  return (<HomePage />)
}
