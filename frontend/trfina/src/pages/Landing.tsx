
import { Appbar} from "../components/Appbar"
import { PieChartcomponent } from "../components/PieChart"
import { Slide } from "../components/Slidebar";
import { LineChartcomponent } from "../components/LineChart";
import { BarChartComponent } from "../components/Bar";
import { useBalanceInEx } from "../hook/Balance";
import { useSidebar } from "../context/sidebarContext";
import { Transactionskeleton } from "../components/Transactionskeleton";
import { useexpense } from "../hook/Expense";



export const Landing=()=>{
    const {ddata,loading}=useBalanceInEx()
    const {data}=useexpense()
    const {close}=useSidebar()
    if(loading){
        return <div className="dark:bg-gray-900">
            <div>
                <Appbar/>
            </div>
            <Transactionskeleton/>
        </div>
    }

    return (
        <div >
        <div className="w-full min-h-screen ">
           <Appbar  ></Appbar>
           <Slide  />
        <div onClick={ close } className="w-full flex justify-center items-center">
        
            <section className="pt-22 w-full max-w-full bg-gray-100 flex  flex-col gap-5 p-5 dark:bg-gray-900 dark:text-white ">
                   <div
  className="
    grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4
    gap-4 sm:gap-5
    w-full
  "
>

  {/* Income */}
  <div
    className="
      bg-white dark:bg-gray-900
      border border-gray-200 dark:border-gray-800
      rounded-2xl
      shadow-lg shadow-black/5 dark:shadow-black/20
      p-5
      flex flex-col justify-center
      hover:scale-[1.02]
      transition-all duration-300
    "
  >

    <div className="flex items-center justify-between mb-4">

      <div
        className="
          w-11 h-11 rounded-full
          flex items-center justify-center
          bg-green-100 dark:bg-green-900/30
          text-xl
        "
      >
        💰
      </div>

      <span
        className="
          text-xs font-medium
          px-2 py-1 rounded-full
          bg-green-100 dark:bg-green-900/30
          text-green-600 dark:text-green-400
        "
      >
        Income
      </span>

    </div>

    <h2
      className="
        text-2xl font-bold
        text-gray-800 dark:text-white
        tracking-wide
      "
    >
      ₹{ddata.income}
    </h2>

    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
      Total monthly income
    </p>

  </div>

  {/* Expense */}
  <div
    className="
      bg-white dark:bg-gray-900
      border border-gray-200 dark:border-gray-800
      rounded-2xl
      shadow-lg shadow-black/5 dark:shadow-black/20
      p-5
      flex flex-col justify-center
      hover:scale-[1.02]
      transition-all duration-300
    "
  >

    <div className="flex items-center justify-between mb-4">

      <div
        className="
          w-11 h-11 rounded-full
          flex items-center justify-center
          bg-red-100 dark:bg-red-900/30
          text-xl
        "
      >
        💸
      </div>

      <span
        className="
          text-xs font-medium
          px-2 py-1 rounded-full
          bg-red-100 dark:bg-red-900/30
          text-red-600 dark:text-red-400
        "
      >
        Expense
      </span>

    </div>

    <h2
      className="
        text-2xl font-bold
        text-gray-800 dark:text-white
        tracking-wide
      "
    >
      ₹{ddata.expense}
    </h2>

    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
      Total monthly expenses
    </p>

  </div>

  {/* Balance */}
  <div
    className="
      bg-white dark:bg-gray-900
      border border-gray-200 dark:border-gray-800
      rounded-2xl
      shadow-lg shadow-black/5 dark:shadow-black/20
      p-5
      flex flex-col justify-center
      hover:scale-[1.02]
      transition-all duration-300
    "
  >

    <div className="flex items-center justify-between mb-4">

      <div
        className="
          w-11 h-11 rounded-full
          flex items-center justify-center
          bg-blue-100 dark:bg-blue-900/30
          text-xl
        "
      >
        📊
      </div>

      <span
        className="
          text-xs font-medium
          px-2 py-1 rounded-full
          bg-blue-100 dark:bg-blue-900/30
          text-blue-600 dark:text-blue-400
        "
      >
        Balance
      </span>

    </div>

    <h2
      className="
        text-2xl font-bold
        text-gray-800 dark:text-white
        tracking-wide
      "
    >
      ₹{ddata.balance}
    </h2>

    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
      Current available balance
    </p>

  </div>

  {/* Transactions */}
  <div
    className="
      bg-white dark:bg-gray-900
      border border-gray-200 dark:border-gray-800
      rounded-2xl
      shadow-lg shadow-black/5 dark:shadow-black/20
      p-5
      flex flex-col justify-center
      hover:scale-[1.02]
      transition-all duration-300
    "
  >

    <div className="flex items-center justify-between mb-4">

      <div
        className="
          w-11 h-11 rounded-full
          flex items-center justify-center
          bg-purple-100 dark:bg-purple-900/30
          text-xl
        "
      >
        🧾
      </div>

      <span
        className="
          text-xs font-medium
          px-2 py-1 rounded-full
          bg-purple-100 dark:bg-purple-900/30
          text-purple-600 dark:text-purple-400
        "
      >
        Activity
      </span>

    </div>

    <h2
      className="
        text-2xl font-bold
        text-gray-800 dark:text-white
        tracking-wide
      "
    >
      {data.length}
    </h2>

    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
      Total transactions
    </p>

  </div>

</div>

                    <div >
                      
                            <LineChartcomponent/>
                    </div>

                    <div className="  grid grid-cols-1 gap-4 sm:gap-2 lg:grid-cols-2">
                    <div className="w-full  ">
                       
                        <PieChartcomponent/>

                    </div>
                    <div className="w-full ">

                   
                            <BarChartComponent/>
                    </div>
                    </div>
            </section>
        </div>
            </div>
          </div>
    )
}

export function Avatar({name}:{name:string}){
    return (
        <div className="relative inline-flex items-center justify-center w-10 h-10 p-6 overflow-hidden bg-purple-600 rounded-full text-black font-extrabold text-shadow-2xs text-shadow-blue-300 ">
    <span className="font-medium text-body">{name[0]}</span>
</div>
    )
}

