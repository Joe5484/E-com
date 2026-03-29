import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
 private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);

  showCurrentPass: boolean = false;
  showNewPass: boolean = false;
  showConfirmPass: boolean = false;

  passwordForm: FormGroup = this.formBuilder.group({
    currentPassword: [null, [Validators.required]],
    password: [null, [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/)]],
    rePassword: [null, [Validators.required]],
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

  togglePass(field: string) {
    if (field === 'current') {
      this.showCurrentPass = !this.showCurrentPass;
    } else if (field === 'new') {
      this.showNewPass = !this.showNewPass;
    } else if (field === 'confirm') {
      this.showConfirmPass = !this.showConfirmPass;
    }
  }

  changePassword() {
    if (this.passwordForm.valid) {
      this.authService.changePassword(this.passwordForm.value).subscribe({
        next: (res) => {
          console.log('password changed', res);
          this.passwordForm.reset();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }


  profileForm: FormGroup = this.formBuilder.group({
  name: [null, [Validators.required]],
  email: [null, [Validators.required, Validators.email]],
  phone: [null, [Validators.required, Validators.pattern(/^(\+20|0)?1[0125][0-9]{8}$/)]],
});

updateUserData() {
  if (this.profileForm.valid) {
    this.authService.updateUserData(this.profileForm.value).subscribe({
      next: (res) => {
        console.log('user updated', res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
}
