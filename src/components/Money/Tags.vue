<template>
  <div>
    <div class="tags">
      <div class="new">
        <button>新增标签</button>
      </div>
      <ul class="current">
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>

      </ul>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Tags'
}
</script>

<style lang="scss" scoped>
.tags {
  display: flex;
  flex-grow: 1;
  flex-direction: column-reverse;
  font-size: 14px;
  padding: 16px;

  .current {
    display: flex;
    flex-wrap: wrap;

    > li {
      background-color: #D9D9D9;
      $h: 24px;
      height: $h;
      line-height: $h;
      //border-radius:$h/2;
      border-radius: $h/2;
      padding: 0 17px 0 18px;
      margin-right: 16px;
      margin-top: 4px;
    }
  }

  > .new {
    padding-top: 16px;

    button {
      background: transparent;
      border: none;
      color: #999999;
      border-bottom: 1px solid;
      padding: 0 3px;
    }
  }
}
</style>
