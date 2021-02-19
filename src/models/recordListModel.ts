import clone from '@/lib/clone';

const localStorageKeyName = 'recordList'; //把名称用变量保存
const recordListModel = {
  data: [] as RecordItem[],
  //定义 把他单独出来 data类型
  create(record: RecordItem) {
    const record2: RecordItem = clone(record);
    record2.createdAt = new Date();
    this.data.push(record2);
    this.save()
  },
  //读数据
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[]; //是record的集合
    return this.data;
  },
  //写数据
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};
export default recordListModel;
// export {recordListModel}
