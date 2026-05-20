

import { useEffect, useState } from "react"
// import { Backend } from "../pages/Backend"
import axios from "axios"
import { Backend } from "../pages/Backend"


interface CheckBalance{
    amount:number,
    date:string,
    balance:number
}

export const useTrendBalance=()=>{

    const [data,setdata]=useState<CheckBalance[]>([])

    useEffect(()=>{
      const getexpense=async ()=>{
        try{
            const token=localStorage.getItem("token")
                if(!token){
                    console.log('no token found')
                    return 
                }

            const res=await axios.get(`${Backend}/api/v1/balance/balance-history`,{
                headers:{
                    Authorization:`Bearer ${token}`
                },
            })
           
                setdata(res.data.result)
                console.log(res.data)
        }catch(e){
            console.log('something is missing')
            return 
        }

        }
        getexpense()
    },[])


    return{
        data
    }
}