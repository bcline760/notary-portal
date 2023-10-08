import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CertificateService } from '../../service/certificate.service';
import { CertificateAuthorityService } from '../../service/certificate-authority.service';
import { CertificateAuthority } from '../../contract/certificate-authority.contract';
import { Observable, Subscription, first, map } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { CertificateRequest } from '../../contract/certificate-request.contract';
import { SubjectAlternativeName } from '../../contract/subject-alternative-name.contract';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { KeyUsage } from 'src/app/contract/key-usage.contract';

@Component({
  selector: 'app-certificate-create',
  templateUrl: './certificate-create.component.html',
  styleUrls: ['./certificate-create.component.scss']
})
export class CertificateCreateComponent implements OnInit, OnDestroy {
  private _addSanDialogRef!: BsModalRef;
  private _advancedOptionsDialogRef!: BsModalRef;
  private _advancedDialogForm: FormGroup;
  private _certificateAuthority: CertificateAuthority | null = null;
  private _certificateRequestForm: FormGroup;
  private _issuedCertificate: Subscription | null = null;
  private _keyUsageFlag: number = 0;
  private _pageError: string | null = null;
  private _routeSub: Subscription;
  private _sanDialogForm: FormGroup;
  private _subjectDialogForm: FormGroup;
  private _subjectAlternativeNames: SubjectAlternativeName[] = [];
  private _subjectDialogRef!: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private caService: CertificateAuthorityService,
    private certSvc: CertificateService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    const that = this;
    this._routeSub = this.route.params.subscribe(s => {
      if (s['slug']) {
        that.caService.get(s['slug']).pipe(first()).subscribe(t => {
          if (!t) {
            that._pageError = 'Certificate authority not provided or is invalid';
          }
          that._certificateAuthority = t;
          that._pageError = null;
        });
      } else {
        that._pageError = 'Certificate authority not provided or is invalid';
      }
    });

    this._advancedDialogForm = this.formBuilder.group({
      keyUsage: this._buildKeyUsageControl()
    });

    this._certificateRequestForm = new FormGroup({
      commonName: new FormControl('', [
        Validators.required
      ]),
      ellipticCurve: new FormControl('P256'),
      keyAlgorithm: new FormControl('RSA', [
        Validators.required
      ]),
      keySize: new FormControl('2048', [
        Validators.min(1024)
      ]),
      lengthInYears: new FormControl(2, [
        Validators.required,
        Validators.min(1)
      ]),
      name: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(12)
      ]),
      sanList: new FormControl(),
    });

    this._sanDialogForm = new FormGroup({
      san: new FormControl('', [
        Validators.required
      ]),
      kind: new FormControl()
    });

    this._subjectDialogForm = new FormGroup({
      country: new FormControl(),
      locale: new FormControl(),
      organization: new FormControl(),
      organizationalUnit: new FormControl(),
      stateProvince: new FormControl('', [
        Validators.maxLength(2)
      ])
    });
  }

  public ngOnInit(): void {

  }

  public ngOnDestroy(): void {
    this._routeSub.unsubscribe();
    if (this._issuedCertificate != null) {
      this._issuedCertificate.unsubscribe();
    }
  }

  public onCreateCertificateSubmit(event: any) {
    if (!this._certificateRequestForm.valid || !this._advancedDialogForm.valid || !this._certificateAuthority) {
      return;
    }

    const lengthInHours: number = this._certificateRequestForm.get('lengthInYears')?.value * 8760;
    const keyAlgorithm = this._certificateRequestForm.get('keyAlgorithm')?.value;
    this._getKeyUsages(this._advancedDialogForm.value);
    let request: CertificateRequest = {
      certificatePassword: this._certificateRequestForm.get('password')?.value,
      certificateAuthoritySlug: this._certificateAuthority.slug,
      curve: keyAlgorithm == 'RSA' ? null : this._certificateRequestForm.get('ellipticCurve')?.value,
      keyAlgorithm: keyAlgorithm,
      keySize: keyAlgorithm == 'EllipticCurve' ? null : this._certificateRequestForm.get('keySize')?.value,
      keyUsage: this._keyUsageFlag,
      lengthInHours: lengthInHours,
      name: this._certificateRequestForm.get('name')?.value,
      subject: {
        commonName: this._certificateRequestForm.get('commonName')?.value,
        locale: this._subjectDialogForm.get('locale')?.value,
        organization: this._subjectDialogForm.get('organization')?.value,
        organizationalUnit: this._subjectDialogForm.get('organizationalUnit')?.value,
        stateProvince: this._subjectDialogForm.get('stateProvince')?.value,
        country: this._subjectDialogForm.get('country')?.value,
      },
      subjectAlternativeNames: this._subjectAlternativeNames,
      requestedBySlug: 'system'
    };

    const that = this;
    this._issuedCertificate = this.certSvc.issueCertificate(request).subscribe(s => {
      if (s) {
        that.router.navigate(['certificates']);
      } else {
        that._pageError = 'There was a problem issuing certificate';
      }
    });
  }

  public onAddSanClick(modal: TemplateRef<any>) {
    this._sanDialogForm.get('san')?.setValue('');
    this._sanDialogForm.get('kind')?.setValue('');

    this._addSanDialogRef = this.modalService.show(modal);
  }

  public onAdvancedOptionsDialogClick(modal: TemplateRef<any>) {
    this._advancedOptionsDialogRef = this.modalService.show(modal);
  }

  public onAdvancedOptionsDialogOk(formValue: any): void {
    this._getKeyUsages(formValue);

    this._advancedOptionsDialogRef.hide();
  }

  public onAddSanDialogOkClick() {
    const san: string | null = this._sanDialogForm.get('san')?.value;
    const kind: string | null = this._sanDialogForm.get('kind')?.value;

    if (san && kind) {
      this._subjectAlternativeNames.push({
        name: san,
        kind: kind
      });

      this._addSanDialogRef.hide();
    }
  }

  public onSubjectDialogClick(modal: TemplateRef<any>) {
    this._subjectDialogRef = this.modalService.show(modal);
  }

  public onRemoveSanClick(san: string) {
    if (!this._subjectAlternativeNames) {
      return;
    }

    const sanObject = this._subjectAlternativeNames.find(s => s.name === san);
    if (sanObject) {
      const index = this._subjectAlternativeNames.indexOf(sanObject)
      this._subjectAlternativeNames.splice(index, 1);
    } else {
      return;
    }
  }

  private _buildKeyUsageControl(): FormArray<FormControl<boolean | null>> {
    const controlArray = this._keyUsages().map(k => {
      return this.formBuilder.control(k.selected);
    })

    return this.formBuilder.array(controlArray);
  }

  private _getKeyUsages(formValue: any): void {
    const that = this;
    formValue.keyUsage.forEach((selected: any, i: number) => {
      let keyUsageValue: number = this.defaultKeyUsages[i].value;

      if (selected) {
        that._keyUsageFlag = that._keyUsageFlag | keyUsageValue;
      }
    });
  }

  private _keyUsages(): KeyUsage[] {
    return [
      { usage: 'Server Authentication', value: 1, selected: true },
      { usage: 'Client Authentication', value: 2, selected: true },
      { usage: 'Code Signing', value: 4, selected: false },
      { usage: 'E-mail Protection', value: 8, selected: false },
      { usage: 'IPSEC End System', value: 16, selected: false },
      { usage: 'IPSEC Tunnel', value: 32, selected: false },
      { usage: 'IPSEC User', value: 64, selected: false },
      { usage: 'Time Stamping', value: 128, selected: false },
      { usage: 'OCSP Signing', value: 256, selected: false },
      { usage: 'Smart Card Login', value: 512, selected: false }
    ]
  }

  public get addSanDialog(): BsModalRef { return this._addSanDialogRef; }
  public get advancedOptionsDialog(): BsModalRef { return this._advancedOptionsDialogRef; }
  public get advancedOptionsForm(): FormGroup { return this._advancedDialogForm; }
  public get certificateAuthority(): CertificateAuthority | null { return this._certificateAuthority; }
  public get certificateRequestForm(): FormGroup { return this._certificateRequestForm; }
  public get keyAlgorithm(): string { return this._certificateRequestForm.get('keyAlgorithm')?.value; }
  public get keyUsageControl(): FormArray<FormControl<boolean | null>> { return this._advancedDialogForm.get('keyUsage') as FormArray<FormControl<boolean | null>>; }
  public get defaultKeyUsages(): KeyUsage[] { return this._keyUsages(); }
  public get pageError(): string | null { return this._pageError; }
  public get sanDialogForm(): FormGroup { return this._sanDialogForm; }
  public get subjectAlternativeNames(): SubjectAlternativeName[] { return this._subjectAlternativeNames; }
  public get subjectDialogForm(): FormGroup { return this._subjectDialogForm; }
  public get subjectDialogRef(): BsModalRef { return this._subjectDialogRef; }
}
