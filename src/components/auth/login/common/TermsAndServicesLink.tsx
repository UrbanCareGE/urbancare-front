import Link from "next/link";
import React from "react";

export const TermsAndServicesLink = () => {
    return (
        <label className={"text-sm text-center text-gray-500"}>
            ავტორიზაციით შენ ეთანხმები&nbsp;
            <Link href={"/auth/register"} className={"text-primary"}>
                წესები და პირობები
            </Link>
            &nbsp;და&nbsp;
            <Link href={"/auth/register"} className={"text-primary"}>
                უსაფრთხოება
            </Link>
        </label>
    );
};
