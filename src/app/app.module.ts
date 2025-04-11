import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { ToolListComponent } from './components/tool-list/tool-list.component';
import { BorrowToolComponent } from './components/borrow-tool/borrow-tool.component';
import { ReturnToolComponent } from './components/return-tool/return-tool.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ToolService } from './services/tool.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    ToolListComponent,
    BorrowToolComponent,
    ReturnToolComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ToolService, AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
