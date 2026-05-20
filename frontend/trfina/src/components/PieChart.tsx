
import { PieChart, Pie, ResponsiveContainer, Legend, Tooltip, Cell, type TooltipProps } from "recharts"


import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { useexpense } from "../hook/Expense";
import { useEffect, useState } from "react";
import { useOpen } from "../context/createcontext";
import { useNavigate } from "react-router-dom";
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
  const {Open}=useOpen()
  const navigate=useNavigate()



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
  const { payload } = props;

  return (
    <ul className="flex flex-wrap justify-center lg:flex-col gap-3 mt-4 lg:mt-0">
      {payload.map((entry: any, index: number) => (
        <li
          key={`item-${index}`}
          className="
            flex items-center gap-2
            bg-gray-100 dark:bg-gray-700
            px-3 py-2 rounded-xl
            text-xs sm:text-sm
            min-w-35
          "
        >
          {/* Color Dot */}
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />

          {/* Category */}
          <span className="font-medium truncate">
            {info[index].name}
          </span>

          {/* Amount */}
          <span className="ml-auto text-gray-500 dark:text-gray-300">
            ₹{info[index].value}
          </span>

          {/* Percentage */}
          <span className="text-blue-500 font-semibold">
            {info[index].percentage}
          </span>
        </li>
      ))}
    </ul>
  );
};




  return (
    <div
  className="
    w-full h-105 sm:h-125

    bg-white dark:bg-gray-900

    rounded-2xl

    border border-gray-200 dark:border-gray-800

    shadow-lg shadow-black/5 dark:shadow-black/20

    p-3 sm:p-5
  "
>

  {/* Header */}
  <div className="mb-5">

    <h2
      className="
        text-lg sm:text-xl
        font-semibold

        text-gray-800 dark:text-white
      "
    >
      Expense Categories
    </h2>

    <p
      className="
        text-sm

        text-gray-500 dark:text-gray-400
      "
    >
      Visualize how your expenses are distributed
    </p>

  </div>

  {/* Chart Area */}
  <div className="w-full h-[85%]">

    {info.length === 0 ? (

      /* Empty State */
      <div
        className="
          w-full h-full

          flex flex-col
          items-center justify-center

          rounded-2xl

          border-2 border-dashed
          border-gray-200 dark:border-gray-800

          bg-linear-to-br
          from-gray-50
          to-purple-50

          dark:from-gray-900
          dark:to-gray-950

          relative overflow-hidden
        "
      >

        {/* Glow */}
        <div
          className="
            absolute

            w-52 h-52

            bg-purple-400/10
            dark:bg-purple-500/10

            rounded-full

            blur-3xl
          "
        />

        {/* Fake Pie Preview */}
        <div
          className="
            absolute bottom-10

            w-36 h-36

            rounded-full

            border-18
            border-purple-300/20

            border-t-purple-400/40
            border-r-pink-400/30
            border-b-blue-400/20

            rotate-12

            opacity-40
          "
        />

        {/* Content */}
        <div className="relative z-10 text-center px-6">

          {/* Icon */}
          <div
            className="
              w-20 h-20 mx-auto mb-5

              flex items-center justify-center

              rounded-full

              bg-purple-100 dark:bg-purple-900/20

              text-4xl
            "
          >
            🥧
          </div>

          {/* Heading */}
          <h3
            className="
              text-lg sm:text-xl
              font-semibold

              text-gray-800 dark:text-white
            "
          >
            No expense categories yet
          </h3>

          {/* Description */}
          <p
            className="
              mt-2

              text-sm sm:text-base

              text-gray-500 dark:text-gray-400

              max-w-md
            "
          >
            Add expense transactions to see
            category-wise spending insights and analysis.
          </p>

          {/* CTA */}
          <button
            onClick={()=>{
              Open()
              navigate("/transaction")
            }}
            className="
              mt-6

              px-5 py-3

              rounded-2xl

              bg-linear-to-r
              from-purple-500
              to-pink-500

              text-white font-medium

              shadow-lg shadow-purple-500/20

              hover:scale-[1.03]

              active:scale-[0.97]

              transition-all duration-300
            "
          >
            + Add Expense
          </button>

        </div>

      </div>

    ) : (

      /* Actual Chart */
      <ResponsiveContainer width="100%" height="100%">

        <PieChart margin={{ right: 0 }}>

          <Pie
            data={info}
            cx={"50%"}
            cy={"50%"}
            innerRadius={"45%"}
            outerRadius={"75%"}
            paddingAngle={1}
            dataKey={"value"}
          >

            {info.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}

          </Pie>

          <Tooltip content={<CustomTooltip />} />

          <Legend
            content={rendercustomlegend}
            verticalAlign="bottom"
          />

        </PieChart>

      </ResponsiveContainer>

    )}

  </div>

</div>
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

