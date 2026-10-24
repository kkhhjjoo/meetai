import { auth } from "@/lib/auth"
import { LoginView } from "@/modules/auth/ui/views/login-view"
import { headers } from "next/headers"
import { redirect } from "next/navigation";

async function LoginPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!!session) {
        redirect("/");
    }
    return (
        <LoginView />
    )
}

export default LoginPage