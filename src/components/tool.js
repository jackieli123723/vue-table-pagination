export function gmCount(currentPage=1, totalPage=1, howMuchPageButtons, baseOnCurrentPageButtonOffset) {
  let startPage, endPage, result = [];
  if (currentPage > baseOnCurrentPageButtonOffset) {
    startPage = currentPage - baseOnCurrentPageButtonOffset;
    endPage = ( totalPage > (currentPage + baseOnCurrentPageButtonOffset) )
              ? (currentPage + baseOnCurrentPageButtonOffset)
              : totalPage;
  }
  else {
    startPage = 1;
    endPage = (totalPage > howMuchPageButtons)
              ? howMuchPageButtons
              : totalPage;
  }
  if ( (currentPage + baseOnCurrentPageButtonOffset) > totalPage ) {
    startPage = startPage - (currentPage + baseOnCurrentPageButtonOffset - endPage);
  }

  if (startPage <= 0) startPage = 1
  for (let i = startPage; i <= endPage; i++) {
    result.push(i);
  }
  return result; 
}

export function show_msg(msg, timeOut) {
    var timer = null;
    var timeOut = timeOut || 1000;
    var index = 0;
    index++;
    if (index > 1) {
        return
    }
    clearTimeout(timer);
    var msg_dis_container = document.createElement("div");
    var msg_dis_content = document.createElement("div");

    msg_dis_container.id = "msg_dis_container"
    msg_dis_container.style.block = "none";
    msg_dis_container.className = "motify";
    msg_dis_content.id = "msg_dis_content"
    msg_dis_content.className = "motify-inner";

    msg_dis_container.appendChild(msg_dis_content)
    document.body.appendChild(msg_dis_container);
    msg_dis_content.innerHTML = msg;
    msg_dis_container.style.display = "block";
    timer = setTimeout(function() {
        msg_dis_container.style.display = "none";
        document.body.removeChild(msg_dis_container);
        index = 0
    }, timeOut);
}

//映射表
//edit == 编辑
//add == 添加
//delete == 删除
//menu == 进入某菜单详情
//push == 推送事件按钮
//view == 查看/详情
//export == 导出
//verify == 审核


//时间转换 公用
//扩展时分秒
// 时间属性
// | 61| 年月日
// | 62| 年月日 时分
// | 63| 年月日时分秒
// | 64| 时分
// | 65| 时分秒

// 秒为单位
function getDateSplit(timstamp,timeType) {
     if(!timeType) timeType = 61
    let date = new Date(Number(timstamp.value) *1000 ) ? new Date(Number(timstamp.value) * 1000) :"";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let today = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    if (typeof timstamp=="string") { return timstamp; }
    if (month < 10) {month = "0" + month;}
    if (today < 10) { today = "0" + today;}
    if(hour<10){ hour="0"+hour;}
    if(minute<10){minute="0"+minute;}
    if(second<10){second="0"+second;}

    if(timstamp.value == ''){
      return {
        value:""
      }
      return;
    }

    if(timeType == 61 && date){
       return {
        value: date.getFullYear() + "/" + month + "/" + today
      }
    }

    if(timeType == 62 && date){
       return {
        value: date.getFullYear() + "/" + month + "/" + today + " " + hour + ":" + minute
      }
    }
   
    if(timeType == 63 && date){
       return {
        value: date.getFullYear() + "/" + month + "/" + today + " " + hour + ":" + minute  + ":" + second
      }
    }

    if(timeType == 64 && date){
       return {
        value:  hour + ":" + minute
      }
    }

    if(timeType == 65 && date){
       return {
        value: hour + ":" + minute  + ":" + second
      }
    }
}

//文本截断
function getContentOverflow(text,length){
if(!length) length =10
 return{
   value: text.value.substring(0,length)+"..."
 }
}

//邮件奖励
function getEmailAttachment(attachment){
 let len = attachment.value.length
 return {
  value: len ?  "是" : "否"
 }

 // let str = ''
 // for(let i=0;i<len;i++){
 //  str += Object.values(attachment.value[i]).join(":") + ','
 // }
 // return {
 //  value:str.substring(0,str.length-1)
 // }
}

//收件人数
function getReceiver(users){
  return{
   value: users.value.length ?  users.value.length : 0
 }
}

// ["1","2","3"].join() "1,2,3"
//tabel 字段格式
//例如时间,价格,状态等等
//模拟了vue filter效果
//修改为obj--value
 export  function formatTdFilters(keys,value,gmTimeStamp) {
    switch (keys){
          case "price":
          value = value.toFixed(2) +"元";
          break;
          case "limitId":
          if(value == 1){
             value = '同步添加'
          }
          if(value == 2){
             value = '运营添加'
          }
           break;
          case "originId":
          if(value == 1){
             value = '盈利'
          }
          if(value == 2){
             value = '亏损'
          }
          break;
          case "sendtime":
          value = getDateSplit(value,gmTimeStamp);
          break;
          case "create_time":
          value = getDateSplit(value,gmTimeStamp);
          break;
          case "update_time":
          value = getDateSplit(value,gmTimeStamp);
          break;
          case "content":
          value = getContentOverflow(value);
          break;
          case "receiver":
          value = getReceiver(value);
          break;
          case "attachment":
          value = getEmailAttachment(value);
          break;
          case "attr":
          value = Object.values(value).join()
          break;
      }

    return value
}