import { Component, inject, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly router = inject(Router);

  isHidden:WritableSignal<boolean>=signal(true)

  successMass: WritableSignal<string> = signal('');
  errorMass: WritableSignal<string> = signal('');
  loginForm: FormGroup = this.formBuilder.group(
    {
      email: [null, [Validators.required, Validators.email]],
      password: [null,[ Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/),],],
    },
  );

  sginIn() {
    if (this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          if ((res.success = 'success')) {
            if (isPlatformBrowser(this.pLATFORM_ID)) {
              localStorage.setItem('token',res.token)
            }
            console.log(res);
            this.errorMass.set('');
            this.successMass.set(res.message);
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 2000);
            this.authService.isLogdIn.set(true)
          }
        },
        error: (err) => {
          console.log(err.error);
          this.successMass.set('');
          this.errorMass.set(err.error.message);
        },
      });
    } 
  }
}
