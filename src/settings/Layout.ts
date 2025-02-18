import { useGenerationSettings } from "../context/GenerationContext";

export enum PAPER_SIZE {
    A4
}

export interface LabelSettings {
    qr_size: string;
    text_size: string | ((text: string) => string);
    height: string;
    width: string;
    inner_height?: string;
    inner_width?: string;
    vertical?: boolean;
    gap?: string;
}

export interface Layout {
    name: string;
    max_labels_per_page: number;
    paper_size: PAPER_SIZE;
    page_padding: string;
    columns: string;
    column_gap: string;
    row_gap: string;
    label_settings: LabelSettings;
}

export const LAYOUTS: Layout[] = [
    {
        name: "Avery L4731REV-25",
        max_labels_per_page: 189,
        paper_size: PAPER_SIZE.A4,
        page_padding: "px-[8.45mm] py-[13.5mm]",
        columns: "grid-cols-7",
        column_gap: "gap-x-[2.55mm]",
        row_gap: "",
        label_settings: {
            text_size: "text-[2.6mm]",
            qr_size: "9mm",
            height: "h-[10mm]",
            width: "w-[25.4mm]",
            inner_width: "w-[24.4mm]",
            gap: "gap-0.5"
        }
    },
    {
        name: "Avery 30x20 (Untested)",
        max_labels_per_page: 55,
        paper_size: PAPER_SIZE.A4,
        page_padding: "px-[2cm] py-[13.4mm]",
        columns: "grid-cols-5",
        column_gap: "gap-x-[5mm]",
        row_gap: "gap-y-[5mm]",
        label_settings: {
            text_size: (text: string) => text.length > 10 ? "text-[2.5mm]" : "text-[3mm]",
            qr_size: "14mm",
            height: "h-[20mm]",
            width: "w-[30mm]",
            inner_width: "w-[29mm]",
            inner_height: "h-[18mm]",
            vertical: true
        }
    }
]

export default function useLayout() {
    const settings = useGenerationSettings();
    return LAYOUTS[settings.layout];
}