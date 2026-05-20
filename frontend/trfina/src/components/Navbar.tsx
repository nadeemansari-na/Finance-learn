import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

import { Logout } from './Delete'
import { Open } from '../svg/Open'
import { Searchicon } from '../svg/Search';
import { useSidebar } from '../context/sidebarContext';
import { useToggle } from '../context/toggle';
import { Avatar } from './Appbar';

export interface AppbarProps {
  search:string;
  setsearch:React.Dispatch<React.SetStateAction<string>>;
};


export const Navbar = ({search,setsearch}:AppbarProps) => {
  const {open}=useSidebar()
  const {isToggle,toggleTheme}=useToggle()

  return <div
  className="
    fixed top-0 right-0 z-50
    w-full h-16

    flex items-center justify-between
    gap-3 sm:gap-5

    px-4 sm:px-6 lg:px-8

    bg-white/90 dark:bg-gray-900/90
    backdrop-blur-md

    border-b border-gray-200 dark:border-gray-800

    shadow-sm shadow-black/5 dark:shadow-black/20

    transition-all duration-300
  "
>

  {/* Left */}
  <div className="flex items-center gap-3 shrink-0">

    {/* Sidebar Toggle */}
    <button
      onClick={open}
      className="
        w-10 h-10
        flex items-center justify-center

        rounded-xl

        hover:bg-gray-100
        dark:hover:bg-gray-800

        transition-colors duration-200
      "
    >
      <Open />
    </button>

    {/* Title */}
    <div className="flex flex-col">

      <h1
        className="
          text-base sm:text-lg
          font-semibold
          tracking-wide

          text-gray-800 dark:text-white
        "
      >
        Transactions
      </h1>

      <span
        className="
          hidden sm:block
          text-xs
          text-gray-500 dark:text-gray-400
        "
      >
        Manage your financial activity
      </span>

    </div>

  </div>

  {/* Search */}
  <div className="relative flex-1 max-w-xl">

    {/* Search Icon */}
    <div
      className="
        absolute left-3 top-1/2
        -translate-y-1/2

        text-gray-400 dark:text-gray-500
      "
    >
      <Searchicon />
    </div>

    {/* Input */}
    <input
      type="text"
      placeholder="Search transactions..."
      value={search}
      onChange={(e) => setsearch(e.target.value)}
      className="
        w-full

        py-2 pl-10 pr-4

        rounded-2xl

        bg-gray-50 dark:bg-gray-800

        border border-gray-200 dark:border-gray-700

        text-sm text-gray-700 dark:text-white

        placeholder:text-gray-400 dark:placeholder:text-gray-500

        outline-none

        focus:ring-2 focus:ring-blue-500/40
        focus:border-blue-500

        transition-all duration-200
      "
    />

  </div>

  {/* Right */}
  <div className="flex items-center shrink-0">

    <Menu as="div" className="relative inline-block text-left">

        {/* Avatar Button */}
          <MenuButton
            className="
              cursor-pointer
              rounded-full
    
              ring-2 ring-transparent
              hover:ring-blue-500/40
    
              transition-all duration-200
            "
          >
            <Avatar name={localStorage.getItem("user") || ""} />
          </MenuButton>

      {/* Dropdown */}
      <MenuItems
        transition
        className="
          absolute right-0 mt-3 z-50
          w-60 origin-top-right

          rounded-2xl

          bg-white dark:bg-gray-900

          border border-gray-200 dark:border-gray-800

          shadow-xl shadow-black/10 dark:shadow-black/30

          overflow-hidden

          transition duration-200
          data-closed:scale-95
          data-closed:opacity-0
        "
      >

        {/* User */}
        <div
          className="
            px-4 py-3
            border-b border-gray-100 dark:border-gray-800
          "
        >

          <p
            className="
              text-xs uppercase tracking-wider
              text-gray-400
            "
          >
            Signed in as
          </p>

          <p
            className="
              mt-1 text-sm font-medium
              text-gray-800 dark:text-white
              truncate
            "
          >
            {localStorage.getItem("user")}
          </p>

        </div>

        {/* Menu List */}
        <div className="p-2">

          {/* Support */}
      {/* Theme */}
          <MenuItem>
            <button
              onClick={toggleTheme}
              className="
                w-full
                flex items-center gap-3

                px-3 py-2 rounded-xl

                text-sm text-left
                text-gray-700 dark:text-gray-200

                hover:bg-gray-100
                dark:hover:bg-gray-800

                transition-colors
                cursor-pointer
              "
            >
              {isToggle ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </MenuItem>

          {/* License */}
          <MenuItem>
            <a
              href="#"
              className="
                flex items-center gap-3
                px-3 py-2 rounded-xl

                text-sm
                text-gray-700 dark:text-gray-200

                hover:bg-gray-100
                dark:hover:bg-gray-800

                transition-colors
              "
            >
              📜 License
            </a>
          </MenuItem>

          {/* Logout */}
          <MenuItem>
            <div
              className="
                rounded-xl
                hover:bg-red-50
                dark:hover:bg-red-900/20

                transition-colors
              "
            >
              <Logout />
            </div>
          </MenuItem>

        </div>

      </MenuItems>

    </Menu>

  </div>

</div>
}





