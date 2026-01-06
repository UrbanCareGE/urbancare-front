import React from "react";
import {ProfileCompletionModal} from "@/components/profile/ProfileCompletionModal";

interface ApartmentLayoutProps {
    children: React.ReactNode;
    params: Promise<{ apartmentId: string }>;
}

// Apartment access validation is handled by:
// 1. Middleware - checks auth token exists
// 2. Client-side AuthProvider - validates apartment access
// This layout just passes through to avoid duplicate API calls
export default async function ApartmentLayout({children}: ApartmentLayoutProps) {
    return <>{children} <ProfileCompletionModal/></>;
}
