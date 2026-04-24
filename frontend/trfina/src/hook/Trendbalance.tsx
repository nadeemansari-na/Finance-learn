

import { useEffect, useState } from "react"
// import { Backend } from "../pages/Backend"
import axios from "axios"


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
            // const token=localStorage.getItem("token")
            //     if(!token){
            //         console.log('no token found')
            //         return 
            //     }

            const res=await axios.get(`http://127.0.0.1:8787/api/v1/balance/balance-history`,{
                headers:{
                    Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtbm9wdHhuNTAwMDBkc3hzczF6ZmZ5OHoifQ.k5zXrqFFvnOhFnhgQTqgpjxjqLxIYEFUQfSYrKNqATY`
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