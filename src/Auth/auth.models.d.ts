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
