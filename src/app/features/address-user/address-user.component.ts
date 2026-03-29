import { AuthService } from './../../core/services/auth/auth.service';
import { Component, computed, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { UserAddressService } from '../../core/services/user-address.service';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Iadress } from '../../core/models/iadress.interface';

@Component({
  selector: 'app-address-user',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './address-user.component.html',
  styleUrl: './address-user.component.css',
})
export class AddressUserComponent implements OnInit {
  private readonly userAddressService = inject(UserAddressService);
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);

  isLogdIn: Signal<boolean> = computed(() => this.authService.isLogdIn());
  adressList: WritableSignal<Iadress[]> = signal([]);
  selectedAddressId: string = '';

  addressForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    details: [null, [Validators.required]],
    phone: [null, [Validators.required, Validators.pattern(/^(\+20|0)?1[0125][0-9]{8}$/)]],
    city: [null, [Validators.required]],
  });

  editForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    details: [null, [Validators.required]],
    phone: [null, [Validators.required, Validators.pattern(/^(\+20|0)?1[0125][0-9]{8}$/)]],
    city: [null, [Validators.required]],
  });

  ngOnInit(): void {
    this.getLoggedAdressUser();
  }

  addAddress() {
    if (this.addressForm.valid) {
      this.userAddressService.addAddress(this.addressForm.value).subscribe({
        next: (res) => {
          console.log('adress', res);
          this.getLoggedAdressUser();
          this.addressForm.reset();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  getLoggedAdressUser() {
    this.userAddressService.getLoggedAdressUser().subscribe({
      next: (res) => {
        console.log(res);
        this.adressList.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteAddress(addressId: string) {
    this.userAddressService.deleteAddress(addressId).subscribe({
      next: (res) => {
        console.log('deleted', res);
        this.getLoggedAdressUser();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

 openEditModal(addressId: string) {
  this.selectedAddressId = addressId;
  this.userAddressService.getAddressById(addressId).subscribe({
    next: (res) => {
      console.log('address', res);
      this.editForm.patchValue({
        name: res.data.name,
        details: res.data.details,
        phone: res.data.phone,
        city: res.data.city,
      });

      const modal = document.getElementById('edit-modal');
      if (modal) {
        modal.classList.remove('hidden');
      }
    },
    error: (err) => {
      console.log(err);
    },
  });
}

updateAddress() {
  if (this.editForm.valid) {
    this.userAddressService.updateAddress(this.selectedAddressId, this.editForm.value).subscribe({
      next: (res) => {
        console.log('updated', res);
        this.getLoggedAdressUser();
        this.editForm.reset();
        const modal = document.getElementById('edit-modal');
        if (modal) {
          modal.classList.add('hidden');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
}