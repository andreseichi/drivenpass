type typeEnum = "USER_ALREADY_EXISTS" | "INVALID_LOGIN" | "another_error";

export interface errors {
  type: typeEnum;
  message: string;
}
