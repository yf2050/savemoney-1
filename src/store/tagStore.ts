import createId from '@/lib/createId';

const localStorageKeyName = 'tagList'; //把名称用变量保存
const tagStore = {
  tagList: [] as Tag[],
  //读数据
  fetchTags() {
    this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.tagList; //是record的集合
  },
  //创建标签
  createTag(name: string) {
    //由于this.data=[{id:'1',name:'1'},{id:'2',name:'2'}] 使用map得到tag[]中的name集合
    const names = this.tagList.map(item => item.name);
    if (names.indexOf(name) >= 0) {
      window.alert('标签重复了');
      return 'duplicated';
    }
    const id = createId().toString();
    this.tagList.push({id: id, name: name});
    this.saveTags();
    window.alert('添加成功');
    return 'success';
  },
  //删除标签
  removeTag(id: string) {
    let index = -1;
    for (let i = 0; i < this.tagList.length; i++) {
      if (this.tagList[i].id === id) {
        index = i;
        break;
      }
    }
    this.tagList.splice(index, 1);//删除找到的数据
    this.saveTags();//保存一下
    return true;
  },
  //更新修改标签
  updateTag(id: string, name: string) {
    const idList = this.tagList.map(item => item.id); //得到所有id
    if (idList.indexOf(id) >= 0) {
      const names = this.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {//判断标签名是否重复
        return 'duplicated';
      } else {
        const tag = this.tagList.filter(item => item.id === id)[0];
        tag.name = name;
        this.saveTags();
        return 'success';
      }
    } else {
      return 'not found';
    }
  },
  //写数据
  saveTags() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
  },
  //查 标签
  findTag(id: string) {
    return this.tagList.filter(t => t.id === id)[0];//不用find太新，用filter
  }
};

tagStore.fetchTags();
export default tagStore;
