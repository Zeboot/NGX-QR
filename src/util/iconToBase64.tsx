import { renderToStaticMarkup } from "react-dom/server";
import { IconRenderer } from "./IconRenderer";
export default function iconToBase64(icon: string | null, iconColor: string){
    if(icon === null) return undefined;
    return 'data:image/svg+xml;base64,' + window.btoa(renderToStaticMarkup(<IconRenderer icon={icon} fill={iconColor} />));
}