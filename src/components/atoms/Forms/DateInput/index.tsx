import { ReactNode } from 'react';
import Image from 'next/image'
import GreenCheck from "@public/images/components/GreenCheck.svg";

import React, { useState } from "react";
import { Control, Controller } from 'react-hook-form';
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

const START_FROM = new Date();

interface DateInputProps {
    /**
     * Add particular classes
     */
    className?: string;
    /**
     * Input placeholder
     */
    placeholder?: string;
    /**
     * How large should the button be?
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Type of the button
     */
    type: 'text' | 'numeric' | 'email';
    /**
     * Button contents
     */
    fullWidth?: boolean;
    /*
    * Inside the button
    */
    label?: ReactNode;
    /**
     * Optional click handler
     */
    onClick?: () => void;
    /**
     * Validate a form
     */
    required?: boolean;
    /**
     * Button type
     */
    name: string;
    /**
     * Button validated
     */
    validated?: boolean;
    /**
     * Button invalid
     */
    invalid?: boolean;
    /**
     * React-hook-form registration
     */
    register?: any;
    /**
     * React-hook-form control
     */
    control: Control<any>;
}


export default function DateInput(props: DateInputProps) {
    const { control, invalid, label, className = '', name, validated = false } = props;
    let classNameProps = 'border border-ge-gray-3 text-ge-gray-1 text-sm md:text-base focus:ring-ge-gray-1 focus:border-ge-gray-1 rounded-md';
    classNameProps = invalid ? 'border border-ge-red text-ge-gray-1 text-sm md:text-base focus:ring-ge-gray-1 focus:border-ge-gray-1 rounded-md' : classNameProps;


    // gestion du scroll sur telephone
    document.addEventListener("scroll", function () {
        const activeElement = document.activeElement;
        if (activeElement instanceof HTMLElement) {
            const element = document.getElementById('dateInput');
            element?.blur();
        }
    });

    return (
        <div className={`${className} mb-6`} id="dateInput">
            <label htmlFor={name} className="block ml-4 mb-2 text-xs md:text-base font-bold text-ge-gray-1">
                {label}
                {invalid && <span className="ml-2 text-xs text-ge-red font-medium">Champ invalide</span>}
            </label>
            <div className="relative">

                {validated && <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
                    <Image
                        className="w-4 h-4 text-gray-500"
                        priority
                        src={GreenCheck}
                        alt="Green check"
                    />
                </div>
                }
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { value, onChange } }) => {
                        const _onChange = (value: DateValueType, e?: HTMLInputElement | null | undefined) => onChange(value?.startDate ?? null);
                        const _value = {
                            startDate: value ? new Date(value) : null,
                            endDate: value ? new Date(value) : null,
                        }
                        return (
                            <Datepicker
                                readOnly={true}
                                containerClassName="border border-ge-gray-3 text-ge-gray-1 text-md focus:ring-ge-gray-1 focus:border-ge-gray-1 rounded-md"
                                i18n={"fr"}
                                placeholder="Date souhaitée"
                                displayFormat="DD/MM/YYYY"
                                popoverDirection="up"
                                startFrom={START_FROM}
                                minDate={START_FROM}
                                useRange={false}
                                asSingle={true}
                                onChange={_onChange}
                                value={_value}
                            />
                        )
                    }}
                />
            </div>
        </div>
    )
}