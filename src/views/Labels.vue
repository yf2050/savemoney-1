<template>
  <Layout>
    <div class="tags">
      <router-link class="tag" :to="`/labels/edit/${tag.id}`" v-for="tag in tags" :key="tag.id">
        <span>{{ tag.name }}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <!--      传递点击事件，.native装饰器，使得组件对应元素button传递click或者小buton传递给大Button-->
      <!--      <Button @click.native="createTag">新建标签</Button>      -->
      <Button @click="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import {mixins} from 'vue-class-component';
import {TagHelper} from '@/mixins/TagHelper';

@Component({
  components: {Button},
  computed: {
    tags() {
      return this.$store.state.tagList;
    }
  }
})
export default class Labels extends mixins(TagHelper) {
  beforeCreate() {
    this.$store.commit('fetchTags');
  }

  // createTag() {
  //   const name = window.prompt('请输入标签名');
  //   if (!name) {return window.alert('标签名不能为空');}
  //   this.$store.commit('createTag', name); //用this.$store.commit
  // }
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
