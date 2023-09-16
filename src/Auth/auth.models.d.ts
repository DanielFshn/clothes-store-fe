export interface claim {
  name: string;
  value: string;
}

export interface loginCredencials {
  username: string;
  password: string;
}

export interface authenticationResponse {
  isSuccesful: string;
  token: string;
}

export interface authenticationTokenResponse {
  token: string;
}

export interface singUpRequest {
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  repeatPassword: string;
}
