import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'add-tool-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-tool.component.html',
  styleUrl: './add-tool.component.scss'
})
export class AddToolModalComponent {
  toolName: string = '';
  description: string = '';

  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<{ name: string; description: string }>();

  confirm() {
    if (!this.toolName.trim()) {
      alert('Tool name is required.');
      return;
    }

    this.confirmed.emit({ name: this.toolName.trim(), description: this.description.trim() });
  }

  close() {
    this.closed.emit();
  }
}
