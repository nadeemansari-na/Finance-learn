import { Heading } from "../components/Heading"
import { Inputbox } from "../components/Inputbox"
import { Subheading } from "../components/Subheading"
import { Buttonbox } from "../components/Buttonbox"
import { useState } from "react"
import axios from 'axios'
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { ButtonWarning } from "../components/ButtonWarning"
import { useNavigate } from "react-router-dom"
import type { Check } from "@codingwith/common-app";
import { Backend } from "./Backend"

export const Signup = () => {
    const navigate = useNavigate();

    const [postinputs, setpostinputs] = useState<Check>({
        email: "",
        password: ""
    })

        const  submit=async () => {
            try{
                    const result = await axios.post(`${Backend}/api/v1/userrouter/signup`, postinputs)
                    console.log("msg:" + result.data.msg)
                    if (result.data.msg == "user created successfully") {
                        localStorage.setItem("token", result.data.token)
                        localStorage.setItem("user", result.data.email)
                        navigate('/landing')
                    }
                    else alert("your credential are wrong")
                }catch(e){
                    console.log(e)
                }
            }
            
            console.log("import ",import.meta.env)
    // if(!localStorage.getItem("token") || localStorage.getItem(" ")){
    return <div className=" flex justify-center items-center ">
        <div className="w-lvw h-screen flex justify-center items-center bg-white rounded-2xl shadow-amber-400 md:w-dvw">
            <div className="flex flex-col  p-7 gap-4">
                <Heading label={"Sign up"}></Heading>
                <Subheading label={"Enter your name, email and password"}></Subheading>
                <Inputbox  placeholder={"Nadeem"} label={"Name"}></Inputbox>

                <Inputbox onchange={(e) => {
                    setpostinputs({
                        ...postinputs,
                        email: e.target.value
                    })
                }} placeholder={"nadeemans@gmail.com"} label={"Email"}></Inputbox>
                <Inputbox onchange={(e) => {
                    setpostinputs({
                        ...postinputs,
                        password: e.target.value
                    })
                }} placeholder={"Minimum 7 character"} type={"password"} label={"Password"}></Inputbox>

                <Buttonbox label={"Sign up"} onclick={submit}></Buttonbox>
                <ButtonWarning label={"Already have an account?"} buttontext={"Sign in"} to={"/signin"} ></ButtonWarning>
            </div>
        </div>

        <div className="bg-linear-to-br from-blue-100 via-purple-100 to-indigo-300 hidden  h-lvh lg:flex flex-col items-center justify-center md:w-dvw gap-6">
            <div className="text-3xl font-bold tracking-wider  ">Notenext</div>
            <div className="text-center w-xl text-black font-semibold leading-8 tracking-wide text-2xl">
                “Share your thoughts, stories, and ideas with the world.
                Start writing today and build your own space on the internet.”
            </div>

            <p className="text-gray-800 font-semibold relative right-45 top-4 text-xl">Nadeem Ansari</p>
            <div className="flex gap-5 text-2xl relative right-45 ">
                <a href=""><FaGithub className="text-black text-3xl hover:cursor-pointer" /></a>
                <a href="https://www.linkedin.com/in/nadeem-ansari-81a71336a"><FaLinkedin className="text-black text-3xl hover:text-blue-800 cursor-pointer" /></a>
                <a href="https://x.com/AnsariNadeem899?t=hwn-lF--Ij5zxKcMt3_lcw&s=08" ><FaTwitter className="text-black text-3xl hover:text-sky-700 cursor-pointer" /></a>
            </div>
        </div>

    </div>

}

