<template>
  <div class="transform-gpu transition-transform" :style="{ '--tw-rotate': rotate + 'deg' }"></div>
</template>

<script>
import { select } from "d3-selection";
import { line, curveBasis } from "d3-shape";
import { timer } from "d3-timer";
import { ref } from "vue";

const d3 = Object.assign({}, { select, line, curveBasis, timer });
const shape = d3.line().curve(d3.curveBasis);
export const multipier = ref(2);
export const rotate = ref(0);

export default {
  data() {
    return {
      vis: null,
      points: 6,
      mousePosition: [500, 700],
      wavesCount: 4,
      waves: [],
      paths: [],
      pathHeights: [],
      seeds: [],
      w: null,
      h: null,
      rotate,
    };
  },
  mounted() {
    this.vis = d3.select(this.$el).append("svg").attr("pointer-events", "all");

    for (let i = 0; i < this.wavesCount; i++) {
      this.waves.push(
        this.vis
          .append("path")
          .attr("class", "wave")
          .style("opacity", (i + 1) / this.wavesCount / 2)
      );
      this.paths.push([]);
      this.seeds.push(Math.random() * 1.5);
    }

    this.init();
    d3.timer(this.step);

    window.addEventListener("mousemove", (e) => {
      this.mousePosition[0] = 400 + e.clientX;
      this.mousePosition[1] = 500 + 1.5 * e.clientY;
    });

    window.addEventListener("resize", this.init);
  },
  methods: {
    init() {
      this.w = window.innerWidth;
      this.h = window.innerHeight;
      this.vis.attr("width", this.w).attr("height", this.h);

      for (let i = 0; i < this.wavesCount; i++) {
        const path = this.paths[i];

        path[0] = [-200 * Math.random(), this.h];
        for (let j = 0; j < this.points; j++) {
          path[j + 1] = [(this.w / this.points) * j, path[j + 1] || this.h / 4];
        }
        path[this.points + 1] = [this.w + Math.random() * 200, this.h];
        this.paths[i] = path;
        this.pathHeights[i] = this.h / 2;
      }
    },
    step(elapsed) {
      for (let i = 0; i < this.wavesCount; i++) {
        this.pathHeights[i] += (this.h / multipier.value - (this.mousePosition[1] / 3 + this.mousePosition[0] / 3 + 200) - this.pathHeights[i]) / 10;
        this.update(elapsed, this.pathHeights[i], this.waves[i], this.paths[i], this.seeds[i]);
      }
    },
    update(elapsed, height, wave, path, seed) {
      for (let i = 1; i < this.points + 1; i++) {
        const sinSeed = ((seed / 2 + 0.2) * elapsed) / 6 + (i + (i % 10)) * 100 + seed * 500;
        path[i][1] = Math.sin(sinSeed / 100) * Math.sin(sinSeed / 200) * height + (this.h - 200 - seed * 10);
      }

      wave.attr("d", shape(path));
    },
  },
};
</script>
<style lang="postcss" scoped>
div {
  z-index: 1;
  position: fixed;

  :deep(.wave:nth-of-type(1)) {
    fill: rgba(165, 94, 234, 0.8);
  }

  :deep(.wave:nth-of-type(2)) {
    fill: rgba(254, 211, 48, 0.5);
  }

  :deep(.wave:nth-of-type(3)) {
    fill: rgba(255, 255, 255, 0.1);
  }

  :deep(.wave:nth-of-type(4)) {
    fill: rgba(15, 184, 176, 0.7);
  }
}
</style>
