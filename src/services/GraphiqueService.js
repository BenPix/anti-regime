import data from "../assets/rapportDeficitPoidsDuree";

class GraphService {
    constructor() {
        this.rapportDeficitDuree = {};
        this.rapportDureeDeficit = {};

        for (const key in data) {
            this.rapportDeficitDuree[key] = data[key];
        }

        for (const key in data) {
            let temp = [];
            data[key].forEach((value, key) => {
                temp[value] = key;
            });
            this.rapportDureeDeficit[key] = temp;
            temp = [];
        }
    }

    graphMax(cal) {
        let max = [...cal];

        for (let i = 0; i < max.length; i++) {
            max[i] = (max[i] * 1.1 + 0.35).toFixed(2);
        }

        return max;
    }

    graphMin(cal) {
        let min = [...cal];

        for (let i = 0; i < min.length; i++) {
            min[i] = (min[i] * 0.9 - 0.35).toFixed(2);
        }

        return min;
    }
}

const graph = new GraphService();
let semaines = new Array(157);
for (let i = 0; i < semaines.length; i++) {
    semaines[i] = i;
}
export { graph, semaines };