import { forwardRef, ForwardRefRenderFunction, useEffect, useMemo, useState } from "react";
import Label from "./Label";

import { useGenerationSettings } from "../context/GenerationContext";
import A4 from "./A4";
import useLayout, { PAPER_SIZE } from "../settings/Layout";

const GenerationOutput: ForwardRefRenderFunction<HTMLDivElement> = (_, contentRef) => {
    const context = useGenerationSettings();
    const [labels, setLabels] = useState<JSX.Element[]>([]);
    const layout = useLayout();

    const values = useMemo(() => {
        return Array.from({length: layout.max_labels_per_page}, (_, index) => {
            if((index+1) < context.startingLabel || index >= (context.labelCount + context.startingLabel - 1)) return undefined;
            return `${context.prefix}${(context.startingNumber + index - (context.startingLabel - 1)).toString().padStart(context.length, "0")}`;
        });
    }, [context.prefix, context.length, context.startingNumber, context.startingLabel, context.labelCount, layout]);

    useEffect(() => {
        const calc = Promise.all(values.map(async (value) => <Label key={value} value={value} size={layout.label_size} />));
        calc.then(val => setLabels(val));
    }, [values, layout, layout.label_size]);
    
    const Page = useMemo(() => {
        switch(layout.paper_size){
            case(PAPER_SIZE.A4): return A4;
            default: return A4;
        }
    }, [layout]);

    return <div className="max-w-screen overflow-x-scroll">
                <Page ref={contentRef}>
                    <div className={`grid grid-cols-${layout.columns} gap-x-[${layout.column_gap}]`}>
                        {labels}
                    </div>
                </Page>
            </div>;
}

const ForwardedGenerationOutput = forwardRef(GenerationOutput);
export default ForwardedGenerationOutput;
