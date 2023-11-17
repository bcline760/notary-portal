export interface Entity {
    /** Get or set whether the entity is considered active */
    active: boolean;

    /** Get or set when the entity was created */
    created: Date;

    /** Get or set who created the entity */
    createdBy: string;

    /** Get or set the slug identity of the entity */
    slug: string;

    /** Get or set when the entity was updated */
    updated: Date | null;

    /** Get or set who last updated the entity */
    updatedBy: string | null;
}
