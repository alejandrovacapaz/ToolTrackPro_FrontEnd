import { Component, OnInit } from '@angular/core';
import { ToolService } from '../../services/tool.service';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { AddToolModalComponent } from '../add-tool/add-tool.component';
import { BorrowToolModalComponent } from '../borrow-tool/borrow-tool.component';


@Component({
  selector: 'app-tool-list.component',
  imports: [DatePipe, AsyncPipe, NgFor, NgIf, RouterModule, AddToolModalComponent, BorrowToolModalComponent],
  templateUrl: './tool-list.component.html',
  styleUrl: './tool-list.component.scss'
})
export class ToolListComponent implements OnInit {    
  tools$: Observable<any[]> | undefined;
  isModalOpen = false;
  isAddModalOpen = false;
  selectedTool: any = null;
  estimatedReturnDate: Date = new Date();

  constructor(private readonly toolService: ToolService, private readonly authService: AuthService, 
              private readonly router: Router, private readonly notificationService: NotificationService) {}       

  ngOnInit(): void {
    this.getAvailableTools();
  }

  getAvailableTools() {
    this.tools$ = this.toolService.getAvailableTools();
  }
  
  returnTool(tool: any): void {    
    this.toolService.returnTool({ borrowId: tool.borrowId, returnDate: new Date()}).subscribe({
      next: () => { this.getAvailableTools(); alert(`Tool "${tool.toolName}" returned!`); },
      error: err => alert('Return failed: ' + err.message),
    });
  }

  isReturnEnabledForUser(userEmail: string): boolean {
    return this.authService.getUserEmail() === userEmail;
  }

  openBorrowModal(tool: any) {
    this.selectedTool = tool;
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 7);
    this.estimatedReturnDate = defaultDate;
    this.isModalOpen = true;
  }

  onBorrowModalConfirmed(date: Date) {
    const userId = this.authService.getUserIdFromToken();
    const data = {
      toolId: this.selectedTool.toolId,
      userId: userId,
      estimatedReturnDate: date
    };
    this.toolService.borrowTool(data).subscribe({
      next: (res) => {
        this.getAvailableTools();
        this.isModalOpen = false;
        alert(`Tool "${this.selectedTool.toolName}" borrowed!`);  
      }, 
      error: err => {
        let error = err.error?.details ? err.error?.details : "";
        this.isModalOpen = false;
        alert("Error Borrowing Tool " + error);              
      }      
    });
  }

  onBorrowModalClosed() {
    this.isModalOpen = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
  openAddToolModal() {    
    this.isAddModalOpen = true;
  }

  onToolAdded(tool: { name: string; description: string }) {    
    this.toolService.addTool(tool).subscribe({
      next: (res) => {
        this.isAddModalOpen = false;              
        this.getAvailableTools();        
      }, 
      error: err => {
        let error = err.error?.details ? err.error?.details : "";
        this.isAddModalOpen = false; 
        alert("Error Adding Tool " + error)              
      }
    });
  }

  onAddToolModalClosed() {
    this.isAddModalOpen = false;
  }
  
  sendOverdueNotifications() {
    this.notificationService.OverdueToolNotification();
  }
}