import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { FuseLoadingBarModule } from '@fuse/components/loading-bar';
import { SharedModule } from 'app/shared/shared.module';
import { PyramidLayoutComponent } from './pyramid.component';

@NgModule({
    declarations: [PyramidLayoutComponent],
    imports: [
        RouterModule,
        FuseLoadingBarModule,
        SharedModule,
        MatIconModule,
        MatMenuModule,
    ],
    exports: [PyramidLayoutComponent],
})
export class PyramidLayoutModule {}
