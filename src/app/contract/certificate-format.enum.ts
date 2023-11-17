export enum CertificateFormat {
    None = '',
    /**
     * Format the certificate in DER
     */
    Der = 1,
    /**
     * Format the certificate in PKCS #7
     */
    PKCS7 = 2,
    /**
     * Format the certificate in PKCS #12 which can include the private key
     */
    PKCS12 = 4,

    /**
     * Format certificate in PEM
     */
    PEM = 8
}