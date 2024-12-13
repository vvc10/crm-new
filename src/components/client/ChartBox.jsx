"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from '@/components/ui/chart';

const ChartBox = ({ chartData }) => {
  const valueFormatter = (value) => `${value} queries`;

  const cardStyle = {
    backgroundColor: 'rgba(96, 92, 255, 20%)',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  };

  return (
    <Card style={cardStyle} className="text-gray-700">
      <CardHeader>
        <CardTitle>Monthly query submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <BarChart
          data={chartData}
          index="name"
          categories={['queries']}
          valueFormatter={valueFormatter}
          yAxisWidth={48}
          height={Math.min(350, chartData.length * 20)} // Dynamic height based on data length
        />
      </CardContent>
    </Card>
  );
};

export default ChartBox;
