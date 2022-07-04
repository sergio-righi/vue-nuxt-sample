/**
 * redirect and route are nuxt object (check out nuxt documentation to learn more about it)
 * $resolve: the path of the pages (routes)
 * $service: it allows the access to the data layer
 */

export default ({ redirect, route, $resolve, $service }: any) => {
  const isAuthenticated = $service.session.isAuthenticated()
  const verified = $service.session.isVerified();

  if (!isAuthenticated) return redirect($resolve.login(window.location.href))
  else if (!verified) return redirect($resolve.authorization(window.location.href));
}
