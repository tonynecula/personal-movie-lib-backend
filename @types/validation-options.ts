import { Exception } from "../src/models/exception";

declare module "class-validator" {
  interface ValidationOptions {
    error?: Exception;
  }
}
