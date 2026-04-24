'use-client'
import { LineChart,Line,ResponsiveContainer, YAxis,Legend, XAxis, Tooltip, type TooltipProps } from "recharts"
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent"
import { useTrendBalance } from "../hook/Trendbalance"
interface MyTooltipProps extends TooltipProps<ValueType,NameType>{
    payload ?:any[]
}




export const LineChartcomponent = () => {
  const { data } = useTrendBalance();

  //  GROUP DATA (remove same-date overlap)
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

  // SORT DATA (VERY IMPORTANT for line chart)
  groupedData.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );


  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={groupedData}>
        {/*  Use balance for Y axis */}
        <YAxis dataKey="balance" />

        <XAxis dataKey="date" />

        <Tooltip
          content={<CustomTooltip />}
          shared={false}
          cursor={{ stroke: "transparent" }}
        />

        <Legend />

        <Line
          type="monotone"
          dataKey="balance"
          stroke="#2563ab"
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
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