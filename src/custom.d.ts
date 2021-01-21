//custom可以更换，xxx.d.ts代表自定义的全局
type RecordItem = { //先声明Recode类型
  tags: string[];
  notes: string;
  type: string;
  amount: number;  //数据类型 string | object
  createdAt?: Date; //类 是object的划分 这里也叫构造函数
}
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
  remove: (id: string) => boolean;
  save: () => void; //不返回数据
}

//定义一下 类型
interface Window {
  tagList: Tag[];
  createTag: (name: string) => void; //没有返回值
}
