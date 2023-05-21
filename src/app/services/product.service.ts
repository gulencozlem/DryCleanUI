import { Product } from "./../models/product";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ListResponseModel } from "../models/listResponseModel";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  apiUrl = "https://localhost:44365/api/";
  constructor(private httpClient: HttpClient) {}
  getProducts(): Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + "Product/getall";
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }
  getProductsByCategory(
    categoryId: number
  ): Observable<ListResponseModel<Product>> {
    let newPath =
      this.apiUrl + "Product/getlistbycategory?categoryId=" + categoryId;
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }
}
