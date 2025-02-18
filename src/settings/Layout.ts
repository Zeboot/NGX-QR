import { useGenerationSettings } from "../context/GenerationContext";

export enum PAPER_SIZE {
    A4
}

export interface LabelSize {
    height: string;
    width: string;
    inner_height?: string;
    inner_width?: string;
}

export interface Layout {
    name: string;
    max_labels_per_page: number;
    paper_size: PAPER_SIZE;
    qr_size: string;
    columns: number;
    column_gap: string;
    label_size: LabelSize;
}

export const LAYOUTS: Layout[] = [
    {
        name: "Avery L4731REV-25",
        max_labels_per_page: 189,
        paper_size: PAPER_SIZE.A4,
        qr_size: "9mm",
        columns: 7,
        column_gap: "2.55mm",
        label_size: {
            height: "10mm",
            width: "25.4mm",
            inner_width: "24.4mm"
        }
    }
]

export default function useLayout() {
    const settings = useGenerationSettings();
    return LAYOUTS[settings.layout];
}