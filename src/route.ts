import locales, { localePaths } from "./locale";

/**  An Array of routes that are accessible to the public
 * these routes do not require authentication
 * @type {string[]}
 */
export const PublicRoutes = ["", "/auth/new-verification"];
/**  An Array of routes that are used for authentication
 * these routes will  redirect logged in users to /user
 * @type {string[]}
 */
export const publicRoutesLocale = localePaths.flatMap((localePath) =>
  PublicRoutes.map((publicRoute) => localePath + publicRoute)
);
export const authRoutes: String[] = [
  "/auth/register",
  "/auth/login",
  "/auth/error",
  "/auth/reset-password",
  "/auth/new-password",
];
export const authRoutesLocale = localePaths.flatMap((localePath) =>
  authRoutes.map((authRoute) => localePath + authRoute)
);
export const adminRoutes = "/admin";

/**  The prefix for API authentication routes
 * routes that start with this prefix are used for API authentication purpose
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**  The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/user";
