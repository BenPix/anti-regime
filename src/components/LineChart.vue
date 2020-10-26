<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveData } = mixins;

export default {
  extends: Line,
  mixins: [reactiveData],
  props: ["chartdata", "options"],
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>

<style>
</style>