import {InfoService} from "@/service/info-service";
import {cookies} from "next/headers";
import CarsSearchList from "@/components/info/CarsSearchList";

interface PageProps {
    params: Promise<{ apartmentId: string }>;
}

const CarsInfoPage = async ({params}: PageProps) => {
    const {apartmentId} = await params;
    const c = await cookies();
    const authToken = c.get('auth-token')?.value ?? "";
    const cars = await InfoService.nextGetCars(authToken, apartmentId);

    return <CarsSearchList cars={cars}/>;
};

export default CarsInfoPage;
