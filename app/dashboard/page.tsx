"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface Stat {
  actionKey: string;
  _count: { actionKey: number };
}

export default function DashboardPage() {
  const [data, setData] = useState<Stat[]>([]);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  return (
    <div className="p-10">
      <Card className="p-6">
        <CardHeader>
          <h2 className="text-xl font-semibold">Rich Menu Click Statistics</h2>
        </CardHeader>
        <CardBody>
          <BarChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="actionKey" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="_count.actionKey" fill="#8884d8" />
          </BarChart>
        </CardBody>
      </Card>
    </div>
  );
}
