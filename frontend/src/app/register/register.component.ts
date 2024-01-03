import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {  RouterModule } from '@angular/router';
import { AuthService,Credential } from '../services/auth.service';
import {  inject } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';

interface SignUpForm {
 firstName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ RouterModule,ReactiveFormsModule,NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

hide=true;
formBuilder = inject(FormBuilder);

  registerForm: FormGroup<SignUpForm> = this.formBuilder.group({
    firstName: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  private authService = inject(AuthService);

 async signUp() :Promise<void> {
    if (this.registerForm.invalid) return;
     {
      const credential: Credential = {
        email: this.registerForm.value.email || '',
        password: this.registerForm.value.password || '',
        firstName: this.registerForm.value.firstName || '',

      };
  
      try {
      const UserCredential=  await this.authService.signUpWithEmailAndPassword(credential);
      console.log(UserCredential);
        this.router.navigate(['/dashboard']);
      } catch (error) {
     
      console.log(this.registerForm.value);
    }
  }
}
async signInWithGoogleProvider(): Promise<void> {
  try {
    const user = await this.authService.signInWithGoogleProvider()        ;
    console.log(user);
    this.router.navigate(['/dashboard']);
  } catch (error) {
    console.error(error);
  }
}





  constructor(private router: Router) {}
  goToLogin() {
    this.router.navigate(['/login']);
  }
}

