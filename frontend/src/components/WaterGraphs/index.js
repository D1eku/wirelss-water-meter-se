import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export const WaterGraphs = ({ data }) => {
  console.log("from whater graphs : ", data)
  const dataGraph = data.map((value) => {
    return { name: value.measure_at, medicion: value.value };
  });
  return (
    <LineChart
      width={800}
      height={450}
      data={dataGraph}
      margin={{
        top: 5,
        right: 20,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="medicion"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};
