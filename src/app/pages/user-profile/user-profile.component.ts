import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { UserForLocalStorage } from "src/app/models/userForLocalStorage";
import { NavigationEnd, Router } from "@angular/router";
import { LocalStorageService } from "src/app/services/local-storage.service";
@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  user: UserForLocalStorage;
  isAuthenticated: boolean;
  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
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
}
