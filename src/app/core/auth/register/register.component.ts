import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  successMass: WritableSignal<string> = signal('');
  errorMass: WritableSignal <string> = signal('');
  registerForm: FormGroup = this.formBuilder.group(
    {
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
       [ Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/)]
      ],
      rePassword: [null,[ Validators.required]],
      phone: [null,[ Validators.required, Validators.pattern(/^(\+20|0)?1[0125][0-9]{8}$/)]],
    },
    { validators: this.confirmPassword },
  );

  confirmPassword(group: any) {
    let passwordValue = group.get('password').value;
    let rePasswordValue = group.get('rePassword').value;

    if (passwordValue===rePasswordValue) {
      return null;
    } else {
      return { mismatch: true };
    }
  }

  sginUp() {
    if (this.registerForm.valid) {

      this.authService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.success ='success') {
            console.log(res);
            this.errorMass.set('');
            this.successMass.set(res.message);
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3000);
          }
        },
        error: (err) => {
          console.log(err.error);
          this.successMass.set('');
          this.errorMass.set(err.error.message)
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
  }
