<template>
  <p>Customized 404 error page</p>
</template>

<script>
export default {
  name: 'Error404',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
