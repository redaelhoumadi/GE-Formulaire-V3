import { ReactNode } from 'react';
import { CalendarDays } from 'lucide-react';

import React, { useState } from "react";
import { Control, Controller } from 'react-hook-form';
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

const START_FROM = new Date();

interface DateInputProps {
    className?: string;
    placeholder?: string;
    size?: 'small' | 'medium' | 'large';
    type: 'text' | 'numeric' | 'email';
    fullWidth?: boolean;
    label?: ReactNode;
    onClick?: () => void;
    required?: boolean;
    name: string;
    validated?: boolean;
    invalid?: boolean;
    register?: any;
    control: Control<any>;
}

export default function DateInput(props: DateInputProps) {
    const { control, invalid, label, className = '', name, validated = false } = props;

    // gestion du scroll sur téléphone
    if (typeof document !== 'undefined') {
        document.addEventListener("scroll", function () {
            const element = document.getElementById('dateInput');
            element?.blur();
        });
    }

    return (
        <div className={`${className} mb-5`} id="dateInput">
            {/* Label au-dessus */}
            {label && (
                <label
                    htmlFor={name}
                    className={`block ml-1 mb-2 text-xs font-medium ${invalid ? 'text-ge-red' : 'text-ge-gray-3'}`}
                >
                    {label}
                    {invalid && <span className="ml-1.5 text-xs text-ge-red font-semibold">— Invalide</span>}
                </label>
            )}

            {/* Champ avec icône intégrée à gauche */}
            <div className="relative">
                {/* Icône calendrier dans le champ */}
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                    <CalendarDays className={`w-4 h-4 ${invalid ? 'text-ge-red' : validated ? 'text-ge-green' : 'text-ge-gray-3'}`} />
                </div>

                <Controller
                    control={control}
                    name={name}
                    render={({ field: { value, onChange } }) => {
                        const _onChange = (value: DateValueType) => onChange(value?.startDate ?? null);
                        const _value = {
                            startDate: value ? new Date(value) : null,
                            endDate: value ? new Date(value) : null,
                        };
                        return (
                            <Datepicker
                                readOnly={true}
                                containerClassName={`
                                    border rounded-md text-ge-gray-1 text-sm
                                    transition-all duration-200
                                    ${invalid
                                        ? 'border-ge-red'
                                        : validated
                                        ? 'border-ge-green'
                                        : 'border-ge-gray-3 hover:border-ge-gray-2'
                                    }
                                `}
                                inputClassName="pl-9 pr-4 py-3 w-full bg-transparent outline-none text-sm text-ge-gray-1 placeholder:text-ge-gray-3 rounded-md cursor-pointer"
                                toggleClassName="hidden"
                                i18n={"fr"}
                                placeholder="Choisir une date"
                                displayFormat={"DD/MM/YYYY"}
                                popoverDirection="up"
                                startFrom={START_FROM}
                                minDate={START_FROM}
                                useRange={false}
                                asSingle={true}
                                onChange={_onChange}
                                value={_value}
                            />
                        );
                    }}
                />
            </div>
        </div>
    );
}
