import { QRCode } from "react-qrcode-logo";
import { EYE_RADII, QRSettings } from "../settings/QRSettings";
interface Props {
    value: string;
    settings: QRSettings;
}
export default function QR({value, settings} : Props) {
    return <QRCode  
        ecLevel={settings.ecLevel} 
        quietZone={0} 
        value={value} 
        size={300}
        logoWidth={300*settings.logoModifier}
        logoHeight={300*settings.logoModifier}
        eyeRadius={EYE_RADII[settings.eye_form]}
        style={{height: "9mm", width: "9mm", marginRight: "0.5mm"}}
        {...settings}
    />
};