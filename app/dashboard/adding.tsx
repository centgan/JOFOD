'use client';
import {Session} from "next-auth";
import AddEmployer from "@/app/dashboard/add-employer";
import AddEmployee from "@/app/dashboard/add-employee";
import {SessionProvider} from "next-auth/react";

interface AddEmployeeProps {
  session: Session
}

const AddingComponent = ({ session }: AddEmployeeProps) => {
  return (
    <SessionProvider session={session}>
      {/*<AddEmployer />*/}
      {session?.user.userType === 'Employee' ? <AddEmployee /> : <AddEmployer />}
    </SessionProvider>
  )
}

export default AddingComponent;
