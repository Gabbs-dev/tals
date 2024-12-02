import React from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data =[
    {month:"Enero", temp:23, temp_d:26 },
    {month:"Febrero", temp:26, temp_d:26 },
    {month:"Marzo", temp:20, temp_d:26 },
    {month:"Abril", temp:24, temp_d:26 },
    {month:"Mayo", temp:22, temp_d:26 },
    {month:"Junio", temp:19, temp_d:26 },
]

const TempCharts = () =>{
    return(
        <ResponsiveContainer width="100%" aspect={2}>
            <LineChart width={150} height={50} data={data}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="month" />
                <YAxis dataKey="temp_d" />
                <Tooltip/>
                <Legend/>
                <Line dataKey="temp" fill="#000080"/>
            </LineChart>
        </ResponsiveContainer>
    );
};

export default TempCharts;