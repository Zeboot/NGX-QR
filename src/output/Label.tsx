import { Typography } from "@material-tailwind/react";
import { useQRSettings } from "../QRSettings";
import QR from "./QR";

export default function Label({value} : {value: string}) {
    const QRContext = useQRSettings();
    return <div className="w-[25.4mm] h-[10mm]">
            <div className="w-[24.4mm] h-[10mm] flex items-center">
                <QR value={value} settings={QRContext}/>
                <Typography className="flex-grow text-[2.6mm]">{value}</Typography>
            </div>
        </div>;

}