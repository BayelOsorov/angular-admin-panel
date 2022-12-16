export interface IDetailLegalContractor {
    id: number;
    name: string;
    tin: string;
    okpo: string;
    registrationAddress: string;
    actualAddress: string;
    foundingDate: Date;
    bic: string;
    phone: string;
}
export interface IDetailLegalContractorEmployee {
    id: number;
    name: string;
    userId: string;
    position: string;
}
export interface IDetailLegalContractorBeneficiary {
    id: number;
    name: string;
    type: string;
}
