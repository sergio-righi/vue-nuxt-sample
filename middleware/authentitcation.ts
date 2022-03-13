/**
 * store, redirect and route are nuxt object (check out nuxt documentation to learn more about it)
 * $resolve: the path of the pages (routes)
 * $service: the store methods
 */

export default ({ store, redirect, route, $resolve, $service }: any) => {
  const notAuthRequired = ["name-of-the-page"]; // list of pages that does not require authentication
  const isAuthenticated = store.getters["store-session-name/isAuthenticated"]; // check session status
  const matches = notAuthRequired.filter(item => route.path.match(item));
  // is authenticated and is trying to access the pages that must not be authenticated
  if (isAuthenticated && matches.length > 0) {
    return redirect($resolve.home());
  } else if (!isAuthenticated && matches.length === 0) {
    // you might want to save the current path to further redirect (by calling service to store the path)
  }
};
