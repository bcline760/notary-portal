import { DistinguishedName } from './distinguished-name.contract';
import { SubjectAlternativeName } from './subject-alternative-name.contract';

export interface CertificateRequest {
    certificateAuthoritySlug: string;
    certificatePassword: string;
    curve: "P256" | "P384" | "P521" | "P256K" | null;
    keyAlgorithm: "RSA" | "EllipticCurve";
    keySize: number | null;
    keyUsage: number;
    lengthInHours: number;
    name: string;
    subject: DistinguishedName;
    subjectAlternativeNames: SubjectAlternativeName[] | null;
    requestedBySlug: string;
}
