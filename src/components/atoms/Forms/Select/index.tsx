"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Control, Controller } from "react-hook-form";

type SelectOption = {
  label: string;
  value: string;
};

type SelectGroup = {
  label: string; // titre de groupe
  options: SelectOption[];
};

type SelectItem = SelectOption | SelectGroup;

interface SelectProps {
  className?: string;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  label?: ReactNode;
  onClick?: () => void;
  required?: boolean;
  name: string;
  defaultValue: string;
  values: SelectItem[];
  register?: any;
  control: Control<any>;
}

type RenderRow =
  | { kind: "header"; label: string; key: string }
  | { kind: "option"; label: string; value: string; key: string };

const isGroup = (item: SelectItem): item is SelectGroup =>
  typeof (item as SelectGroup).options !== "undefined";

export default function SelectInput(props: SelectProps) {
  const { control, label, onClick = () => {}, name, values } = props;

  const inputRef = useRef<HTMLDivElement>(null);
  const [toggle, setToggle] = useState(false);
  const [query, setQuery] = useState("");

  // Transforme values en lignes (headers + options)
  const rowsAll: RenderRow[] = useMemo(() => {
    const out: RenderRow[] = [];

    values.forEach((item, idx) => {
      if (isGroup(item)) {
        out.push({
          kind: "header",
          label: item.label,
          key: `header_${name}_${idx}_${item.label}`,
        });
        item.options.forEach((opt) => {
          out.push({
            kind: "option",
            label: opt.label,
            value: opt.value,
            key: `opt_${name}_${opt.value}`,
          });
        });
      } else {
        out.push({
          kind: "option",
          label: item.label,
          value: item.value,
          key: `opt_${name}_${item.value}`,
        });
      }
    });

    return out;
  }, [values, name]);

  // Filtrage: on garde les headers seulement s’ils ont au moins une option match
  const rowsFiltered: RenderRow[] = useMemo(() => {
    const q = query.trim().toUpperCase();
    if (!q) return rowsAll;

    const result: RenderRow[] = [];
    let pendingHeader: RenderRow | null = null;
    let headerHasMatch = false;

    const flushHeaderIfNeeded = () => {
      if (pendingHeader && headerHasMatch) result.push(pendingHeader);
      pendingHeader = null;
      headerHasMatch = false;
    };

    for (const row of rowsAll) {
      if (row.kind === "header") {
        flushHeaderIfNeeded();
        pendingHeader = row;
        continue;
      }

      const match = row.label.toUpperCase().includes(q);
      if (match) {
        headerHasMatch = true;
        // si on est dans un groupe, on ajoute le header juste avant la 1ère option match
        if (pendingHeader && !result.includes(pendingHeader)) {
          result.push(pendingHeader);
          pendingHeader = null; // déjà rendu
        }
        result.push(row);
      }
    }

    // si le dernier header n’a pas de match, on ne l’affiche pas
    return result;
  }, [rowsAll, query]);

  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (!inputRef.current?.contains(event.target as Node)) setToggle(false);
    };
    window.addEventListener("mousedown", handleOutSideClick);
    return () => window.removeEventListener("mousedown", handleOutSideClick);
  }, []);

  const open = () => setToggle(true);
  const close = () => setToggle(false);

  return (
    <div className="mb-2">
      <label
        htmlFor={name}
        className="block ml-4 mb-2 text-xs md:text-base font-bold text-ge-gray-1"
      >
        {label}
      </label>

      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <div className="relative" ref={inputRef}>
            <div className="w-full">
              <div
                className="my-2 p-1 bg-white flex border border-ge-gray-3 rounded-md"
                onClick={open}
              >
                <div className="flex flex-auto flex-wrap" />
                <input
                  placeholder="Recherche"
                  className="p-2 px-2 appearance-none outline-none w-full text-gray-800"
                  value={value ?? ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    onChange(v); // garde ton comportement actuel
                    setQuery(v); // filtre sur ce qui est tapé
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    open();
                  }}
                />
                <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-ge-gray-3">
                  <button
                    type="button"
                    className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      setToggle((t) => !t);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`feather feather-chevron-up w-6 h-6 ${
                        !toggle ? "rotate-180" : ""
                      }`}
                    >
                      <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {toggle && (
              <ul className="max-h-[50vh] z-20 overflow-y-auto text-ge-gray-1 absolute mt-1 w-full bg-white ring-1 ring-gray-300 rounded-md">
                {rowsFiltered.length === 0 && (
                  <li className="p-2 text-sm text-ge-gray-3 select-none">
                    Aucun résultat
                  </li>
                )}

                {rowsFiltered.map((row) => {
                  if (row.kind === "header") {
                    return (
                      <li
                        key={row.key}
                        className="px-2 py-2 text-xs font-bold text-ge-gray-3 bg-gray-50 select-none sticky top-0"
                      >
                        {row.label}
                      </li>
                    );
                  }

                  return (
                    <li
                      key={row.key}
                      onClick={() => {
                        onChange(row.value);
                        setQuery(""); // reset filtre
                        close();
                        onClick();
                      }}
                      className="z-auto cursor-pointer select-none p-2 hover:bg-gray-200"
                    >
                      {row.label}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      />
    </div>
  );
}