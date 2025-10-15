import * as React from "react"
import {cn} from "@/lib/utils"
import {useFormField} from "@/components/ui/form"
import {AlertCircle, EyeIcon, EyeOff} from "lucide-react"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip"
import {AuthSpacer} from "@/components/auth/AuthSpacer";

export const IconWrapper = ({children}: { children: React.ReactNode }) => (
    <div className="flex justify-center items-center w-8 shrink-0 ">
        {children}
    </div>
);

export const FormInputWithIconWrapper = ({icon, children}: {
    icon?: React.ReactNode;
    children: React.ReactNode;
}) => (
    <div className="flex items-center w-full gap-1">
        {icon && < IconWrapper> {icon}</IconWrapper>}
        {!icon && <AuthSpacer/>}
        {children}
        <AuthSpacer/>
    </div>
);

type FormInputProps = {
    isPasswordType?: boolean;
}

const FormInput = React.forwardRef<
    HTMLInputElement,
    React.ComponentProps<"input"> & FormInputProps
>(({className, type, isPasswordType = false, ...props}, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    if (type === "password" && showPassword) {
        type = 'text'
    }
    const {error, formMessageId} = useFormField()
    const message = error ? String(error?.message ?? "") : ""
    const [tooltipOpen, setTooltipOpen] = React.useState(false)

    return (
        <div className="relative w-full">
            <input
                type={type}
                ref={ref}
                aria-describedby={formMessageId}
                className={cn(
                    "flex h-12 sm:h-12 w-full rounded-md border bg-primary-container/40 border-input px-3 py-1 pr-9 text-sm sm:text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-text-placeholder focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 caret-black",
                    error
                        ? "ring-2 ring-error placeholder:text-error focus:placeholder:text-text-placeholder"
                        : "focus-visible:ring-2 focus-visible:ring-primary",
                    className
                )}
                {...props}
            />

            {
                !error && isPasswordType && type == 'password' &&
                <div className={"absolute right-3 top-1/2 transform -translate-y-1/2 hover:cursor-pointer"}
                     onClick={() => setShowPassword(!showPassword)}>
                    <EyeIcon className={"w-5 h-5 sm:w-6 sm:h-6"}/>
                </div>
            }

            {
                !error && isPasswordType && type == 'text' &&
                <div className={"absolute right-3 top-1/2 transform -translate-y-1/2 hover:cursor-pointer"}
                     onClick={() => setShowPassword(!showPassword)}>
                    <EyeOff className={"w-5 h-5 sm:w-6 sm:h-6"}/>
                </div>
            }

            <TooltipProvider>
                <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
                    <TooltipTrigger
                        asChild
                        onClick={(e) => {
                            e.preventDefault()
                            setTooltipOpen(!tooltipOpen)
                        }}
                        onMouseEnter={(e) => {
                            e.preventDefault()
                            setTooltipOpen(!tooltipOpen)
                        }
                        }
                    >
                        <div
                            className={cn(
                                "absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center",
                                !message ? "opacity-0 pointer-events-none" : "opacity-100 cursor-pointer"
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
    )
})

FormInput.displayName = "FormInput"

export {FormInput}