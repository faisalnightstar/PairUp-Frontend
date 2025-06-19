import React from "react";
import { useFormContext, Controller } from "react-hook-form";

const CheckBox = ({ label, name, options, className = "" }) => {
    const { control } = useFormContext();

    return (
        <div className="mt-4">
            {label && <label className="text-md font-roboto">{label}</label>}
            <div className="flex flex-row flex-wrap items-center justify-around ">
                {options.map((option) => (
                    <Controller
                        key={option.value}
                        name={name}
                        control={control}
                        defaultValue={[]} // Important: Initialize as an empty array
                        render={({ field: { onChange, value } }) => (
                            <label className={`m-2 text-xs`}>
                                <input
                                    className={`m-2 text-button-color  accent-button-color ${className}`}
                                    type="checkbox"
                                    value={option.value}
                                    checked={value.includes(option.value)}
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        if (checked) {
                                            onChange([...value, option.value]);
                                        } else {
                                            onChange(
                                                value.filter(
                                                    (val) =>
                                                        val !== option.value
                                                )
                                            );
                                        }
                                    }}
                                />
                                {option.label}
                            </label>
                        )}
                    />
                ))}
            </div>
        </div>
    );
};

export default CheckBox;
