<template>
  <div class="EditLabel">
    <div class="navBar">
      <Icon class="leftIcon" name="left"/>
      <span class="title">标签编辑</span>
      <Icon class="rightIcon"/>
    </div>
    <FormItem class="form-wrapper" fileName="标签名" placeholder="请输入标签"/>
    <div class="button-wrapper">
      <Button>删除标签</Button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';
import FormItem from '@/components/Money/Notes.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {Button, FormItem}
})
export default class EditLabel extends Vue {
  tag?: { id: string; name: string } = undefined;

  created() {
    const id = this.$route.params.id;
    console.log(id);
    tagListModel.fetch();
    const tags = tagListModel.data;
    const tag = tags.filter(t => t.id === id)[0];//不用find太新，用filter
    if (tag) {
      this.tag = tag;
    } else {
      this.$router.replace('/404');
    }
  }
}
</script>

<style lang="scss" scoped>
.EditLabel {
  .navBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    padding: 12px 16px;
    font-size: 16px;

    > .leftIcon {
      height: 24px;
      width: 24px;
    }

    > .title {
      font-size: 16px;
      line-height: 16px;
    }

    > .rightIcon {
      height: 24px;
      width: 24px;
    }
  }

  .form-wrapper {
    background-color: white;
    margin-top: 8px;
    font-size: 16px;
    box-shadow: inset 0px -0.5px 0px #BCBBC1
  }

  .button-wrapper {
    text-align: center;
    padding: 48-16px;
  }
}
</style>
