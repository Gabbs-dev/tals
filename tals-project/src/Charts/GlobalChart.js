import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data =[
    {service:"Agua", use:16, time:30 },
    {service:"Luminarias", use:22, time:30 },
    {service:"Temperatura", use:19, time:30 },
    {service:"Seguridad", use:28, time:30 },
]

const GlobalChart = () =>{
    return(
        <ResponsiveContainer width="100%" aspect={3}>
            <BarChart width={150} height={50} data={data}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="service" />
                <YAxis dataKey="time" />
                <Tooltip/>
                <Legend/>
                <Bar dataKey="use" fill="#000080"/>
                <Bar dataKey="use" fill="#FF0000"/>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default GlobalChart;