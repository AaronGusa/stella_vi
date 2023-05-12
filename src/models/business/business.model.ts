import { Address } from "../address.model";
import { BusinessServices } from "./business_services.model";

export interface Business {
    bus_name: string;
    discipline: string;
    address: Address;
    phone: string;
    email: string;
    website: string;
    services: BusinessServices;
    rating: number;
}