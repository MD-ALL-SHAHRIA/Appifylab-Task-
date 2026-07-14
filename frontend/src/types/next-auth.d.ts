import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    firstName?: string;
    lastName?: string;
    accessToken?: string;
  }
  
  interface Session {
    accessToken?: string;
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    firstName?: string;
    lastName?: string;
    accessToken?: string;
  }
}
