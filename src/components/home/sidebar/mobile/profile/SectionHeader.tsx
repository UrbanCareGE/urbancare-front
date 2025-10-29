import {TypographyLead} from "@/components/common/text/Typography";

type SectionHeaderProps = {
    value: string
    className?: string
}

export const SectionHeader = ({value, className}: SectionHeaderProps) => {
    return (
        <TypographyLead className={"text-start text-gray-600 font-semibold text-xl my-2"}>
            {value}
        </TypographyLead>
    );
};
