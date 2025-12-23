import {InfoService} from "@/service/info-service";
import {cookies} from "next/headers";
import {Separator} from "@/components/ui/separator";
import {Card} from "@/components/ui/card";

interface PageProps {
    params: Promise<{ apartmentId: string }>;
}

const ContactInfoPage = async ({params}: PageProps) => {
    const {apartmentId} = await params;
    const c = await cookies();
    const authToken = c.get('auth-token')?.value ?? "";
    const resp = await InfoService.nextGetContacts(authToken, apartmentId)

    return (
        <ul className={"px-4 pb-3"}>{
            resp.map((apt, index) => (
                <Card key={index} className={"mt-3 px-3 py-2"}>
                    <h3 className={"font-semibold text-lg"}>{apt.title}</h3>
                    <Separator className={"mt-1"}/>
                    <ul>{
                        apt.info.map((info) => (
                            <li key={info.id} className={"mt-2"}>{info.name}: {info.phone}</li>
                        ))
                    }</ul>
                </Card>
            ))
        }</ul>
    );
};

export default ContactInfoPage;
