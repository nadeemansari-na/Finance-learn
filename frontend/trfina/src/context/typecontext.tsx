import React, { createContext } from "react";

interface incomeorexpensetype{
    typee:string;
    settypee:React.Dispatch<React.SetStateAction<string>>
}

export const InCatContext=createContext<incomeorexpensetype | null >(null)