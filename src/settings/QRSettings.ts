import { IProps } from "react-qrcode-logo";
export type QRSettings = Pick<IProps, 
    "fgColor" | 
    "qrStyle" 
    > &
{
    logoModifier: number;
}