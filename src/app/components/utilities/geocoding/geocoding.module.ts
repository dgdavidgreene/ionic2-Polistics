import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GeoCodingService }     from './geocoding.service';


@NgModule({
  imports:      [ CommonModule, ReactiveFormsModule ],
  declarations: [  ],
  exports:      [  ],
  providers:    [ GeoCodingService ]
})
export class GeoCodingModule {


 }

