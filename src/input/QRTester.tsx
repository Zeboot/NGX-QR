
import Alert from "@material-tailwind/react/components/Alert";
import Dialog, { DialogBody, DialogHeader } from "@material-tailwind/react/components/Dialog";
import Progress from "@material-tailwind/react/components/Progress";
import Typography from "@material-tailwind/react/components/Typography";
import { useEffect, useState } from "react";
interface TestResultSummary {
    found: number;
    recognized: number;
    correct: number;
}

interface Props {
    labelCount: number;
    open: boolean;
    setOpen: (val: boolean) => void;
}

function getAllQRCodes(): HTMLCanvasElement[] {
    const elements =  document.getElementsByTagName("canvas");
    const res: HTMLCanvasElement[] = [];
    for(let i = 0 ; i < elements.length; i++){
        const ele = elements.item(i);
        if(!ele?.id.startsWith("qr-code-")) continue;
        res.push(ele);
    }
    return res;
}

export default function QRTester({open, setOpen, labelCount}: Props){
    const [testResult, setTestResult] = useState<TestResultSummary | null>(null);
    const [qrCodes, setQRCodes] = useState<HTMLCanvasElement[]>([]);
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        if(open){
            setTestResult(null);
            setProgress(0); 
            setQRCodes(getAllQRCodes());
        }
    },[open]);
    useEffect(() => {
        const controller = new AbortController();
        async function testQRCodes() {
            const result: TestResultSummary = {
                found: 0,
                recognized: 0,
                correct: 0
            };
            for(const code of qrCodes){
                result.found++;
                setProgress(result.found / qrCodes.length * 100);
                controller.signal.throwIfAborted();
                await new Promise((resolve) => setTimeout(resolve, 0));
                const id = code.id.replace("qr-code-", "");
                const imageData = code.getContext("2d")!.getImageData(0,0,code.width,code.height)!;
                const qr = (await import("jsqr")).default(imageData.data, imageData.width, imageData.height)!;
                if(!qr){
                    console.log(`Error finding ${id}`)
                    continue;
                }
                result.recognized++;
                if(qr.data === id){
                    result.correct++;
                }else{
                    console.log(`Incorrect data at ${id}`)
                }
            }
            return result;
        }
        testQRCodes().then(val => setTestResult(val), () => {});
        return () => {
            controller.abort("unmount");
        }
    },[qrCodes]);
    return <Dialog open={open} handler={setOpen} >
    <DialogHeader>
      Test QR Codes
    </DialogHeader>
    <DialogBody>
      {!testResult ? 
      <>
        <Typography>
            Analyzing QR codes...
        </Typography>
        <Progress value={progress}/>
      </>
      :<>
        <Typography>
          Note: This test only checks validity of QR code and does not guarantee scannability - errors due to printer quality or size of QR code can still occur.
        </Typography>
        <div className="flex flex-row gap-2">
          <Alert color={testResult.found === labelCount ? "green" : "red"}>
            <Typography>{testResult.found}/{labelCount}</Typography> QR codes found
          </Alert>
          <Alert color={testResult.recognized === labelCount ? "green" : "red"}>
            <Typography>{testResult.recognized}/{labelCount}</Typography> QR codes recognized as valid QR codes
          </Alert>
          <Alert color={testResult.correct === labelCount ? "green" : "red"}>
            <Typography>{testResult.correct}/{labelCount}</Typography> QR codes scan as the correct value

          </Alert>
        </div>
      </> 
      }
    </DialogBody>
  </Dialog>;
}