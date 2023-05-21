import { LocalStorageService } from "./../../services/local-storage.service";
import { Router } from "@angular/router";
import { AuthService } from "./../../services/auth.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createLoginForm();
  }
  ngOnDestroy() {}
  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(
        (response) => {
          this.toastrService.info(response.message);
          this.localStorageService.set(
            "token",
            response.data.accessToken.token
          );
          this.localStorageService.set("user", {
            firstName: response.data.firstName,
            lastName: response.data.lastName,
          });
          this.localStorageService.set("role", response.data.role);

          this.router.navigate(["dashboard"]);
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );
    }
  }
  /* login() {
    let loginModel = Object.assign({}, this.loginForm.value);
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login(loginModel).subscribe(
        (response) => {
          this.router.navigate(["dashboard"]);
          this.toastrService.info(response.message);
          localStorage.setItem("token", response.data.token);
        },
        (responseError) => {
          //console.log(responseError);
          this.toastrService.error(responseError.error);
        }
      );
    }
  } */
}
