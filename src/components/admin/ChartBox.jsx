"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart } from '@/components/ui/chart_ad'

const ChartBox = ({ chartData }) => {
  const valueFormatter = (value) => `${value} queries`;

  // Custom inline style for the Card
  const cardStyle = {
    backgroundColor: 'rgba(38, 123, 96, 20%)', // custom op-green color
    borderRadius: '10px', // you can add more styles here as needed
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  };

  return (
    <Card style={cardStyle} className="text-black">  {/* Apply custom inline CSS here */}
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
          height={350}
        />
      </CardContent>
    </Card>
  )
}

export default ChartBox;
