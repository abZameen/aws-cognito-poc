import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyMaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AuthService, UserService } from './services';
import { UsersComponent } from './users/users.component';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
