import React from "react";

type LoadingSpinnerProps = {
    size?: number;   // px
    color?: string;  // tailwind color class
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 40,
    color = "border-indigo-500",
}) => {
    return (
        <div className="flex justify-center items-center h-full">
            <div
                className={`animate-spin  rounded-full border-4 border-t-transparent ${color}`}
                style={{ width: size, height: size }}
            />
        </div>

    );
};

export default LoadingSpinner;
