<!-- Layer for Interface objects -->

<template>
  <span
    :class="`trading-vue-grid-ux-${id}`"
    :style="style"
  >
    <ux-wrapper
      v-for="ux of uxs"
      :key="ux.uuid"
      :ux="ux"
      :updater="updater"
      :colors="colors"
      :config="config"
      @custom-event="on_custom_event"
    />
  </span>
</template>

<script>

import UxWrapper from './UxWrapper.vue';

export default {
  name: 'UxLayer',
  components: { UxWrapper },
  props: ['tv_id', 'id', 'uxs', 'updater', 'colors', 'config'],
  emits: ['custom-event'],
  computed: {
    style() {
      return {
        'top': this.$props.id !== 0 ? '1px' : 0,
        'left': 0,
        'width': '100%',
        'height': 'calc(100% - 2px)',
        'position': 'absolute',
        'z-index': '1',
        'pointer-events': 'none',
        'overflow': 'hidden',
      };
    },
  },
  created() {
  },
  mounted() {
  },
  beforeUnmount() {
  },
  methods: {
    on_custom_event(event) {
      this.$emit('custom-event', event);
    },
  },
};

</script>
