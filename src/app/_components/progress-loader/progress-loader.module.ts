import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressLoaderComponent } from './progress-loader.component';
import { LinearSpinnerComponent } from './linear-spinner/linear-spinner.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ProgressLoaderComponent, LinearSpinnerComponent],
    exports: [ProgressLoaderComponent, LinearSpinnerComponent],
})
export class ProgressLoaderModule {}
