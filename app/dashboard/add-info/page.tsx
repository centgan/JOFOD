import {getServerSession, Session} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import AddEmployee from "@/app/dashboard/add-info/add-employee";
import AddEmployer from "@/app/dashboard/add-info/add-employer";

export default async function AddInfo() {
  const session:Session | null = await getServerSession(authOptions);
  console.log(session);
  return (
    <div>
      {session.user.userType === 'Employee' ? <AddEmployee /> : <AddEmployer />}
    </div>
  )
}
