<template>
  <button @click="onClick" class="btn" :disabled="disabled">
    {{ name }}
  </button>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style lang="scss">
.btn {
  width: 80px;
  padding: 10px 8px;
  font-size: 14px;
  font-weight: bold;
  background: #60bd4f;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background: darken(#60bd4f, 10%);
  }

  &:disabled {
    background: lighten(#60bd4f, 25%);
    cursor: not-allowed;
  }
}
</style>
