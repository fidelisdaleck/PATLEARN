"use client"

import {ReactNode} from "react"

interface cardiconProps{
    icon: ReactNode
    description: string
}

export default function Cardicon({icon, description}: cardiconProps){
    return(
         <div className="p-6 bg-[#1e7f4310] md:hover:bg-[#1e7f4310] rounded-2xl hover:shadow-xl transition">
            <div className="text-center text-[#F1C40F]">
                {icon}
            </div>
            <p className="text-gray-600 mt-2">{description}</p>
        </div>
    )
}