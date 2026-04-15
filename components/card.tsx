"use client";

interface CardProps {
    title: string;
    description: string;
}

export default function Card({ title, description }: CardProps) {
    return(
        <div className="p-6 bg-gray-100 rounded-2xl shadow-md hover:shadow-xl transition">
            <h2 className="text-xl font-semibold ">{title}</h2>
            <p className="text-gray-600 mt-2">{description}</p>
        </div>
    )
}