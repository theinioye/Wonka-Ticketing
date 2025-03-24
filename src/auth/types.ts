export type JWTPayload = {
  email: string;
  id: string;
};

export type JWTPayloadWithRefreshToken = JWTPayload & { refreshToken: string };
