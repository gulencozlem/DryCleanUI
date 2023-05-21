import { ClaimModel } from "./claimModel";
import { TokenModel } from "./tokenModel";
export interface UserLoginResultModel {
  accessToken: TokenModel;
  firstName: string;
  lastName: String;
  role: ClaimModel[];
}
