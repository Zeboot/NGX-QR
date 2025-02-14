import { forwardRef, ForwardRefRenderFunction, useMemo } from "react";
import Label from "./Label";

import { useGenerationContext } from "../GenerationContext";

const GenerationOutput: ForwardRefRenderFunction<HTMLDivElement> = (_, contentRef) => {
    const context = useGenerationContext().current;
    const values = useMemo(() => {
        return Array.from({length: 189}, (_, index) => {
            return `${context.prefix}${(context.startingNumber + index).toString().padStart(context.length, "0")}`;
        });
    }, [context.prefix, context.length, context.startingNumber]);
    return <div ref={contentRef} className="container mx-auto px-[8.45mm] py-[13.5mm] print:w-full print:max-w-full print:border-0 w-[210mm] h-[297mm]">
            <div className="grid grid-cols-7 gap-x-[2.55mm] ">
                {values.map((value) => <Label key={value} value={value} />)}
            </div>
        </div>
}

const ForwardedGenerationOutput = forwardRef(GenerationOutput);
export default ForwardedGenerationOutput;
