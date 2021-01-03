const localStorageKeyName = 'tagList'; //把名称用变量保存
type TagListModel = {
  data: string[];
  fetch: () => string[];
  create: (name: string) => 'success' | 'duplicated';
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
    if (this.data.indexOf(name) >= 0) {return 'duplicated';}
    this.data.push(name);
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
