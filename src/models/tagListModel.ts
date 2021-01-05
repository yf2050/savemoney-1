const localStorageKeyName = 'tagList'; //把名称用变量保存
//新建Tag里面含有id
type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => 'success' | 'duplicated'; //类似于枚举，只返回字符串的两个值，联合类型---字符串子类型
  save: () => void; //不返回数据
}

const tagListModel: TagListModel = {
  data: [],
  //读数据
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data; //是record的集合
  },
  //创建标签
  create(name: string) {
    //由于this.data=[{id:'1',name:'1'},{id:'2',name:'2'}] 使用map得到tag[]中的name集合
    const names = this.data.map(item => item.name);
    if (names.indexOf(name) >= 0) {return 'duplicated';}
    this.data.push({id: name, name: name});
    this.save();
    return 'success';
  },
  //写数据
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
};
export default tagListModel;
// export {recordListModel}
