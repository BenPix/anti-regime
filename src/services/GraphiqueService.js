// ces data sont les valeurs de chaque point du graphique Fn-n_100 [semaine]=poidsPerdu
import { graphData } from "../services/graphData";

export default class GraphService {
    constructor(deficitCalorique) {
        this.courbe = this.defineCurve(deficitCalorique);
        this.courbeMax = this.defineCurveMax();
        this.courbeMin = this.defineCurveMin();

        this.semaines = new Array(157);
        for (let i = 0; i < this.semaines.length; i++) {
            this.semaines[i] = i;
        }
    }

    defineCurve(deficitCalorique) {
      let arr = [];
      
      for(let key in graphData) {
        if (key != 0) arr[key - 1] = graphData[key] * (deficitCalorique / 100)
        else arr[0] = 0;
      }
      
      return arr;
    }

    // semblable à la courbe de base, mais valeur augmentée de 10% + 0.35
    defineCurveMax() {
        let max = [];

        for (let x = 0; x < this.courbe.length; x++) {
            max[x] = (this.courbe[x] * 1.1 + 0.35).toFixed(2);
        }

        return max;
    }

    // semblable à la courbe de base, mais valeur diminuée de 10% - 0.35
    defineCurveMin() {
        let min = [];

        for (let x = 0; x < this.courbe.length; x++) {
            min[x] = (this.courbe[x] * 0.9 - 0.35).toFixed(2);
        }

        return min;
    }
}