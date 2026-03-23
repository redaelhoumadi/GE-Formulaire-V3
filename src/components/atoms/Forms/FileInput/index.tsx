"use client";
import Image from 'next/image';
import { ReactNode, useRef, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Upload, X, ImageIcon } from 'lucide-react';

interface FileInputProps {
    className?: string;
    placeholder?: string;
    size?: 'small' | 'medium' | 'large';
    type: 'text' | 'numeric' | 'email';
    fullWidth?: boolean;
    label?: ReactNode;
    onClick?: () => void;
    required?: boolean;
    name: string;
    register?: any;
    control: Control<any>;
}

export default function FileInput(props: FileInputProps) {
    const { control, label, fullWidth, register = (() => {}), name, placeholder = '' } = props;
    const fullWidthProp = fullWidth ? 'w-full' : '';

    const inputFile = useRef<HTMLInputElement | null>(null);
    const [fileName, setFilename] = useState("");
    const [fileError, setFileError] = useState("");
    const [isDragging, setIsDragging] = useState(false);

    const onButtonClick = () => inputFile?.current?.click();

    const onChangeFile = (onChangeRec: any) => (event: any) => {
        event.preventDefault();
        const file = event.target.files[0];
        if (!file) return;
        if (file.size > 8 * 1000 * 1024) {
            setFileError("Le fichier doit faire au maximum 8 MB.");
            return false;
        }
        setFileError("");
        setFilename(file.name);
        onChangeRec(file);
    };

    const clearFile = (onChange: any) => (e: React.MouseEvent) => {
        e.stopPropagation();
        setFilename("");
        onChange(null);
        if (inputFile.current) inputFile.current.value = "";
    };

    return (
        <div className={`mb-4 ${fullWidthProp}`}>
            {label && (
                <label className="block ml-1 mb-2 text-xs font-medium text-ge-gray-3">
                    {label}
                </label>
            )}

            {fileError && (
                <p className="mb-2 text-xs text-ge-red font-semibold flex items-center gap-1">
                    <span>⚠</span> {fileError}
                </p>
            )}

            <Controller
                control={control}
                name={name}
                render={({ field: { value, onChange } }) => (
                    <>
                        <div
                            onClick={onButtonClick}
                            onDragEnter={() => setIsDragging(true)}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={() => setIsDragging(false)}
                            className={`
                                relative cursor-pointer
                                border border-dashed rounded-md
                                px-4 py-4
                                flex items-center gap-3
                                transition-all duration-200
                                ${isDragging
                                    ? "border-ge-green bg-ge-green/5"
                                    : fileName
                                    ? "border-ge-green/40 bg-ge-green/3"
                                    : "border-ge-gray-3 hover:border-ge-gray-2 bg-ge-gray-5 hover:bg-white"
                                }
                            `}
                        >
                            {/* Icon */}
                            <div className={`
                                w-9 h-9 rounded-lg flex items-center justify-center shrink-0
                                ${fileName ? "bg-ge-green/10" : "bg-white border border-ge-gray-3"}
                            `}>
                                {fileName
                                    ? <ImageIcon className="w-4 h-4 text-ge-green" />
                                    : <Upload className="w-4 h-4 text-ge-gray-3" />
                                }
                            </div>

                            {/* Text */}
                            <div className="flex-1 min-w-0">
                                {fileName ? (
                                    <p className="text-sm font-semibold text-ge-gray-1 truncate">{fileName}</p>
                                ) : (
                                    <>
                                        <p className="text-sm text-ge-gray-1 font-medium truncate">
                                            {placeholder || "Ajouter une photo"}
                                        </p>
                                        <p className="text-[10px] text-ge-gray-3 mt-0.5">JPG, PNG — max. 8 MB</p>
                                    </>
                                )}
                            </div>

                            {/* Clear or chevron */}
                            {fileName ? (
                                <button
                                    type="button"
                                    onClick={clearFile(onChange)}
                                    className="shrink-0 w-6 h-6 rounded-full bg-ge-gray-4 flex items-center justify-center hover:bg-ge-red/10 transition-colors"
                                >
                                    <X className="w-3 h-3 text-ge-gray-1" />
                                </button>
                            ) : (
                                <span className="shrink-0 text-[10px] font-semibold text-ge-green border border-ge-green/30 rounded-md px-2 py-1">
                                    Choisir
                                </span>
                            )}
                        </div>

                        <input
                            {...register(name)}
                            type="file"
                            className="hidden"
                            accept="image/png, image/jpg, image/jpeg"
                            ref={inputFile}
                            onChange={onChangeFile(onChange)}
                        />
                    </>
                )}
            />
        </div>
    );
}
