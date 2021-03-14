//custom可以更换，xxx.d.ts代表自定义的全局
type RecordItem = { //先声明Recode类型
  tags: Tag[];
  notes: string;
  type: string;
  amount: number;  //数据类型 string | object
  createdAt?: string; //类 是object的划分 这里也叫构造函数Date
}
type RootState = {
  recordList: RecordItem[];
  createRecordError: Error | null;
  createTagError: Error | null;
  tagList: Tag[];
  currentTag?: Tag;
};
//新建Tag里面含有id
type Tag = {
  id: string;
  name: string;
}
// type TagListModel = {
//   data: Tag[];
//   fetch: () => Tag[];
//   create: (name: string) => 'success' | 'duplicated'; //类似于枚举，只返回字符串的两个值，联合类型---字符串子类型
//   update: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
//   remove: (id: string) => boolean;
//   save: () => void; //不返回数据
// }
