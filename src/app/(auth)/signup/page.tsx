import { auth } from "@/lib/auth";
import { SignupView } from "@/modules/auth/ui/views/sign-up-view"
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function SignupPage() {
    const session = await auth.api.getSession({
            headers: await headers(),
        });
    
        if (!!session) {
            redirect("/");
        }
    return (
        <SignupView />
      )
}

export default SignupPage