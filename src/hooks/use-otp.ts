import {useMutation} from "@tanstack/react-query";
import {ErrorResponse} from "@/model/common.dto";
import {AuthService} from "@/service/auth-service";
import {useFormContext} from "react-hook-form";

export function useOtp() {
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

    return {mutate, isPending, error, handleGetOtp};
}