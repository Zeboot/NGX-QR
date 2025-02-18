import { Typography } from "@material-tailwind/react";
import { useQRSettings } from "../context/QRContext";
import QR from "./QR";
import { LabelSize } from "../settings/Layout";

export default function Label({size, value} : {size: LabelSize, value?: string}) {
    const QRContext = useQRSettings();
    return <div className={`w-[${size.width}] h-[${size.height}]`}>
            <div className={`w-[${size.inner_width || size.width}] h-[${size.inner_height || size.height}] flex items-center`}>
                {value && <>
                    <QR value={value} settings={QRContext} size="9mm"/>
                    <Typography className="flex-grow text-[2.6mm]">{value}</Typography>
                </>}
            </div>
        </div>;

}