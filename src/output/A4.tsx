import { forwardRef, ForwardRefRenderFunction } from "react"

const A4: ForwardRefRenderFunction<HTMLDivElement, React.PropsWithChildren> = ({children}, contentRef)  =>{
    return <div ref={contentRef} className="container mx-auto px-[8.45mm] py-[13.5mm] print:w-full print:max-w-full print:border-0 w-[210mm] h-[297mm]">
        {children}
    </div>
}

const ForwardedA4 = forwardRef(A4);
export default ForwardedA4;

