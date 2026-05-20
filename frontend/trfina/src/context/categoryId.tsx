import { createContext, useContext, useState, type Dispatch, type ReactNode } from "react";

interface categorytype{
    categoryId:string;
    setCategoryId:Dispatch<React.SetStateAction<string>>;
}

export const ContextCategoryId=createContext<categorytype | "" >("")

export const CategoryProvider=({children}:{children:ReactNode})=>{
    const [categoryId,setCategoryId]=useState<string>("");

    return (
        <ContextCategoryId.Provider value={{categoryId,setCategoryId}}>
            {children}
        </ContextCategoryId.Provider>
    )
}

export const useCategory=()=>{
    const context=useContext(ContextCategoryId);
    if(!context){
        throw  new Error ("useCategory must be used withing the CategoryProvider");
    }

    return context;
}