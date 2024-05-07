import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderModule } from './components/loader/loader.module';
import { UnauthorizedRoutingComponent } from './components/unauthorized-routing/unauthorized-routing.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LoaderModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LoaderModule
    ],
    declarations: [
    
    UnauthorizedRoutingComponent
  ]
})
export class SharedModule
{
}
