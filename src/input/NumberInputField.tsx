import { Typography, Input } from "@material-tailwind/react";

interface Props {
    label: string;
    description: string;
    value: number;
    onChange: (val: number) => void;
    className?: string;
}

const NumberInputField = ({ label, description, value, onChange, className }: Props) => {
    return <div className={className}>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
                {description}
            </Typography>
            <Input type="number" label={label} value={value} onChange={(e) => onChange(+e.target.value)}/>
        </div>;
}

export default NumberInputField;