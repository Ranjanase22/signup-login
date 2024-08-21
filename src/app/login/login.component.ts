import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Import Router and RouterModule

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule] // Add RouterModule here
})
export class LoginComponent implements AfterViewChecked {
  loginForm: FormGroup;
  loginFailed = false; // Track login failure

  private readonly predefinedUsername = 'user';
  private readonly predefinedPassword = 'pass';

  @ViewChild('usernameInput') usernameInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges(); // Ensure the DOM updates after view initialization
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();
  
    if (this.loginForm.controls['username'].invalid) {
      this.usernameInput.nativeElement.focus();
      return;
    }
  
    if (this.loginForm.controls['password'].invalid) {
      this.passwordInput.nativeElement.focus();
      return;
    }
  
    const { username, password } = this.loginForm.value;
  
    if (username === this.predefinedUsername && password === this.predefinedPassword) {
      console.log('Navigating to home'); // Debugging line
      this.loginFailed = false;
      localStorage.setItem('authToken', 'your-token');
      this.router.navigate(['/home']);
    } else {
      this.loginFailed = true;
      this.usernameInput.nativeElement.focus();
    }
  }
}
