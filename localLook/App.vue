<template>
  <div>
    <div class ="vue-info">
      <h1 class="header__title">vue-table-pagination</h1>
      <br/>
      <a href="https://github.com/jackieli123723/vue-table-pagination" target="_blank">
        <img src="https://img.shields.io/github/forks/jackieli123723/vue-table-pagination.svg" />
      </a>
      <a href="https://github.com/jackieli123723/vue-table-pagination" target="_blank">
        <img src="https://img.shields.io/github/stars/jackieli123723/vue-table-pagination.svg" />
      </a>
      <a href="https://github.com/jackieli123723/vue-table-pagination" target="_blank">
        <img src="https://img.shields.io/github/issues/jackieli123723/vue-table-pagination.svg" />
      </a>
      <a href="https://github.com/jackieli123723/vue-table-pagination" target="_blank">
        <img src="https://img.shields.io/npm/dm/vue-table-pagination.svg" />
      </a>
    </div>
    <div class="page-view">
        <div class="page-content">
          <!-- 通用table组件 -->
          <!--用法 -->

          <VueTablePagination
                  @gmChangePageButton="gmChangePageButton"
                  @gmChagePageSize="gmChagePageSize"
                  :gmCurrentPage="page"
                  :gmTotalPage="totalPage"
                  :gmCanJump="true"
                  :gmCanChoose="true"
                  :gmTableLists="gmTableLists"
                  :gmTableThLists="gmTableThLists"
                  :gmIsIndex="true"
                  @gmPerEmitClick="gmPerEmitClick"
                  :gmTableWidth="0"
                  :gmTimeStampType="63"
          ></VueTablePagination>

        </div>
      </div>
  </div>
</template>

<script>
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
import VueTablePagination from '@/components/Table.vue'
export default {
  components: {
    VueTablePagination
  },
  computed: {
     messageTable() {
       return '西门互联vue-table-pagination组件......用法详见控制台--http://localhost:9100'
     }
   },
  data () {
    return {
      page:1,
          pageSize:10,
          totalPage:100,
          //修改为value对象下面值取
          gmTableLists:[
              {
                "game_uuid": {
                  "value": 14
                },
                "title": {
                  "value": "标题1"
                },
                "content": {
                  "value": "这是标题1的所有内容内容这是标题1的所有内容内容"
                },
                "attachment": {
                  "value": [
                    {
                      "props": "晶能id",
                      "number": "10"
                    }, {
                      "props": "皮肤id",
                      "number": "10"
                    }
                  ]
                },
                "receiver": {
                  "value": ["张三", "李四", "王麻子", "小红"]
                },
                "sendtime": {
                  "value": 1515772800
                },
                "create_user": {
                  "value": "超级管理员1"
                },
                "create_time": {
                  "value": 1515828493
                },
                "update_user": {
                  "value": "admin"
                },
                "update_time": {
                  "value": '1515828493'
                },
                "operate": {
                  "value": [
                    {
                      "game_uuid": 14,
                      "action": "pk_id"
                    }, {
                      "button_name": "编辑",
                      "action": "edit"
                    }, {
                      "button_name": "删除",
                      "action": "delte"
                    }
                  ]
                }
              },
              {
                "game_uuid": {
                  "value": 15
                },
                "title": {
                  "value": "标题2"
                },
                "content": {
                  "value": "这是标题2的所有内容内容这是标题1的所有内容内容"
                },
                "attachment": {
                  "value": [{
                    "props": "晶能id",
                    "number": "11"
                  }, {
                    "props": "皮肤id",
                    "number": "12"
                  }]
                },
                "receiver": {
                  "value": ["小米", "小明"]
                },
                "sendtime": {
                  "value": 1515772800
                },
                "create_user": {
                  "value": "超级管理员2"
                },
                "create_time": {
                  "value": 1515828093
                },
                "update_user": {
                  "value": "jackieli"
                },
                "update_time": {
                  "value": ''
                },
                "operate": {
                  "value": [
                    {
                      "game_uuid": 15,
                      "action": "pk_id"
                    }, {
                      "button_name": "编辑",
                      "action": "edit"
                    }, {
                      "button_name": "删除",
                      "action": "delte"
                    }
                  ]
                }
              },
              {
                "game_uuid": {
                  "value": 16
                },
                "title": {
                  "value": "标题2"
                },
                "content": {
                  "value": "这是标题2的所有内容内容这是标题1的所有内容内容"
                },
                "attachment": {
                  "value": [{
                    "props": "晶能id",
                    "number": "11"
                  }, {
                    "props": "皮肤id",
                    "number": "12"
                  }]
                },
                "receiver": {
                  "value": ["小米", "小明"]
                },
                "sendtime": {
                  "value": 1515772800
                },
                "create_user": {
                  "value": "超级管理员2"
                },
                "create_time": {
                  "value": 1515828093
                },
                "update_user": {
                  "value": "jackieli"
                },
                "update_time": {
                  "value": ''
                },
                "operate": {
                  "value": [
                    {
                      "game_uuid": 16,
                      "action": "pk_id"
                    }, {
                      "button_name": "编辑",
                      "action": "edit"
                    }, {
                      "button_name": "删除",
                      "action": "delte"
                    }
                  ]
                }
              }
          ],
          //接口先获取这个表头字段对应    "fields"://表单字段列表  button 操作
          //然后在获取gmTableLists
          //每个用户看到的字段格式都不一样（权限可设置）
          gmTableThLists:{
              "game_uuid":"流水号",
              "title":"标题",
              "content":"内容预览",
              "attachment":"邮件奖励",
              "receiver":"收件人/人数",
              "sendtime":"发送时间",
              "create_user":"创建者",
              "create_time":"创建时间",
              "update_time":"审核时间",
              "update_user":"审核人"
          }
    }
  },
  methods: {
     //循环事件派发
     gmPerEmitClick(list,index,type){
       console.log("格式化后的当前列数据",list);
       let game_uuid = list.game_uuid.value
       //通过this.gmTableLists[index]的数据来判断每列操作的button的事件
       console.log("通过index参数获取原始数据的操作当前列",this.gmTableLists[index])
       // console.log("商品id:"+id+"---事件:"+type)
       console.log("流水号:"+game_uuid+"---对外index:"+index+"--对外事件类型"+type)
       show_msg("点击了"+game_uuid+'操作'+type)
       //this.$router.replace('/')
     },
     gmChagePageSize(data){
       this.page = 1
       this.pageSize = data
      show_msg("每页显示"+data+"条数据")
     },
     //分页组件传递事件ajax
     gmChangePageButton(page){
        this.page = page
        show_msg("跳到第"+page+"页")
     }
   }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
.vue-info{
  text-align: center;
}
* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}


* > input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #fff inset !important; /*关于解决输入框背景颜色*/
    -webkit-text-fill-color: #000000!important;
}
html,
body {
    font-family: "Microsoft YaHei";
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    background: #fff;
    padding: 0 10px;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
}

ol,
ul,
li {
    list-style: none;
}

img {
    border: 0 none;
}

a {
    text-decoration: none;
}

a,
input,
textarea {
    outline: none;
}

input::-ms-clear,
input::-ms-reveal {
    display: none;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

caption,
th,
td {
    text-align: left;
    font-weight: normal;
    vertical-align: middle;
}

.clearfix {
    *zoom: 1;
}

.clearfix:after {
    clear: both;
    content: '';
    display: block;
    height: 0;
    visibility: hidden;
}

.hide {
    display: none !important;
}

.show {
    display: block;
}

.fl {
    float: left;
}

.fr {
    float: right
}
.motify {
    display: none;
    position: fixed;
    top: 35%;
    left: 50%;
    width: 220px;
    padding: 0;
    margin: 0 0 0 -110px;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    font-size: 14px;
    line-height: 1.5em;
    border-radius: 6px;
    -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
}

.motify .motify-inner {
    padding: 10px 10px;
    text-align: center;
    word-wrap: break-word;
}

.motify p {
    margin: 0 0 5px;
}

.motify p:last-of-type {
    margin-bottom: 0;
}


</style>
