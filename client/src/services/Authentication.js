export default class Authentication {
  static login(username, password) {
    return new Promise((resolve, reject) => {
      if (username === password) {
        resolve({
          id: 1,
          username
        });
      } else {
        reject('Username and password does not match');
      }
    });
  }
}
