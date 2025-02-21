import { forwardRef, ForwardRefRenderFunction, useMemo } from "react";
import Label from "./Label";

import { useGenerationSettings } from "../context/GenerationContext";
import A4 from "./paper/A4";
import useLayout, { PAPER_SIZE } from "../settings/Layout";

const GenerationOutput: ForwardRefRenderFunction<HTMLDivElement> = (_, contentRef) => {
    const context = useGenerationSettings();
    const layout = useLayout();

    const values = useMemo(() => {
        return Array.from({length: layout.max_labels_per_page}, (_, index) => {
            if((index+1) < context.startingLabel || index >= (context.labelCount + context.startingLabel - 1)) return undefined;
            return `${context.prefix}${(context.startingNumber + index - (context.startingLabel - 1)).toString().padStart(context.length, "0")}`;
        });
    }, [context.prefix, context.length, context.startingNumber, context.startingLabel, context.labelCount, layout]);

    const Page = useMemo(() => {
        switch(layout.paper_size){
            case(PAPER_SIZE.A4): return A4;
            default: return A4;
        }
    }, [layout]);

    return <Page ref={contentRef}>
                <div className={`grid ${layout.page_padding} ${layout.columns} ${layout.column_gap} ${layout.row_gap}`}>
                    {values.map((value) => <Label key={value} value={value} settings={layout.label_settings} />)}
                </div>
            </Page>;
}

const ForwardedGenerationOutput = forwardRef(GenerationOutput);
export default ForwardedGenerationOutput;
