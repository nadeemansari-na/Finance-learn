import { useNavigate } from "react-router-dom"
import { Close } from "../svg/Close"
import { Avatar} from "./Appbar"
import { useSidebar } from "../context/sidebarContext"



export const Slide=()=>{
    const navigate=useNavigate()
    const {isOpen,close}=useSidebar()
    const change=()=>{
        navigate("/transaction")
        close()
    }
    return (
        <div>
             <section className={`w-80 max-w-full fixed top-0 pt-9 md:pt-0 left-0 z-50 bg-white  lg:pt-7 h-screen flex flex-col justify-start  items-center gap-14 border-r-2 border-slate-300 transform transition-transform duration-400   
           ${isOpen ? 'translate-x-0 ': '-translate-x-full' } `}>
            <div className="flex justify-center items-center">
                <div className="text-blue-600 text-xl ">
                    Expense Tracker
                </div>
                        <Close isopen={isOpen} setisopen={close} />
                   
            </div>
                <div className="text-center ">
                    <Avatar name="nadeem"/>
                    <div className="text-center">
                        Nadeem Ansari
                    </div>
                    
                </div>
                <div className="flex flex-col justify-center items-center gap-3">
                   <button onClick={()=>{
                    navigate('/landing')
                    close()
                   }
                         } 
                     className=" rounded-md bg-linear-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-linear-to-br focus:ring-2 focus:outline-none focus:ring-purple-400 dark:focus:ring-purple-800 cursor-pointer text-white px-4 py-2  " >
                    Dashboard
                </button>
                <button onClick={change} className=" rounded-md bg-linear-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-linear-to-br focus:ring-2 focus:outline-none focus:ring-purple-400 dark:focus:ring-purple-800 cursor-pointer text-white px-4 py-2  " >
                    Transactions
                </button>
                <button className=" rounded-md bg-linear-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-linear-to-br focus:ring-2 focus:outline-none focus:ring-purple-400 dark:focus:ring-purple-800 cursor-pointer text-white px-4 py-2  " >
                    Categories
                </button>
                </div>
            </section> 
        </div>
    )
}