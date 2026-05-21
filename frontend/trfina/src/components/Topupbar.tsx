import {  useState } from "react";
import { CreateCategory } from "./Createcategory";
import { useOpen } from "../context/createcontext";
import { useCategory } from "../context/categoryId";
import axios from "axios";
import { Backend } from "../pages/Backend";

export interface topbarProps {
    issopen: boolean;
    setissopen: React.Dispatch<React.SetStateAction<boolean>>;
};
export interface createtransactiontype {
    amount:number;
    date:string
}

export const Topupbar = () => {
    const [typee, settypee] = useState<"expense" | "income" | "">("")
    const {close,issopen}=useOpen()
    const {categoryId}=useCategory()
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
        amount: 0,
        date:getCurrentDateTime()
    })
  

    const handler=async ()=>{

        const token=localStorage.getItem("token")
        try{
        
            await axios.post(`${Backend}/api/v1/transaction/transactions`,{
               
                    type:typee,
                    amount:createtr.amount,
                    date:createtr.date,
                    categoryId
                
            },
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        close()
        window.location.reload()
        }catch(e){
            console.log(e)
        }
    }

    return (
        

       <div>

  {/* Overlay */}
  <div
    onClick={close}
    className={`
      fixed inset-0 z-50

      bg-black/40
      backdrop-blur-[2px]

      transition-opacity duration-300

      ${issopen ? "opacity-100 visible" : "opacity-0 invisible"}
    `}
  />

  {/* Bottom Sheet */}
  <div
    onClick={(e) => e.stopPropagation()}
    className={`
      fixed inset-0 z-60

      w-full
      h-screen

      overflow-y-auto

      rounded-t-4xl

      bg-linear-to-br
      from-gray-50
      via-white
      to-blue-50

      dark:from-gray-900
      dark:via-gray-950
      dark:to-gray-900

      border-t border-gray-200 dark:border-gray-800

      shadow-2xl shadow-black/20

      px-4 sm:px-6
      py-5

      transform transition-transform duration-500

      ${issopen ? "translate-y-0" : "translate-y-full"}
    `}
  >

    {/* Top Handle */}
    <div className="flex justify-center mb-4">

      <div
        className="
          w-14 h-1.5

          rounded-full

          bg-gray-300 dark:bg-gray-700
        "
      />

    </div>

    {/* Header */}
    <div className="flex items-center justify-between mb-6">

      <button
        onClick={close}
        className="
          text-sm font-medium

          text-gray-500 dark:text-gray-400

          hover:text-red-500

          transition-colors

          cursor-pointer
        "
      >
        Cancel
      </button>

      <div className="text-center">

        <h1
          className="
            text-xl sm:text-2xl
            font-bold

            text-gray-800 dark:text-white
          "
        >
          Add Transaction
        </h1>

        <p
          className="
            text-sm mt-1
            text-gray-500 dark:text-gray-400
          "
        >
          Track your income and expenses
        </p>

      </div>

      <button
        onClick={handler}
        className="
          px-4 py-2

          rounded-xl

          bg-linear-to-r
          from-blue-500
          to-cyan-500

          text-white text-sm font-medium

          shadow-lg shadow-blue-500/20

          hover:scale-[1.03]

          active:scale-[0.97]

          transition-all duration-200

          cursor-pointer
        "
      >
        Save
      </button>

    </div>

    {/* Type Toggle */}
    <div
      className="
        flex

        bg-gray-200 dark:bg-gray-800

        rounded-2xl

        p-1.5

        mb-8
      "
    >

      {/* Expense */}
      <button
        onClick={() => settypee("expense")}
        className={`
          w-1/2

          py-3
          cursor-pointer
          rounded-xl

          text-sm sm:text-base
          font-medium

          transition-all duration-300

          ${
            typee === "expense"
              ? `
                bg-white dark:bg-gray-900
                text-red-500
                shadow-md
              `
              : `
                text-gray-600 dark:text-gray-300
                hover:bg-gray-300 dark:hover:bg-gray-700
              `
          }
        `}
      >
        💸 Expense
      </button>

      {/* Income */}
      <button
        onClick={() => settypee("income")}
        className={`
          w-1/2

          py-3
          cursor-pointer
          rounded-xl

          text-sm sm:text-base
          font-medium

          transition-all duration-300

          ${
            typee === "income"
              ? `
                bg-white dark:bg-gray-900
                text-green-500
                shadow-md
              `
              : `
                text-gray-600 dark:text-gray-300
                hover:bg-gray-300 dark:hover:bg-gray-700
              `
          }
        `}
      >
        💰 Income
      </button>

    </div>

    {/* Content Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Left */}
      <div className="space-y-4">

        <h3
          className="
            text-lg font-semibold

            text-gray-800 dark:text-white
          "
        >
          Details
        </h3>

        <div
          className="
            bg-white dark:bg-gray-900

            rounded-2xl

            border border-gray-200 dark:border-gray-800

            shadow-sm shadow-black/5 dark:shadow-black/20

            p-5

            space-y-4
          "
        >

          {/* Title */}
          <input
            type="text"
            placeholder="Transaction title"
            className="
              w-full

              px-4 py-3

              rounded-xl

              bg-gray-50 dark:bg-gray-800

              border border-gray-200 dark:border-gray-700

              text-gray-700 dark:text-white

              placeholder:text-gray-400

              outline-none

              focus:ring-2 focus:ring-blue-500/30
            "
          />

          {/* Amount */}
          <input
            onChange={(e) => {
              setcreatetr({
                ...createtr,
                amount: Number(e.target.value),
              });
            }}
            type="number"
            placeholder="Amount"
            className="
              w-full

              px-4 py-3

              rounded-xl

              bg-gray-50 dark:bg-gray-800

              border border-gray-200 dark:border-gray-700

              text-gray-700 dark:text-white

              placeholder:text-gray-400

              outline-none

              focus:ring-2 focus:ring-blue-500/30
            "
          />

          {/* Date */}
          <input
            type="datetime-local"
            value={createtr.date}
            className="
              w-full

              px-4 py-3

              rounded-xl

              bg-gray-50 dark:bg-gray-800

              border border-gray-200 dark:border-gray-700

              text-gray-700 dark:text-white

              outline-none

              focus:ring-2 focus:ring-blue-500/30
            "
          />

        </div>

      </div>

      {/* Right */}
      <div className="space-y-4">

        <h3
          className="
            text-lg font-semibold

            text-gray-800 dark:text-white
          "
        >
          Category
        </h3>

        <div
          className="
            bg-white dark:bg-gray-900

            rounded-2xl

            border border-gray-200 dark:border-gray-800

            shadow-sm shadow-black/5 dark:shadow-black/20

            p-5
          "
        >

          <CreateCategory typee={typee} />

        </div>

      </div>

    </div>

  </div>

</div>
    )

}