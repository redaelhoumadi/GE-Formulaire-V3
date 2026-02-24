"use client";
import useFormStore, { FormState } from "@/store/form";
import { StepParams } from "@/store/types";
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function NavigationEvents() {
    const searchParams = useSearchParams();
    const setParams = useFormStore((state: FormState) => state.setParams);

    useEffect(() => {
        const gclid = searchParams.get('gclid');
        const vendeur = searchParams.get('vendeur');
        const referrer = searchParams.get('referrer');
        const paramsData: StepParams = {}
        if (referrer) paramsData.client_url = referrer;
        if (gclid) paramsData.gclid = gclid;
        if (vendeur) paramsData.vendeur = vendeur;
        setParams(paramsData);
    }, [searchParams])

    return null
}