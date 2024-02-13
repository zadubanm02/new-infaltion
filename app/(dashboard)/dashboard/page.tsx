import DashboardProductList from "@/components/DashboardProductList";
import StatCard from "@/components/StatCard";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Dashboard</h1>
      <StatCard />
      <DashboardProductList />
    </div>
  );
};

export default Dashboard;
