class AuthUser {
  id: string;

  email: string;

  profileImageUrl?: string;

  lastLoginDate: Date;

  firstName: string;

  lastName: string;
}

export class AuthSignInResponse {
  user: AuthUser;

  token: {
    accessToken: string;
    refreshToken: string;
  };
}
