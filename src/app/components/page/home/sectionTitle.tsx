import React from 'react'

const SectionTitle = ({
    children,
    className
}: any) => {
    return (
        <div className={`relative w-10/12 mx-auto md:mx-0 md:w-5/12 ${className}`}>
            <h2 className="text-5xl md:text-6xl mb-2 text-white italic tracking-tight  ">
                {children}
            </h2>
            <hr className=" w-auto text-red-300 border-1 md:border-3 border-yellow-400 relative bottom-4 " />
        </div>
    )
}

export default SectionTitle