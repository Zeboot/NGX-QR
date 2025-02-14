import { Button, Card, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useGenerationContext } from "../GenerationContext";
import NumberInputField from "./NumberInputField";
import InputField from "./InputField";
import { useQRContext } from "../QRSettings";

interface Props {
  handlePrint: () => void;
}

export default function GenerationInput({handlePrint}: Props) {
    const context = useGenerationContext();
    const [startingNumber, setStartingNumber] = useState(context.current.startingNumber);
    const [prefix, setPrefix] = useState(context.current.prefix);
    const [length, setLength] = useState(context.current.length);

    const QRContext = useQRContext();
    const [color, setColor] = useState(QRContext.fgColor);


    const onClick = () => {
        context.set({startingNumber, prefix, length});
        QRContext.setFgColor(color);
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