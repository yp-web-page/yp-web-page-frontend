import React from "react";

interface SplitScreenProps {
    leftImage: string;
    leftImageAlt: string;  
    leftImageClassName?: string;
    rightContent: React.ReactElement;
}

const SplitScreen: React.FC<SplitScreenProps> = ({
    leftImage, 
    leftImageAlt, 
    leftImageClassName = "hidden md:flex md:w-1/2 bg-cover bg-center bg-gradient-to-b from-[#4da0ff] to-[#002f7f] justify-center items-center", 
    rightContent
}) => {
    return (
        <>
            <div className="min-h-screen flex flex-col md:flex-row">
                {/* Left Image Section */}
                <div
                    className={leftImageClassName}
                    style={{ backgroundImage: `url(${leftImage})` }}
                >
                    <img src={leftImage} alt={leftImageAlt} className="object-cover w-full h-full" />
                </div>

                {/* Right Content Section */}
                <div className="flex-1 flex flex-col justify-center items-center p-8 bg-indigo-50">
                    {rightContent}
                </div>
            </div>
        </>
    );
};

export default SplitScreen;