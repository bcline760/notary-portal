import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateDetailComponent } from './certificate-detail.component';

describe('CertificateCreateComponent', () => {
  let component: CertificateDetailComponent;
  let fixture: ComponentFixture<CertificateDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CertificateDetailComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CertificateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
