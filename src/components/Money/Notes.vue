<template>
  <div>
    <div>
      <label class="notes">
        <span class="name">备注</span>
        <input type="text" placeholder="在这里输入备注">
      </label>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Notes'
}
</script>

<style lang="scss" scoped>
.notes {
  background-color: #f5f5f5;
  font-size: 14px;
  display: flex;
  align-items: center;

  > .name {
    padding: 0 16px;
  }

  input {
    height: 64px;
    flex-grow: 1;
    background: transparent;
    border: none;
  }
}
</style>
