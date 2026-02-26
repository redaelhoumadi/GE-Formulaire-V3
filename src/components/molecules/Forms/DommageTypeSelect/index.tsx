import Image from 'next/image';
import { Control } from "react-hook-form";

// SVGs
import Fissure from "@public/images/components/domages/Fissure.svg";
import Impact from "@public/images/components/domages/Impact.svg";
import PlusieursImpacts from "@public/images/components/domages/PlusieursImpacts.svg";

// Internal components
import ButtonSelectionInput, { ButtonSelectionOption } from "@/components/atoms/Forms/ButtonSelectionInput";


export interface DommageTypeSelectProps {
    /**
     * Field name
     */
    name: string;
    /**
     * React-hook-form control
     */
    control: Control<any>;
    /**
     * React-hook-form errors
     */
    errors?: any;
    /**
     * Style
     */
    style?: 'stretch' | 'default';
    /**
 * onClick
 */
    onClick?: () => void;
}

// liste des dommages possibles
export const dommages: ButtonSelectionOption[] = [
    {
        label: <div className='grid grid-cols-3 items-center gap-1'>
            <div className='md:col-span-3 flex justify-center'>
                <Image
                    className="w-10 h-10 xl:w-24 xl:h-24"
                    priority
                    src={Fissure}
                    alt="fissure"
                />
            </div>
            <div className='col-span-2 md:col-span-3'>
                <div className='w-full'>
                    <h3 className='text-center'>Fissure</h3>
                </div>
            </div>
        </div>,
        value: "Fissure",
    },
    {
        label: <div className='grid grid-cols-3 items-center gap-1'>
            <div className='md:col-span-3 flex justify-center'>
                <Image
                    className="w-10 h-10 xl:w-24 xl:h-24"
                    priority
                    src={Impact}
                    alt="impact"
                />
            </div>
            <div className='col-span-2 md:col-span-3'>
                <div className='w-full'>
                    <h3 className='text-center'>Impact</h3>
                </div>
            </div>
        </div>,
        value: "Impact",
    },
    {
        label: <div className='grid grid-cols-3 items-center gap-1'>
            <div className='md:col-span-3 flex justify-center'>
                <Image
                    className="w-10 h-10 xl:w-24 xl:h-24"
                    priority
                    src={PlusieursImpacts}
                    alt="plusieurs impacts"
                />
            </div>
            <div className='col-span-2 md:col-span-3'>
                <div className='w-full'>
                    <h3 className='text-center'>Plusieurs impacts</h3>
                </div>
            </div>
        </div>,
        value: "Plusieurs impacts",
    }
];

export default function DommageTypeSelect(props: DommageTypeSelectProps) {
    const { control, name, errors, onClick = () => { } } = props;
    return (
        <ButtonSelectionInput
            options={dommages}
            name={name}
            control={control}
            errors={errors}
            style="stretch"
            onClick={onClick}
        />
    );
}