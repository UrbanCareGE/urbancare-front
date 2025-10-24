import {JAVA_API_URL} from "@/lib/api-client";
import {cookies} from "next/headers";

async function createUrgent(form: FormData) {
    'use server'

    const c = await cookies();

    const data: string = form.get("content")! as string;

    await fetch(`${JAVA_API_URL}/api/secure/urgent/68efd03837b62ea34882f812/create`,
        {
            method: "POST",
            body: JSON.stringify({content: data}),
            headers: {
                "Content-Type": "application/json",
                Authorization: c.get('auth-token')?.value ?? 'none'
            }
        });
}

function Page() {
    return (
        <form action={createUrgent}>
            <input
                type={"text"}
                name="content"
                placeholder={"შეიყვანეთ აღწერა"}
                required={true}
            />
            <button type="submit">BARO</button>
        </form>
    );
}

export default Page;