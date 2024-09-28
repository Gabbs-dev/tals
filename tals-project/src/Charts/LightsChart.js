import React from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data =[
    {month:"Enero", use:16, days:30 },
    {month:"Febrero", use:22, days:30 },
    {month:"Marzo", use:19, days:30 },
    {month:"Abril", use:28, days:30 },
    {month:"Mayo", use:23, days:30 },
    {month:"Junio", use:26, days:30 },
]

const LightsChart = () =>{
    return(
        <ResponsiveContainer width="100%" aspect={2}>
            <LineChart width={150} height={50} data={data}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="month" />
                <YAxis dataKey="days" />
                <Tooltip/>
                <Legend/>
                <Line dataKey="use" fill="#000080"/>
            </LineChart>
        </ResponsiveContainer>
    );
};

export default LightsChart;