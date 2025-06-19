import React, { forwardRef, useId } from "react";

const Input = ({ label, type = "text", className = "", ...props }, ref) => {
    const id = useId();
    return (
        <div className="w-full">
            {label && (
                <label
                    className="inline-block justify-start text-start mb-1 pl-1"
                    htmlFor={id}
                >
                    {label}
                </label>
            )}

            <input
                type={type}
                className={`mt-1 block w-full pl-10 px-3 py-2 border-b-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom focus:border-button-color sm:text-sm ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    );
};

export default forwardRef(Input);
