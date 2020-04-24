import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule,routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
/*== local imports ==*/
/* import { Login } from './login/login.component';
import { Dashboard } from './Dashboard/dashboard.component'; */
import { TtsService } from './services/ttsservice.service';
import { Authinterceptor } from './services/auth.interceptor';
import { Logingaurd } from './services/login-gaurd.service';

/* pipes */
import { Datetimefilter } from './filters/datetime.pipe';

@NgModule({
  declarations: [
    AppComponent,
    routingComponent,
    Datetimefilter
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [
    TtsService,
    Logingaurd,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:Authinterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
