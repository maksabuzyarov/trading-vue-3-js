<script>
// The side bar (yep, that thing with a bunch of $$$)
import { h } from 'vue';
import Sidebar from './js/sidebar.js'
import Canvas from '../mixins/canvas.js'

export default {
    name: 'Sidebar',
    mixins: [Canvas],
    props: [
        'sub', 'layout', 'range', 'interval', 'cursor', 'colors', 'font',
        'width', 'height', 'grid_id', 'rerender', 'y_transform', 'tv_id',
        'config', 'shaders'
    ],
    watch: {
        range: {
            handler: function() { this.redraw() },
            deep: true
        },
        cursor: {
            handler: function() { this.redraw() },
            deep: true
        },
        rerender() {
            this.$nextTick(() => this.redraw())
        }
    },
    mounted() {
        const el = this.$refs['canvas']
        this.renderer = new Sidebar(el, this)
        this.setup()
        this.redraw()
    },
  beforeUnmount () {
        if(this.renderer) this.renderer.destroy()
    },
    render() {
        const id = this.$props.grid_id
        const layout = this.$props.layout.grids[id]
        return this.create_canvas(h, `sidebar-${id}`, {
            position: {
                x: layout.width,
                y: layout.offset || 0
            },
            attrs: {
                rerender: this.$props.rerender,
                width: this.$props.width,
                height: layout.height,
            },
            style: {
                backgroundColor: this.$props.colors.back
            },
        })
    }
}

</script>
