export interface DistinguishedName {
    /** Get or set the common name*/
    commonName: string;

    /** Get or set the country of origin */
    country: string | null;

    /** Get or set the locale or city */
    locale: string | null;

    /** Get or set the organization */
    organization: string | null;

    /** Get or set the organizational unit such as "IT Department" */
    organizationalUnit: string | null;

    /** Get or set the state or province*/
    stateProvince: string | null;
}
