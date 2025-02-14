import { Typography, Input } from "@material-tailwind/react";

interface Props<T> {
    label: string;
    description: string;
    value: T;
    onChange: (val: T) => void;
    className?: string;
    type?: string;
}

const InputField = <T,>({ label, description, value, onChange, className, type }: Props<T>) => {
    return <div className={className}>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
                {description}
            </Typography>
            <Input type={type} label={label} value={""+value} onChange={(e) => onChange(e.target.value as T)}/>
        </div>;
}

export default InputField;