import type { ChangeEvent } from "react"

interface labbeledinputtype {
    placeholder:string,
    label:string,
    onchange?:(e:ChangeEvent<HTMLInputElement>)=>void;
    type?:string
}

export function Inputbox({placeholder, label, onchange ,type }:labbeledinputtype){
    return <div className="pt-2">
        <div className="text-black dark:text-white font-semibold">{label}</div>
        <input  onChange={onchange} className="text-shadow-gray-200 dark:text-shadow-white dark:bg-gray-900 mt-2 border-blue-600 dark:border dark:border-gray-800  dark:text-white  pl-2 rounded-1 w-78 bg-gray-50" type={type ||"text"} placeholder={placeholder} />
    </div>
}