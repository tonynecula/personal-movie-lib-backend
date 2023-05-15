import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  director?: string;

  @IsOptional()
  @IsNumber()
  yearReleased?: number;

  @IsOptional()
  @IsString({ each: true })
  actors?: string[];

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsString()
  poster?: string;

  @IsOptional()
  @IsString()
  trailer?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
