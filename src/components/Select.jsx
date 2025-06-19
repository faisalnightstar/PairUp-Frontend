import { useId } from "react";
import React from "react";

const Select = ({ options, label, classname, ...props }, ref) => {
    const id = useId();
    return (
        <div className="w-full">
            {label && (
                <label className="inline-block mb-1 pl-1" htmlFor={id}>
                    {label}
                </label>
            )}
            <select
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-200 duration-200 border border-gray-200 w-full ${classname}`}
                ref={ref}
                {...props}
                id={id}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default React.forwardRef(Select);
