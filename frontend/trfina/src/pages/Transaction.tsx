import { useState } from "react"
import { useexpense } from "../hook/Expense"
import { Removebtm } from "../components/Removetrs"
import { Slide } from "../components/Slidebar"
import { Topupbar } from "../components/Topupbar"
import { Navbar } from "../components/Navbar"
import { useOpen } from "../context/createcontext"
import { useSidebar } from "../context/sidebarContext"
import { Transactionskeleton } from "../components/Transactionskeleton"


export const Transaction = () => {
  const [search, setsearch] = useState("")
  const { data, setdata,loading } = useexpense()
  const [selectRemove, setselectRemove] = useState(false);
  const [selectid, setselectid] = useState<string | null>(null);
  const {Open} =useOpen()
  const {close}=useSidebar()


  const handleClick = (id: string) => {
    console.log(id)
    setselectid(id);
    setselectRemove(true);
  }

  //on delete update original data


  //searching data    
  const filterdata = data.filter((item) =>
    item.category.name.toLowerCase().includes(search.toLowerCase())
  )
     if(loading){
          return <div>
              <div>
                  <Navbar/>
              </div>
              <Transactionskeleton/>
          </div>
      }

  return (
    <div className="w-full h-full min-h-screen  bg-linear-to-br from-gray-50 to-blue-50">


  
        {/* navbar */}
        <Navbar  search={search} setsearch={setsearch} />
      {/* slidebar */}
      <Slide  /> 
      {/* createtransaction */}
      <Topupbar />

        <div onClick={close}  className="flex flex-col gap-4  p-5 pt-21">
     


      {/* Transaction List */}
      <div className="w-full bg-white rounded-xl shadow-sm divide-y divide-cyan-300">

        {filterdata.map((e) => (
          <div
            key={e.id}
            className="flex justify-between items-center p-3 hover:bg-gray-50 transition"
          >
            <div className="flex justify-center items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center rounded-full capitalize bg-blue-100 text-blue-600 font-semibold">
                {e.category.name.charAt(0)}
              </div>


              {/* Left */}
              <div className="flex flex-col">
                <span className="font-medium text-gray-800 capitalize">
                  {e.category.name}
                </span>

                <span className="text-gray-500 text-xs capitalize">
                  {e.type}
                </span>

                <span className="text-gray-400 text-xs">
                  {new Date(e.createAt).toLocaleString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                </span>
              </div>
            </div>
            {/* Right */}
            <div className="flex justify-center items-center gap-2">
              <div
                className={`font-semibold ${e.type === "expense" ? "text-red-500" : "text-green-600"
                  }`}
              >
                ₹{e.amount}
              </div>
              <button onClick={() => handleClick(e.id)} className="bg-linear-to-br from-cyan-300 to-blue-cyan-600 p-1.5 rounded-sm cursor-pointer">Delete</button>
            </div>
          </div>
        ))}

      </div>
      {selectRemove && selectid && (
        <Removebtm id={selectid} setdata={setdata} />
      )}

      <div onClick={Open} className="cursor-pointer absolute  bottom-10 z-40 left-1/2 w-9 h-9 text-center rounded-3xl text-blue-700 text-3xl bg-linear-to-br from-cyan-600 to-blue-200">
        +
      </div>
      </div>
    </div>
  )
}