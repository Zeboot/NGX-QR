import { forwardRef, ForwardRefRenderFunction, useEffect, useMemo, useState } from "react";
import Label from "./Label";

import { useGenerationSettings } from "../context/GenerationContext";

const GenerationOutput: ForwardRefRenderFunction<HTMLDivElement> = (_, contentRef) => {
    const context = useGenerationSettings();
    const [labels, setLabels] = useState<JSX.Element[]>([]);
    const values = useMemo(() => {
        return Array.from({length: 189}, (_, index) => {
            if((index+1) < context.startingLabel || index >= (context.labelCount + context.startingLabel - 1)) return undefined;
            return `${context.prefix}${(context.startingNumber + index - (context.startingLabel - 1)).toString().padStart(context.length, "0")}`;
        });
    }, [context.prefix, context.length, context.startingNumber, context.startingLabel, context.labelCount]);

    useEffect(() => {
        const calc = Promise.all(values.map(async (value) => <Label key={value} value={value} />));
        calc.then(val => setLabels(val));
    }, [values]);
    
    return <div ref={contentRef} className="container mx-auto px-[8.45mm] py-[13.5mm] print:w-full print:max-w-full print:border-0 w-[210mm] h-[297mm]">
            <div className="grid grid-cols-7 gap-x-[2.55mm] ">
                {labels}
            </div>
        </div>
}

const ForwardedGenerationOutput = forwardRef(GenerationOutput);
export default ForwardedGenerationOutput;
