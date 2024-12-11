import {getServerSession, Session} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import AddingComponent from "@/app/dashboard/adding";
import EmployerDashboard from "@/app/dashboard/employer-dashboard";
import EmployeeDashboard from "@/app/dashboard/employee-dashbaord";

export default async function DashboardPage() {
  const session:Session | null = await getServerSession(authOptions);
  return (
    <div>
      {/*instead of null will probably be an error page*/}
      {!!session?.user.first_time && <AddingComponent session={session} />}
      {
        !session?.user.first_time &&
        session?.user.userType === 'Employer' ? (
          <EmployerDashboard />
        ) : session?.user.userType === 'Employee' ? (
          <EmployeeDashboard />
        ) : null
      }
    </div>
  )
}
