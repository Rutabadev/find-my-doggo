<template>
  <svg
    id="dog"
    viewBox="0 0 300 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke-width="3"
    stroke="black"
  >
    <path
      id="head"
      d="M68.1235 82.9264L149.5 55.7012L230.877 82.9264L216.615 212.77L149.5 256.749L82.3854 212.77L68.1235 82.9264Z"
      fill="#F3D69E"
    />
    <path
      id="left-ear"
      d="M51.4149 44L127.693 63.8757L16 128.036L51.4149 44Z"
      fill="#803B14"
    />
    <path
      id="right-ear"
      d="M250.283 48.255L179.817 66.1179L283 123.781L250.283 48.255Z"
      fill="#813B14"
    />
    <ellipse
      id="left-eye"
      cx="117.568"
      cy="119.235"
      rx="26.3324"
      ry="25.0785"
      fill="black"
    />
    <ellipse
      id="right-eye"
      cx="182.772"
      cy="119.235"
      rx="26.3324"
      ry="25.0785"
      fill="black"
    />
    <path
      id="mouth"
      d="M150.016 228.028L92.5896 193.988H205.347L150.016
    228.028Z"
      fill="black"
      stroke-width="0"
    />
    <path
      id="tongue"
      d="M114.928 200.371C114.928 256.683 179.817 257.523 179.817 200.371H114.928Z"
      fill="#FFA397"
    />
  </svg>
</template>

<script>
export default {}
</script>

<style lang="scss">
#dog {
  --ear-speed: 1s;
  --tongue-speed: 0.2s;

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
    color: red;
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
}
</style>
