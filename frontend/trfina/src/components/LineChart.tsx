'use-client'
import { LineChart,Line,ResponsiveContainer, YAxis,Legend, XAxis, Tooltip, type TooltipProps, CartesianGrid } from "recharts"
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent"
import { useTrendBalance } from "../hook/Trendbalance"
import { useNavigate } from "react-router-dom"
import { useOpen } from "../context/createcontext"
interface MyTooltipProps extends TooltipProps<ValueType,NameType>{
    payload ?:any[]
}




export const LineChartcomponent = () => {
  const { data } = useTrendBalance();
  const navigate=useNavigate()
  const {Open}=useOpen()
  //  GROUP DATA (remove similar date overlap)
  const groupedData = Object.values(
    data.reduce((acc, item) => {
      if (!acc[item.date]) {
        acc[item.date] = {
          date: item.date,
          amount: 0,
          balance: item.balance
        };
      }

      acc[item.date].amount += item.amount;

      // keep latest balance for that date
      acc[item.date].balance = item.balance;

      return acc;
    }, {} as Record<string, { date: string; amount: number; balance: number }>)
  );

  // SORT DATA
  groupedData.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="w-full h-65 sm:h-80">
  {/* Chart */}

  {groupedData.length === 0 ? (

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
        to-blue-50

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

          bg-blue-400/10
          dark:bg-blue-500/10

          rounded-full

          blur-3xl
        "
      />

      {/* Fake Chart */}
      <div
        className="
          absolute bottom-8

          flex items-end gap-2

          opacity-20
        "
      >

        <div className="w-3 h-10 rounded-full bg-blue-400" />
        <div className="w-3 h-16 rounded-full bg-blue-400" />
        <div className="w-3 h-8 rounded-full bg-blue-400" />
        <div className="w-3 h-20 rounded-full bg-blue-400" />
        <div className="w-3 h-12 rounded-full bg-blue-400" />

      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">

        <div
          className="
            w-20 h-20 mx-auto mb-5

            flex items-center justify-center

            rounded-full

            bg-blue-100 dark:bg-blue-900/20

            text-4xl
          "
        >
          📈
        </div>

        <h3
          className="
            text-lg sm:text-xl
            font-semibold

            text-gray-800 dark:text-white
          "
        >
          No balance data yet
        </h3>

        <p
          className="
            mt-2

            text-sm sm:text-base

            text-gray-500 dark:text-gray-400

            max-w-md
          "
        >
          Add your first transaction to visualize
          your balance trends and analytics.
        </p>

        <button
          onClick={()=>{
            Open()
            navigate("/transaction")
          }}
          className="
            mt-6

            px-5 py-3
            cursor-pointer
            rounded-2xl

            bg-linear-to-r
            from-blue-500
            to-cyan-500

            text-white font-medium

            shadow-lg shadow-blue-500/20

            hover:scale-[1.03]

            active:scale-[0.97]

            transition-all duration-300
          "
        >
          + Add Transaction
        </button>

      </div>

    </div>

  ) : (

    /* Actual Chart */
    <ResponsiveContainer width="100%" height="100%">

      <LineChart
        data={groupedData}
        margin={{
          top: 10,
          right: 10,
          left: -15,
          bottom: 0,
        }}
      >

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(156,163,175,0.15)"
          vertical={false}
        />

        <XAxis
          dataKey="date"
          tick={{
            fill: "#9CA3AF",
            fontSize: 12,
          }}
          tickLine={false}
          axisLine={false}
        />

        <YAxis
          dataKey="balance"
          tick={{
            fill: "#9CA3AF",
            fontSize: 12,
          }}
          tickLine={false}
          axisLine={false}
        />

        <Tooltip
          content={<CustomTooltip />}
          shared={false}
          cursor={{
            stroke: "#2563eb",
            strokeOpacity: 0.2,
          }}
        />

        <Legend
          wrapperStyle={{
            paddingTop: "10px",
            fontSize: "14px",
          }}
        />

        <Line
          type="monotone"
          dataKey="balance"
          stroke="#3b82f6"
          strokeWidth={3}
          activeDot={{
            r: 7,
            fill: "#2563eb",
            stroke: "#fff",
            strokeWidth: 2,
          }}
          dot={{
            r: 3,
            fill: "#60a5fa",
          }}
        />

      </LineChart>

    </ResponsiveContainer>

  )}

</div>
  )
};



const CustomTooltip=({active,payload}:MyTooltipProps)=>{
    if(active && payload && payload.length){
        return (
            <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
                {/* <p className="text-medium text-lg text-indigo-500">{label}</p> */}
                <p className="text-sm text-indigo-500">
                Balance:
                <span className="ml-2">₹{payload[0]?.value}</span>
                </p>
                 {/* <p className="text-sm text-indigo-500">
                product:
                <span className="ml-2">${payload[1].value}</span>
                </p> */}
            </div>
        )
    }
    return null;
}