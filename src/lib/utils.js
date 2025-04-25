import {constants} from "./constants";

/**
 * Gets a token for the given user.
 * @param user The name of the user to get a token for.
 */
export const getAuthToken = async (user) => {
  const endpoint = `${constants.tokenServer}/token?username=${user}&passcode=${constants.passcode}`;
  console.log("token endpoint: " + endpoint);

  const response = await fetch(endpoint);

  const token = await response.json();
  console.log("token == " + token);

  return token;
};


/**
 * This function is _only_ for step-by-step users.  This approach is not recommended for production environments.
 *
 * This approach will use the username and password to call and get a token instead of a backend service.
 *
 * @param user The name of the user to get a token for.
 * @param password The user's password.
 * @return {Promise<string>}
 */
export const getAuthTokenLocal = async (user, password) => {
  const endpoint = `${constants.tsURL}/api/rest/2.0/auth/token/full`;

  const data = {
    username: user,
    validity_time_in_sec: 300,
    auto_create: false,
    password: password,
  };

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  let token;
  await fetch(endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(j => {
      console.log('token response', j);
      token = j.token;
    })
    .catch(error => console.error('Error:', error));

  return token;
}
