import { IsEmail, IsString, MinLength } from "class-validator";
import { errors } from "../../../../util/constants";
import { IsDef } from "../../../../util/decorators";
import { options } from "../../../../util/validationOptions";

export class LoginUserDto {
  @IsDef()
  @IsEmail()
  email!: string;

  @IsDef({ error: errors.passwordIsRequired })
  @MinLength(8, options(errors.invalidPassword))
  @IsString()
  password!: string;
}
