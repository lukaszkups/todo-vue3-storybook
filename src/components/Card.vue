<template>
  <div class="card">
    <div class="card__body">
      <slot name="default"></slot>
    </div>
    <div class="card__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
<style lang="scss">
.card {
  background: #fff;
  border-radius: 8px;
  border-color: #ddd;
  padding: 20px;
  display: flex;
  flex-direction: column;
  -webkit-box-shadow: 1px 5px 5px -5px rgba(66, 68, 90, 1);
  -moz-box-shadow: 1px 5px 5px -5px rgba(66, 68, 90, 1);
  box-shadow: 1px 5px 5px -5px rgba(66, 68, 90, 1);

  &__body {
    flex: 1;
    width: 100%;
    display: flex;
    overflow: hidden;
    position: relative;
  }

  &__body + &__footer {
    margin-top: 20px;
  }
}
</style>
