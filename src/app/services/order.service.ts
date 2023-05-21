import { Order } from "./../models/order";
import { ListResponseModel } from "./../models/listResponseModel";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  apiUrl = "https://localhost:44365/api/";
  constructor(private httpClient: HttpClient) {}
  getOrders(): Observable<ListResponseModel<Order>> {
    let newPath = this.apiUrl + "Orders/getall";
    return this.httpClient.get<ListResponseModel<Order>>(newPath);
  }
}
