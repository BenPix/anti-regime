const axios = require("axios");

export function readSportDepense(accountType) {
  if (accountType === "local") {
    return import("../assets/sportDepenseListe")
    .then((importation) => {
      return {
        data: {
          results: importation.all,
        }
      }
    })
    .catch((err) => {
      return err;
    });
  } else {
    return axios
      .get("http://localhost:8081/api/sport-depense")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return undefined;
      });
  }
}

export function readSportDepenseForExamples(accountType) {
  if (accountType === "local") {
    return import("../assets/sportDepenseListe")
    .then((importation) => {
      return {
        data: {
          results: importation.exemples,
        }
      }
    })
    .catch((err) => {
      return err;
    });
  } else {
    return axios
      .get("http://localhost:8081/api/sport-depense-exemples")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return undefined;
      });
    }
}