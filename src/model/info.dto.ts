

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
    pdfFiles: PDFFile[];
}

interface CarInfo {
    id: string;
    licensePlate: string;
    name: string;
    phone: string;
}

interface CreateApartmentDocument {
    title: string;
    fileType: "PDF" | "TEXT";
    textFileId?: string;
    pdfFiles: string[];
}

interface PDFFile {
    title: string;
    pdfFileId: string;
}

export type {ApartmentContact, ApartmentContactInfo, ApartmentDocument, PDFFile, CreateApartmentDocument, CarInfo}