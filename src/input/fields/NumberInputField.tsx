import IconButton from "@material-tailwind/react/components/IconButton";
import Input from "@material-tailwind/react/components/Input";
import Typography from "@material-tailwind/react/components/Typography";

import { useCallback } from "react";

interface Props {
    label: string;
    description: string;
    value: number;
    onChange: (val: number) => void;
    className?: string;
    max?: number;
    min?: number;
    step?: number
}

const NumberInputField = ({ label, description, value, onChange, className, min, max, step, ...others }: Props) => {
    const setValidatedInput = useCallback((val: number) => {
        if(min && val < min){
            return onChange(min);
        }
        if(max && val > max){
            return onChange(max);
        }
        return onChange(val);
    }, [onChange, min, max]);
    return <div className={className || "mb-1 flex flex-col gap-6"}>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
                {description}
            </Typography>
            <div className="relative w-full">
                <Input 
                    type="number" 
                    label={label} 
                    value={value} 
                    onChange={(e) => setValidatedInput(+e.target.value)} 
                    min={min} 
                    max={max} 
                    className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    {...others}
                />
                <div className="absolute right-1 top-1 flex gap-0.5">
                    <IconButton
                        size="sm"
                        variant="text"
                        className="rounded"
                        onClick={() => onChange((value === 0 ? 0 : value - (step || 1)))}
                        disabled={min ? value <= min : false}
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4"
                        >
                        <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                        </svg>
                    </IconButton>
                    <IconButton
                        size="sm"
                        variant="text"
                        className="rounded"
                        onClick={() => onChange(value + (step || 1))}
                        disabled={max ? value >= max : false}
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4"
                        >
                        <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                        </svg>
                    </IconButton>
                </div>
            </div>
        </div>;
}

export default NumberInputField;