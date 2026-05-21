import { useNavigate } from "react-router-dom"



    export function Logout(){
        const navigate=useNavigate();
        function handlelogout(){

            localStorage.removeItem("token")
            navigate('/')
        }
        return (
                <button onClick={handlelogout} className=" w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 data-focus:outline-hidden cursor-pointer">
                    Signout
                </button>
        )
    }