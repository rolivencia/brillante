import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [RegisterComponent],
    exports: [RegisterComponent],
    imports: [CommonModule, ReactiveFormsModule],
})
export class RegisterModule {}
