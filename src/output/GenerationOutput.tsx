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
        const calc = Promise.all(values.map(async (value) => <Label key={value} value={value} />));
        calc.then(val => setLabels(val));
    }, [values]);
    
    const Page = useMemo(() => {
        switch(layout.paper_size){
            case(PAPER_SIZE.A4): return A4;
            default: return A4;
        }
    }, [layout]);

    return <Page ref={contentRef}>
                <div className="grid grid-cols-7 gap-x-[2.55mm] ">
                    {labels}
                </div>
            </Page>
}

const ForwardedGenerationOutput = forwardRef(GenerationOutput);
export default ForwardedGenerationOutput;
