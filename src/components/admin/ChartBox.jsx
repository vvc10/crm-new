"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from '@/components/ui/chart_ad';

const ChartBox = ({ chartData }) => {
  // Default structure to ensure all months are present
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Map chartData to ensure all months are represented
  const formattedData = months.map(month => ({
    name: month,
    queries: chartData.find(data => data.name === month)?.queries || 0,
  }));

  // Custom value formatter for the y-axis
  const valueFormatter = (value) => `${value} queries`;

  // Custom inline style for the Card
  const cardStyle = {
    backgroundColor: 'rgba(38, 123, 96, 20%)', // custom op-green color
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  };

  return (
    <Card style={cardStyle} className="text-black"> {/* Apply custom inline CSS here */}
      <CardHeader>
        <CardTitle>Monthly Query Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <BarChart
          data={formattedData}
          index="name"
          categories={['queries']}
          valueFormatter={valueFormatter}
          yAxisWidth={48}
          height={350} // Dynamic height
        />
      </CardContent>
    </Card>
  );
};

export default ChartBox;
