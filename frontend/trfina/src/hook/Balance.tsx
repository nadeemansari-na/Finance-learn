import axios from "axios"
import { useEffect, useState } from "react"
import { Backend } from "../pages/Backend"


interface inexbaltype{
    income:number
    expense:number
    balance:number
}

export const useBalanceInEx=()=>{
    const [loading,setloading]=useState(true)
    const [data, setdata]=useState<inexbaltype >({
        income:0,
        expense:0,
        balance:0
    })

    useEffect(()=>{
       const getdata=async ()=>{

            const token=localStorage.getItem("token")
            if(!token) return
                try{
                 const res=await axios.get(`${Backend}/api/v1/balance/balances`,{
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    })
                    setdata(res.data)   
                    setloading(false)
                }catch(e){
                    console.log(e)
                }
        }
        getdata()
    },[])

    return {
        data,
        loading
    }
}