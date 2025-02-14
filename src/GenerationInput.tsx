import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useGenerationContext } from "./GenerationContext";

interface Props {
  handlePrint: () => void;
}

export default function GenerationInput({handlePrint}: Props) {
    const [startingNumber, setStartingNumber] = useState(1);
    const [prefix, setPrefix] = useState("ASN");
    const [length, setLength] = useState(5);
    const context = useGenerationContext();

    const onClick = () => {
        context.setStartingNumber(startingNumber);
        context.setPrefix(prefix);
        context.setLength(length);
    };
    return <Card color="transparent" shadow={false} className="container items-center mx-auto">
    <Typography variant="h4" color="blue-gray">
      Generation Settings
    </Typography>
    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
      <div className="mb-1 flex flex-col gap-6">
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Starting Number
        </Typography>
        <Input
          type="number"
          label="Starting Number"
          value={startingNumber}
          onChange={(e) => setStartingNumber(parseInt(e.target.value, 10))}
        />
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Prefix
        </Typography>
        <Input
          label="Prefix"
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
        />
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Total Length of Number (without Prefix)
        </Typography>
        <Input
          label="Length"
          type="number"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value, 10))}
        />
      </div>
      <Button onClick={onClick}>Generate</Button>
      <Button onClick={handlePrint}>Print</Button>
    </form>
  </Card>;
}