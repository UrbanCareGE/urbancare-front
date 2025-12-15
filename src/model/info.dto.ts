

interface ApartmentContact {
    title: string;
    info: ApartmentContactInfo[];
}

interface ApartmentContactInfo {
    id: string;
    name: string;
    phone: string;
}

interface ApartmentDocument {
    id: string;
    title: string;
    fileType: "PDF" | "TEXT";
    textFileId?: string;
    pdfFileIds: string[];
}

export type {ApartmentContact, ApartmentContactInfo, ApartmentDocument}