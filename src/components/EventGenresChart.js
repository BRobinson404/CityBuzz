import React, { useState, useEffect } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Legend } from 'recharts';

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);

  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];

  const getData = () => {
    const genreData = genres.map((genre) => {
      const filteredEvents = events.filter((event) => event.summary.includes(genre));
      return {
        name: genre,
        value: filteredEvents.length,
      };
    });
    return genreData;
  };

  useEffect(() => {
    const newData = getData();
    setData(newData);
  }, [events]);

  const COLORS = ['#7D3C98', '#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Updated colors

  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;

    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const shouldShowName = screenWidth >= 768;

        return percent ? (
        <text 
            x={x} 
            y={y} 
            fill="#000000" textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            fontWeight="bold"
           >
            {shouldShowName ? `${genres[index]} ` : ''}
            {`${(percent * 100).toFixed(0)}%`}
        </text>
        ) : null;
    };

  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          fill="#000000"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle" // Use circles for legend icons
          formatter={(value, entry, index) => (
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
              {genres[index]}
            </span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
  
};

export default EventGenresChart;

