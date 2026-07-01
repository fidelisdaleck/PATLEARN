"use client";

interface OptionCardProps {
  text: string;
  selected: boolean;
  onClick: () => void;
}

export default function OptionCard({
  text,
  selected,
  onClick,
}: OptionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        rounded-2xl
        border-2
        px-6
        py-5
        text-center
        text-lg
        font-medium
        transition-all
        duration-200

        ${
          selected
            ? "border-green-600 bg-green-50 text-green-700"
            : "border-slate-200 bg-white hover:border-green-400 hover:bg-green-50"
        }
      `}
    >
      {text}
    </button>
  );
}