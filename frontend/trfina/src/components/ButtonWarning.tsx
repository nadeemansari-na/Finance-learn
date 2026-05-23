import { Link } from "react-router-dom"

interface btnwarn{
    label:string,
    buttontext:string,
    to:string
}
export function ButtonWarning({label,buttontext , to}:btnwarn){
    return <div className="ml-8">
        <div className="dark:text-gray-400">
            {label}
            
        <Link className="text-blue-200 cursor-pointer " to={to}> {buttontext}</Link>
        </div>
    </div>
}