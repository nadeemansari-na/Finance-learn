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
    
    return<div
  className="
    min-h-screen

    flex flex-col lg:flex-row

    bg-linear-to-br
    from-gray-50
    via-blue-50
    to-cyan-50

    dark:from-gray-950
    dark:via-gray-900
    dark:to-gray-950
  "
>

  {/* Left Section */}
  <div
    className="
      flex-1

      flex items-center justify-center

      px-5 py-10 sm:px-8
    "
  >

    {/* Card */}
    <div
      className="
        w-full max-w-md

        bg-white dark:bg-gray-900

        rounded-3xl

        border border-gray-200 dark:border-gray-800

        shadow-2xl shadow-black/5 dark:shadow-black/20

        p-6 sm:p-8
      "
    >


      {/* Heading */}
      <div className="mb-6">

        <Heading label={"Welcome Back"} />

        <div className="mt-2">
          <Subheading
            label={
              "Sign in to continue managing your finances."
            }
          />
        </div>

      </div>

      {/* Form */}
      <div className="flex flex-col gap-5">

        {/* Email */}
        <Inputbox
          onchange={(e) => {
            setpostinput({
              ...postinput,
              email: e.target.value,
            });
          }}
          placeholder={"nadeemans@gmail.com"}
          label={"Email"}
        />

        {/* Password */}
        <Inputbox
          onchange={(e) => {
            setpostinput({
              ...postinput,
              password: e.target.value,
            });
          }}
          placeholder={"Minimum 7 character"}
          type={"password"}
          label={"Password"}
        />

        {/* Button */}
        <div className="pt-2">
          <Buttonbox
            onclick={submit}
            label={"Sign in"}
          />
        </div>

        {/* Footer */}
        <div className="pt-2">

          <p
            className="
              text-center

              text-sm

              text-gray-500 dark:text-gray-400
            "
          >
            Don’t have an account?{" "}

            <a
              className="
                text-cyan-600 dark:text-cyan-400

                hover:underline

                font-medium
              "
              href="/"
            >
              Sign up
            </a>

          </p>

        </div>

      </div>

    </div>

  </div>

  {/* Right Section */}
  <div
    className="
      hidden lg:flex

      flex-1

      relative overflow-hidden

      items-center justify-center

      bg-linear-to-br
      from-[#0f172a]
      via-[#111827]
      to-[#1e293b]
    "
  >

    {/* Glow Effects */}
    <div
      className="
        absolute top-10 left-10

        w-80 h-80

        bg-cyan-500/20

        rounded-full

        blur-3xl
      "
    />

    <div
      className="
        absolute bottom-10 right-10

        w-96 h-96

        bg-blue-500/20

        rounded-full

        blur-3xl
      "
    />

    <div
      className="
        absolute top-1/2 left-1/2
        -translate-x-1/2 -translate-y-1/2

        w-125 h-125

        bg-indigo-500/10

        rounded-full

        blur-3xl
      "
    />

    {/* Content */}
    <div
      className="
        relative z-10

        flex flex-col items-center

        text-center

        px-10
      "
    >

      {/* Brand */}
      <div
        className="
          text-5xl font-bold

          text-white

          tracking-wider
        "
      >
        Expense Tracker
      </div>

      {/* Description */}
      <div
        className="
          mt-8

          max-w-2xl

          text-gray-300

          font-medium

          leading-10

          text-3xl
        "
      >
        “Understand your spending habits,
        track every transaction,
        and build a smarter financial future.”
      </div>

      {/* User */}
      <p
        className="
          mt-10

          text-lg font-semibold

          text-cyan-300
        "
      >
        Nadeem Ansari
      </p>

      {/* Socials */}
      <div className="flex gap-6 mt-6">

        <a href="">
          <FaGithub
            className="
              text-white text-3xl

              hover:text-cyan-300
              hover:scale-110

              transition-all duration-200
            "
          />
        </a>

        <a href="https://www.linkedin.com/in/nadeem-ansari-81a71336a">
          <FaLinkedin
            className="
              text-white text-3xl

              hover:text-blue-400
              hover:scale-110

              transition-all duration-200
            "
          />
        </a>

        <a href="https://x.com/AnsariNadeem899?t=hwn-lF--Ij5zxKcMt3_lcw&s=08">
          <FaTwitter
            className="
              text-white text-3xl

              hover:text-sky-400
              hover:scale-110

              transition-all duration-200
            "
          />
        </a>

      </div>

    </div>

  </div>

</div>

}