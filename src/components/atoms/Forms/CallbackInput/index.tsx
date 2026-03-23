"use client";

import Image from 'next/image';
import TelephoneWhite from '@public/images/components/TelephoneWhite.svg';
import Spinner from '@public/images/components/Spinner.svg';
import WhiteCheck from "@public/images/components/WhiteCheck.svg";
import ButtonPill from '../../Buttons/ButtonPill';
import { Phone, CheckCircle } from 'lucide-react';

import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { PhoneCallbackSchema } from '@/helpers/validation';
import { useSearchParams } from 'next/navigation';

interface CallbackInputProps {
    onClick?: () => void;
    open?: boolean;
}

export default function CallbackInput(props: CallbackInputProps) {
    const searchParams = useSearchParams();
    const { onClick = (() => {}), open = false } = props;
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [GCLID, setGCLID] = useState('');
    const [clientUrl, setClientUrl] = useState('');

    const { control, handleSubmit, formState: { errors, dirtyFields } } = useForm({
        resolver: yupResolver(PhoneCallbackSchema),
        defaultValues: { phoneNumber: "" },
        mode: 'onBlur',
    });

    const invalid = errors["phoneNumber"] ? true : false;
    const validated = (dirtyFields["phoneNumber"] && !errors["phoneNumber"]) ? true : false;

    useEffect(() => {
        const gclid = searchParams.get('gclid');
        const clientUrl = searchParams.get('referrer');
        if (gclid) setGCLID(gclid);
        if (clientUrl) setClientUrl(clientUrl);
    }, [searchParams]);

    const onSubmit = (data: any) => {
        setLoading(true);
        const dataToSubmit = { ...data, GCLID, clientUrl };
        axios.postForm('/api/rappel', dataToSubmit)
            .then(() => {})
            .catch((e) => console.log('Error'))
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                    setSent(true);
                }, 1000);
            });
    };

    const onInputChange = (onChangeController: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        let sanitizedValue: string = value.replace(/\D/g, '');
        sanitizedValue = sanitizedValue.match(/.{1,2}/g)?.join(' ') || '';
        onChangeController(sanitizedValue);
    };

    return (
        <div className="hidden lg:block">
            {/* CTA button or form */}
            {(!open || loading || sent) ? (
                <ButtonPill onClick={onClick} padding="py-2 px-5" style={sent ? undefined : "success"} className={`cursor-pointer ${sent ? 'bg-ge-green/10 text-ge-green border border-ge-green/30' : ''}`}>
                    <div className="flex items-center gap-2">
                        {loading ? (
                            <Image className="w-4 h-4 animate-spin" priority src={Spinner} alt="Chargement" />
                        ) : sent ? (
                            <>
                                <CheckCircle className="w-4 h-4 text-ge-green" />
                                <span className="text-sm font-bold">Demande envoyée !</span>
                            </>
                        ) : (
                            <>
                                <Image className="w-4 h-4" priority src={TelephoneWhite} alt="Téléphone" />
                                <span className="text-sm font-bold">Être rappelé</span>
                            </>
                        )}
                    </div>
                </ButtonPill>
            ) : (
                <form
                    className="flex items-center gap-2 bg-white border border-ge-gray-3 rounded-full px-1 py-1 focus-within:border-ge-green transition-colors duration-200"
                    onSubmit={(e) => { e.preventDefault(); handleSubmit(onSubmit)(e); }}
                    id="callback-form"
                >
                    <Controller
                        control={control}
                        name="phoneNumber"
                        render={({ field: { value, onChange } }) => (
                            <div className="relative flex items-center">
                                <Phone className={`w-3.5 h-3.5 ml-3 mr-1 shrink-0 ${invalid ? 'text-ge-red' : 'text-ge-gray-3'}`} />
                                <input
                                    type="tel"
                                    maxLength={14}
                                    minLength={14}
                                    value={value}
                                    id="phoneNumber"
                                    className={`w-36 text-sm bg-transparent bg-white outline-none text-ge-gray-1 placeholder:text-ge-gray-3 py-1.5 ${invalid ? 'text-ge-red' : ''}`}
                                    placeholder="06 00 00 00 00"
                                    autoFocus
                                    onChange={onInputChange(onChange)}
                                    required
                                />
                            </div>
                        )}
                    />
                    <ButtonPill className='leading-[0px] mr-0' padding="py-2 px-4" style="success" form="callback-form">
                        <span className="text-xs font-bold">Envoyer</span>
                    </ButtonPill>
                </form>
            )}
        </div>
    );
}
