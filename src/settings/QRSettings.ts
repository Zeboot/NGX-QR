export type qrStyle = "squares" | "dots" | "fluid";

export interface QRSettings {
    fgColor: string;
    logoModifier: number;
    qrStyle: qrStyle;
}

