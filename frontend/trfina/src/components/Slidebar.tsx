import { useNavigate } from "react-router-dom"
import { Close } from "../svg/Close"
import { Avatar} from "./Appbar"
import { useSidebar } from "../context/sidebarContext"
import { useOpen } from "../context/createcontext"



export const Slide=()=>{
    const navigate=useNavigate()
    const {isOpen,close}=useSidebar()
    const {Open}=useOpen()
    const change=()=>{
        navigate("/transaction")
    }
    return (
       <div>

  {/* Overlay */}
  {isOpen && (
    <div
      onClick={close}
      className="
        fixed inset-0 z-40
        bg-black/40
        backdrop-blur-[2px]
        lg:hidden
      "
    />
  )}

  <section
    onClick={(e) => e.stopPropagation()}
    className={`
      w-80 max-w-full

      fixed top-0 left-0 z-50

      h-screen

      px-5 py-6

      flex flex-col
      gap-10

      bg-white dark:bg-gray-900

      border-r border-gray-200 dark:border-gray-800

      shadow-2xl shadow-black/10 dark:shadow-black/30

      transform transition-transform duration-300

      ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}
  >

    {/* Top */}
    <div className="flex items-center justify-between">

      {/* Logo */}
      <div>

        <h1
          className="
            text-xl font-bold
            tracking-wide

            text-blue-600 dark:text-white
          "
        >
          Expense Tracker
        </h1>

        <p
          className="
            text-xs mt-1
            text-gray-500 dark:text-gray-400
          "
        >
          Personal Finance Dashboard
        </p>

      </div>

      {/* Close */}
      <Close  />

    </div>

    {/* Profile */}
    <div
      className="
        flex flex-col items-center

        p-5 rounded-2xl

        bg-gray-50 dark:bg-gray-800/70

        border border-gray-100 dark:border-gray-800
      "
    >

      <div className="mb-3">
        <Avatar name="nadeem" />
      </div>

      <h2
        className="
          text-base font-semibold
          text-gray-800 dark:text-white
        "
      >
        Nadeem Ansari
      </h2>

      <p
        className="
          text-sm mt-1
          text-gray-500 dark:text-gray-400
        "
      >
        Welcome back 👋
      </p>

    </div>

    {/* Navigation */}
    <div className="flex flex-col gap-3">

      {/* Dashboard */}
      <button
        onClick={() => {
          navigate("/landing");
          close();
        }}
        className="
          flex items-center gap-3

          px-4 py-3
          cursor-pointer
          rounded-2xl

          bg-linear-to-r
          from-purple-500
          via-purple-600
          to-purple-700

          text-white font-medium

          shadow-lg shadow-purple-500/20

          hover:scale-[1.02]

          active:scale-[0.98]

          transition-all duration-300
        "
      >
        📊 Dashboard
      </button>

      {/* Transactions */}
      <button
        onClick={() => {
          change();
          close();
        }}
        className="
          flex items-center gap-3
          cursor-pointer
          px-4 py-3

          rounded-2xl

          bg-gray-100 dark:bg-gray-800

          text-gray-700 dark:text-gray-200

          hover:bg-purple-50
          dark:hover:bg-gray-700

          hover:text-purple-600
          dark:hover:text-purple-400

          transition-all duration-300
        "
      >
        💸 Transactions
      </button>

      {/* Categories */}
      <button
        onClick={()=>{
          change()
          close()
          Open()
        }}

        className="
          flex items-center gap-3
          cursor-pointer
          px-4 py-3

          rounded-2xl

          bg-gray-100 dark:bg-gray-800

          text-gray-700 dark:text-gray-200

          hover:bg-purple-50
          dark:hover:bg-gray-700

          hover:text-purple-600
          dark:hover:text-purple-400

          transition-all duration-300
        "
      >
        🗂 Categories
      </button>

    </div>

    {/* Bottom Card */}
    <div
      className="
        mt-auto

        p-4 rounded-2xl

        bg-blue-50 dark:bg-blue-900/20

        border border-blue-100 dark:border-blue-900/30
      "
    >

      <p
        className="
          text-sm font-medium
          text-blue-700 dark:text-blue-300
        "
      >
        Track smarter 💡
      </p>

      <p
        className="
          text-xs mt-1
          text-blue-500 dark:text-blue-400
        "
      >
        Manage your expenses efficiently.
      </p>

    </div>

  </section>

</div>
    )
}