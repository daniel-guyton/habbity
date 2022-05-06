import { setUser } from '.actions/user'
import store from './store'

export async function cacheUser(useAuth0, state) {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0
  getAccessTokenSilently(user)
    .then(token => {
      if (isAuthenticated && !state?.token) {
        try {
          const userToSave = {
            auth0Id: user.sub,
            email: user.email,
            token: token
          }

          store.dispatch(setUser(userToSave))
        } catch (err) {
          console.error(err)
        }
      }
    })
  .catch(err => console.log(err.message))
}