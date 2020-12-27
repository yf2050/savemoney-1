const localStorageKeyName = 'recordList'; //把名称用变量保存
const model = {
  //克隆方法 把record转到record2
  clone(data: RecordItem | RecordItem[]) {
    return JSON.parse(JSON.stringify(data));
  },
  //读数据
  fetch() {
    return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]'); //是record的集合
  },
  //写数据
  save(data: RecordItem[]) {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
  }
};
export default model;
// export {model}
