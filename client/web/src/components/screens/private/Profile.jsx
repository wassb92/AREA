import React, { useContext } from "react";
import { UserContext } from "UserContext";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Profile de </h1>
      <p className="text-xl font-bold">{user.email}</p>
    </div>
  );
};

export default Dashboard;
