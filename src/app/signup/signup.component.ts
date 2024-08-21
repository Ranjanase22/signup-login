import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MustMatch } from '../must-match.validator'; // Ensure the correct path


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule] // Assuming standalone component setup
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: MustMatch('password', 'confirmPassword') // Custom validator for password match
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.signUpForm.valid) {
      // Handle the form submission
      console.log('Form Submitted:', this.signUpForm.value);
    } else {
      this.signUpForm.markAllAsTouched(); // Trigger validation messages
    }
  }
}
