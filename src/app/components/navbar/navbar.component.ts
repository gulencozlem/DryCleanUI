import { LocalStorageService } from "./../../services/local-storage.service";
import { Component, OnInit, ElementRef } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { NavigationEnd, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { FormBuilder } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { UserForLocalStorage } from "src/app/models/userForLocalStorage";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  user: UserForLocalStorage;
  isAuthenticated: boolean;
  isAdmin: boolean;
  constructor(
    location: Location,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private element: ElementRef,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isAdmin = this.authService.isAdmin();
    this.refresh();
    this.router.events.subscribe((s) => {
      if (s instanceof NavigationEnd) {
        this.refresh();
      }
    });
  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "Dashboard";
  }

  refresh() {
    this.isAuthenticated = this.showButton();
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
  // exit() {
  //   if (this.authService.isAuthenticated() == true) {
  //     this.router.navigate(["login"]);
  //     this.authService.logout();
  //     this.toastrService.info("Çıkış Yapıldı");
  //   }
  // }
  logOut() {
    this.localStorageService.remove("token");
    this.localStorageService.remove("user");
    this.localStorageService.remove("role");
    this.router.navigate(["/login"]);
    this.isAuthenticated = false;
    this.toastrService.info("Çıkış Yapıldı");
  }
}
