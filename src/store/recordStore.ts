import clone from '@/lib/clone';

const localStorageKeyName = 'recordList'; //把名称用变量保存

const recordStore = {
  recordList: [] as RecordItem[],
  //读数据
  fetchRecords() {
    this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[]; //是record的集合
    return this.recordList;
  },
  //存数据
  saveRecords() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
  },
  //创数据
  createRecord(record: RecordItem) {
    const record2: RecordItem = clone(record);
    record2.createdAt = new Date().toISOString();
    // this.recordList && this.recordList.push(record2);
    this.recordList?.push(record2);
    this.saveRecords();
  },
};
recordStore.fetchRecords();
export default recordStore;
