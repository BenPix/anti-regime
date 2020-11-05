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
        // on définit les variables a et b pour l'équation de la courbe :
        // y = a * ( 1 - Math.exp( -b * x) )
        // a et b ont été déterminés à partir des points des graphiques disponibles
        let a, b;
      
        a = deficitCalorique * 0.06;
      
        switch (parseInt(deficitCalorique)) {
          case 100:
            b = 0.01614197720025275
            break;
          case 200:
            b = 0.01701990856019178
            break;
          case 300:
            b = 0.0166456407373956
            break;
          case 400:
            b = 0.01701990856019178
            break;
          case 500:
            b = 0.017359296160911607
            break;
          case 600:
            b = 0.01701990856019178
            break;
          case 700:
            b = 0.0172487407164396
            break;
          case 800:
            b = 0.01743766491974705
            break;
          case 900:
            b = 0.017122958456870944
            break;
          case 1000:
            b = 0.017359296160911607
            break;
        
          default:
            b = 0;
            break;
        }
        // b = 0.017
      
        let arr = [];
      
        // maintenant qu'on a a et b, on peut trouver le coordonnées (x, y) pour x = 0 => 159
        // (159 étant la taille max du graphique pour x, x étant le nombre de semaines)
        for (let x = 0; x < 159; x++) {
          let y = a * ( 1 - Math.exp( -b * x));
          
          // le format choisi pour partager les données des coord, est un array key = x et value = y
          arr[x] = y.toFixed(2);
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