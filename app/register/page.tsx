import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import MultiStepForm from "@/app/register/multi_step";

export default async function registerPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    // <RegisterForm />
    <MultiStepForm />
  )
}
