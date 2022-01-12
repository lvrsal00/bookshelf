export default class APIService {
  static LoginUser(body) {
    return fetch("http://127.0.0.1:8000/auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static RegisterUser(body) {
    return fetch("http://127.0.0.1:8000/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static RateBook(body) {
    return fetch("http://127.0.0.1:8000/api/ratings/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token bd20d9048eeb32d19e6df2bb8caa3a0f5113427a`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }
}
