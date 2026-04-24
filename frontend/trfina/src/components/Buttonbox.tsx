interface buttonboxtype{
    label:string,
    onclick:(e: React.MouseEvent<HTMLButtonElement>)=>void
}


export function Buttonbox({label,onclick}:buttonboxtype) {
    return <div className="ml-2  ">
        <button onClick={onclick} className="bg-black rounded-md w-86 text-white text-center pb-1.5 pt-1  mt-3 shadow-md cursor-pointer font-bold">{label}</button>
    </div>
}

