/* eslint-disable prettier/prettier */
import { BaseQueryParametersDto } from "./BaseQueryParameters";


export class FindUsersQuery extends BaseQueryParametersDto {
  name: string;
  email: string;
  status: boolean;
  role: string;
}