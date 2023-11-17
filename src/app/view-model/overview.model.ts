export class Overview {
    private _totalCertificates: number;
    private _validCertificates: number;
    private _expiringCertificates: number;
    private _expiredCertificates: number;
    private _totalKeys: number;
    private _validKeys: number;
    private _expiringKeys: number;
    private _expiredKeys: number;

    constructor() {
        this._expiredCertificates = 0;
        this._expiredKeys = 0;
        this._expiringCertificates = 0;
        this._expiringKeys = 0;
        this._totalCertificates = 0;
        this._totalKeys = 0;
        this._validCertificates = 0;
        this._validKeys = 0;
    }

    public get expiredCertificates() { return this._expiredCertificates; }
    public set expiredCertificates(value) { this._expiredCertificates = value; }

    public get expiringCertificates() { return this._expiringCertificates; }
    public set expiringCertificates(value) { this._expiringCertificates = value; }

    public get expiredKeys() { return this._expiredKeys; }
    public set expiredKeys(value) { this._expiredKeys = value; }

    public get expiringKeys() { return this._expiringKeys; }
    public set expiringKeys(value) { this._expiringKeys = value; }

    public get totalCertificates() { return this._totalCertificates; }
    public set totalCertificates(value) { this._totalCertificates = value; }

    public get totalKeys() { return this._totalKeys; }
    public set totalKeys(value) { this._totalKeys = value; }

    public get validCertificates() { return this._validCertificates; }
    public set validCertificates(value) { this._validCertificates = value; }

    public get validKeys() { return this._validKeys; }
    public set validKeys(value) { this._validKeys = value; }
}
