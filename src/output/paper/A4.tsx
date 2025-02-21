import { forwardRef, ForwardRefRenderFunction } from "react"

const A4: ForwardRefRenderFunction<HTMLDivElement, React.PropsWithChildren> = ({children}, contentRef)  =>{
    return <div ref={contentRef} className="container mx-auto print:w-full print:max-w-full print:border-0 w-[210mm] h-[297mm] border border-black">
        {children}
    </div>
}

const ForwardedA4 = forwardRef(A4);
export default ForwardedA4;

