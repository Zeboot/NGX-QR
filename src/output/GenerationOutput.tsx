import { forwardRef, ForwardRefRenderFunction, useMemo } from "react";
import Label from "./Label";

import { useGenerationContext } from "../settings/GenerationContext";

const GenerationOutput: ForwardRefRenderFunction<HTMLDivElement> = (_, contentRef) => {
    const context = useGenerationContext().current;
    const values = useMemo(() => {
        return Array.from({length: 189}, (_, index) => {
            if((index+1) < context.startingLabel || index >= (context.labelCount + context.startingLabel - 1)) return undefined;
            return `${context.prefix}${(context.startingNumber + index - (context.startingLabel - 1)).toString().padStart(context.length, "0")}`;
        });
    }, [context.prefix, context.length, context.startingNumber, context.startingLabel, context.labelCount]);
    return <div ref={contentRef} className="container mx-auto px-[8.45mm] py-[13.5mm] print:w-full print:max-w-full print:border-0 w-[210mm] h-[297mm]">
            <div className="grid grid-cols-7 gap-x-[2.55mm] ">
                {values.map((value) => <Label key={value} value={value} />)}
            </div>
        </div>
}

const ForwardedGenerationOutput = forwardRef(GenerationOutput);
export default ForwardedGenerationOutput;
