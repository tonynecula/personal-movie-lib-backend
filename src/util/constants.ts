import { Exception } from "../models/exception";
export default {
  crypto: {
    saltRounds: 10,
  },
};
export const errors = {
  unknown: new Exception(
    400,
    "Unknown",
    "An unknown error occurred. Please try again later."
  ),
  unauthorized: new Exception(
    401,
    "Unauthorized",
    "You are not authorized to access this resource."
  ),
  appleExpiredSession: new Exception(
    422,
    "AppleExpiredSession",
    "Session has expired."
  ),
  appleAuthenticationFailed: new Exception(
    422,
    "AppleAuthFailed",
    "Apple authentication failed."
  ),
  facebookExpiredSession: new Exception(
    422,
    "FacebookExpiredSession",
    "Session has expired."
  ),
  suspendedAccount: new Exception(
    422,
    "SuspendedAccount",
    "Your account is suspended."
  ),
  invalidPhoneCode: new Exception(
    422,
    "InvalidPhoneCode",
    "Failed to verify your phone number."
  ),
  phoneNumberInUse: new Exception(
    422,
    "PhoneNumberInUse",
    "A user with that phone number already exists!"
  ),
  emailInUse: new Exception(
    422,
    "EmailInUse",
    "A user with this email already exists. Please use another email or login with your account."
  ),
  usernameInUse: new Exception(
    422,
    "UsernameInUse",
    "A user with this username already exists. Please use another username or login with your account."
  ),
  movieCreated: new Exception(
    422,
    "MovieCreated",
    "A movie with these parameters already exists."
  ),
  emailInUseNoPassword: new Exception(
    422,
    "EmailInUseNoPassword",
    "A user with this email already exists. Please use another email or login with your account."
  ),
  userPasswordExists: new Exception(
    422,
    "UserPasswordExists",
    "The user has already set up its password."
  ),
  phoneInUse: new Exception(
    422,
    "PhoneInUse",
    "A user with this phone already exists. Please use another phone or login with your account."
  ),
  incorrectEmailOrPassword: new Exception(
    422,
    "IncorrectEmailOrPassword",
    "Incorrect email or password. Please try again."
  ),
  emailIsRequired: new Exception(
    422,
    "EmailIsRequired",
    "Your email is required."
  ),
  passwordIsRequired: new Exception(
    422,
    "PasswordIsRequired",
    "A password is required."
  ),
  usernameIsRequired: new Exception(
    422,
    "UsernameIsRequired",
    "A username is required."
  ),
  invalidPassword: new Exception(
    422,
    "InvalidPassword",
    "Your password must contain at least 8 characters."
  ),
  incorrectPassword: new Exception(
    422,
    "IncorrectPassword",
    "The password you have entered is incorrect. Please ensure you have entered a correct password or try resetting it."
  ),
  invalidEmailCode: new Exception(
    422,
    "InvalidEmailCode",
    "Email confirmation link is broken."
  ),
  userSuspended: new Exception(
    422,
    "UserIsSuspended",
    "Your account has been suspended. Please contact customer support for further assistance"
  ),
  appVersionUnsupported: new Exception(
    409,
    "AppVersionUnsupported",
    "Please update your app."
  ),
  phoneVerificationTooManySMSAttempts: new Exception(
    422,
    "PhoneVerificationTooManySMSAttempts",
    "Too many attempts. Please try again in a few seconds."
  ),
  tooManySmsToPhoneNumber: new Exception(
    422,
    "TooManySmsToPhoneNumber",
    "Too many SMS. Please contact support."
  ),
  phoneVerificationExpired: new Exception(
    422,
    "PhoneVerificationExpired",
    "Validation expired. Please start again."
  ),
  phoneVerificationTooManyCodeAttempts: new Exception(
    422,
    "PhoneVerificationTooManyCodeAttempts",
    "Too many attempts. Please request a new SMS"
  ),
  phoneVerificationCodeExpired: new Exception(
    422,
    "PhoneVerificationCodeExpired",
    "Code expired. Please request a new SMS."
  ),
  phoneVerificationInvalidCode: new Exception(
    422,
    "PhoneVerificationInvalidCode",
    "Invalid code"
  ),
  disabledCaptcha: new Exception(
    400,
    "DisabledCaptcha",
    "The captcha verification is disabled."
  ),
  storeNotFound: new Exception(
    422,
    "StoreNotFound",
    "No store with the provided hash was found."
  ),
  nameIsRequired: new Exception(
    422,
    "NameIsRequired",
    "The firstName and lastName are required."
  ),
  addressIsRequired: new Exception(
    422,
    "AddressIsRequired",
    "The addressLine2 is required."
  ),
  productHasNoModifiers: new Exception(
    422,
    "ProductHasNoModifiers",
    "The selected product has no modifiers."
  ),
  tahoeIdOrPhoneIsRequiredForProduct: new Exception(
    422,
    "TahoeIdOrPhoneIsRequiredForProduct",
    "The Tahoe Id or Phone is required for the selected product."
  ),
  invalidProductType: new Exception(
    422,
    "InvalidProductType",
    "The product type does not match the one for the current method."
  ),
  invalidUseCaseType: new Exception(
    422,
    "InvalidUseCaseType",
    "The Use Case type does not match the possible ones"
  ),
  deletionTokenExpired: new Exception(
    422,
    "DeletionTokenExpired",
    "The deletion token has expired."
  ),
  subscriptionCustomerReferenceIncomplete: new Exception(
    422,
    "SubscriptionCustomerReferenceIncomplete",
    "The customer reference does not contain all required fields."
  ),
  cartCompletedIncomplete: new Exception(
    422,
    "SubscriptionCustomerReferenceIncomplete",
    "The customer reference does not contain all required fields."
  ),
  lastNameOrIdAreRequired: new Exception(
    422,
    "LastNameOrIdAreRequired",
    "The lastName or id are required."
  ),
  unreachableSubscription: new Exception(
    422,
    "UnreachableSubscription",
    "You do not have an active subscription."
  ),
  paymentMethodRequired: new Exception(
    422,
    "PaymentMethodRequired",
    "The checkoutToken or paymentIntentId are required."
  ),
  monitorsLimitExceeded: new Exception(
    403,
    "MonitorsLimitExceeded",
    "You have reached your maximum number of monitors."
  ),
  invalidSocialAccount: new Exception(
    422,
    "InvalidSocialAccount",
    "You cannot sign up with this account. Please use a different one."
  ),

  galaxyError: (message: string) =>
    new Exception(422, "GalaxyAPIError", message),
  zendeskError: (message: string) =>
    new Exception(422, "ZendeskAPIError", message),
  chargeBeeError: (message: string) =>
    new Exception(422, "ChargeBeeError", message),
  chargeBeeErrorNotFound: (resource: string) =>
    new Exception(
      404,
      "ChargeBeeErrorNotFound",
      `The requested ${resource} was not found.`
    ),
  notFound: (resource: string) =>
    new Exception(404, "NotFound", `The requested ${resource} was not found.`),
  invalidParameter: (param: string) =>
    new Exception(
      422,
      "InvalidParameter",
      `Missing or invalid parameter ${param}.`
    ),
};
