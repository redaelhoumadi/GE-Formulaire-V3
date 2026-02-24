interface AutoCompleteListInputTypes {
    values: string[];
    toggle: boolean;
    onChange: (e: string) => void;
};

export default function AutoCompleteListInput(props: AutoCompleteListInputTypes) {
    const { values, onChange, toggle } = props;

    if(!toggle || values.length == 0) return null;

    return (<ul className="max-h-[50vh] z-20 overflow-y-auto text-ge-gray-1 absolute mt-1 w-full bg-white ring-1 ring-gray-300">
        {
            values.map(element => <li key={`formInput${name}_${element}`} onClick={() => onChange(element)} value={element} className="z-auto cursor-pointer select-none p-2 hover:bg-gray-200">{element}</li>)
        }
    </ul>)
}