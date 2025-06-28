import React from "react"

interface LoadingErrorProps {
    error: string | null
}

const LoadingError: React.FC<LoadingErrorProps> = ({error}: LoadingErrorProps) => {
    return (
        <div className="flex justify-center items-center w-screen bg-white">
            <p className="text-red-700">Error: {error}</p>
        </div>
    )
}

export default LoadingError