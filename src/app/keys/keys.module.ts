import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeysRoutingModule } from './keys-routing.module';
import { KeysComponent } from './keys.component';


@NgModule({
  declarations: [
    KeysComponent
  ],
  imports: [
    CommonModule,
    KeysRoutingModule
  ]
})
export class KeysModule { }
