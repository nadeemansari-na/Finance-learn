import type { ChangeEvent } from "react"

interface labbeledinputtype {
    placeholder:string,
    label:string,
    onchange?:(e:ChangeEvent<HTMLInputElement>)=>void;
    type?:string
}

export function Inputbox({placeholder, label, onchange ,type }:labbeledinputtype){
    return <div className="pt-2">
        <div className="text-black font-semibold">{label}</div>
        <input  onChange={onchange} className="text-shadow-gray-200 mt-2 border-blue-600 pl-2 rounded-1 w-78 bg-gray-50" type={type ||"text"} placeholder={placeholder} />
    </div>
}