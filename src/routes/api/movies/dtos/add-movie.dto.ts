import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { IsDef } from "../../../../util/decorators";
import { errors } from "../../../../util/constants";

export class AddMovieDto {
  @IsDef({ error: errors.invalidParameter("title") })
  @IsString()
  title?: string;

  @IsDef({ error: errors.invalidParameter("director") })
  @IsString()
  director?: string;

  @IsDef({ error: errors.invalidParameter("year released") })
  @IsNumber()
  yearReleased?: number;

  @IsArray()
  @IsString({ each: true })
  actors?: string[];

  @IsDef({ error: errors.invalidParameter("genre") })
  @IsString()
  genre?: string;

  @IsDef({ error: errors.invalidParameter("duration") })
  @IsNumber()
  duration?: number;

  @IsDef({ error: errors.invalidParameter("language") })
  @IsString()
  language?: string;

  @IsDef({ error: errors.invalidParameter("poster") })
  @IsString()
  poster?: string;

  @IsDef({ error: errors.invalidParameter("trailer") })
  @IsString()
  trailer?: string;

  @IsDef({ error: errors.invalidParameter("description") })
  @IsString()
  description?: string;
}
