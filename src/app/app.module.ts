import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { ToastrModule } from "ngx-toastr";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { OrderComponent } from "./pages/order/order.component";
import { AuthSettingsComponent } from "./pages/auth-settings/auth-settings.component";
import { CustomerComponent } from "./pages/customer/customer.component";
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    BrowserAnimationsModule,
    NgbModule,
    RouterModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    OrderComponent,
    AuthSettingsComponent,
    CustomerComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
