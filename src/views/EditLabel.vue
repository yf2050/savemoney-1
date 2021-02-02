<template>
  <div class="EditLabel">

    <div class="navBar">
      <!--      可以用.native-->
      <Icon class="leftIcon" name="left" @click="goBack"/>
      <span class="title">标签编辑</span>
      <Icon class="rightIcon"/>
    </div>
    <FormItem class="form-wrapper" :value="tag.name" fileName="标签名" placeholder='请输入标签名' @update:value="updateTag"/>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/Notes.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {Button, FormItem}
})
export default class EditLabel extends Vue {
  tag?: Tag = undefined;

  created() {
    this.tag = window.findTag(this.$route.params.id);
    if (!this.tag) {
      this.$router.replace('/404');
    }
  }

// 删除标签
  remove() {
    if (this.tag) {
      if (window.removeTag(this.tag.id)) {
        this.$router.back();
      } else {
        alert('删除失败');
      }
    }
  }

  //更新标签
  updateTag(name: string) {
    if (this.tag) {
      window.updateTag(this.tag.id, name);
    }
  }

// 回退
  goBack() {
    this.$router.back();
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
