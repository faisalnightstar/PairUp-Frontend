import React from "react";

function Button({
    children,
    type = "button",
    bgColor,
    textColor,
    className = "",
    ...props
}) {
    return (
        <button
            className={`px-4 py-2 bg-slate-950 rounded-2xl cursor-pointer  ${bgColor} ${textColor} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
