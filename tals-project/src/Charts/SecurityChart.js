import React from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data =[
    {month:"Enero", cameras:23, m_sensors:10, days:30 },
    {month:"Febrero", cameras:30, m_sensors:25, days:30 },
    {month:"Marzo", cameras:20, m_sensors:8, days:30 },
    {month:"Abril", cameras:24, m_sensors:16, days:30 },
    {month:"Mayo", cameras:22, m_sensors:22, days:30 },
    {month:"Junio", cameras:19, m_sensors:8, days:30 },
]

const SecurityChart = () =>{
    return(
        <ResponsiveContainer width="100%" aspect={2}>
            <LineChart width={150} height={50} data={data}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="month" />
                <YAxis dataKey="days" />
                <Tooltip/>
                <Legend/>
                <Line dataKey="cameras" fill="#000080"/>
                <Line dataKey="m_sensors" fill="#FF0000"/>
            </LineChart>
        </ResponsiveContainer>
    );
};

export default SecurityChart;