import {InfoService} from "@/service/info-service";
import {cookies} from "next/headers";
import CarsSearchList from "@/components/info/CarsSearchList";

const CarsInfoPage = async () => {
    const c = await cookies();
    const authToken = c.get('auth-token')?.value ?? "";
    const cars = await InfoService.nextGetCars(authToken);

    return <CarsSearchList cars={cars}/>;
};

export default CarsInfoPage;
