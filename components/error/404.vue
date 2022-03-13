<template>
  <p>Customized 404 error page</p>
</template>

<script>
export default {
  name: "error-401",
  props: {
    error: {
      type: Object,
      default: () => {}
    },
  }
};
</script>