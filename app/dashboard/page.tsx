import {getServerSession, Session} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import AddingComponent from "@/app/dashboard/adding";


export default async function DashboardPage() {
  const session:Session | null = await getServerSession(authOptions);
  return (
    <div>
      {!!session?.user.first_time && <AddingComponent session={session} />}
      {!session?.user.first_time && <div>Hello this is the dashboard page</div>}
    </div>
  )
}
