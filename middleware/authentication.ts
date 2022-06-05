/**
 * redirect and route are nuxt object (check out nuxt documentation to learn more about it)
 * $resolve: the path of the pages (routes)
 * $auth: nuxt auth
 */

export default ({ redirect, route, $resolve, $auth }: any) => {
  const { validated } = $auth.user;
  const isAuthenticated = $auth.loggedIn;
  const authorization = route.path.match("authorization");

  // you might want to save the current path to further redirect (by calling service to store the path)

  if (isAuthenticated && !validated && !authorization) return redirect($resolve.authorization());
  else if (isAuthenticated && validated && authorization) return redirect($resolve.home());
};
