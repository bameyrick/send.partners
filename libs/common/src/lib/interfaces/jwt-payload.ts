export interface JwtPayload {
  id: string;
}

export interface JwtPayloadWithRefreshToken extends JwtPayload {
  refresh_token: string;
}
