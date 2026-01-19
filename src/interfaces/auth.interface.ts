export interface loginCredentials {
  email: string;
  password: string;
}

export interface logginUser {
  id: string;
  email: string;
  role: string;
  name: string;
}

export interface loginResponse {
  accessToken: string;
  refreshToken: string;
  user: logginUser;
}
