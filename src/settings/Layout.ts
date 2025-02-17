import { useGenerationSettings } from "../context/GenerationContext";

export enum PAPER_SIZE {
    A4
}

export interface Layout {
    name: string;
    max_labels_per_page: number;
    paper_size: PAPER_SIZE;
}

export const LAYOUTS: Layout[] = [
    {
        name: "Default",
        max_labels_per_page: 189,
        paper_size: PAPER_SIZE.A4
    }
]

export default function useLayout() {
    const settings = useGenerationSettings();
    return LAYOUTS[settings.layout];
}