"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/preview-dialog";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
const CustomDialog = ({
  children,
  trigger,
}: {
  children: React.ReactNode;
  trigger: React.ReactNode;
}) => {
  const [open, setOpen] = useState<booelan>(false);
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className=" inline-flex items-center justify-center">
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
