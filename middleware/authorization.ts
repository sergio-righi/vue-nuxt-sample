/**
 * store, redirect and route are nuxt object (check out nuxt documentation to learn more about it)
 * $resolve: the path of the pages (routes)
 * $service: the store methods
 */

export default ({ store, redirect, route, $resolve, $service }: any) => {
  const mustRespectRule = ["name-of-the-page"]; // list of pages that will follow the rule
  const isAuthenticated = store.getters["store-session-name/isAuthenticated"]; // check session status (not required)
  const matches = mustRespectRule.filter(item => route.path.match(item));

  if (!isAuthenticated && matches.length > 0) {
    // redirect to the login page or any other page
  } else if (matches.length > 0) {
    // validate the rule
  }
};
