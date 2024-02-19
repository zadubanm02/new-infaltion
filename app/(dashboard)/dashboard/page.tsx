import DashboardProductList from "@/components/DashboardProductList";
import StatCard from "@/components/StatCard";
import { DollarSignIcon } from "lucide-react";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Dashboard</h1>
      <div className="flex flex-row">
        <StatCard
          title="Total usetrene"
          value="$17.99"
          description="Zaplatis o 19% menej"
          icon={<DollarSignIcon />}
        />
        <StatCard
          title="Total usetrene"
          value="$17.99"
          description="Zaplatis o 19% menej"
          icon={<DollarSignIcon />}
        />
      </div>

      <DashboardProductList />
    </div>
  );
};

export default Dashboard;
