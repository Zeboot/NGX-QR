import Dialog, { DialogBody, DialogHeader } from "@material-tailwind/react/components/Dialog";
import Input from "@material-tailwind/react/components/Input";
import { useIconPicker } from "./IconRenderer";
import Button from "@material-tailwind/react/components/Button";
import React from "react";
import Typography from "@material-tailwind/react/components/Typography";

const IconPicker = ({
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

  export default IconPicker;