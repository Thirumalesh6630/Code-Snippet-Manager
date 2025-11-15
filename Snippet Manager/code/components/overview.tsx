"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 167,
  },
  {
    name: "Feb",
    total: 145,
  },
  {
    name: "Mar",
    total: 189,
  },
  {
    name: "Apr",
    total: 212,
  },
  {
    name: "May",
    total: 251,
  },
  {
    name: "Jun",
    total: 236,
  },
  {
    name: "Jul",
    total: 278,
  },
  {
    name: "Aug",
    total: 269,
  },
  {
    name: "Sep",
    total: 243,
  },
  {
    name: "Oct",
    total: 230,
  },
  {
    name: "Nov",
    total: 210,
  },
  {
    name: "Dec",
    total: 185,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="total" fill="#10b981" radius={[4, 4, 0, 0]} className="fill-emerald-500" />
      </BarChart>
    </ResponsiveContainer>
  )
}
