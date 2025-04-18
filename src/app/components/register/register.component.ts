import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { Router, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-resgister',
  imports: [ReactiveFormsModule, NgIf, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';  

  constructor(private readonly fb: FormBuilder, private readonly authService: AuthService, private readonly router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (!this.validations())
      return;    
    this.authService.register(this.registerForm.value).subscribe({      
      next: (res) => {
        alert('Registration successful!');
        this.clear();
        this.router.navigate(['/login']);       
      }, 
      error: err => {
        let error = err.error?.details ? err.error?.details : "";
        this.errorMessage = 'Registration failed. Please try again, error: ' + error;
      }   
    });
  }

  clear() {
    this.registerForm.reset();
    this.errorMessage = "";  
  }

  backToLogin() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  validations(): boolean {
    const name = this.registerForm.get('name')?.value?.trim();
    const email = this.registerForm.get('email')?.value?.trim();
    const password = this.registerForm.get('password')?.value?.trim();
  
    if (!name || !email || !password) {
      alert("All fields are required");
      return false;
    }

    if (this.registerForm.get('email')?.errors?.['email']){
      alert("Invalid Email format");
      return false;
    }

    return true;
  }
}
