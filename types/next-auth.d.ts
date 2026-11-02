import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    //UNTUK MENAMAI INTERFACE GUNAKAN CAPITALIZE di awal name
    role: "USER" | "ADMIN";
  }
  interface session {
    user: {
      id: "string";
      role: "USER" | "ADMIN";
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    roole: "USER" | "USER";
  }
}
