import Checkbox from "@material-tailwind/react/components/Checkbox";
import Typography from "@material-tailwind/react/components/Typography";

interface Props {
    label: string;
    description: string;
    value: boolean;
    onChange: (val: boolean) => void;
    className?: string;
}

const BooleanInputField = ({ label, description, value, onChange, className }: Props) => {
    return <div className={className || "mb-1 flex flex-col gap-6"}>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
                {description}
            </Typography>
            
            <Checkbox checked={value} label={label} onChange={(e)=> onChange(e.target.checked)}/>
        </div>;
}

export default BooleanInputField;