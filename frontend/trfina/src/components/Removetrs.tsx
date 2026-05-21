import axios from "axios"
import type { expensecheck } from "../hook/Expense"
import { useEffect } from "react"
import { Backend } from "../pages/Backend"

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
                    const token=localStorage.getItem("token")

                    const res=await axios.delete(`${Backend}/api/v1/transaction/transactions/${id}`,{
                        headers:{
                            Authorization:`Bearer ${token}`
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
    return null;
}