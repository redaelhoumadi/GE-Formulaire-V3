"use client";
import Image from 'next/image';
import { ReactNode, useRef, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import Photo from '../../../../../public/images/components/Photo.svg';

interface FileInputProps {
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
     * React-hook-form registration
     */
    register?: any;
    /**
     * React-hook-form control
     */
    control: Control<any>;
}


export default function FileInput(props: FileInputProps) {
    const { control, label, fullWidth, register = (() => { }), name, placeholder = '' } = props;
    const fullWidthProp = fullWidth ? 'w-full' : '';

    const inputFile = useRef<HTMLInputElement | null>(null);
    const [fileName, setFilename] = useState("");
    const [fileError, setFileError] = useState("");

    const onButtonClick = () => {
        inputFile?.current?.click();
    };

    const onChangeFile = (onChangeRec: any) => (event: any) => {
        event.preventDefault();
        var file = event.target.files[0];
        if (file.size > 8 * 1000 * 1024) {
            setFileError("Le fichier doit faire au maximum 8 MB.");
            return false;
        }
        setFileError("");
        setFilename(file.name);
        onChangeRec(file);
    }

    return (
        <div className="mb-6">
            {fileError && <span className="ml-2 text-xs text-ge-red font-medium">{fileError}</span>}
            <label htmlFor={name} className="block ml-4 mb-2 text-xs md:text-base text-ge-gray-1">{label}</label>
            <div className="relative" onClick={onButtonClick}>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <Image
                        className="w-8 h-8 mr-2 -ml-1"
                        priority
                        src={Photo}
                        alt="Photo"
                    />
                </div>
                <input
                    type="text"
                    name={"file_" + name}
                    className={`pl-12 border border-ge-gray-3 text-ge-gray-1 text-sm md:text-base focus:ring-ge-gray-1 rounded-md focus:border-ge-gray-1 block ${fullWidthProp} p-2.5`}
                    placeholder={placeholder}
                    value={fileName}
                    readOnly />
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { value, onChange } }) => (
                        <input
                            {...register(name)}
                            type="file"
                            className="hidden"
                            accept='image/png, image/jpg, image/jpeg'
                            ref={inputFile}
                            onChange={onChangeFile(onChange)}
                        />
                    )}
                />
            </div>
        </div>
    )
}