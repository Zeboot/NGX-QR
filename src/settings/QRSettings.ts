import { IProps } from "react-qrcode-logo";

export enum EYE_FORM {
    SQUARE = "Square",
    ROUND = "Round",
    ROUNDED_SQUARE = "Rounded Square"
}

const EYE_RADII: Record<EYE_FORM, number> = {
    [EYE_FORM.SQUARE]: 0,
    [EYE_FORM.ROUNDED_SQUARE]: 20,
    [EYE_FORM.ROUND]: 100
};

export { EYE_RADII };

export type QRSettings = Pick<IProps, 
    "fgColor" | 
    "qrStyle" |
    "logoImage" |
    "removeQrCodeBehindLogo" |
    "ecLevel"
    > &
{
    logoModifier: number;
    eye_form: EYE_FORM;
    icon: string | null;
    iconColor: string;
}