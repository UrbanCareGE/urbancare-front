import {NextAuthOptions} from "next-auth";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {strategy: "jwt"},
    pages: {
        signIn: '/signin',
        error: '/authError',
    },
    providers: []
    // providers: [
    //     GoogleProvider({
    //         clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID ?? '',
    //         clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET ?? '',
    //         authorization: {
    //             params: {
    //                 prompt: "select_account"
    //             }
    //         }
    //     }),
    //     CredentialsProvider({
    //         name: "username and password",
    //         credentials: {
    //             username: {label: "username", type: "username"},
    //             password: {label: "Password", type: "password"}
    //         },
    //         async authorize(credentials): Promise<User | null> {
    //             if (!credentials || !credentials.username || !credentials.password) {
    //                 return null;
    //             }
    //
    //             try {
    //                 if (!credentials?.username || !credentials?.password) {
    //                     console.log("Credentials missing");
    //                     return null;
    //                 }
    //
    //                 const res = await AuthService.authenticate({
    //                     username: credentials?.username,
    //                     password: credentials?.password
    //                 });
    //
    //                 if (!res || !res.authToken || !res.refreshToken) {
    //                     console.log("Authentication failed");
    //                     return null;
    //                 }
    //
    //                 const jwtPayload: JWTPayload = jwtDecode<JWTPayload>(res.authToken);
    //
    //                 return {id: jwtPayload.id, authToken: res.authToken, refreshToken: res.refreshToken};
    //             } catch (error) {
    //                 console.error("Error during authorization:", error);
    //                 return null;
    //             }
    //         }
    //     })
    // ],
    // callbacks: {
    //     // async signIn({user, account, profile}) {
    //     //     if (
    //     //         account &&
    //     //         account.provider === 'google' &&
    //     //         profile &&
    //     //         'email_verified' in profile
    //     //     ) {
    //     //         if (!profile.email_verified) return false;
    //     //     }
    //     //     return true;
    //     // },
    //     async redirect({url, baseUrl}) {
    //         if (url.startsWith("/")) return `${baseUrl}${url}`;
    //         else if (new URL(url).origin === baseUrl) return url;
    //         return baseUrl;
    //     },
    //     async jwt({token, trigger, account, profile, user, session}) {
    //         if (account?.provider == 'google') {
    //             if (account.id_token) {
    //                 const res = await OauthService.googleAuthenticate(account.id_token);
    //                 token.authToken = res.authToken;
    //                 token.refreshToken = res.refreshToken;
    //             }
    //         } else if (account?.provider === 'facebook') {
    //
    //         } else if (account?.provider === 'credentials') {
    //             token.authToken = user.authToken;
    //             token.refreshToken = user.refreshToken;
    //         }
    //
    //         return token;
    //     },
    //     async session({token, user, session, newSession, trigger}) {
    //         if (token) {
    //             session.authToken = token.authToken
    //             session.refreshToken = token.refreshToken;
    //         }
    //
    //         return session;
    //     }
    // }
};