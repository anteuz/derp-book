import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {SignupComponent} from './signup/signup.component';
import {SigninComponent} from './signin/signin.component';
import {AuthRoutingModule} from './auth-routing/auth-routing.module';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule {}
