import React from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data =[
    {month:"Enero", use:16, lts:45 },
    {month:"Febrero", use:22, lts:45 },
    {month:"Marzo", use:19, lts:45 },
    {month:"Abril", use:28, lts:45 },
    {month:"Mayo", use:40, lts:45 },
    {month:"Junio", use:36, lts:45 },
]

const WaterChart = () =>{
    return(
        <ResponsiveContainer width="100%" aspect={2}>
            <LineChart width={150} height={50} data={data}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="month" />
                <YAxis dataKey="lts" />
                <Tooltip/>
                <Legend/>
                <Line dataKey="use" fill="#000080"/>
            </LineChart>
        </ResponsiveContainer>
    );
};

export default WaterChart;