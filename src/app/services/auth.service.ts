import { UserLoginResultModel } from "./../models/userLoginResultModel";
import { SingleResponseModel } from "./../models/singleResponseModel";
import { Observable } from "rxjs";
import { LocalStorageService } from "./local-storage.service";
import { HttpClient } from "@angular/common/http";
import { LoginModel } from "./../models/loginModel";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  apiUrl = "https://localhost:44365/api/Auth/";
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}
  login(
    loginModel: LoginModel
  ): Observable<SingleResponseModel<UserLoginResultModel>> {
    return this.httpClient.post<SingleResponseModel<UserLoginResultModel>>(
      this.apiUrl + "login",
      loginModel
    );
  }
  isAuthenticated() {
    let token = this.localStorageService.getString("token");
    if (token != null) {
      return true;
    } else {
      return false;
    }
  }
  isAdmin() {
    let roleName = this.localStorageService.getString("role");
    if (roleName.includes("admin")) {
      return true;
    } else {
      return false;
    }
  }
}
