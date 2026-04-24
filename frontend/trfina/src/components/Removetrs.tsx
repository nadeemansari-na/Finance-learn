import axios from "axios"
import type { expensecheck } from "../hook/Expense"
import { useEffect } from "react"

type Removeprops = {
    id: string
    setdata:React.Dispatch<React.SetStateAction<expensecheck[]>>;
}

export const Removebtm = ({ id,setdata }: Removeprops) => {
    console.log("not even reaching")
    console.log(id)

  
    useEffect(()=>{
        const eleminate=async ()=>{
                try{
                    const res=await axios.delete(`http://127.0.0.1:8787/api/v1/transaction/transactions/${id}`,{
                        headers:{
                            Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtbm9wdHhuNTAwMDBkc3hzczF6ZmZ5OHoifQ.k5zXrqFFvnOhFnhgQTqgpjxjqLxIYEFUQfSYrKNqATY`
                        },
                    })
    
                    console.log(res)
    
                    setdata(prev=> prev.filter(item=> item.id !==id))
                }catch(e){
                    console.log(e)
                }
    
            }

            eleminate()

    },[])
    return
}