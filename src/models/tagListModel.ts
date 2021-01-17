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
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
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
  //更新修改标签
  update(id, name) {
    const idList = this.data.map(item => item.id); //得到所有id
    if (idList.indexOf(id) >= 0) {
      const names = this.data.map(item => item.name);
      if (names.indexOf(name) >= 0) {//判断标签名是否重复
        return 'duplicated';
      } else {
        const tag = this.data.filter(item => item.id === id)[0];
        tag.name = name;
        this.save();
        return 'success';
      }
    } else {
      return 'not found';
    }
  },
  //写数据
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
};
export default tagListModel;
// export {recordListModel}
