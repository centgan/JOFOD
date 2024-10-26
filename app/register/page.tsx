import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// import MultiStepForm from "@/app/register/multi_step";
import Link from "next/link";

export default async function registerPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    // <RegisterForm />
    // <MultiStepForm />
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-semibold">Step 1: Choose an option</h2>
      <div className="flex space-x-4">
        <Link href="/register/employee">
          <button className={`w-48 h-16 rounded-lg text-lg font-semibold transition duration-200 hover:bg-blue-400 hover:text-white`}>
            Employee
          </button>
        </Link>
        <Link href="/register/employer">
          <button className={`w-48 h-16 rounded-lg text-lg font-semibold transition duration-200 hover:bg-blue-400 hover:text-white`}>
            Employer
          </button>
        </Link>
      </div>
    </div>
  )
}
