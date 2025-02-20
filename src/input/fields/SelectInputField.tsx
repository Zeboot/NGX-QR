import { Select, Option } from "@material-tailwind/react/components/Select";
import Typography from "@material-tailwind/react/components/Typography";

interface Props<T> {
    label: string;
    description: string;
    className?: string;
    value: T;
    onChange: (val: T) => void;
    options: {value: T, label: string}[];
}

export default function SelectInputField<T>({label, description, value, onChange, className, options} : Props<T>) {
    return <div className={className || "mb-1 flex flex-col gap-6"}>
        <Typography variant="h6" color="blue-gray" className="-mb-3">
            {description}
        </Typography>
        <Select label={label} value={""+value} onChange={e => onChange(e as unknown as T) }>
            {options.map(({value, label}, index) => <Option key={index} value={""+value}>{label}</Option>)}
        </Select>
    </div>;
}