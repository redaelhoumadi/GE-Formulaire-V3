"use client";
import { ReactNode, useState } from 'react';
import { useRef, useEffect } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

interface SelectProps {
    /**
     * Add particular classes
     */
    className?: string;
    /**
     * How large should the button be?
     */
    size?: 'small' | 'medium' | 'large';
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
     * Default value
     */
    defaultValue: string;
    /**
     * values
     */
    values: {
        label: string;
        value: string;
    }[];
    /**
     * React-hook-form registration
     */
    register?: any;
    /**
     * React-hook-form control
    */
    control: Control<any>;
}

// 'ring-blue-600'
export default function SelectInput(props: SelectProps) {
    const { control, label, onClick = () => { }, name, values } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const [filteredValues, setFilteredValues] = useState(values);
    const [toggle, setToggle] = useState(false);
    const switchToggle = () => setToggle(!toggle);

    const filterValues = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const searchValues = values.filter(elt => elt.label.includes(value.toUpperCase()));
        setFilteredValues(searchValues)
    }

    useEffect(() => {
        const handleOutSideClick = (event: any) => {
            if (!inputRef.current?.contains(event.target)) {
                setToggle(false);
            }
        };
        window.addEventListener("mousedown", handleOutSideClick);
        return () => {
            window.removeEventListener("mousedown", handleOutSideClick);
        };
    }, [inputRef]);

    return (
        <div className="mb-2">
            <label htmlFor={name} className="block ml-4 mb-2 text-xs md:text-base font-bold text-ge-gray-1">{label}</label>
            <Controller
                control={control}
                name={name}
                render={({ field: { value, onChange } }) => (
                    <div className="relative" ref={inputRef}>
                        <div className="w-full">
                            <div className="my-2 p-1 bg-white flex border border-ge-gray-3 rounded-md" onClick={switchToggle}>
                                <div className="flex flex-auto flex-wrap"></div>
                                <input
                                    placeholder="Recherche"
                                    className="p-2 px-2 appearance-none outline-none w-full text-gray-800"
                                    value={value}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        onChange(e);
                                        filterValues(e);
                                    }}
                                    onClick={switchToggle}
                                />
                                <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-ge-gray-3">
                                    <button type="button" className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`feather feather-chevron-up w-6 h-6 ${!toggle && 'rotate-180'}`}>
                                            <polyline points="18 15 12 9 6 15"></polyline>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {toggle && <ul className="max-h-[50vh] z-20 overflow-y-auto text-ge-gray-1 absolute mt-1 w-full bg-white ring-1 ring-gray-300 rounded-md">
                            {
                                filteredValues.map(element => <li key={`formInput${name}_${element.value}`} onClick={() => {
                                    onChange(element.value);
                                    switchToggle();
                                    onClick();
                                }} value={element.value} className="z-auto cursor-pointer select-none p-2 hover:bg-gray-200">{element.label}</li>)
                            }
                        </ul>
                        }
                    </div>
                )}
            />
        </div>
    )
}