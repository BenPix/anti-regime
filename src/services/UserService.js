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

export function findWeighingsForGraph(userData) {
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

/** DEPRECATED */
/*function convertWeighingsForGraph(weighings, poids) {
  if (weighings.length === 0) return [];

  let firstDate = weighings[0].date;
  firstDate = new Date(firstDate);
  let poidsForGraph = [];
  poidsForGraph[0] = 0;
  let average = [];
  let nextWeek = firstDate;
  nextWeek.setDate(nextWeek.getDate() + 7);

  while (weighings.length > 0) {  
    let pesee = weighings.shift();
    let date = new Date(pesee.date);
  
    if (date >= nextWeek || weighings.length === 0) {
      //calcul de la moyenne
      let moy = 0;
      for (let i = 0; i < average.length; i++) {
        moy += average[i];
      }
      moy /= average.length;
      poidsForGraph.push(parseFloat((poids - moy).toFixed(1)));
    
      // on reinit average, ainsi que le debut de semaine
      average = [];
      nextWeek.setDate(nextWeek.getDate() + 7);
    }
  
    // on n'oublie pas d'enregistrer le poids pour la moyenne
    average.push(pesee.poids);
  }

  // dernier enregistrement une fois l'array vidé
  let moy = 0;
  for (let i = 0; i < average.length; i++) {
    moy += average[i];
  }
  moy /= average.length;
  poidsForGraph.push(parseFloat((poids - moy).toFixed(1)));

  return poidsForGraph;
}*/

function convertWeighingsForGraph(weighings, poids) {
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
    console.log("data parcourue = " + weighings[0].poids);
    let pesee = weighings[0];
    let date = new Date(pesee.date);

    console.log("cette data a pour date :");
    console.log(weighings[0].date);
    console.log("on veut savoir si cette date est < à ");
    console.log(nextWeek);

    if (date < nextWeek) {
      average.push(pesee.poids);
      weighings.shift();
    }
    console.log("la variable average vaut :");
    console.log(average);

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
      console.log("La date de la data suivante est :");
      console.log(date);
      console.log("la date limite est :");
      console.log(nextWeek);
      console.log("la fin de la semaine est elle atteinte ?");
      console.log(endOfWeekReached);
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
    moy += average[i];
  }

  moy /= average.length;

  return parseFloat((poids - moy).toFixed(1));
}