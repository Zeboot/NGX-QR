import { QRCode } from "react-qrcode-logo";
import { QRSettings } from "../QRSettings";
interface Props {
    value: string;
    settings: QRSettings;
}
export default function QR({value, settings} : Props) {
    return <QRCode 
        logoImage="/react.svg" 
        removeQrCodeBehindLogo={true} 
        ecLevel="Q" 
        quietZone={0} 
        value={value} 
        size={300}
        logoWidth={300*settings.logoModifier}
        style={{height: "9mm", width: "9mm", marginRight: "0.5mm"}}
        {...settings}
    />
};