<template>
  <div>
    <v-progress-circular
      :rotate="360"
      :size="100"
      :width="15"
      :value="value"
      color="teal"
    >
      {{ value }}
    </v-progress-circular>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
