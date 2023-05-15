import { IsEmail } from "class-validator";
import { IsDef } from "../../../../util/decorators";

export class EmailDto {
  @IsDef()
  @IsEmail()
  email?: string;
}
