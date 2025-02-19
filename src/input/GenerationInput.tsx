import { Button, Card} from "@material-tailwind/react";
import { useEffect, useMemo, useState } from "react";
import { useGenerationContext } from "../context/GenerationContext";
import NumberInputField from "./fields/NumberInputField";
import InputField from "./fields/InputField";
import { useQRContext } from "../context/QRContext";
import { LAYOUTS } from "../settings/Layout";
import { IconRenderer } from "../util/IconRenderer";
import IconInputField from "./fields/IconInput";
import { renderToStaticMarkup } from "react-dom/server";
import BooleanInputField from "./fields/BooleanInputField";
import { EYE_FORM } from "../settings/QRSettings";
import getEnumKeys from "../util/getEnumKeys";
import SelectInputField from "./fields/SelectInputField";
import Section from "./Section";
import QRTester from "./QRTester";
interface Props {
  handlePrint: () => void;
}

export default function GenerationInput({handlePrint}: Props) {
    const context = useGenerationContext();
    const [layout, setLayout] = useState(context.current.layout);
    const [startingNumber, setStartingNumber] = useState(context.current.startingNumber);
    const [prefix, setPrefix] = useState(context.current.prefix);
    const [length, setLength] = useState(context.current.length);
    const [startingLabel, setStartingLabel] = useState(context.current.startingLabel);
    const [labelCount, setLabelCount] = useState(context.current.labelCount);

    const QRContext = useQRContext();
    const [color, setColor] = useState(QRContext.current.fgColor);
    const [icon, setIcon] = useState<string | null>(QRContext.current.icon);
    const [iconColor, setIconColor] = useState(QRContext.current.iconColor);
    const [logoModifier, setLogoModifier] = useState((QRContext.current.logoModifier*100));
    const [iconTransparency, setIconTransparency] = useState(!(QRContext.current.removeQrCodeBehindLogo));
    const [logoOpacity, setLogoOpacity] = useState(QRContext.current.logoOpacity! * 100);
    const [eye_form, setEyeForm] = useState(QRContext.current.eye_form);
    const [qrStyle, setQRStyle] = useState(QRContext.current.qrStyle);
    const [ecLevel, setEcLevel] = useState(QRContext.current.ecLevel);

    const MAX_FOR_LAYOUT = useMemo(() => {
      return LAYOUTS[layout].max_labels_per_page;
    },[layout]);

    const MAX_LABELS = useMemo(() => {
      return MAX_FOR_LAYOUT - startingLabel + 1;
    }, [startingLabel, MAX_FOR_LAYOUT]);

    useEffect(() => {
      setLabelCount(LAYOUTS[layout].max_labels_per_page);
      setStartingLabel(1);
    },[layout]);

    useEffect(() => {
      if(labelCount > MAX_LABELS){
        setLabelCount(MAX_LABELS);
      }
    }, [MAX_LABELS, labelCount]);    

    const iconBase64 = useMemo(() => {
      if(icon === null) return undefined;
      return 'data:image/svg+xml;base64,' + window.btoa(renderToStaticMarkup(<IconRenderer icon={icon} fill={iconColor} />));
    }, [icon, iconColor]);

    const onClick = () => {
        context.set({startingNumber, prefix, length, startingLabel, labelCount, layout});
        QRContext.set({
          fgColor: color, 
          icon: icon,
          logoImage: iconBase64, 
          logoModifier: +(logoModifier/100).toPrecision(2), 
          removeQrCodeBehindLogo: 
          !iconTransparency, 
          eye_form, 
          qrStyle, 
          ecLevel,
          logoOpacity: +(logoOpacity/100).toPrecision(2)
      });
    };

    const [testOpen, setTestOpen] = useState(false);

    return <Card color="transparent" shadow={true} className="container items-center mx-auto max-w-screen">
    <form className="mt-8 mb-2 flex flex-col max-w-[80%]">
      <Section title="Generation Settings">
        <SelectInputField description="Layout" label="Layout" value={layout} onChange={setLayout} options={LAYOUTS.map((opt, idx) => ({value: idx, label: opt.name}))}/>
        <NumberInputField description="Starting Number" label="Starting Number" value={startingNumber} onChange={setStartingNumber} />
        <InputField description="Prefix" label="Prefix" value={prefix} onChange={setPrefix} />
        <NumberInputField description="Length of Number" label="Length" value={length} onChange={setLength} />
        <NumberInputField description="Start at label" label="Start" min={1} max={MAX_FOR_LAYOUT} value={startingLabel} onChange={setStartingLabel} />
        <NumberInputField description="# of labels" label="Count" min={1} max={MAX_LABELS} value={labelCount} onChange={setLabelCount} />
      </Section>
      <Section title="QR Settings">
        <InputField description="Color" label="Color" value={color} onChange={setColor} type="color" />
        <IconInputField description="Icon" value={icon} setValue={setIcon} iconColor={iconColor} />
        <SelectInputField
          label="Form"
          description="Seeker Pattern Form"
          value={eye_form}
          onChange={setEyeForm}
          options={getEnumKeys(EYE_FORM).map(key => ({value: EYE_FORM[key], label: EYE_FORM[key]}))}
        />
        <SelectInputField
          label="Style"
          description="Dot Style"
          value={qrStyle}
          onChange={setQRStyle}
          options={[{value: "squares", label: "Squares"}, {value: "dots", label: "Dots"}, {value: "fluid", label: "Fluid"}]}
        />
        <SelectInputField
          label="Level"
          description="Error Correction"
          value={ecLevel}
          onChange={setEcLevel}
          options={[{value: "L", label: "Low (7%)"}, {value: "M", label: "Medium (15%)"}, {value: "Q", label: "Quartile (25%)"}, {value: "H", label: "High (30%)"}]}
        />
      </Section>
      {icon &&
        <Section title="Icon Settings">
          <InputField description="Icon Color" label="Icon Color" value={iconColor} onChange={setIconColor} type="color" />
          <NumberInputField step={5} description="Icon Size (%)" label="Size" min={0} max={80} value={logoModifier} onChange={setLogoModifier} />
          <BooleanInputField description="Transparent background" label="Transparency" value={iconTransparency === undefined ? true : iconTransparency} onChange={setIconTransparency}/>
          <NumberInputField step={1} description="Icon Opacity (%)" label="Opacity" min={0} max={100} value={logoOpacity} onChange={setLogoOpacity} />
        </Section>
      }
    </form>
    <div className="flex justify-center gap-1">
      <Button onClick={onClick}>Generate</Button>
      <Button onClick={handlePrint}>Print</Button>
      <Button onClick={() => setTestOpen(true)}>Test</Button>
    </div>
    <QRTester open={testOpen} setOpen={setTestOpen} labelCount={context.current.labelCount}/>
    
  </Card>;
}

