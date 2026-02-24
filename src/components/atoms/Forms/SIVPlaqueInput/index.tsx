"use client";
import Image from 'next/image';
import { ReactNode } from 'react';
import SIVPlaquePC from '@public/images/components/SIVPlaquePC.png';
import LoupePlaqueSIV from '@public/images/components/LoupePlaqueSIV.svg';
import Spinner from '@public/images/components/Spinner.svg';
import { Control, Controller } from 'react-hook-form';

interface SIVPlaqueInputProps {
    className?: string;
    placeholder?: string;
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
    label?: ReactNode;
    onClick?: () => void;
    required?: boolean;
    name: string;
    validated?: boolean;
    invalid?: boolean;
    loading?: boolean;
    control: Control<any>;
}

export default function SIVPlaqueInput(props: SIVPlaqueInputProps) {
    const { required, control, invalid, loading, label, fullWidth, onClick = () => {}, name, validated = false } = props;
    const fullWidthProp = fullWidth ? 'w-full' : '';
    let classNameProps = 'border border-ge-gray-3 text-ge-gray-1 text-sm md:text-base focus:ring-ge-gray-1 focus:border-ge-gray-1 rounded-md';
    classNameProps = invalid ? 'border border-ge-red text-ge-gray-1 text-sm md:text-base focus:ring-ge-gray-1 focus:border-ge-gray-1 rounded-md' : classNameProps;

    const formatWithDashOrSpace = /^[a-zA-Z]{2}[-\s_,./'"]?\d{3}[-\s_,./'"]?[a-zA-Z]{2}$/;
    const formatWithoutDashOrSpace = /^(?:[a-zA-Z]{2}\d{3}[a-zA-Z]{2}|\d{4}[a-zA-Z]{2}\d{2}|\d{3}[a-zA-Z]{3}\d{2})$/;

    function checkFormat(chaine: string) {
        return formatWithDashOrSpace.test(chaine) || formatWithoutDashOrSpace.test(chaine);
    }

    const onInputChange = (onChange: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        if (formatWithDashOrSpace.test(value)) {
            value = value.replace(/[-\s_,./'"]/g, ''); // Retirer les tirets et les espaces
        }
        onChange(value);
        if (checkFormat(value)) {
            document.getElementById(name)?.blur();
            onClick();
        }
    };

    return (
        <div>
            <label htmlFor={name} className="block ml-4 mb-2 text-xs md:text-base font-bold text-ge-gray-1">
                {label}
            </label>
            <div className="relative h-12">
                <div className="absolute inset-y-0 right-0 flex items-center cursor-pointer pr-3.5">
                    {loading ? (
                        <Image
                            className="w-6 h-6 text-gray-500 animate-spin"
                            priority
                            onClick={onClick}
                            src={Spinner}
                            alt="Loader"
                        />
                    ) : (
                        <Image
                            className="w-6 h-6 text-gray-500"
                            priority
                            onClick={onClick}
                            src={LoupePlaqueSIV}
                            alt="LoupePlaqueSIV"
                        />
                    )}
                </div>
                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <Image
                        className="w-10 h-12 text-gray-500 rounded-md"
                        priority
                        src={SIVPlaquePC}
                        alt="SIVPlaquePC"
                    />
                </div>
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { value, onChange } }) => (
                        <input
                            type="text"
                            value={value}
                            maxLength={9}
                            id={name}
                            className={`text-center uppercase ${validated && 'pr-10'} ${classNameProps} ${fullWidthProp} h-12 block p-2.5`}
                            placeholder="AA 000 AA"
                            onChange={onInputChange(onChange)}
                            required={required}
                        />
                    )}
                />
            </div>
        </div>
    );
}
