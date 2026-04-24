import { useState } from "react"
import { Heading } from "../components/Heading"
import { Subheading } from "../components/Subheading"
import { Inputbox } from "../components/Inputbox"
import { Buttonbox } from "../components/Buttonbox"
import { useNavigate } from "react-router-dom"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import axios from "axios"
import type { Check } from "@codingwith/common-app"
import { Backend } from "./Backend"

export const Signin = () => {
    const navigate=useNavigate()
    const [postinput, setpostinput] = useState<Check>({
        email: "",
        password: ""
    })
  const  submit=async ()=>{
        try{
          const ret= await axios.get(`${Backend}/api/v1/userrouter/signin`,{
            params:{
              email:  postinput.email,
               password: postinput.password
            }
          }
          )
          console.log(ret.data)
          localStorage.setItem("token",ret.data.token)
          localStorage.setItem("user",ret.data.email)
          navigate('/landing')
                        
        }catch(e){
            alert('email or password is incorrect')
        }
    }
    
    return <div className=" flex justify-center items-center ">
        <div className="w-lvw h-screen flex justify-center items-center bg-white rounded-2xl shadow-amber-400 md:w-dvw">
            <div className="flex justify-center items-center bg-white rounded-2xl shadow-amber-400">
                <div className="flex flex-col  p-3 h-2/3 gap-3 sm:p-5 sm:h-3/4">
                    <Heading label={"Sign in"}></Heading>
                    <div className="mb-3 text-center w-44">
                        <Subheading label={"Enter your information to access your account"}></Subheading>

                    </div>
                    <Inputbox onchange={(e) => {
                        setpostinput({
                            ...postinput,
                            email: e.target.value
                        })
                    }} placeholder={"nadeemans@gmail.com"} label={"Email"}></Inputbox>
                    <Inputbox onchange={(e) => {
                        setpostinput({
                            ...postinput,
                            password: e.target.value
                        })
                    }} placeholder={"Minimum 7 character"} type={"password"} label={"Password"}></Inputbox>
                    <div className="mt-3 ">
                        <Buttonbox onclick={submit} label={"Sign in"}></Buttonbox>

                    </div>
                    <div ><p className="text-center text-gray-500">Cant have an account ? <a className="underline-offset-1 text-blue-500" href="/">Sign up</a></p></div>
                    <div>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-linear-to-br from-blue-200 via-purple-100 to-indigo-200 hidden  h-lvh lg:flex visible flex-col items-center justify-center md:w-dvw gap-6">
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