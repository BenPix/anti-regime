const axios = require("axios");

export function readSportDepense() {
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

export function readSportDepenseForExamples() {
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