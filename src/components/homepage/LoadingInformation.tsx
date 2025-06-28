import React from "react"

const LoadingInformation: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-white">
        <svg
            className="animate-spin h-10 w-10 text-black"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            fill="none"
            strokeWidth="4"
            />
            <path
            className="opacity-75"
            stroke="currentColor"
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="2, 4"
            d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"
            />
        </svg>
        </div>
    )
}

export default LoadingInformation