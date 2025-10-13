import * as React from "react"
import {cn} from "@/lib/utils"
import {useFormField} from "@/components/ui/form"
import {AlertCircle} from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const FormInput = React.forwardRef<
    HTMLInputElement,
    React.ComponentProps<"input">
>(({className, type, ...props}, ref) => {
    const {error, formMessageId} = useFormField()
    const message = error ? String(error?.message ?? "") : ""

    return (
        <div className="relative w-full">
            <input
                type={type}
                ref={ref}
                aria-describedby={formMessageId}
                className={cn(
                    "flex h-10 sm:h-12 w-full rounded-md border bg-primary-container/40 border-input px-3 py-1 pr-9 text-sm sm:text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-text-placeholder focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                    error
                        ? "ring-2 ring-error placeholder:text-error focus:placeholder:text-text-placeholder"
                        : "focus-visible:ring-2 focus-visible:ring-primary",
                    className
                )}
                {...props}
            />

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div
                            className={cn(
                                "absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center",
                                !message ? "opacity-0 pointer-events-none" : "opacity-100 cursor-pointer"
                            )}
                        >
                            <AlertCircle className="h-5 w-5 text-error"/>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={8} className="max-w-xs bg-[--color-grey-800] text-white text-sm text-center">
                        {message}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
})

FormInput.displayName = "FormInput"

export {FormInput}