import { Button, Dialog, DialogBody, DialogHeader, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { IconRenderer, useIconPicker } from "../util/IconRenderer";
import React from "react";

interface Props {
    description: string;
    value: string |null;
    setValue: (val: string | null) => void;
    className?: string;
    iconColor?: string;
}

export const DialogIconPicker = ({description, value, setValue, className, iconColor} : Props) => {
    const [open, setOpen] = useState(false);
  
    return (
      <div className={className}>
        <Typography variant="h6" color="blue-gray" className="-mb-3">
            {description}
        </Typography>
        <div className="flex gap-1 justify-center items-center">
            {value ? <IconRenderer className="h-8 w-8" icon={value} fill={iconColor} /> : <div className="h-8 w-8"></div>}
            <Button onClick={() => setOpen(true)} className="mb-1 flex gap-3 items-center box-border" size="md">
            Select
            </Button>
            <Button className="mb-1 flex text-white" onClick={() => setValue(null)} size="md"> <IconRenderer className="h-4 w-6" icon="XMarkIcon" /></Button>

        </div>
        <IconPicker
          open={open}
          setOpen={setOpen}
          onChange={(icon)=> {
            setValue(icon);
            setOpen(false);
          }}
          
        />
      </div>
    );
  };

  const IconPicker= ({
    onChange,
    open,
    setOpen,
  }: {
    onChange: (icon: string)=> void;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    const { icons, search, setSearch } = useIconPicker();
  
    return (
      <>
        <Dialog open={open} handler={setOpen} size="md">
          <DialogHeader>
            Select an Icon
          </DialogHeader>
          <DialogBody className="relative">
            <Input
              placeholder="Search..."
              type="search"
              label="Search"
              value={search}
              onChange={(e)=> setSearch(e.target.value)}
            />
            <div className="grid max-h-[400px] grid-cols-6 gap-2 overflow-y-scroll py-4 pb-12">
              {icons.map(({ name, Component }) => (
                <React.Fragment key={name}>
                  <Button
                    type="button"
                    role="button"
                    key={name}
                    onClick={()=> {
                      onChange(name);
                      setOpen(false);
                    }}
                  >
                    <Component className="size-6" />
                    <span className="sr-only">{name}</span>
                  </Button>
                </React.Fragment>
              ))}
              {icons.length === 0 && (
                <div className="col-span-full flex grow flex-col items-center justify-center gap-2 text-center">
                  <Typography>No icons found...</Typography>
                  <Button
                    type="button"
                    role="button"
                    
                    onClick={()=> setSearch("")}
                  >
                    Clear Search
                  </Button>
                </div>
              )}
            </div>
          </DialogBody>
        </Dialog>
      </>
    );
  };