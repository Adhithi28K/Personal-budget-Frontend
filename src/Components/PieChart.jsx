import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

const CategoryPieChart = ({ data }) => {
  const COLORS = [
    '#5DADE2', // Light Blue
    '#F39C12', // Orange
    '#58D68D', // Green
    '#AF7AC5', // Lavender
    '#F5B041', // Yellow
    '#EC7063', // Red
  ];
  
  
  return (
    <PieChart width={400} height={350}>
      <Pie
        data={data}
        dataKey="amount"
        nameKey="categoryName"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default CategoryPieChart;
