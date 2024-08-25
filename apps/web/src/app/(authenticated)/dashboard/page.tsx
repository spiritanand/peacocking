import React from "react";
import CreateModel from "./CreateModel";

const Dashboard = () => {
  return (
    <main className="container min-h-screen">
      <h1 className="mb-10 mt-20 w-fit scroll-m-20 border-b text-4xl font-semibold tracking-tight lg:text-5xl">
        Your <span className="font-black text-primary">supermodels</span>
      </h1>

      <CreateModel />

      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        List of previous photo shoots 😉
      </h3>
    </main>
  );
};

export default Dashboard;
