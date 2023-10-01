export interface claim {
  name: string;
  value: string;
}

export interface loginCredencials {
  username: string;
  password: string;
}

export interface changePassCredencials {
  id: string;
  currentPassword: string;
  newPassword: string;
  repeatPassword: string;
}

export interface authenticationResponse {
  isSuccesful: string;
  token: string;
}

export interface authenticationTokenResponse {
  token: string;
}

export interface changePasswordResponse {
  Message: string;
}

export interface singUpRequest {
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  repeatPassword: string;
}

export interface forgotPasswordRequest{
  email:string;
}

export interface EmailSendResponse{
  To: string;
  Subject: string;
  Body: string;
  Message:string;
}

export interface ConfirmForgotPassword{
  email: string;
  token: string;
  newPassword:string;
  repeatNewPass: string;
}