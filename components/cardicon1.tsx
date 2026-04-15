"use client"

import {ReactNode} from "react"

interface cardicon1Props{
    icon: ReactNode
    description: string
}

export default function Cardicon1({icon, description}: cardicon1Props){
    return(
         <div className="p-8 hover:bg-[#1e7f4310]  rounded-2xl shadow-xl transition">
            <div className="text-[#F1C40F]">
                {icon}
            </div>
            <p className="text-gray-600 mt-2">{description}</p>
        </div>
    )
}