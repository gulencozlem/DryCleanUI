import { ToastrService } from "ngx-toastr";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Product } from "src/app/models/product";
import { ProductService } from "src/app/services/product.service";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .dark-modal .modal-content {
        background-color: #292b2c;
        color: white;
      }
      .dark-modal .close {
        color: white;
      }
      .light-blue-backdrop {
        background-color: #5cb3fd;
      }
    `,
  ],
})
export class ProductComponent implements OnInit {
  closeResult: string;
  products: Product[] = [];
  dataLoaded = false;
  auth = false;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["id"]) {
        this.getProductsByCategory(params["id"]);
      } else {
        this.getProducts();
      }
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (response) => {
        this.products = response.data;
        this.dataLoaded = true;
        //this.toastrService.success(response.message, "Başarılı");
      }
      // ,
      // (responseError) => {
      //   this.router.navigate(["dashboard"]);
      //   this.toastrService.error(
      //     responseError.error.message,
      //     "Yetkiniz Bulunmamaktadır!"
      //   );
      // }
    );
  }
  getProductsByCategory(categoryId: number) {
    this.productService
      .getProductsByCategory(categoryId)
      .subscribe((response) => {
        this.products = response.data;
        this.dataLoaded = true;
      });
  }

  openLg(content) {
    this.modalService.open(content, { size: "lg" });
  }
}
