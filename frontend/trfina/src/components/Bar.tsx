'use-client'
import { BarChart,Bar,ResponsiveContainer, YAxis, XAxis, CartesianGrid, Tooltip, type TooltipProps } from "recharts"
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent"
import { useexpense } from "../hook/Expense"
import { useEffect, useState } from "react"
interface MyTooltipProps extends TooltipProps<ValueType,NameType>{}
const salesdata=[
    {
        name:'jan',
        product:480,
        revenue:8600,
    },
      {
        name:'feb',
        product:2380,
        revenue:2600,
    },
      {
        name:'mar',
        product:2380,
        revenue:2600,
    },
      {
        name:'jan',
        product:2380,
        revenue:2600,
    },
      {
        name:'may',
        product:2340,
        revenue:1300,
    },
      {
        name:'jun',
        product:2900,
        revenue:1600,
    },
]


interface info{
    name:string;
    amount:number;
}

export const BarChartComponent=()=>{

    const {data}=useexpense()
    const [info,setinfo]=useState<info []>([])
    const [tinco,settinco]=useState<number>()

    useEffect(()=>{
        if(!data || data.length==0) return;

       const dabba= data.filter(item=> item.type.toLowerCase()=="income")
        .reduce((sum,t)=>sum+t.amount,0)

        const cate=Object.values(
            data.filter(item=>item.type.toLowerCase()=="expense")
            .reduce((acc,item)=>{
                if(!item.category) return acc;
                const key:string=item.category 
                if(!acc[key]){
                    acc[key] ??={
                        name:key,
                        amount:0
                    }
                }
                acc[key].amount +=item.amount
                return acc
            },{} as Record<string,info>)
        )



        settinco(dabba)
        setinfo(cate);
    },[])

    console.log(info)
    return (
        <ResponsiveContainer width="100%" height="100%">

        <BarChart width={500} height={400} data={salesdata}>
        <YAxis/>
        <XAxis dataKey={"name"}/>
        <CartesianGrid strokeDasharray="5 5"/>
        <Tooltip content={<CustomTooltip/>}/>
        <legend/>
        <Bar type={"monotone"} dataKey={"product"} stroke="#2563ab" fill="#3b82f6" stackId="1">
        </Bar>
        <Bar type={"monotone"} dataKey={"revenue"} stroke="#2563ab" fill="#3b82f6" stackId="1">
        </Bar>
        </BarChart>
        </ResponsiveContainer>
    )
}

const CustomTooltip=({active,payload,label}:MyTooltipProps)=>{

    if(!active || !payload || !payload.length){
        return null;
    }
        return (
            <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
                <p className="text-medium text-lg text-indigo-500">{label}</p>
                <p className="text-sm text-indigo-500">
                product:
                <span className="ml-2">${payload[0].value}</span>
                </p>
                 <p className="text-sm text-indigo-500">
                product:
                <span className="ml-2">${payload[1].value}</span>
                </p>
            </div>
        )
    
}