"use client"

interface Inputprops{
    type?:string;
    placeholder?:string;
}

export default function Input({type = "text", placeholder}: Inputprops){
    return(
        <div className="space-y-2">
            <input 
                type={type}
                placeholder={placeholder}
                className="border border-[#444444] p-2 w-full rounded-lg focus:ring-2 focus:ring-green-600 focus:border-none outline-none" 
            />
        </div>
    )
}