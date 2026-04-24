
import { Appbar} from "../components/Appbar"
import { PieChartcomponent } from "../components/PieChart"
import { Slide } from "../components/Slidebar";
import { LineChartcomponent } from "../components/LineChart";
import { BarChartComponent } from "../components/Bar";
import { useBalanceInEx } from "../hook/Balance";
import { useSidebar } from "../context/sidebarContext";
import { Transactionskeleton } from "../components/Transactionskeleton";



export const Landing=()=>{
    const {data,loading}=useBalanceInEx()
    const {close}=useSidebar()

    if(loading){
        return <div>
            <div>
                <Appbar/>
            </div>
            <Transactionskeleton/>
        </div>
    }

    return (
        <div className="w-full min-h-screen">
           <Appbar  ></Appbar>
           <Slide  />
        <div onClick={ close } className="w-full flex justify-center items-center">
        
            <section className="pt-22 w-full max-w-full bg-gray-100 flex  flex-col gap-7 p-5 ">
                    <div className="h-2/12 grid sm:grid-cols-2 lg:grid-cols-4 gap-10 relative ">
                            <div className="flex flex-col bg-white w-x h-17 shadow-sm shadow-purple-200 rounded-md  justify-center items-center ">
                                <div className="text-blue-500 tracking-wider ">
                                    ₹{data.income} 
                                </div>
                                <span>
                                    income
                                </span>
                            </div>
                        <div className="flex flex-col bg-white w-x h-17 shadow-sm shadow-purple-200 rounded-md  justify-center items-center ">
                             <div className="tracking-wider text-blue-500">₹{data.expense}</div>
                            <span>expence</span>
                        </div>
                        <div className="flex flex-col bg-white w-x h-17 shadow-sm shadow-purple-200 rounded-md  justify-center items-center ">
                             <div className="tracking-wider text-blue-500">₹{data.balance}</div>
                            <span>balance</span>
                        </div>
                        <div className="flex flex-col bg-white w-x h-17 shadow-sm shadow-purple-200 rounded-md  justify-center items-center ">
                            <div className="tracking-wider text-blue-500">14</div>
                            <span>Transactions</span>
                        </div>
                    </div>

                    <div className="h-[450px] w-full max-w-full bg-white rounded-md flex justify-center relative z-0">
                        <GridItems>
                            <LineChartcomponent/>
                        </GridItems>
                    </div>

                    <div className="  grid grid-cols-1 gap-2 lg:grid-cols-2">
                    <div className="w-full h-96 ">
                        <GridItems>
                        <PieChartcomponent/>
                        </GridItems>

                    </div>
                    <div className="w-full h-96">

                        <GridItems>
                            <BarChartComponent/>
                        </GridItems>
                    </div>
                    </div>
            </section>
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


function GridItems({children}){
    return (
        <div className="  bg-white rounded-xl h-full w-full flex justify-center items-center ">
            {children}
        </div>
    )
}