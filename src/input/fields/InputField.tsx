import Input from "@material-tailwind/react/components/Input";
import Typography from "@material-tailwind/react/components/Typography";

interface Props<T> {
    label: string;
    description: string;
    value: T;
    onChange: (val: T) => void;
    className?: string;
    type?: string;
}

const InputField = <T,>({ label, description, value, onChange, className, type }: Props<T>) => {
    return <div className={className || "mb-1 flex flex-col gap-6"}>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
                {description}
            </Typography>
            <Input type={type} label={label} value={""+value} onChange={(e) => onChange(e.target.value as T)}/>
        </div>;
}

export default InputField;