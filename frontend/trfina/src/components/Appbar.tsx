import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Logout } from './Delete'
import { Open } from '../svg/Open'
import { useSidebar } from '../context/sidebarContext';
import { useToggle } from '../context/toggle';

export interface AppbarProps {
  isopen: boolean;
  setisopen: React.Dispatch<React.SetStateAction<boolean>>;
};


export const Appbar = () => {
  const {open}=useSidebar()
  const {isToggle,toggleTheme}=useToggle()

  return <div
  className="
    fixed top-0 right-0 z-50
    w-full h-16
    px-4 sm:px-6 lg:px-8
    flex items-center justify-between

    bg-white/90 dark:bg-gray-900/90
    backdrop-blur-md

    border-b border-gray-200 dark:border-gray-800

    shadow-sm shadow-black/5 dark:shadow-black/20

    transition-all duration-300
  "
>

  {/* Left */}
  <div className="flex items-center gap-3">

    {/* Sidebar Toggle */}
    <button
      onClick={open}
      className="
        flex items-center justify-center

        w-10 h-10 rounded-xl

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
        Dashboard
      </h1>

      <span
        className="
          hidden sm:block
          text-xs
          text-gray-500 dark:text-gray-400
        "
      >
        Finance Overview
      </span>

    </div>

  </div>

  {/* Right */}
  <div className="flex items-center gap-4">

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
          <MenuItem>
            <a
              href="/"
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
              💬 Support
            </a>
          </MenuItem>

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



export function Avatar({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-4 h-4 p-4 overflow-hidden bg-cyan-500 dark:bg-white rounded-full text-black font-extrabold text-shadow-2xs text-shadow-blue-300 ">
      <span className="font-medium text-body">{name[0].toUpperCase()}</span>
    </div>
  )
}

