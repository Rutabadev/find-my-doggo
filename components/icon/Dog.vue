<template>
  <svg
    id="dog"
    class="h-64 w-64"
    :class="headHovered ? 'hovered' : undefined"
    viewBox="0 0 300 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="black"
    stroke-width="3"
    @click.right.prevent="showVersion"
  >
    <path
      id="head"
      d="M68.1235 82.9264L149.5 55.7012L230.877 82.9264L216.615 212.77L149.5 256.749L82.3854 212.77L68.1235 82.9264Z"
      fill="#F3D69E"
      @mouseover="toggleHover(true)"
      @mouseout="toggleHover(false)"
    />
    <path
      id="left-ear"
      d="M41.4149 47L117.693 66.8757L6 131.036L41.4149 47Z"
      fill="#803B14"
      stroke="black"
    />
    <path
      id="right-ear"
      d="M259.278 47L183 66.8757L294.693 131.036L259.278 47Z"
      fill="#803B14"
      stroke="black"
    />
    <path
      d="M143.9 119.235C143.9 133.086 132.111 144.314 117.568 144.314C103.025 144.314 91.2354 133.086 91.2354 119.235C91.2354 105.385 103.025 94.1569 117.568 94.1569C132.111 94.1569 143.9 105.385 143.9 119.235Z"
      fill="black"
    />
    <path
      d="M209.104 119.235C209.104 133.086 197.315 144.314 182.772 144.314C168.229 144.314 156.439 133.086 156.439 119.235C156.439 105.385 168.229 94.1569 182.772 94.1569C197.315 94.1569 209.104 105.385 209.104 119.235Z"
      fill="black"
    />
    <path
      id="mouth"
      d="M150.016 228.028L105.5 193.988H188L150.016 228.028Z"
      fill="black"
      stroke="black"
    />
    <path
      id="tongue"
      d="M114.928 200.371C114.928 256.683 179.817 257.523 179.817 200.371H114.928Z"
      fill="#FFA397"
      stroke="black"
    />
    <path
      d="M133 160.761L148.5 154.5L164.221 160.761L148.5 171.5L133 160.761Z"
      fill="black"
    />
    <path
      d="M82 211.5C74 138.5 217 128 217 211.5M148.5 154.5L133 160.761L148.5 171.5L164.221 160.761L148.5 154.5Z"
      stroke="black"
    />
  </svg>
</template>

<script lang="ts">
import Vue from 'vue'
import { debounce } from '~/utils'
export default Vue.extend({
  data(): {
    headHovered: boolean
    toggleHover?: (value: boolean) => void
  } {
    return {
      headHovered: false,
    }
  },

  created() {
    this.toggleHover = debounce(
      (value: boolean) => (this.headHovered = value),
      200
    )
  },

  methods: {
    showVersion(): void {
      alert(
        [
          `App version : ${process.env.version}`,
          `Started at : ${new Date(
            process.env.startTime || 0
          ).toLocaleString()}`,
        ].join('\n')
      )
    },
  },
})
</script>

<style lang="postcss" scoped>
@media (prefers-reduced-motion: no-preference) {
  #dog {
    --ear-speed: 1s;
    --tongue-speed: 200ms;
    transition: transform 200ms;

    #left-ear {
      animation: left-ear var(--ear-speed) ease-in-out alternate infinite;
      transform-origin: top right;
      transform-box: fill-box;
    }

    @keyframes left-ear {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(-6deg);
      }
    }

    #right-ear {
      animation: right-ear var(--ear-speed) ease-in-out alternate infinite;
      transform-origin: top left;
      transform-box: fill-box;
    }

    @keyframes right-ear {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(6deg);
      }
    }

    #tongue {
      animation: tongue var(--tongue-speed) ease-in-out alternate infinite;
      transform-origin: top;
      transform-box: fill-box;
    }

    @keyframes tongue {
      from {
        transform: scaleY(1.4);
      }
      to {
        transform: scaleY(1.7);
      }
    }

    &.hovered {
      transform: rotate(-15deg);

      #left-ear,
      #right-ear,
      #tongue {
        animation: none;
      }

      #tongue {
        display: none;
      }

      #mouth {
        clip-path: polygon(0 0, 100% 0, 100% 10%, 0 10%);
      }
    }
  }
  :not(:is(#dog, #head)) {
    pointer-events: none;
  }
}
</style>
