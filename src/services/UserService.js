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

export function updateUser(filledForm) {
  return axios
    .put("http://localhost:8081/api/user", { user: filledForm })
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

export function weightUser(vue, poids, date, userId) {
  if (vue.accountType === "local") {
    vue.toRegisterWeight({ poids, date });

    return new Promise((successCallback) => {
      successCallback({message: "success"});
    });
  } else {
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
}

export function findWeighings(vue, userId) {
  if (vue.accountType === "local") {
    return new Promise((successCallback) => {
      successCallback(
        {
          data: {
            results: vue.getUserWeighings,
          }
        })
    });
  } else {
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
}

export function deleteWeigh(vue, weighId) {
  if (vue.accountType === "local") {
    vue.toDeleteWeight(weighId);

    return new Promise((successCallback) => {
      successCallback({message: "success"});
    });
  } else {
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
}

export function goalUser(accountType, userId, weight, deficit) {
  if (accountType === "local") {
    return new Promise(resolve => { 
      resolve("success");
    });
  } else {
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
}

export function findWeighingsForGraph(vue, userData) {
  if (vue.accountType === "local") {
    let userWeighingsCopy = JSON.parse(JSON.stringify(vue.userWeighings));
    let weighings = convertWeighingsForGraph(
      userWeighingsCopy.reverse(),
      vue.userData.poids
    );

    return new Promise(resolve => { 
      resolve(weighings);
    });
  } else {
  return axios
    .get("http://localhost:8081/api/weighings-for-graph", {
      params: {
        userId: userData.id,
      },
    })
    .then((res) => {
      return convertWeighingsForGraph(res.data.results, userData.poids);
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
  }
}

export function convertWeighingsForGraph(weighings, poids) {
  if (weighings.length == 0) return [];

  // initialisation des variables
  // on détermine le jour de la semaine suivante = limite
  let firstDate = weighings[0].date;
  firstDate = new Date(firstDate);
  let nextWeek = firstDate;
  nextWeek.setDate(nextWeek.getDate() + 7);
  // le graph doit contenir par défaut la valeur 0 à l'index 0
  let poidsForGraph = [];
  poidsForGraph[0] = 0;
  let average = [];

  // parcourt des weighings et calcul des valeurs moyennes pour chaque semaine
  while (weighings.length > 0) {  
    let pesee = weighings[0];
    let date = new Date(pesee.date);

    if (date < nextWeek) {
      average.push(pesee.poids);
      weighings.shift();
    }

    // si la valeur suivante est hors de la limite, ou qu'il n'y a plus de valeur suivante
    // on calcul la moyenne et l'insère
    let endOfWeekReached = false;

    if (weighings.length === 0) {
      endOfWeekReached = true;
    } else {
      pesee = weighings[0];
      date = new Date(pesee.date);

      endOfWeekReached = date > nextWeek;

      // on set le jour de la semaine suivante
      nextWeek.setDate(nextWeek.getDate() + 7);
    }

    if (endOfWeekReached) {
      //calcul de la moyenne
      poidsForGraph.push(calculMoyenne(average, poids));
      average = [];
    }
  }

  return poidsForGraph;
}

function calculMoyenne(average, poids) {
  let moy = 0;

  for (let i = 0; i < average.length; i++) {
    moy += parseFloat(average[i]);
  }

  moy /= average.length;

  return parseFloat((poids - moy).toFixed(1));
}