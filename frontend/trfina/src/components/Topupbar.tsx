import {  useState } from "react";
import { CreateCategory } from "./Createcategory";
import { useOpen } from "../context/createcontext";

export interface topbarProps {
    issopen: boolean;
    setissopen: React.Dispatch<React.SetStateAction<boolean>>;
};
export interface createtransactiontype {
    name: string;
    amount:number;
    categoryId: string;
    date:string
}

export const Topupbar = () => {
    const [typee, settypee] = useState<string>("expense")
    const {close,issopen}=useOpen()

    const getCurrentDateTime = () => {
  const now = new Date();
        const y=String(now.getMonth()+1).padStart(2,"0")
        console.log(y)
  const year = now.getFullYear();
  const month = String(now.getMonth()).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
        //state of list
    const [createtr, setcreatetr] = useState<createtransactiontype>({
        name: "",
        amount: 0,
        categoryId: "",
        date:getCurrentDateTime()
    })
  

    return (
        <div className=" ">
            <div className={`fixed h-full w-full p-4  z-60 bottom-0 bg-linear-to-br from-gray-100 to-gray-200 transform  transform-transition duration-700 ${issopen ? "translate-y-0" : "translate-y-full"
                } `}>

                <div className="flex justify-between items-center text-blue-400">
                    <button onClick={close } className="cursor-pointer" >cancel</button>
                    <button className="cursor-pointer"   >save</button>
                </div>

                <div>
                    <h1 className="text-xl font-semibold">
                        Add Transaction
                    </h1>
                </div>
                <div className="pt-3">

                    <div className="flex bg-gray-200 rounded-lg p-3">
                        <button onClick={() => settypee("expense")} className={` rounded-lg md:px-4 md:py-3 lg:px-6 lg:py-4 p-1.5 w-1/2 h transition-all duration-300 ${typee == "expense" ? "bg-white shadow-md scale-100" : "hover:bg-gray-300"} `}>
                            Expense
                        </button>

                        <button onClick={() => settypee("income")} className={`rounded-lg md:px-4 md:py-3 lg:px-6 lg:py-4 p-1.5 w-1/2 h transition-all duration-300 ${typee == "income" ? "bg-white shadow-md scale-100" : "hover:bg-gray-300"} `}>
                            Income
                        </button>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* //left */}
                        <div className="space-y-4">

                       
                    <h3 className="mt-7 pl-5">Details</h3>
                    <div className="grid grid-cols-1 gap-3   bg-white rounded-2xl p-5 mt-2 ">

                        <input
                            onChange={(e) => {
                                setcreatetr({
                                    ...createtr,
                                    name: e.target.value
                                })
                            }}
                            type="text" placeholder="Title" className="border p-1 pl-3 rounded-lg " />
                        <input
                            onChange={(e) => {
                                setcreatetr({
                                    ...createtr,
                                    amount: Number(e.target.value)
                                })
                            }}
                            type="number" placeholder="amount" className="border rounded-lg p-1 pl-3" />

                        <input
                            type="datetime-local"
                            value={createtr.date}
                            className="border p-2 rounded-lg"
                        />

                    </div>
                             </div>

                             {/* right */}
                            <div className="space-y-4">

                            
                    <h3 className="mt-5 pl-5">Category</h3>
                    <div className="p-5 bg-white rounded-2xl mt-2">
                      
                            <CreateCategory typee={typee} />
                    </div>
                    </div>
                            </div>
                </div>
            </div>

            
        </div>
    )

}