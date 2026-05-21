import axios from "axios"
import type { expensecheck } from "../hook/Expense"
import { useEffect } from "react"
import { Backend } from "../pages/Backend"

type Removeprops = {
    id: string
    setdata:React.Dispatch<React.SetStateAction<expensecheck[]>>;
}

export const Removebtm = ({ id,setdata }: Removeprops) => {

  
    useEffect(()=>{
        const eleminate=async ()=>{
                try{
                    const token=localStorage.getItem("token")

                    await axios.delete(`${Backend}/api/v1/transaction/transactions/${id}`,{
                        headers:{
                            Authorization:`Bearer ${token}`
                        },
                    })
    
    
                    setdata(prev=> prev.filter(item=> item.id !==id))
                }catch(e){
                }
    
            }

            eleminate()

    },[])
    return null;
}