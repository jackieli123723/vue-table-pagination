# vue-table-pagination
vue2封装的table联动组件

[![npm version](https://badge.fury.io/js/vue-table-pagination.svg)](https://badge.fury.io/js/vue-table-pagination)
[![Build Status](https://www.travis-ci.org/jackieli123723/vue-table-pagination.svg?branch=master)](https://www.travis-ci.org/jackieli123723/vue-table-pagination)
[![Coverage Status](https://coveralls.io/repos/github/jackieli123723/vue-table-pagination/badge.svg?branch=master)](https://coveralls.io/github/jackieli123723/vue-table-pagination?branch=master)

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

## 演示样式

```
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
```
