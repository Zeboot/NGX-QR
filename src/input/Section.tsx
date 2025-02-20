import Typography from "@material-tailwind/react/components/Typography";
import { PropsWithChildren } from "react";

export default function Section({title, children}: PropsWithChildren<{title: string}>) {
  return <div className="flex flex-col">
    <Typography variant="h4" color="blue-gray">
      {title}
    </Typography>
    <div className="mb-1 flex flex-row flex-wrap gap-6">
      {children}
    </div>
  </div>
}