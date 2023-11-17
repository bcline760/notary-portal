import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { CertificateService } from '../../service/certificate.service';
import { CertificateAuthorityService } from '../../service/certificate-authority.service';
import { CertificateAuthority } from '../../contract/certificate-authority.contract';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Certificate } from '../../contract/certificate.contract';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatTable } from '@angular/material/table';
import { CertificateDownloadRequest } from 'src/app/contract/certificate-download-request.contract';

@Component({
  selector: 'app-certificate-list',
  templateUrl: './certificate-list.component.html',
  styleUrls: ['./certificate-list.component.scss']
})
export class CertificateListComponent implements OnInit, OnDestroy, AfterViewInit {
  private _caList$: Observable<CertificateAuthority[]> | null;
  private _caSelectFg: FormGroup;
  private _certificates: Certificate[];
  private _certificateSlug: string = '';
  private _certificateSub: Subscription | null;
  private _displayedColumns: string[] = ['name', 'notAfter', 'serialNumber', 'download', 'delete'];
  private _downloadModalRef: BsModalRef | null;
  private _downloadForm: FormGroup;
  private _downloadSubscription: Subscription | null = null;
  private _routeSub: Subscription
  private _selectedCaSlug: string | null = null;
  private _showTable: boolean = false;

  @ViewChild('certificateTable', { static: true }) table!: MatTable<Certificate[]>;


  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private certSvc: CertificateService,
    private caService: CertificateAuthorityService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const that = this;
    this._downloadModalRef = null;
    this._caList$ = null;
    this._certificates = [];
    this._certificateSub = null;
    this._routeSub = this.route.queryParamMap.subscribe((p: ParamMap) => {
      that._selectedCaSlug = p.get('slug');
    });

    this._caSelectFg = new FormGroup({
      caList: new FormControl(this._selectedCaSlug, [
        Validators.required
      ])
    });

    this._downloadForm = new FormGroup({
      format: new FormControl('', Validators.required),
      password: new FormControl({ value: '', disabled: true })
    });
  }

  public ngAfterViewInit(): void {
    if (this.table) {
      this.table.renderRows();
    }
  }

  public ngOnDestroy(): void {
    this._routeSub.unsubscribe();
    if (this._certificateSub != null) {
      this._certificateSub.unsubscribe();
    }

    if (this._downloadSubscription != null) {
      this._downloadSubscription.unsubscribe();
    }
  }

  public ngOnInit(): void {
    this._caSelectFg.get('caList')?.setValue('none');
    this._caList$ = this.caService.getAll();
    if (this._selectedCaSlug) {
      this._certificateSub = this.caService.getCertificates(this._selectedCaSlug).subscribe(s => {
        this._certificates = s;

        if (this.table) {
          this.table.renderRows();
        }
      });
    }
  }

  public onCertificateCreateClick(event: any) {
    this.router.navigate(['certificates', 'detail']);
  }

  public onChangeCaList(event: any) {
    if (!this.selectedCaSlug) {
      this._showTable = false;
      return;
    }
    this._showTable = true;

    if (this.selectedCaSlug !== null) {
      this._certificateSub = this.caService.getCertificates(this.selectedCaSlug).subscribe(s => {
        this._certificates = s;
      });
    }
  }

  public onDeleteCertificateClick(slug: string): void {
    this._certificateSlug = slug;
  }

  public onDownloadCertificateClick(modal: TemplateRef<any>, slug: string) {
    this._certificateSlug = slug;
    this._downloadModalRef = this.modalService.show(modal);
  }

  public onDownloadCertificateFormatClick(event: any): void {
    console.log(this.selectedFormat);
    if (this.selectedFormat == 'Pkcs12') {
      this._downloadForm.get('password')?.enable();
    } else {
      this._downloadForm.get('password')?.disable();
    }
  }

  public onDownloadModalOk(slug: string) {
    if (this._downloadSubscription != null) {
      this._downloadSubscription.unsubscribe();
    }
    const request: CertificateDownloadRequest = {
      format: this.selectedFormat,
      password: this.downloadPassword,
      slug: this._certificateSlug
    };

    const that = this;
    this._downloadSubscription = this.certSvc.downloadCertificate(request).subscribe(s => {
      // const name = this._model.name.replace(re, '-').toLocaleLowerCase();
      const a = document.createElement('a');
      const objUrl = URL.createObjectURL(s);
      a.href = objUrl;
      // a.download = `${name}.${format}`;
      // a.click();
      URL.revokeObjectURL(objUrl);
    });
    this._downloadModalRef?.hide();
  }

  public onDownloadModalCancel() {
    if (this._downloadSubscription != null) {
      this._downloadSubscription.unsubscribe();
    }
    this._downloadModalRef?.hide();
  }

  //#region Properties
  public get caList$(): Observable<CertificateAuthority[]> | null { return this._caList$; }
  public get caSelectFg(): FormGroup { return this._caSelectFg; }
  public get certificates(): Certificate[] { return this._certificates; }
  public get downloadForm(): FormGroup { return this._downloadForm; }
  public get downloadPassword(): string { return this._downloadForm.get('password')?.value; }
  public get displayedColumns(): string[] { return this._displayedColumns; }
  public get selectedCaSlug(): string { return this._caSelectFg.get('caList')?.value; }
  public get selectedFormat(): "Der" | "Pkcs7" | "Pkcs12" | "Pem" { return this._downloadForm.get('format')?.value; }
  public get showTable(): boolean { return this._showTable; }
  //#endregion
}
