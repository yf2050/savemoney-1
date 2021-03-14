// mixins.js
import Vue from 'vue';
import Component from 'vue-class-component';

// You can declare mixins as the same style as components.
const map: { [key: string]: string } = {'tag name duplicated': '标签名重复了'};

@Component
export class TagHelper extends Vue {
  createTag() {
    const name = window.prompt('请输入标签名');
    if (!name) {return window.alert('标签名不能为空');}
    this.$store.commit('createTag', name); //用this.$store.commit
    if (this.$store.state.createTagError) {
      window.alert(map[this.$store.state.createTagError.message] || '未知报错');
    }
    window.alert('添加成功');
  }
}

export default TagHelper;
