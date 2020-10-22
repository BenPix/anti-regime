const axios = require("axios");

export function createUser(filledForm) {
  return axios
    .post("http://localhost:8081/api/user", { user: filledForm })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return undefined;
    });
}

export function findUser(id) {
  return axios
    .get("http://localhost:8081/api/user", {
      params: { id },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return undefined;
    });
}

export function checkUserExists(email) {
  return axios
    .get("http://localhost:8081/api/connexion", {
      params: { email },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return undefined;
    });
}

export function connectUser(email, password) {
  return axios
    .post("http://localhost:8081/api/connexion", {
      email,
      password,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return undefined;
    });
}

export function weightUser(poids, date, userId) {
  return axios
    .post("http://localhost:8081/api/weight", {
      poids,
      date,
      userId,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return undefined;
    });
}

export function findWeighings(userId) {
  return axios
    .get("http://localhost:8081/api/weighings", {
      params: {
        userId,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return undefined;
    });
}

export function deleteWeigh(weighId) {
  return axios
    .delete("http://localhost:8081/api/weighings", {
      params: {
        weighId,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return undefined;
    });
}

export function goalUser(userId, weight, deficit) {
  return axios
    .post("http://localhost:8081/api/goal", {
      userId,
      weight,
      deficit,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return undefined;
    });
}
