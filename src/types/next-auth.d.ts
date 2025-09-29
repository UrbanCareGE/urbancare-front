import type {DefaultSession} from "next-auth";

declare module "next-auth" {
    /**
     * What user information we expect to extract to be able to extract
     * from our backend response
     */
    export interface User extends DefaultSession {
        id: number;
        contact: string;
        firstName: string;
        LastName: string;
        profileImageId?: string;
        authToken: string;
        refreshToken: string;
    }

    /**
     * Returned by `useSession`, `getSession`, returned by the `session` callback and also the shape
     * received as a prop on the SessionProvider React Context
     */
    export interface Session {
        authToken: string;
        refreshToken: string;
    }
}

declare module "next-auth/jwt" {
    /**
     * Returned by the `jwt` callback and `getToken`, when using JWT sessions
     */
    export interface JWT {
        authToken: string;
        refreshToken: string;
    }
}