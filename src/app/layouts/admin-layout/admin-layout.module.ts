import { CustomerAddComponent } from "./../../pages/customer-add/customer-add.component";
import { FlashCardsComponent } from "./../../pages/flash-cards/flash-cards.component";
import { CategoryComponent } from "./../../pages/category/category.component";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ClipboardModule } from "ngx-clipboard";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "./../../pages/icons/icons.component";
import { ProductComponent } from "./../../pages/product/product.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
  ],
  declarations: [
    DashboardComponent,
    CustomerAddComponent,
    TablesComponent,
    IconsComponent,
    ProductComponent,
    CategoryComponent,
    FlashCardsComponent,
  ],
})
export class AdminLayoutModule {}
