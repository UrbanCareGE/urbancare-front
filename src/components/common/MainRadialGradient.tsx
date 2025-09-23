import {cn} from "@/lib/utils";


interface MainRadialGradientProps {
    className?: string;
}

export const MainRadialGradient = ({className}: MainRadialGradientProps) => {
    return (
        <div
            className={cn(
                'absolute rounded-full gradient-light opacity-40 pointer-events-none blur-md transform', className
            )}
        />
    );
};