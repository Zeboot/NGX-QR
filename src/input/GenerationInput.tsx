import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { useEffect, useMemo, useState } from "react";
import { useGenerationContext } from "../context/GenerationContext";
import NumberInputField from "./NumberInputField";
import InputField from "./InputField";
import { useQRContext } from "../context/QRContext";
import { LAYOUTS } from "../settings/Layout";
interface Props {
  handlePrint: () => void;
}

export default function GenerationInput({handlePrint}: Props) {
    const context = useGenerationContext();
    const [startingNumber, setStartingNumber] = useState(context.current.startingNumber);
    const [prefix, setPrefix] = useState(context.current.prefix);
    const [length, setLength] = useState(context.current.length);
    const [startingLabel, setStartingLabel] = useState(context.current.startingLabel);
    const [labelCount, setLabelCount] = useState(context.current.labelCount);

    const QRContext = useQRContext();
    const [color, setColor] = useState(QRContext.current.fgColor);

    const MAX_FOR_LAYOUT = useMemo(() => {
      return LAYOUTS[context.current.layout].max_labels_per_page;
    },[context]);

    const MAX_LABELS = useMemo(() => {
      return MAX_FOR_LAYOUT - startingLabel + 1;
    }, [startingLabel, MAX_FOR_LAYOUT]);

    useEffect(() => {
      if(labelCount > MAX_LABELS){
        setLabelCount(MAX_LABELS);
      }
    }, [MAX_LABELS, labelCount])    

    const onClick = () => {
        context.set({startingNumber, prefix, length, startingLabel, labelCount});
        QRContext.set({fgColor: color});
    };
    return <Card color="transparent" shadow={false} className="container items-center mx-auto">
    <form className="mt-8 mb-2 max-w-screen-lg flex flex-col">
      <div className="flex flex-col">
        <Typography variant="h4" color="blue-gray">
          Generation Settings
        </Typography>
        <div className="mb-1 flex flex-row flex-wrap gap-6">
          <NumberInputField className="mb-1 flex flex-col gap-6" description="Starting Number" label="Starting Number" value={startingNumber} onChange={setStartingNumber} />
          <InputField className="mb-1 flex flex-col gap-6" description="Prefix" label="Prefix" value={prefix} onChange={setPrefix} />
          <NumberInputField className="mb-1 flex flex-col gap-6" description="Length of Number" label="Length" value={length} onChange={setLength} />
          <NumberInputField className="mb-1 flex flex-col gap-6" description="Start at label" label="Start" min={1} max={MAX_FOR_LAYOUT} value={startingLabel} onChange={setStartingLabel} />
          <NumberInputField className="mb-1 flex flex-col gap-6" description="# of labels" label="Count" min={1} max={MAX_LABELS} value={labelCount} onChange={setLabelCount} />
          <Input type="file" className="mb-1 flex flex-col gap-6" label="Image" accept="image/*"/>
        </div>
      </div>
      <div className="flex flex-col">
        <Typography variant="h4" color="blue-gray">
          QR Settings
        </Typography>
        <div className="mb-1 flex flex-row flex-wrap gap-6">
          <InputField className="mb-1 flex flex-col gap-6" description="Color" label="Color" value={color} onChange={setColor} type="color" />
        </div>
      </div>
      <div className="flex justify-center">
        <Button onClick={onClick} className="rounded-full" >Generate</Button>
        <Button onClick={handlePrint}  className="rounded-full">Print</Button>
      </div>
    </form>
  </Card>;
}