import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'borrow-tool-modal', 
  imports: [CommonModule, FormsModule],
  templateUrl: './borrow-tool.component.html',
  styleUrl: './borrow-tool.component.scss'
})
export class BorrowToolModalComponent {
  @Input() toolName: string = '';
  @Input() description: string = '';
  @Input() estimatedReturnDate: Date = new Date();
  estimatedReturnDateString: string = "";

  @Output() confirmed = new EventEmitter<Date>();
  @Output() closed = new EventEmitter<void>();

  confirm() {
    const selectedDate = new Date(this.estimatedReturnDateString);
    this.confirmed.emit(selectedDate);
  }

  close() {
    this.closed.emit();
  }

  ngOnChanges() {
    this.estimatedReturnDateString = this.estimatedReturnDate.toISOString().split('T')[0];
  }
}
