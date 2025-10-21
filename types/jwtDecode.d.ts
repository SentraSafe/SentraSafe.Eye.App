import "jwt-decode";

declare module "jwt-decode" {
  interface JwtPayload {
    roles?: string;
  }
}
