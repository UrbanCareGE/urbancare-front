'use client'

import * as React from "react";
import {cn} from "@/lib/utils";
import {useFormField} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {useFormContext} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import {ErrorResponse} from "@/model/common";
import {AuthService} from "@/service/auth-service";

const OTPInput = React.forwardRef<
    HTMLInputElement,
    React.ComponentProps<"input">
>(({className, type, ...props}, ref) => {
    const {error: formError, formMessageId} = useFormField();
    const message = formError ? String(formError?.message ?? "") : "";

    const {getValues, trigger, setError} = useFormContext();

    const {mutate, isPending, error} = useMutation<
        string,
        ErrorResponse,
        string
    >({
        mutationFn: AuthService.generateOtp,
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (err) => {
            console.log(err)
        },
    });

    const handleGetOtp = async () => {
        const emailOrPhone = getValues("emailOrPhone");

        const isValid = await trigger("emailOrPhone");
        if (!isValid) return;

        if (!emailOrPhone) {
            setError("emailOrPhone", {
                type: "manual",
                message: "გთხოვთ შეიყვანოთ ელ.ფოსტა ან ტელეფონი",
            });
            return;
        }

        mutate(emailOrPhone);
    };

    return (
        <div className="flex w-full items-center gap-1">
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

            <Button
                type="button"
                onClick={handleGetOtp}
                className="h-10 sm:h-12 bg-primary text-white rounded-panel text-base md:text-sm px-2"
            >
                კოდის მიღება
            </Button>
        </div>
    );
});

OTPInput.displayName = "OTPInput";

export {OTPInput};