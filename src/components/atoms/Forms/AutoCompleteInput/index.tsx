import { ReactNode, useState } from 'react';
import { useRef, useEffect } from 'react';
import { Control, Controller } from 'react-hook-form';
import { getCityData } from "@/helpers/city-data";
import { getAddressData } from "@/helpers/address-data";
import { MapPin, Navigation } from 'lucide-react';
import AutoCompleteListInput from "./list";

interface AutoCompleteInputProps {
    className?: string;
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
    label?: ReactNode;
    onClick?: () => void;
    required?: boolean;
    name: string;
    register?: any;
    control: Control<any>;
    maxLength?: number;
    validated?: boolean;
    placeholder?: string;
    invalid?: boolean;
    researchType?: 'city' | 'address';
}

export default function AutoCompleteInput(props: AutoCompleteInputProps) {
    const {
        required,
        invalid,
        control,
        validated,
        maxLength,
        label,
        fullWidth,
        researchType = 'city',
        onClick = () => {},
        name,
        placeholder = '',
    } = props;

    const fullWidthProp = fullWidth ? 'w-full' : '';
    const researchFunction = researchType === 'city' ? getCityData : getAddressData;
    const inputRef = useRef<HTMLDivElement>(null);
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
        return () => window.removeEventListener("mousedown", handleOutSideClick);
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
    };

    const debouncedFunction = debounce(refreshResearch, 600);

    const borderClass = invalid
        ? 'border-ge-red focus:border-ge-red '
        : validated && internalValue !== ''
        ? 'border-ge-green focus:border-ge-green '
        : 'border-ge-gray-3 focus:border-ge-green ';

    const IconComponent = researchType === 'address' ? Navigation : MapPin;

    return (
        <div className={`relative mb-5 ${fullWidthProp}`} ref={inputRef}>
            {/* Icon */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                <IconComponent className={`w-4 h-4 ${invalid ? 'text-ge-red' : validated && internalValue ? 'text-ge-green' : 'text-ge-gray-3'}`} />
            </div>

            {/* Validated check */}
            {validated && internalValue !== '' && (
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none z-10">
                    <div className="check-pop w-5 h-5 rounded-full bg-ge-green flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
            )}

            <Controller
                control={control}
                name={name}
                render={({ field: { value, onChange, onBlur } }) => (
                    <>
                        <input
                            maxLength={maxLength}
                            type="text"
                            id={name}
                            value={value || ''}
                            className={`
                                ${borderClass}
                                ${fullWidthProp}
                                peer
                                pl-10 pr-10 pt-5 pb-2
                                bg-white
                                border rounded-md
                                text-ge-gray-1 text-sm
                                transition-all duration-200
                                focus:outline-none
                                placeholder-transparent
                            `}
                            placeholder=" "
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                onChange(e);
                                debouncedFunction(e);
                                setToggle(true);
                            }}
                            onBlur={() => {
                                // Délai pour laisser le onClick du li s'exécuter avant de fermer
                                setTimeout(() => {
                                    setInternalValue(value);
                                    setToggle(false);
                                    onBlur();
                                }, 150);
                            }}
                            onClick={() => setToggle(true)}
                            required={required}
                        />

                        <AutoCompleteListInput
                            toggle={toggle}
                            values={data}
                            onChange={(element: any) => {
                                onChange(element);
                                setInternalValue(element);
                                setToggle(false);
                                onClick();
                            }}
                        />
                    </>
                )}
            />

            <label
                htmlFor={name}
                className={`
                    cursor-text absolute left-10 top-3.5
                    text-xs font-medium
                    transition-all duration-200
                    peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal
                    peer-[&:not(:placeholder-shown)]:top-1.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:font-medium
                    peer-focus:top-1.5 peer-focus:text-xs peer-focus:font-medium peer-focus:text-ge-green
                    ${invalid ? 'text-ge-red' : validated && internalValue ? 'text-ge-green' : 'text-ge-gray-3'}
                    pointer-events-none
                `}
            >
                {label}
                {invalid && <span className="ml-1.5 text-xs text-ge-red font-semibold">— Invalide</span>}
            </label>
        </div>
    );
}
