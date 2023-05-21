export interface Order {
  id: Number;
  number: Number;
  customerId: Number;
  createdBy: Number;
  orderDate: Date;
  requiredDate: Date;
  isReady: Boolean;
  isPreparing: Boolean;
}
