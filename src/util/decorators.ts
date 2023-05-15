import {
  isDefined,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";

// replacement decorator for IsDefined, accepts as parameter a custom error
export const IsDef = (validationOptions?: ValidationOptions) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, propertyName: string) => {
    if (validationOptions && validationOptions.error) {
      validationOptions.context = {
        code: validationOptions.error.code,
        status: validationOptions.error.status,
      };
      validationOptions.message = validationOptions.error.message;
    }
    registerDecorator({
      name: "isDef",
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate: (value): boolean => isDefined(value),
      },
    });
  };
};

export const IsAgeRange = (validationOptions?: ValidationOptions) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, propertyName: string) => {
    if (validationOptions && validationOptions.error) {
      validationOptions.context = {
        code: validationOptions.error.code,
        status: validationOptions.error.status,
      };
      validationOptions.message = validationOptions.error.message;
    }
    registerDecorator({
      name: "isAgeRange",
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate: (value: string): boolean => {
          const numbers = value.split("-");
          if (numbers.length !== 2) return false;
          const number1 = parseInt(numbers[0], 10) || undefined;
          const number2 = parseInt(numbers[1], 10) || undefined;

          if (!number1 || !number2) return false;

          if (number1 < 18 || number2 < number1 || number2 > 127) return false;

          return true;
        },
      },
    });
  };
};
