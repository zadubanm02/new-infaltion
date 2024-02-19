import React, { ReactElement, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  title: string;
  icon?: ReactElement;
  value: string;
  description?: string;
};

const StatCard: React.FC<Props> = ({ title, icon, value, description }) => {
  return (
    <Card className="w-96 my-4 mx-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
