import { DistinguishedName } from "./distinguished-name.contract";
import { Entity } from "./entity.contract";
import { SubjectAlternativeName } from "./subject-alternative-name.contract";

export interface Certificate extends Entity {
    /** Get or set the algorithm used for the private key */
    alg: "RSA" | "EllipticCurve";

    /** Get or set the slug of the issuing certificate authority */
    caSlug: string;

    /** Get or set the elliptic curve used for the private key */
    curve: "P256" | "P384" | "P521" | "P256K" | null;

    /** Get or set whether is a certificate authority certificate */
    isCa: boolean;

    /** Get or set the issuer of the certificate */
    issuer: DistinguishedName;

    /** Get or set certificate key usage flags */
    keyUsage: number;

    /** Get or set the name of the certificate */
    name: string;

    /** Get or set when the certificate expires */
    notAfter: Date;

    /** Get or set when the certificate is valid */
    notBefore: Date;

    /** Get or set when the certificate was revocated */
    revocationDate: Date | null;

    /** Get or set a list of subject alternative names */
    san: SubjectAlternativeName[];

    /** Get or set the certificate's serial number */
    serialNumber: string;

    /** Get or set the algorithm used to generate the certificate's signature */
    sigAlg: string;

    /** Get or set the certificate subject distinguished name */
    subject: DistinguishedName;

    /** Get or set the certificate's thumbprint */
    thumbprint: string;
}
