import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { Router, RouterLink, RouterModule} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, RouterModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private readonly router: Router, private readonly fb: FormBuilder, private readonly authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });    
  }

  onSubmit(): void {
    if (!this.validations())
      return;
     
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.authService.setToken(res.token);
        this.authService.setUserEmail(this.loginForm.get('email')?.value)
        this.loginForm.reset();
        this.router.navigate(['/tool-list']);      
      }, 
      error: err => {
        let error = err.error?.details ? err.error?.details : "";
        this.errorMessage = 'Login failed. Please try again, ' + error;
      }
    });
  }

  validations(): boolean {   
    const email = this.loginForm.get('email')?.value?.trim();
    const password = this.loginForm.get('password')?.value?.trim();
  
    if (!email || !password) {
      alert("All fields are required");
      return false;
    }

    if (this.loginForm.get('email')?.errors?.['email']){
      alert("Invalid Email format");
      return false;
    }

    return true;
  }
}
