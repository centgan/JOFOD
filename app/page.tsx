import Link from "next/link";
import {getServerSession, Session} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session:Session | null = await getServerSession(authOptions);
  console.log(session, 'this is home page');
  return (
    <main>
      <h1>This is the home page</h1>
      <Link href="/login">Login link</Link>
      <Link href="/register">Register link</Link>
    </main>
  );
}
