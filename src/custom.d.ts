//custom可以更换，xxx.d.ts代表自定义的全局
type RecordItem = { //先声明Recode类型
  tags: string[];
  notes: string;
  type: string;
  amount: number;  //数据类型 string | object
  createdAt?: Date; //类 是object的划分 这里也叫构造函数
}
