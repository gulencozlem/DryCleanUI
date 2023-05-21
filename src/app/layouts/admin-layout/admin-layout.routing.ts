import { CustomerComponent } from "./../../pages/customer/customer.component";
import { CustomerAddComponent } from "./../../pages/customer-add/customer-add.component";
import { AdminGuard } from "./../../guards/admin.guard";
import { AuthSettingsComponent } from "./../../pages/auth-settings/auth-settings.component";
import { OrderComponent } from "./../../pages/order/order.component";
import { LoginGuard } from "./../../guards/login.guard";
import { ProductComponent } from "./../../pages/product/product.component";
import { Routes } from "@angular/router";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "customer-add", component: CustomerAddComponent },
  { path: "customer", component: CustomerComponent },
  {
    path: "auth-settings",
    component: AuthSettingsComponent,
    canActivate: [AdminGuard],
  },
  {
    path: "product",
    component: ProductComponent,
    canActivate: [LoginGuard],
  },
  { path: "order", component: OrderComponent },
  {
    path: "product/category/:id",
    component: ProductComponent,
  },
];
