"use client";

import Image from 'next/image'
import TelephoneWhite from '@public/images/components/TelephoneWhite.svg';
import Spinner from '@public/images/components/Spinner.svg';
import WhiteCheck from "@public/images/components/WhiteCheck.svg";
import ButtonPill from '../../Buttons/ButtonPill';

// Form 
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { PhoneCallbackSchema } from '@/helpers/validation';
import { useSearchParams } from 'next/navigation';

interface CallbackInputProps {
    onClick?: () => void;
    /**
     * Button invalid
     */
    open?: boolean;
}

export default function CallbackInput(props: CallbackInputProps) {
    const searchParams = useSearchParams();

    const { onClick = (() => { }), open = false } = props;
    const [loading, setLoading] = useState(false);
    const [GCLID, setGCLID] = useState('');
    const [clientUrl, setClientUrl] = useState('');
    const [loader, setLoader] = useState(Spinner);

    let classNameProps = 'text-ge-gray-1 text-sm xl:text-base outline-none';
    const { control, handleSubmit, formState: { errors, touchedFields, isValid, dirtyFields } } = useForm({
        resolver: yupResolver(PhoneCallbackSchema),
        defaultValues: { phoneNumber: "" },
        mode: 'onBlur'
    })
    const invalid = errors["phoneNumber"] ? true : false;
    const validated = (dirtyFields["phoneNumber"] && !errors["phoneNumber"]) ? true : false;
    classNameProps = invalid ? 'border border-ge-red text-ge-gray-1 text-sm xl:text-base' : classNameProps;

    useEffect(() => {
        const gclid = searchParams.get('gclid');
        const clientUrl = searchParams.get('referrer');
        if (gclid) setGCLID(gclid);
        if (clientUrl) setClientUrl(clientUrl);
    }, [searchParams])

    const onSubmit = (data: any) => {
        setLoading(true);
        const dataToSubmit = {
            ...data,
            GCLID,
            clientUrl
        };
        axios.postForm('/api/rappel', dataToSubmit).then((response) => {
            console.log('Request sent. ', response.data);
        })
            .catch((e) => console.log('Error submitting form..please retry'))
            .finally(() => setTimeout(() => {
                setLoader(WhiteCheck)
            }, 1000))
        console.log(data)
    }

    const onInputChange = (onChangeController: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        let sanitazedValue: string = value.replace(/\D/g, '');
        sanitazedValue = sanitazedValue.match(/.{1,2}/g)?.join(' ') || '';
        onChangeController(sanitazedValue);
    };

    return (
        <div className='hidden lg:block'>
            {(!open || loading) ?
                <ButtonPill onClick={onClick} padding="py-1 px-6" className="cursor-pointer" style="success">
                    <div className='px-5 flex items-center space-x-12 w-full justify-center lg:block lg:space-x-0'>
                        {loading ? (
                            <p className='align-middle'>
                                <Image
                                    className={`w-6 h-6 text-gray-500 ${loader == Spinner ? 'animate-spin' : ''}`}
                                    priority
                                    src={loader}
                                    alt="Loader"
                                />
                            </p>
                        ) : (<p className='align-middle'>
                            <Image
                                className="w-5 h-5 my-1 mr-3 float-left"
                                priority
                                src={TelephoneWhite}
                                alt="TelephoneWhite"
                            />
                            Être rappelé
                        </p>
                        )}
                    </div>
                </ButtonPill>
                :
                <form className="flex bg-white flex-row items-center border border-ge-gray-3" onSubmit={(e) => { e.preventDefault(); handleSubmit(onSubmit)(e) }} id="callback-form">
                    <div className='basis-1/2'>
                        <div className="relative w-full">
                            <div className="relative z-0 w-full group">
                                <Controller
                                    control={control}
                                    name="phoneNumber"
                                    render={({ field: { value, onChange } }) => (
                                        <input
                                            type="tel"
                                            maxLength={14}
                                            minLength={14}
                                            value={value}
                                            id="phoneNumber"
                                            className={`${validated && 'pr-10'} block py-2.5 appearance-none cursor-pointer bg-transparent peer p-2.5 ${classNameProps}`}
                                            placeholder=" "
                                            autoFocus
                                            onChange={onInputChange(onChange)}
                                            required />
                                    )}
                                />
                                <label htmlFor="phoneNumber" className={`cursor-pointer absolute bg-white ml-4 text-sm ${invalid ? 'text-ge-red' : 'text-ge-gray-1'} duration-300 transform -translate-y-6 scale-75 top-3  origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
                                    N° de téléphone
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='basis-1/2 flex items-center content-center'>
                        <ButtonPill padding="py-1 px-6" style="success" form="callback-form">
                            <div className='px-5 flex items-center space-x-12 w-full justify-center lg:block lg:space-x-0'>
                                <p className='align-middle'>
                                    Envoyer
                                    <Image
                                        className="w-5 h-5 my-1 mr-3 float-left"
                                        priority
                                        src={TelephoneWhite}
                                        alt="TelephoneWhite"
                                    />
                                </p>
                            </div>
                        </ButtonPill>
                    </div>
                </form>

            }
        </div>
    )
}