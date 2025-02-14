import { Typography, Input } from "@material-tailwind/react";
import { useCallback } from "react";

interface Props {
    label: string;
    description: string;
    value: number;
    onChange: (val: number) => void;
    className?: string;
    max?: number;
    min?: number;
}

const NumberInputField = ({ label, description, value, onChange, className, min, max, ...others }: Props) => {
    const setValidatedInput = useCallback((val: number) => {
        if(min && val < min){
            return onChange(min);
        }
        if(max && val > max){
            return onChange(max);
        }
        return onChange(val);
    }, [onChange, min, max]);
    return <div className={className}>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
                {description}
            </Typography>
            <Input type="number" label={label} value={value} onChange={(e) => setValidatedInput(+e.target.value)} min={min} max={max} {...others}/>
        </div>;
}

export default NumberInputField;