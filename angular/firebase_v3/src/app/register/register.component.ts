import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/AuthService.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['usuario', Validators.required] // 👈 Campo de rol con valor por defecto
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password, role } = this.registerForm.value;
      this.authService.register(email, password, role)
        .then((res) => console.log('Usuario registrado:', res))
        .catch((err) => this.errorMessage = err.message);
    }
  }
}

