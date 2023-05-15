import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";
import { errors } from "../../../../util/constants";
import { IsDef } from "../../../../util/decorators";
import { options } from "../../../../util/validationOptions";

export class RegisterUserDto {
  @IsDef({ error: errors.emailIsRequired })
  @IsEmail()
  email: string | undefined;

  @IsDef({ error: errors.passwordIsRequired })
  @MinLength(8, options(errors.invalidPassword))
  @IsString()
  password: string | undefined;

  @IsDef({ error: errors.usernameIsRequired })
  @IsString()
  username: string | undefined;

  @IsOptional()
  @IsString()
  isAdmin?: boolean;
}
