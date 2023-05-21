import { CustomerService } from "./../../services/customer.service";
import { Component, OnInit } from "@angular/core";
import { Customer } from "src/app/models/customer";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
//import { MatDialogRef } from "@angular/material/dialog";
import Swal from "sweetalert2";
@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.scss"],
})
export class CustomerComponent implements OnInit {
  deletedCustomer: Customer;
  public customers: any = [];
  //customers: Customer[] = [];

  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router //private customerDeleteModal: MatDialogRef<CustomerComponent>, //private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getCustomer();
  }

  // delete(customer: Customer) {
  //   this.customerService.delete(customer).subscribe(
  //     (response) => {
  //       this.toastrService.success(
  //         customer.firstName +
  //           " " +
  //           customer.lastName +
  //           " isimli müşteri silindi",
  //         "Silme işlemi başarılı"
  //       );
  //       this.closeCarDeleteModal();
  //     },
  //     (errorResponse) => {
  //       this.toastrService.error(
  //         errorResponse.error.message,
  //         "Silme işlemi başarısız"
  //       );
  //     }
  //   );
  // }

  // closeCarDeleteModal() {
  //   this.customerDeleteModal.close();
  // }

  // delete(customer: Customer) {
  //   Swal.fire({
  //     title: "customer.firstName adli müşteriyi silmek istediğine emin misin?",
  //     showCancelButton: true,
  //     showConfirmButton: false,
  //     showDenyButton: true,
  //     denyButtonText: "Evet, Sil",
  //   }).then((result) => {
  //     /* Read more about isConfirmed, isDenied below */
  //     if (result.isDenied) {
  //       this.customerService.delete(customer).subscribe(
  //         (response) => {
  //           Swal.fire("Silindi", "", "success");
  //           this.closeCarDeleteModal();
  //         },
  //         (erorResponse) => {
  //           console.log(errorResponse);
  //         }
  //       );
  //     }
  //   });
  // }

  delete(customer: Customer) {
    Swal.fire({
      title: "Emin misin?",
      text: "Bu işlem geri alınamaz!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet, sil",
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.delete(customer).subscribe(
          (response) => {
            console.log("Silinmek için gelen müşteri :", customer);
            Swal.fire("Silindi!", "Müşteri Silindi", "success");
            //this.closeCarDeleteModal();
          },
          (errorResponse) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Hata",
            });
            console.log("Silinmek için gelen müşteri :", customer);
          }
        );
      }
    });
  }
  getCustomer() {
    this.customerService.getCustomer().subscribe((response) => {
      this.customers = response.data;

      this.toastrService.success(response.message, "Başarılı");
    });
  }

  hazirlaniyor() {
    Swal.fire({
      icon: "info",
      title: "Hazırlanıyor..",
      text: "Bu işlem en kısa sürede hazırlanacak!",
    });
  }
}
