import { Entity } from "./entity.contract";

export interface RevocatedCertificate extends Entity {
    /** Get or set the slug identifying the certificate*/
    certificateSlug: string;

    /** Get or set the reason the certificate was revocated */
    reason: string;

    /** Get or set the certificate serial number */
    serialNumber: string;

    /** Get or set the certificate thumbprint */
    thumbprint: string;
}
