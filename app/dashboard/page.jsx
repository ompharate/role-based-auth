import Logout from "@/components/logout";
import { getSession } from "@/lib/auth";
import React from "react";

const Dashboard = async () => {
  const session = await getSession();
  return <div>{session?.user?.email}
  
  <Logout/>
    
  </div>;
};

export default Dashboard;