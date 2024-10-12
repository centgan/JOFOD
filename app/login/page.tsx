import Link from "next/link";
import LoginForm from "@/app/login/form";

export default function loginPage() {
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
