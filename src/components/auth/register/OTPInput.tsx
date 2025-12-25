'use client'

import * as React from "react";
import {cn} from "@/lib/utils";
import {useFormField} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {useOtp} from "@/hooks/query/auth/use-otp";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {AlertCircle} from "lucide-react";

type OTPInputProps = {
    icon?: React.ReactNode;
}

const OTPInput = React.forwardRef<
    HTMLInputElement,
    React.ComponentProps<"input"> & OTPInputProps
>(({className, type, icon, ...props}, ref) => {
    const {error: formError, formMessageId} = useFormField();
    const message = formError ? String(formError?.message ?? "") : "";
    const [tooltipOpen, setTooltipOpen] = React.useState(false)
    const {mutate, isPending, error, handleGetOtp} = useOtp();

    return (
        <div className="flex w-full items-center gap-1">
            <div className="relative w-full">
                {icon && (
                    <div
                        className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                        <div
                            className={cn("w-5 h-5 flex items-center justify-center text-muted-foreground", {"[&_svg]:text-error": error})}>
                            {icon}
                        </div>
                    </div>
                )}
                <input
                    type={type}
                    ref={ref}
                    aria-describedby={formMessageId}
                    className={cn(
                        "flex h-12 sm:h-12 w-full rounded-md border border-input-border bg-input py-1 text-sm sm:text-base shadow-md transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-text-placeholder focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 caret-black",
                        {"pl-10 pr-10": icon, "pl-3 pr-10": !icon},
                        {"ring-2 ring-error placeholder:text-error focus:placeholder:text-text-placeholder": formError},
                        {"focus-visible:ring-2 focus-visible:ring-primary": !formError},
                        className
                    )}
                    {...props}
                />
                <TooltipProvider>
                    <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
                        <TooltipTrigger
                            asChild
                            onClick={(e) => {
                                e.preventDefault()
                                setTooltipOpen(!tooltipOpen)
                            }}
                            onPointerDown={(e) => {
                                e.preventDefault()
                                setTooltipOpen(!tooltipOpen)
                            }}
                        >
                            <div
                                className={cn(
                                    "absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center",
                                    {"opacity-0 pointer-events-none": !message},
                                    {"opacity-100 cursor-pointer": message},
                                )}
                            >
                                <AlertCircle className="h-5 w-5 text-error"/>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" sideOffset={8}
                                        className="max-w-xs bg-[var(--color-grey-800)] text-white text-sm text-center p-2">
                            {message}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <Button
                type="button"
                onClick={handleGetOtp}
                disabled={isPending}
                className="h-12 sm:h-12 bg-primary text-white rounded-md text-base md:text-sm px-2"
            >
                მიღება
            </Button>
        </div>
    );
});

OTPInput.displayName = "OTPInput";

export {OTPInput};