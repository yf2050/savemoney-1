//每次刷新页面会变成id,同时id必须是数字或者保底值0
let id: number = parseInt(window.localStorage.getItem('_idMax') || '0') || 0;

function createId() {
  id++;
  window.localStorage.setItem('_idMax', id.toString()); //把_idMax存下来
  return id;
}

export default createId;
