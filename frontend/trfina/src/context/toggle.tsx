// import { createContext,useContext,useState,type ReactNode } from "react";

// interface toggletype{
//     istoggle:boolean,
//     dark:()=>void,
//     light:()=>void
// }

// const TogglebarContext=createContext<toggletype | undefined>(undefined)

// export const ToggleProvider=({children}:{children:ReactNode})=>{
//     const [istoggle,setIsToggle] =useState(false)

//     const dark=()=> setIsToggle(true)
//     const light=()=> setIsToggle(false)

//     return (
//         <TogglebarContext.Provider value={{dark,light,istoggle}} >
//             {children}
//         </TogglebarContext.Provider>
//     )
// }

// export const useToggle=()=>{
//     const context=useContext(TogglebarContext)
//     if(!context){
//         throw new Error("useToggle must be use withing ToggleProvider")
//     }

//     return context;
// }

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

interface ToggleType {
    isToggle: boolean;
    dark: () => void;
    light: () => void;
    toggleTheme: () => void;
}

const TogglebarContext = createContext<ToggleType | undefined>(
    undefined
);

export const ToggleProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [isToggle, setIsToggle] = useState<boolean>(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        if (isToggle) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isToggle]);

    const dark = () => setIsToggle(true);

    const light = () => setIsToggle(false);

    const toggleTheme = () => {
        setIsToggle((prev) => !prev);
    };

    return (
        <TogglebarContext.Provider
            value={{
                isToggle,
                dark,
                light,
                toggleTheme,
            }}
        >
            {children}
        </TogglebarContext.Provider>
    );
};

export const useToggle = () => {
    const context = useContext(TogglebarContext);

    if (!context) {
        throw new Error(
            "useToggle must be used within ToggleProvider"
        );
    }

    return context;
};