import { Heading } from "../components/Heading"
import { Inputbox } from "../components/Inputbox"
import { Subheading } from "../components/Subheading"
import { Buttonbox } from "../components/Buttonbox"
import { useEffect, useState } from "react"
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

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            navigate('/landing')
        }

    }, [])
    const submit = async () => {
        try {
            const result = await axios.post(`${Backend}/api/v1/userrouter/signup`, postinputs)
            console.log("msg:" + result.data.msg)
            if (result.data.msg == "user created successfully") {
                localStorage.setItem("token", result.data.token)
                localStorage.setItem("user", result.data.email)
                navigate('/landing')
            }
            else alert("your credential are wrong")
        } catch (e) {
            console.log(e)
        }
    }

    console.log("import ", import.meta.env)

    return <div
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

        <Heading label={"Create Account"} />

        <div className="mt-2">
          <Subheading
            label={
              "Start managing your finances smarter and faster."
            }
          />
        </div>

      </div>

      {/* Form */}
      <div className="flex flex-col gap-5">

        {/* Name */}
        <Inputbox
          placeholder={"Nadeem"}
          label={"Name"}
        />

        {/* Email */}
        <Inputbox
          onchange={(e) => {
            setpostinputs({
              ...postinputs,
              email: e.target.value,
            });
          }}
          placeholder={"nadeemans@gmail.com"}
          label={"Email"}
        />

        {/* Password */}
        <Inputbox
          onchange={(e) => {
            setpostinputs({
              ...postinputs,
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
            label={"Sign up"}
            onclick={submit}
          />
        </div>

        {/* Warning */}
        <div className="pt-2">
          <ButtonWarning
            label={"Already have an account?"}
            buttontext={"Sign in"}
            to={"/signin"}
          />
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

