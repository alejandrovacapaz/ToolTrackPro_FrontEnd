import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToolService } from '../../services/tool.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-return-tool',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './return-tool.component.html',
  styleUrl: './return-tool.component.scss'
})
export class ReturnToolComponent {
  returnForm: FormGroup;
  successMessage = '';

  constructor(private readonly fb: FormBuilder, private readonly toolService: ToolService) {
    this.returnForm = this.fb.group({
      toolId: ['', Validators.required],
      userId: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.toolService.returnTool(this.returnForm.value).subscribe(() => {
      this.successMessage = 'Tool returned successfully!';
      this.returnForm.reset();
    });
  }
}
