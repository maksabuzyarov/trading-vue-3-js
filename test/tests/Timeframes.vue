<template>
  <div>
    <trading-vue
      ref="tradingVue"
      :data="chart"
      :width="width"
      :height="height"
      :toolbar="true"
      :index-based="index_based"
      :color-back="colors.colorBack"
      :color-grid="colors.colorGrid"
      :color-text="colors.colorText"
    />
    <span class="log-scale">
      <input
        v-model="log_scale"
        type="checkbox"
      >
      <label>Log Scale</label>
    </span>
    <span
      class="gc-mode"
      style="top: 80px; right: 80px"
    >
      <input
        v-model="index_based"
        type="checkbox"
      >
      <label>Index Based</label>
    </span>
    <tf-selector
      :charts="charts"
      @selected="on_selected"
    />
  </div>
</template>

<script>
import TradingVue from '../../src/TradingVue.vue';
import TfSelector from './Timeframes/TFSelector.vue';
import Data from '../data/data_tf.json';
import Utils from '../../src/stuff/utils.js';
import DataCube from '../../src/helpers/datacube.js';


export default {
  name: 'Timeframes',
  description: 'Should display correct dates for every timeframe',
  components: {
    TradingVue, TfSelector,
  },
  props: ['night'],
  data() {
    return {
      charts: Data,
      chart: new DataCube({}),
      width: window.innerWidth,
      height: window.innerHeight,
      log_scale: false,
      index_based: false,
    };
  },
  computed: {
    colors() {
      return this.$props.night ? {} : {
        colorBack: '#FFF',
        colorGrid: '#EEE',
        colorText: '#333',
      };
    },
  },
  watch: {
    log_scale(value) {
      if (this.chart.data.chart) {
        this.$set(this.chart.data.chart, 'grid', {
          logScale: value,
        });
      }
    },
  },
  mounted() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
    window.dc = this.chart;
    window.tv = this.$refs.tradingVue;
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize(event) {
      this.width = window.innerWidth;
      this.height = window.innerHeight - 50;
    },
    on_selected(tf) {
      this.chart.set('chart.data', this.charts[tf.name]);
      this.$refs.tradingVue.resetChart();
      this.log_scale = false;
    },
  },
};
</script>

<style>
.log-scale {
  position: absolute;
  top: 60px;
  right: 80px;
  color: #888;
  font: 11px -apple-system, BlinkMacSystemFont,
  Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
  Fira Sans, Droid Sans, Helvetica Neue,
  sans-serif
}

@media only screen and (max-device-width: 480px) {
  .tf-selector {
    top: 50px;
    right: 140px;
    max-width: 140px;
    font: 12px -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
    Fira Sans, Droid Sans, Helvetica Neue,
    sans-serif;
  }

  .log-scale, .gc-mode {
    right: 50px !important;
  }
}
</style>
