import { IsString, MinLength } from "class-validator";
import { errors } from "../../../../util/constants";
import { IsDef } from "../../../../util/decorators";
import { options } from "../../../../util/validationOptions";

export class ChangePasswordEmailDto {
  @IsDef({ error: errors.invalidParameter("token") })
  @IsString()
  token?: string;

  @IsDef()
  @MinLength(8, options(errors.invalidPassword))
  @IsString()
  newPassword?: string;
}
