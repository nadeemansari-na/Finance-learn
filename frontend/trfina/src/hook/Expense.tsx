import { useEffect, useState } from "react"
// import { Backend } from "../pages/Backend"
import axios from "axios"
import { Backend } from "../pages/Backend"


export interface expensecheck{
    id:string,
    amount:number,
    type:string,
    createAt:Date,
    user:{
        email:string
    },
    category:{
        name:string
    },
}
export const useexpense=()=>{
    const [loading,setloading]=useState(true)
    const [data,setdata]=useState<expensecheck[]>([])
    useEffect(()=>{
      const getexpense=async ()=>{
        try{
            const token=localStorage.getItem("token")
                if(!token){
                    console.log('no token found')
                    return 
                }

            const res=await axios.get(`${Backend}/api/v1/transaction/transactions`,{
                headers:{
                    Authorization:`Bearer ${token}`
                },
            })
           
                setdata(res.data.alldata)
                setloading(false)
        }catch(e){
            console.log('something is missing')
            return 
        }

        }
        getexpense()
    },[])


    return{
        data,
        setdata,
        loading
    }
}