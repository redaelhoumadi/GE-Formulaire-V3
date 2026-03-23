interface AutoCompleteListInputTypes {
    values: string[];
    toggle: boolean;
    onChange: (e: string) => void;
}

export default function AutoCompleteListInput(props: AutoCompleteListInputTypes) {
    const { values, onChange, toggle } = props;

    if (!toggle || values.length === 0) return null;

    return (
        <ul className="
            max-h-[50vh] z-30 overflow-y-auto
            text-ge-gray-1 absolute mt-1 w-full
            bg-white border border-ge-gray-4
            rounded-xl
            shadow-[0_8px_24px_rgba(0,0,0,0.10)]
            py-1
        ">
            {values.map(element => (
                <li
                    key={`autocomplete_${element}`}
                    onMouseDown={(e) => {
                        e.preventDefault(); // empêche le blur de l'input
                        onChange(element);
                    }}
                    className="
                        cursor-pointer select-none
                        px-4 py-2.5
                        text-sm text-ge-gray-1
                        hover:bg-ge-gray-5
                        flex items-center gap-2
                        transition-colors duration-100
                    "
                >
                    <svg className="w-3.5 h-3.5 text-ge-gray-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {element}
                </li>
            ))}
        </ul>
    );
}
