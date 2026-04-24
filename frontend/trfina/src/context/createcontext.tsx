import { createContext,useContext,useState,type ReactNode } from "react";


interface OpenContexttype{
    issopen:boolean;
    Open:()=> void;
    close:()=> void;

}

export const OpenContext=createContext<OpenContexttype | undefined>(undefined)

export const BottomListProvider=({children}:{children:ReactNode})=>{
    const [issopen,setIssOpen]=useState(false)

    const Open=()=> setIssOpen(true);
    const close=()=> setIssOpen(false);


    return (
        <OpenContext.Provider value={{Open,close,issopen}}>
        {children}
        </OpenContext.Provider>
    )
}


export const useOpen=()=>{
    const context=useContext(OpenContext)
    if(!context){
        throw new Error('useOpen must be use withing Open Provider')
    }

    return context
}