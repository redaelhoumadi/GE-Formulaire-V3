import Image from "next/image";
import { ReactNode, useState } from 'react';
import { useRef, useEffect } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { getCityData } from "@/helpers/city-data";
import { getAddressData } from "@/helpers/address-data";
import GreenCheck from "@public/images/components/GreenCheck.svg";
import AutoCompleteListInput from "./list";

interface AutoCompleteInputProps {
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
     * React-hook-form registration
     */
    register?: any;
    /**
     * React-hook-form control
    */
    control: Control<any>;
    /**
 * input max length
 */
    maxLength?: number;
    /**
* Button validated
*/
    validated?: boolean;
    /**
* Input placeholder
*/
    placeholder?: string;
    /**
 * Button invalid
 */
    invalid?: boolean;
    /**
     * Research type
     */
    researchType?: 'city' | 'address';
}

// 'ring-blue-600'
export default function AutoCompleteInputInput(props: AutoCompleteInputProps) {
    const { required, invalid, control, validated, maxLength, label, fullWidth, researchType = 'city', onClick = () => { }, name } = props;
    const fullWidthProp = fullWidth ? 'w-full' : '';
    let classNameProps = 'border border-ge-gray-3 text-ge-gray-1 text-xs: text-base focus:ring-ge-gray-1 focus:border-ge-gray-1 rounded-md';
    classNameProps = invalid ? 'border border-ge-red text-ge-gray-1 text-xs: text-base focus:ring-ge-gray-1 focus:border-ge-gray-1 rounded-md' : classNameProps;

    const researchFunction = researchType == 'city' ? getCityData : getAddressData;
    const inputRef = useRef<HTMLInputElement>(null);
    const [toggle, setToggle] = useState(false);
    const [internalValue, setInternalValue] = useState<string>('');
    const [data, setData] = useState<string[]>([]);
    const switchToggle = () => {
        setToggle(!toggle);
        onClick();
    };

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


    function debounce(fn: any, delay: any) {
        let timeoutId: any;
        return (...args: any) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn(...args), delay);
        };
    }

    const refreshResearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== "" || e.target.value !== null) {
            const text = e.target.value;
            const dataRes: string[] = await researchFunction(text);
            setData(dataRes);
        }
    }

    const debouncedFunction = debounce(refreshResearch, 1000);

    return (
        <div className="relative my-3 w-full group" ref={inputRef}>
            {(validated && internalValue != '') && <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
                <Image
                    className="w-4 h-4 text-gray-500"
                    priority
                    src={GreenCheck}
                    alt="Champ valide"
                />
            </div>
            }
            <Controller
                control={control}
                name={name}
                render={({ field: { value, onChange, onBlur }, fieldState: { invalid, isDirty, isTouched } }) => {
                    return (<>
                        <input
                            maxLength={maxLength}
                            type="text"
                            id={name}
                            value={value}
                            className={`pr-10 pt-4 pb-1 block py-2.5 appearance-none bg-transparent peer p-2.5 ${classNameProps} ${fullWidthProp}`}
                            placeholder=" "
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                onChange(e);
                                debouncedFunction(e);
                            }}
                            onBlur={() => {
                                setInternalValue(value);
                                onBlur();
                            }}
                            onClick={switchToggle}
                            required={required} />
                        <AutoCompleteListInput toggle={toggle} values={data} onChange={
                            (element: any) => {
                                onChange(element);
                                switchToggle();
                            }} />
                    </>)
                }}
            />
            <label htmlFor={name} className="cursor-text absolute ml-3 text-sm text-ge-gray-1 duration-300 transform -translate-y-3 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                {label}
                {invalid && <span className="ml-2 text-xs text-ge-red font-medium">Champ invalide</span>}
            </label>
        </div>
    )
}