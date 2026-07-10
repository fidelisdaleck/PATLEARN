"use client"

import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = "", ...props }: InputProps) {
    return (
        <div className="space-y-2">
            <input 
                className={`border border-[#444444] p-2 w-full rounded-lg focus:ring-2 focus:ring-green-600 focus:border-none outline-none ${className}`}
                {...props}
            />
        </div>
    );
}
