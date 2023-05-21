import { AuthService } from "src/app/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTESA: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Panel",
    icon: "ni-tv-2 text-primary",
    class: "",
  },
  {
    path: "/product",
    title: "Ürünler",
    icon: "ni-tag text-blue",
    class: "",
  },
  {
    path: "/customer-add",
    title: "Müşteri Ekle",
    icon: "ni-fat-add text-yellow",
    class: "",
  },
  {
    path: "/customer",
    title: "Müşteriler",
    icon: "ni-single-02 text-yellow",
    class: "",
  },
  {
    path: "/order",
    title: "Siparişler",
    icon: "ni-cart text-info",
    class: "",
  },
  {
    path: "/auth-settings",
    title: "Yetki Ayarları",
    icon: "ni-ui-04 text-info",
    class: "",
  },
  //{ path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Panel",
    icon: "ni-tv-2 text-primary",
    class: "",
  },
  {
    path: "/customer-add",
    title: "Müşteri Ekle",
    icon: "ni-fat-add text-yellow",
    class: "",
  },
  {
    path: "/customer",
    title: "Müşteriler",
    icon: "ni-single-02 text-red",
    class: "",
  },
  {
    path: "/order",
    title: "Siparişler",
    icon: "ni-cart text-info",
    class: "",
  },
];
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;
  private isAdmin: boolean;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    //this.menuItems = ROUTESA.filter((menuItem) => menuItem);
    this.isAdmin = this.authService.isAdmin();
    if (this.isAdmin) {
      this.menuItems = ROUTESA.filter((menuItem) => menuItem);
    } else {
      this.menuItems = ROUTES.filter((menuItem) => menuItem);
    }

    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  showPage() {
    if (!this.authService.isAdmin()) {
      return false;
    } else {
      return true;
    }
  }
}
