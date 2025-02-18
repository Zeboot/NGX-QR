import { QRCode } from "react-qrcode-logo";
import { EYE_RADII, QRSettings } from "../settings/QRSettings";
interface Props {
    value: string;
    settings: QRSettings;
    size: string;
}
export default function QR({value, settings, size} : Props) {
    return <QRCode  
        ecLevel={settings.ecLevel} 
        quietZone={0} 
        value={value} 
        size={300}
        logoWidth={300*settings.logoModifier}
        logoHeight={300*settings.logoModifier}
        eyeRadius={EYE_RADII[settings.eye_form]}
        style={{height: size, width: size, marginRight: "0.5mm"}}
        {...settings}
    />
};