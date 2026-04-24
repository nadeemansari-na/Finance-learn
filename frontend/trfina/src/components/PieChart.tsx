
import { PieChart, Pie, ResponsiveContainer, Legend, Tooltip, Cell, type TooltipProps } from "recharts"


import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { useexpense } from "../hook/Expense";
import { useEffect, useState } from "react";
interface MyTooltipProps extends TooltipProps<ValueType, NameType> {
  payload?: any[];
}

export interface info {
  name: string;
  value: number;
  percentage:string;
}



const COLORS = [
  "#3b82f6", // Blue
  "#10b981", // Green
  "#f59e0b", // Amber
  "#ef4444", // Red
  "#8b5cf6", // Purple
  "#ec4899", // Pink
  "#06b6d4", // Cyan
  "#f97316", // Orange
  "#14b8a6", // Teal
  "#6366f1"  // Indigo
];

export const PieChartcomponent = () => {
  const { data } = useexpense()
  const [info, setinfo] = useState<info[]>([])




  useEffect(() => {
    if (!data || data.length == 0) return



    const texpense=data.filter(item=> item.type.toLowerCase()=="expense")
    .reduce((sum,t)=>sum+t.amount,0);


    const flat = data.filter(d => d.type.toLowerCase() === "expense")
      .map(t => ({
        name: t.category.name,
        value: t.amount,
        percentage:((t.amount/texpense)*100).toFixed(1)+ "%"
      }))

    setinfo(flat);
    console.log(flat)
  }, [data])




/*{ inside recharts legend payload
  value: "Food",     // 👈 category name
  color: "#3b82f6",  // 👈 color of slice
  payload: {...}     // 👈 original data
} */
  const rendercustomlegend = (props: any) => {
    const { payload } = props
    return (
      <ul className="p-0 m-0 list-none">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex gap-6 justify-center items-center mr-5 xl:mr-12" style={{ color: entry.color }}>
              <span
              style={{
                display: "inline-block",
                width: "10px",
                height: "10px",
                backgroundColor: entry.color,
                borderRadius: "50%",
                marginRight: "2px"
              }}
            ></span>  
            <span className=" inline-block  min-w-7">
            {info[index].name}
              </span> 
              <span className="inline-block  min-w-10">
                 ₹{info[index].value}
              </span>
              <span className="inline-block  min-w-7">
               {info[index].percentage}

              </span>
          </li>
        ))}
      </ul>
    )
  }




  return (
      <ResponsiveContainer width="100%" height="100%"  >
        <PieChart margin={{ right: 0 }}>
          <Pie
            data={info}
            cx={"50%"}
            cy={"50%"}
            innerRadius={50}
            outerRadius={100}
            paddingAngle={1}
            dataKey={"value"}
          >
            {info.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}>

              </Cell>
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />}></Tooltip>
          <Legend content={rendercustomlegend} layout="vertical" align="right" verticalAlign="middle" iconType="circle" wrapperStyle={{ paddingLeft: "0px" }} />
        </PieChart>
      </ResponsiveContainer>
  )
}



const CustomTooltip = ({ active, payload }: MyTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-2 rounded-md border border-slate-700">
        <p className="text-medium text-lg text-blue-500">{payload[0].name}</p>
        <p className="text-sm text-blue-400">
          Value: <span className="ml-2">₹{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

