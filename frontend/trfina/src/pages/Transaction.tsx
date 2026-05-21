import { useState } from "react"
import { useexpense } from "../hook/Expense"
import { Removebtm } from "../components/Removetrs"
import { Slide } from "../components/Slidebar"
import { Topupbar } from "../components/Topupbar"
import { Navbar } from "../components/Navbar"
import { useOpen } from "../context/createcontext"
import { useSidebar } from "../context/sidebarContext"
import { Transactionskeleton } from "../components/Transactionskeleton"
import { CategoryProvider } from "../context/categoryId"
// import {EmptySet} from "@boxicons/react"

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
                  <Navbar search={search} setsearch={setsearch} />
              </div>
              {/* <div className="flex justify-center items-center pt-60 ">
              <div className="w-2/3  h-50 sm:h-70  shadow-sm flex flex-col justify-center gap-2 items-center shadow-blue-200 ">
                <div className="w-15 h-15 rounded-full bg-gray-100 flex justify-center items-center">
                <EmptySet className=" text-blue-500 h-10 w-10"/>
                </div>
                <div className="text-gray-600">
                  No recent transactions
                </div>
              </div>

              </div> */}
              <Transactionskeleton/>
          </div>
      }

  return (
    <CategoryProvider>
    <div
  className="
    w-full min-h-screen

    bg-linear-to-br
    from-gray-50
    via-blue-50
    to-cyan-50

    dark:from-gray-950
    dark:via-gray-900
    dark:to-gray-950

    transition-colors duration-300
  "
>

  {/* Navbar */}
  <Navbar search={search} setsearch={setsearch} />

  {/* Sidebar */}
  <Slide />

  {/* Create Transaction Modal */}
  <Topupbar />

  {/* Main Content */}
  <div
    onClick={close}
    className="
      flex flex-col gap-5

      p-4 sm:p-5 sm:pt-24 lg:p-6 lg:pt-24

      pt-24

      transition-all duration-300
    "
  >

    {/* Header */}
    <div className="flex items-center justify-between">

      <div>

        <h1
          className="
            text-xl sm:text-2xl
            font-bold

            text-gray-800 dark:text-white
          "
        >
          Transactions
        </h1>

        <p
          className="
            text-sm mt-1
            text-gray-500 dark:text-gray-400
          "
        >
          Manage and track your financial activity
        </p>

      </div>

      {/* Count */}
      <div
        className="
          hidden sm:flex

          items-center justify-center

          px-4 py-2

          rounded-2xl

          bg-white dark:bg-gray-900

          border border-gray-200 dark:border-gray-800

          shadow-sm shadow-black/5 dark:shadow-black/20
        "
      >

        <span
          className="
            text-sm font-medium
            text-gray-700 dark:text-gray-300
          "
        >
          {filterdata.length} Transactions
        </span>

      </div>

    </div>

    {/* Transaction List */}
    <div
      className="
        w-full

        bg-white dark:bg-gray-900

        rounded-2xl

        border border-gray-200 dark:border-gray-800

        shadow-lg shadow-black/5 dark:shadow-black/20

        overflow-hidden
      "
    >

      {filterdata.map((e) => (

        <div
          key={e.id}
          className="
            flex items-center justify-between

            gap-3

            p-4

            border-b border-gray-100 dark:border-gray-800

            hover:bg-gray-50
            dark:hover:bg-gray-800/50

            transition-all duration-200
          "
        >

          {/* Left */}
          <div className="flex items-center gap-3 min-w-0">

            {/* Avatar */}
            <div
              className="
                w-11 h-11 shrink-0

                flex items-center justify-center

                rounded-full

                bg-blue-100 dark:bg-blue-900/30

                text-blue-600 dark:text-blue-400

                font-semibold capitalize
              "
            >
              {e.category.name.charAt(0)}
            </div>

            {/* Info */}
            <div className="min-w-0">

              <p
                className="
                  font-medium capitalize

                  text-gray-800 dark:text-white

                  truncate
                "
              >
                {e.category.name}
              </p>

              <div
                className="
                  flex flex-wrap items-center gap-2

                  text-xs
                  text-gray-500 dark:text-gray-400
                "
              >

                <span className="capitalize">
                  {e.type}
                </span>

                <span>•</span>

                <span>
                  {new Date(e.createAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>

              </div>

            </div>

          </div>

          {/* Right */}
          <div className="flex items-center gap-3 shrink-0">

            {/* Amount */}
            <div
              className={`
                text-sm sm:text-base
                font-semibold

                ${
                  e.type === "expense"
                    ? "text-red-500"
                    : "text-green-500"
                }
              `}
            >
              {e.type === "income" ? "+" : "-"}₹
              {e.amount}
            </div>

            {/* Delete */}
            <button
              onClick={() => handleClick(e.id)}
              className="
                px-3 py-2

                rounded-xl

                bg-linear-to-r
                from-red-500
                to-red-600

                text-white text-sm font-medium

                shadow-md shadow-red-500/20

                hover:scale-[1.03]

                active:scale-[0.97]

                transition-all duration-200

                cursor-pointer
              "
            >
              Delete
            </button>

          </div>

        </div>

      ))}

    </div>

    {/* Remove Modal */}
    {selectRemove && selectid && (
      <Removebtm id={selectid} setdata={setdata} />
    )}

    {/* Floating Add Button */}
    <button
      onClick={Open}
      className="
        fixed bottom-6 right-6 z-40

        w-14 h-14

        flex items-center justify-center

        rounded-full

        bg-linear-to-r
        from-cyan-500
        to-blue-600

        text-white text-3xl

        shadow-xl shadow-blue-500/30

        hover:scale-110

        active:scale-95

        transition-all duration-300
      "
    >
      +
    </button>

  </div>

</div>
    </CategoryProvider>
  )
}