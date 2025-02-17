import { Typography, Checkbox } from "@material-tailwind/react";

interface Props {
    label: string;
    description: string;
    value: boolean;
    onChange: (val: boolean) => void;
    className?: string;
}

const BooleanInputField = ({ label, description, value, onChange, className }: Props) => {
    return <div className={className}>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
                {description}
            </Typography>
            
            <Checkbox checked={value} label={label} onChange={(e)=> onChange(e.target.checked)}/>
        </div>;
}

export default BooleanInputField;