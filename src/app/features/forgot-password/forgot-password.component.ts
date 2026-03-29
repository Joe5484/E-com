import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { log } from 'console';

@Component({
  selector: 'app-forgot-password',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  successMass: WritableSignal<string> = signal('');
  errorMass: WritableSignal<string> = signal('');

  stepNumber: WritableSignal<number> = signal(1);
  forgotPasswordForm!: FormGroup;
  verifyResetCodeForm!: FormGroup;
  resetPasswordForm!: FormGroup;
  ngOnInit(): void {
    this.initForms();
  }
  initForms() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required]],
    });
    this.verifyResetCodeForm = this.formBuilder.group({
      resetCode: [null, [Validators.required]],
    });
    this.resetPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      newPassword: [
        null,
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/),
        ],
      ],
    });
  }

  forgotPassword() {
    console.log(this.forgotPasswordForm.value);
    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
      next: (res) => {
        if ((res.success = 'success')) {
          console.log(res);
          this.errorMass.set('');
          this.successMass.set(res.message);
          setTimeout(() => {
            this.stepNumber.set(2);
          }, 1000);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  verifyResetCode() {
    console.log(this.verifyResetCodeForm.value);
    this.authService.verifyResetCode(this.verifyResetCodeForm.value).subscribe({
      next: (res) => {
        if ((res.success = 'success')) {
          console.log(res);
          this.errorMass.set('');
          this.successMass.set(res.message);
          setTimeout(() => {
            this.stepNumber.set(3);
          }, 1000);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  resetPassword() {
    console.log(this.resetPasswordForm.value);
    this.authService.resetPassword(this.resetPasswordForm.value).subscribe({
      next: (res) => {
        console.log(res);
        if ((res.success = 'success')) {
          console.log(res);
          this.errorMass.set('');
          this.successMass.set(res.message);
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
