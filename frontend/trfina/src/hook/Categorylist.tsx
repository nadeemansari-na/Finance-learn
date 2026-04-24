import axios from "axios"
import { useEffect, useState } from "react"

interface categorylisttype{
    name:string,
    id:string,
    type:"income" | "expense"
}

export const useCategoryList=()=>{
    const [categorylist,setCategoryList]=useState<categorylisttype []>([])

        useEffect(()=>{
          async function getlist(){
                const token=localStorage.getItem("token")
                if(!token) return 
                try{
                     const res=await axios.get(`http://127.0.0.1:8787/api/v1/category/categories`,{
                headers:{
                    Authorization:`Bearer ${token}`
                },
                        })

                        setCategoryList(res.data.data)
                }catch(e){

                }
            }
            getlist()
        },[])
    return {
        categorylist,
        setCategoryList
    }
}