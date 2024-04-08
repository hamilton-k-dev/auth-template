/**  An Array of routes that are accessible to the public
 * these routes do not require authentication
 * @type {string[]}
 */
export const PublicRoutes = ["/", "/courses", "/auth/new-verification"];
/**  An Array of routes that are used for authentication
 * these routes will  redirect logged in users to /user
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/join",
  "/auth/error",
  "/auth/reset-password",
  "/auth/new-password",
];
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
