import * as React from "react"
import {cn} from "@/lib/utils"

type AuthInputProps = {
    className?: string
    icon?: React.ReactNode
} & React.ComponentProps<"input">

const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
    ({className, icon, type, ...props}, ref) => {
        return (
            <div className="relative flex items-center">
                {icon && (
                    <span className="absolute left-3 text-gray-400">
                        {icon}
                    </span>
                )}
                <input
                    type={type}
                    className={cn(
                        "flex h-11 w-full rounded-md border border-input bg-transparent px-4 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                        icon ? "pl-10" : "",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        )
    }
)

AuthInput.displayName = "AuthInput"

export {AuthInput}