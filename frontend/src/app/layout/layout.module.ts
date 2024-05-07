import { NgModule } from '@angular/core';
import { LayoutComponent } from 'app/layout/layout.component';
import { SharedModule } from 'app/shared/shared.module';

import { PyramidLayoutModule } from './layouts/pyramid/pyramid.module';

const layoutModules = [PyramidLayoutModule];

@NgModule({
    declarations: [LayoutComponent],
    imports: [SharedModule, ...layoutModules],
    exports: [LayoutComponent, ...layoutModules],
})
export class LayoutModule {}
