
import { Link, useNavigate } from "react-router-dom";
import { useexpense } from "../hook/Expense"
import { useOpen } from "../context/createcontext";




export const BarChartComponent=()=>{
    const {data}=useexpense()
    const navigate=useNavigate()
    const {Open}=useOpen()
  
        console.log("final : "+{data})

        const sortedTransactions=[...data].sort((a,b)=> new Date(b.createAt).getTime() - new Date(a.createAt).getTime())
        const recentTransactions= sortedTransactions.slice(0,5);
 
  


    return (
     <div
  className="
    w-full h-105 sm:h-125

    rounded-2xl

    bg-white dark:bg-gray-900

    border border-gray-200 dark:border-gray-800

    shadow-lg shadow-black/5 dark:shadow-black/20

    p-4 sm:p-5

    flex flex-col
  "
>

  {/* Header */}
  <div className="flex items-center justify-between mb-5">

    <div>

      <h2
        className="
          text-lg sm:text-xl
          font-semibold

          text-gray-800 dark:text-white
        "
      >
        Recent Transactions
      </h2>

      <p
        className="
          text-sm

          text-gray-500 dark:text-gray-400
        "
      >
        Latest activity from your account
      </p>

    </div>

    <Link to={"/transaction"}>

      <button
        className="
          cursor-pointer

          text-sm font-medium

          text-blue-600 dark:text-blue-400

          hover:text-blue-700
          dark:hover:text-blue-300

          transition-colors
        "
      >
        View All →
      </button>

    </Link>

  </div>

  {/* Content */}
  <div className="flex-1 overflow-hidden">

    {recentTransactions.length === 0 ? (

      /* Empty State */
      <div
        className="
          w-full h-full

          flex flex-col
          items-center justify-center

          rounded-2xl

          border-2 border-dashed
          border-gray-200 dark:border-gray-800

          bg-gradient-to-br
          from-gray-50
          to-cyan-50

          dark:from-gray-900
          dark:to-gray-950

          relative overflow-hidden
        "
      >

        {/* Glow */}
        <div
          className="
            absolute

            w-52 h-52

            bg-cyan-400/10
            dark:bg-cyan-500/10

            rounded-full

            blur-3xl
          "
        />

        {/* Fake Transactions */}
        <div
          className="
            absolute bottom-8

            flex flex-col gap-3

            opacity-20
          "
        >

          <div className="w-56 h-10 rounded-xl bg-cyan-400" />
          <div className="w-44 h-10 rounded-xl bg-cyan-400" />
          <div className="w-52 h-10 rounded-xl bg-cyan-400" />

        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6">

          {/* Icon */}
          <div
            className="
              w-20 h-20 mx-auto mb-5

              flex items-center justify-center

              rounded-full

              bg-cyan-100 dark:bg-cyan-900/20

              text-4xl
            "
          >
            🧾
          </div>

          {/* Heading */}
          <h3
            className="
              text-lg sm:text-xl
              font-semibold

              text-gray-800 dark:text-white
            "
          >
            No transactions yet
          </h3>

          {/* Description */}
          <p
            className="
              mt-2

              text-sm sm:text-base

              text-gray-500 dark:text-gray-400

              max-w-md
            "
          >
            Your recent activity will appear here
            once you add income or expense transactions.
          </p>

          {/* CTA */}
          <button
            onClick={()=>{
              Open
              navigate("/transaction")
            }}
            className="
              mt-6

              px-5 py-3

              rounded-2xl

              bg-gradient-to-r
              from-cyan-500
              to-blue-500

              text-white font-medium

              shadow-lg shadow-cyan-500/20

              hover:scale-[1.03]

              active:scale-[0.97]

              transition-all duration-300
            "
          >
            + Add Transaction
          </button>

        </div>

      </div>

    ) : (

      /* Actual Transactions */
      <ul className="flex flex-col gap-3 overflow-y-auto pr-1">

        {recentTransactions.map((item) => (

          <li
            key={item.id}
            className="
              flex items-center justify-between

              gap-3

              p-3 sm:p-4

              rounded-xl

              bg-gray-50 dark:bg-gray-800/70

              hover:bg-gray-100
              dark:hover:bg-gray-800

              transition-all duration-300

              border border-transparent

              hover:border-gray-200
              dark:hover:border-gray-700
            "
          >

            {/* Left */}
            <div className="flex items-center gap-3 min-w-0">

              {/* Icon */}
              <div
                className={`
                  w-10 h-10 rounded-full

                  flex items-center justify-center

                  text-lg shrink-0

                  ${
                    item.type === "income"
                      ? "bg-green-100 dark:bg-green-900/30"
                      : "bg-red-100 dark:bg-red-900/30"
                  }
                `}
              >
                {item.type === "income" ? "💰" : "🛒"}
              </div>

              {/* Info */}
              <div className="min-w-0">

                <p
                  className="
                    text-sm sm:text-base
                    font-medium

                    text-gray-800 dark:text-white

                    truncate
                  "
                >
                  {item.category.name}
                </p>

                <p
                  className="
                    text-xs sm:text-sm

                    text-gray-500 dark:text-gray-400
                  "
                >
                  {new Date(item.createAt).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                    }
                  )}
                </p>

              </div>

            </div>

            {/* Amount */}
            <span
              className={`
                text-sm sm:text-base
                font-semibold
                shrink-0

                ${
                  item.type === "income"
                    ? "text-green-500"
                    : "text-red-500"
                }
              `}
            >
              {item.type === "income" ? "+" : "-"}₹
              {item.amount}
            </span>

          </li>

        ))}

      </ul>

    )}

  </div>

</div>
    )

  
}
