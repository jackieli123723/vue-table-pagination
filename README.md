# vue-table-pagination
vue2封装的table联动组件

[![NPM](https://nodei.co/npm/vue-table-pagination.png?compact=true)](https://www.npmjs.org/package/vue-table-pagination)

[![npm version](https://badge.fury.io/js/vue-table-pagination.svg)](https://badge.fury.io/js/vue-table-pagination)
[![Build Status](https://www.travis-ci.org/jackieli123723/vue-table-pagination.svg?branch=master)](https://www.travis-ci.org/jackieli123723/vue-table-pagination)
[![Coverage Status](https://coveralls.io/repos/github/jackieli123723/vue-table-pagination/badge.svg?branch=master)](https://coveralls.io/github/jackieli123723/vue-table-pagination?branch=master)
[![npm Download](https://img.shields.io/npm/dm/vue-table-pagination.svg)](https://www.npmjs.com/package/vue-table-pagination)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

## Install with npm

```
Installing

npm install --save vue-table-pagination

Import

import Vue from 'vue';
import VueTablePagination from 'vue-table-pagination';
Vue.use(VueTablePagination);
```

# 西门互联分页组件
可自定义配置和分页可fork自行修改

```
<vue-table-pagination
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
            ></vue-table-pagination>
gmChangePageButton -- 按钮改变分页
gmChagePageSize --每页显示多少条
page -- 当前高亮锚点
totalPage -- 总页数
gmCanJump --是否跳转
gmCanChoose -- 是否改变分页条数
gmTableLists --tbody数据
gmTableThLists --theader数据
gmIsIndex --开启索引
gmPerEmitClick --table中的按钮操作
gmTableWidth --table宽度
gmTimeStampType --时间参数
```

## 效果图截图

![vue2封装的table联动组件](./screenshot/1.png)
![vue2封装的table联动组件配色](./screenshot/vue分页组件封装.png)

## 演示test.vue

```
<template>

    <div class="page-view">
        <div class="page-content">
          <!-- 通用table组件 -->
          <!--用法 -->
          <vue-table-pagination
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
          ></vue-table-pagination>
        </div>
      </div>

</template>

<script>

  export default {
    name: 'test',
    data(){
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
              "update_user":"审核人",
              "update_time":"审核时间"
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
        //this.$router.replace('/')
      },
      gmChagePageSize(data){
        this.page = 1
        this.pageSize = data
        console.log(data)
      },
      //分页组件传递事件ajax
      gmChangePageButton(page){
         this.page = page
         console.log(page)
      }
    }
  };
</script>

<style lang="css">
  #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
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
</style>

```
