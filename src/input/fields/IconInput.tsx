import Typography from "@material-tailwind/react/components/Typography";
import {  lazy,  RefObject,  useState } from "react";
import { IconRenderer } from "../../util/IconRenderer";
import Button from "@material-tailwind/react/components/Button";
const IconPicker = lazy(() => import('../../util/IconPicker'))
interface Props {
    description: string;
    value: string |null;
    setValue: (val: string | null) => void;
    className?: string;
    iconColor?: string;
    iconRef: RefObject<SVGSVGElement>;
}

const IconInputField = ({description, value, setValue, className, iconColor, iconRef}: Props) => {
    const [open, setOpen] = useState(false);
    return (
      <div className={className || "mb-1 flex flex-col gap-6"}>
        <Typography variant="h6" color="blue-gray" className="-mb-3">
            {description}
        </Typography>
        <div className="flex gap-1 justify-center items-center">
            {value ? <IconRenderer ref={iconRef} className="h-8 w-8" icon={value} fill={iconColor} /> : <div className="h-8 w-8"></div>}
            <Button onClick={() => setOpen(true)} className="mb-1 flex gap-3 items-center box-border" size="md">
            Select
            </Button>
            <Button className="mb-1 flex text-white" onClick={() => setValue(null)} size="md"> <IconRenderer className="h-4 w-6" icon="XMarkIcon" /></Button>

        </div>
        <IconPicker
          open={open}
          setOpen={setOpen}
          onChange={(icon)=> {
            setValue(icon);
            setOpen(false);
          }}
          
        />
      </div>
    );
  };

  export default IconInputField;

  