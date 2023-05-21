import { ToastrService } from "ngx-toastr";
import { CustomerService } from "./../../services/customer.service";
import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { UserForLocalStorage } from "src/app/models/userForLocalStorage";
import { AuthService } from "src/app/services/auth.service";
import { LocalStorageService } from "src/app/services/local-storage.service";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
@Component({
  selector: "app-customer-add",
  templateUrl: "./customer-add.component.html",
  styleUrls: ["./customer-add.component.scss"],
})
export class CustomerAddComponent implements OnInit {
  user: UserForLocalStorage;
  isAuthenticated: boolean;
  public customerAddForm: FormGroup;
  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.createCustomerAddForm();
    this.refresh();
    this.router.events.subscribe((s) => {
      if (s instanceof NavigationEnd) {
        this.refresh();
      }
    });
  }
  refresh() {
    this.isAuthenticated = this.showButton();
    console.log("is auth ? = " + this.isAuthenticated);
    if (this.isAuthenticated) {
      this.user = this.localStorageService.get<UserForLocalStorage>("user");
    }
  }
  showButton() {
    if (!this.authService.isAuthenticated()) {
      return false;
    } else {
      return true;
    }
  }

  createCustomerAddForm() {
    this.customerAddForm = this.formBuilder.group({
      firstName: ["", Validators.nullValidator],
      lastName: ["", Validators.nullValidator],
      isCommencal: ["", Validators.nullValidator],
      phoneNumber: ["", Validators.required],
      email: ["", Validators.email],
    });
  }

  add() {
    if (this.customerAddForm.valid) {
      let customerModel = Object.assign({}, this.customerAddForm.value);
      this.customerService.add(customerModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, "Başarılı");
        },
        (responseError) => {
          this.toastrService.error("Doğrulama Hatası");
          // if (responseError.error.ValidationErrors.length > 0) {

          //   for (
          //     let i = 0;
          //     i < responseError.error.ValidationErrors.length;
          //     i++
          //   ) {
          //     this.toastrService.error(
          //       responseError.error.ValidationErrors[i],
          //       "Doğrulama Hatası"
          //     );
          //   }
          // }
        }
      );
    } else {
      this.toastrService.error(
        "Lütfen gerekli alanları doldurun !",
        "Bilgiler Eksik"
      );
    }
  }
}
