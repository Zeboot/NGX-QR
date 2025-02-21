export default function iconToBase64(icon: SVGSVGElement | null){
    if(icon === null) return undefined;
    return 'data:image/svg+xml;base64,'+window.btoa((new XMLSerializer).serializeToString(icon));
}