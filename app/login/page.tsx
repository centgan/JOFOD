import Link from "next/link";
import LoginForm from "@/app/login/form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function loginPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    <main>
      <div>
        <h2>Login</h2>
        <Link href="/">Home page link</Link>
      </div>
      <LoginForm />
    </main>
  )
}
