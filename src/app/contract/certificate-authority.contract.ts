import { DistinguishedName } from "./distinguished-name.contract";
import { Entity } from "./entity.contract";

export interface CertificateAuthority extends Entity {
    /** Get or set the CA distinguished name */
    distinguishedName: DistinguishedName

    /** Get or set whether this CA can issue certificates */
    isIssuer: boolean;

    /** Get or set the distinguished name that issued this CA */
    issuingDn: DistinguishedName;

    /** Get or set serial number used to issue this CA */
    issuingSerialNumber: string;

    /** Get or set the thumbprint of the CA certificate */
    issuingThumbprint: string;

    /** Get or set the algorithm used to create the private key */
    keyAlgorithm: "RSA" | "EllipticCurve";

    /** Get or set the elliptic curve for the private */
    keyCurve: "P256" | "P384" | "P521" | "P256K" | null;

    /** Get or set the length of the RSA private key used*/
    keyLength: number | null;

    /** Get or set the certificate authority name */
    name: string;

    /** Get or set the parent certificate authority slug */
    parentCaSlug: string | null;

}
