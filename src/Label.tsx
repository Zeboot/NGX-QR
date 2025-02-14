import { Typography } from "@material-tailwind/react";
import { QRCode } from "react-qrcode-logo";

export default function Label({value} : {value: string}) {
    return <div className="w-[25.4mm] h-[10mm]">
            <div className="w-[24.4mm] h-[10mm] flex items-center">
                <QRCode ecLevel="Q" quietZone={0} value={value} size={300} style={{height: "9mm", width: "9mm", marginRight: "0.5mm"}}/>
                <Typography className="flex-grow text-[2.4mm]">{value}</Typography>
            </div>
        </div>;

}