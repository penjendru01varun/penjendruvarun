"use client";

import * as React from "react";
import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AlertTriangleIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Dialog = (props: React.ComponentProps<typeof DialogPrimitive.Root>) => (
    <DialogPrimitive.Root data-slot="dialog" {...props} />
);

const DialogTrigger = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>
>(({ ...props }, ref) => (
    <DialogPrimitive.Trigger data-slot="dialog-trigger" ref={ref} {...props} />
));
DialogTrigger.displayName = DialogPrimitive.Trigger.displayName || "DialogTrigger";

const DialogPortal = (props: React.ComponentProps<typeof DialogPrimitive.Portal>) => (
    <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
);
DialogPortal.displayName = "DialogPortal";

const DialogClose = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Close>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(({ ...props }, ref) => (
    <DialogPrimitive.Close data-slot="dialog-close" ref={ref} {...props} />
));
DialogClose.displayName = DialogPrimitive.Close.displayName || "DialogClose";

const DialogOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        data-slot="dialog-overlay"
        className={cn(
            "fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
        {...props}
    />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName || "DialogOverlay";

const DialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
            ref={ref}
            data-slot="dialog-content"
            className={cn(
                "bg-black fixed top-[50%] left-[50%] z-[200] grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border border-white/10 p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:max-w-lg",
                className
            )}
            {...props}
        >
            {children}
            <DialogPrimitive.Close className="absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none">
                <XIcon className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
        </DialogPrimitive.Content>
    </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName || "DialogContent";

const DialogHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        data-slot="dialog-header"
        className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
        {...props}
    />
));
DialogHeader.displayName = "DialogHeader";

const DialogFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        data-slot="dialog-footer"
        className={cn(
            "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
            className
        )}
        {...props}
    />
));
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        data-slot="dialog-title"
        className={cn("text-lg leading-none font-semibold", className)}
        {...props}
    />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName || "DialogTitle";

const DialogDescription = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        data-slot="dialog-description"
        className={cn("text-neutral-400 text-sm", className)}
        {...props}
    />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName || "DialogDescription";

export default function DialogLogout({ onLogout }: { onLogout: () => void }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive" className="w-full">Logout</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <div className="flex items-start space-x-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-900/20">
                        <AlertTriangleIcon className="h-6 w-6 text-red-500" />
                    </div>
                    <DialogHeader>
                        <DialogTitle>Logout from account</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to logout? You will need to sign in again to access your personal dashboard.
                        </DialogDescription>
                    </DialogHeader>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button variant="destructive" onClick={async () => {
                        await onLogout();
                        setOpen(false);
                    }}>
                        Logout
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogTrigger,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
};
