<template>
  <Layout>
    <div class="tags">
      <router-link class="tag" :to="`/labels/edit/${tag.id}`" v-for="tag in tags" :key="tag.id">
        <span>{{ tag.name }}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <button class="createTag" @click="createTag">新增标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';

tagListModel.fetch();
@Component
export default class Labels extends Vue {
  tags = tagListModel.data;

  createTag() {
    const name = window.prompt('请输入标签名');
    if (name) {
      const message = tagListModel.create(name);
      if (message === 'duplicated') {
        window.alert('标签重复了');
      } else if (message === 'success') {
        window.alert('添加成功');
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.tags {
  background-color: #ffffff;
  font-size: 16px;
  color: #000000;
  padding-left: 16px; //这个对背景和下划线有影响

  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;

    svg {
      color: #333;
      font-size: 18px;
      margin-right: 16px;
    }
  }
}

.createTag {
  color: white;
  background-color: #ff0000;
  border: none;
  min-height: 40px;
  padding: 0 16px;
  border-radius: 4px;

  &-wrapper {
    text-align: center;
    margin-top: 44-16px;
    padding: 16px;
  }
}
</style>
