<template>
  <trading-vue
    :data="chart"
    :width="width"
    :height="height"
    :legend-buttons="buttons"
    :color-back="colors.colorBack"
    :color-grid="colors.colorGrid"
    :color-text="colors.colorText"
    @legend-button-click="on_button_click"
  />
</template>

<script>
import TradingVue from '../../src/TradingVue.vue';
import Data from '../data/data_buttons.json';
import CodeIcon from './LegendButtons/code3.json';


export default {
  name: 'LegendButtons',
  description: 'Legend buttons test (click the button, see console)',
  components: {
    TradingVue,
  },
  props: ['night'],
  data() {
    return {
      chart: Data,
      width: window.innerWidth,
      height: window.innerHeight,
      buttons: [
        'display', 'settings', 'remove',
        {
          name: 'code',
          icon: CodeIcon,
        },
      ],
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
  mounted() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize(event) {
      this.width = window.innerWidth;
      this.height = window.innerHeight - 50;
    },
    on_button_click(event) {
      if (event.button === 'display') {
        let d = this.chart[event.type][event.dataIndex];
        if (d) {
          if (!('display' in d.settings)) {
            this.$set(
              d.settings, 'display', true,
            );
          }
          this.$set(
            d.settings, 'display', !d.settings.display,
          );
        }
      }
      console.log(event);
    },
  },
};
</script>

<style>

</style>
