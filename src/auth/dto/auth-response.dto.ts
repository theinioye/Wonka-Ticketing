class AuthUser {
  id: string;

  email: string;

  profileImageUrl?: string;

  lastLoginDate: Date;

  firstName: string;

  lastName: string;
}

export class UserAuthSignInResponse {
  user: AuthUser;

  token: {
    accessToken: string;
    refreshToken: string;
  };
}
export class AuthPlanner {
  id: string;

  email: string;

  profileImageUrl?: string;

  lastLoginDate: Date;

  name: string;
}

export class PlannerAuthSignInResponse {
  user: AuthPlanner;

  token: {
    accessToken: string;
    refreshToken: string;
  };
}
