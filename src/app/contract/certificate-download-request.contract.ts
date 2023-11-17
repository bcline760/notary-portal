export interface CertificateDownloadRequest {
    /** Get or set the format of the certificate to be downloaded*/
    format: "Der" | "Pkcs7" | "Pkcs12" | "Pem";

    /** Get or set the password if the format is PKCS #12*/
    password: string | null;

    /** Get or set the slug identifying the certificate to be downloaded */
    slug: string;
}
