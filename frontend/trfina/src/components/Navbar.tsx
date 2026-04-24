import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

import { Logout } from './Delete'
import { Open } from '../svg/Open'
import { Searchicon } from '../svg/Search';
import { useSidebar } from '../context/sidebarContext';

export interface AppbarProps {
  search:string;
  setsearch:React.Dispatch<React.SetStateAction<string>>;
};


export const Navbar = ({search,setsearch}:AppbarProps) => {
  const {open}=useSidebar()
  

  return <div className="h-16 flex justify-between items-center pr-8 pl-8 gap-4   p-4  border-b-2 border-slate-200 fixed z-50 top-0 right-0  duration-300  w-full bg-white ">
    <div className='flex  justify-center items-center gap-2'>

      <button onClick={open}  className=' items-center '>
         <Open/>
      </button>
      <div className="text-semibold text-gray-800  ">
        Transactions
      </div>
    </div>

     <div className="relative w-full">

        {/*  Icon */}
        <Searchicon/>

        {/*  Input */}
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={e => setsearch(e.target.value)}
          className={` w-full bg-white border border-gray-300 text-gray-700  p-1.5 sm:p-2 sm:pl-10 pl-10 rounded-3xl outline-none focus:ring-2 focus:ring-blue-400 `}
        />

      </div>

    <div className="flex gap-4  items-center">
     
      <Menu as="div" className="relative inline-block">
        <MenuButton className="cursor-pointer">
          <Avatar name={"nadeem"} />

        </MenuButton>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
          <div className="py-1">
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              >
                {localStorage.getItem("user")}
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href="/"
                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              >
                Support
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              >
                License
              </a>
            </MenuItem>

            <MenuItem>
              <Logout />
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </div>
  </div>
}



export function Avatar({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-4 h-4 p-4 overflow-hidden bg-cyan-500 rounded-full text-black font-extrabold text-shadow-2xs text-shadow-blue-300 ">
      <span className="font-medium text-body">{name[0]}</span>
    </div>
  )
}

