export function getUsers({ currentUser}) {
  const usersPromise = fetch(
    `https://randomuser.me/api/?seed=67842&results=1&nat=ua&page=${currentUser}`
  )
    .then((res) => res.json())
    .then((responseWithUsers) => responseWithUsers.results);

  return usersPromise;
}
