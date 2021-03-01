import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

const store = {
  //record store
  recordList: recordListModel.fetch(),
  createRecord: (record: RecordItem) => recordListModel.create(record),

  //tag store
  tagList: tagListModel.fetch(),
  createTag: (name: string) => {
    const message = tagListModel.create(name);
    if (message === 'duplicated') {
      window.alert('标签重复了');
    } else if (message === 'success') {
      window.alert('添加成功');
    }
  },
  //删
  removeTag: (id: string) => {
    return tagListModel.remove(id);
  },
  //改 tag里的所有东西
  updateTag: (id: string, name: string) => {
    return tagListModel.update(id, name);
  },
  //查 标签
  findTag(id: string) {
    return this.tagList.filter(t => t.id === id)[0];//不用find太新，用filter
  }
};

export default store;
