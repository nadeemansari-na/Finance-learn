import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { Logout } from './Delete'
import { Open } from '../svg/Open'
import { useSidebar } from '../context/sidebarContext';

export interface AppbarProps {
  isopen: boolean;
  setisopen: React.Dispatch<React.SetStateAction<boolean>>;
};


export const Appbar = () => {
  const {open}=useSidebar()
 

  return <div className="h-16 flex justify-between pr-8 pl-8   p-4  border-b-2 border-slate-200 fixed z-50 top-0 right-0  duration-300  w-full bg-white ">
    <div className='flex  justify-center items-center gap-2'>

      <button onClick={open}  className=' items-center '>
         <Open/>
      </button>
      <div className="text-blue-600 from-purple-400 to-purple-500  ">
        Dashboard
      </div>
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

