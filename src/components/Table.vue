<template>
  <div class="gm-table">
    <div class="gm-table-content">
      <div class="gm-table-body">
       <table :style="{ width: gmTableWidth ? gmTableWidth + 'px' : '' }">
          <thead class="gm-table-thead">
             <tr>
               <th v-if="gmIsIndex"><span>序号</span></th>
               <th v-for="(listTh,index) in Object.values(gmTableThLists)"><span>{{listTh}}</span></th>
               <th v-if="gmIsOperationOperate"><span>操作</span></th>
             </tr>
         </thead>
         <tbody class="gm-table-tbody" v-if="gmTotalPage>0" >
             <tr class="gm-table-row" v-for="(listTd,index) in gmTableTdListsFilter" >
              <td v-if="gmIsIndex">{{index+1}}</td>
              <!-- 修复高亮html标签 -->
              <td v-for="(tableItemTd,tableIndex) in  Object.values(listTd)" v-html=tableItemTd.value>
              </td>
              <td v-if="gmIsOperationOperate">
                <!-- 按钮事件单独出来处理 -->
                 <span class="table-btn"  :action="gmClick.action" :menuId="gmClick.menu_id" :pushId="gmClick.push_id" :class="gmClick.action"  v-for="(gmClick,tableClickIndex) in Object.values(gmTableTdClicksFilter[index])" @click="gmEmitClick(listTd,index,Object.values(gmTableTdClicksFilter[index])[tableClickIndex].action)">
                   {{gmClick.button_name}}
                 </span>
              </td>
            </tr>
         </tbody>
        </table>
            <div class="no-data-text" v-if="(gmTableTdListsFilter && gmTableTdListsFilter.length == 0 ) && gmTotalPage == 0 "><svg t="1490948167655" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13320" xmlns:xlink="http://www.w3.org/1999/xlink" width="90" height="90"><defs></defs><path d="M960.474 0 63.528 0C28.443 0 0 28.391 0 63.413l0 897.173C0 995.609 28.443 1024 63.528 1024l896.945 0c35.085 0 63.527-28.391 63.527-63.414L1024 63.413C1024 28.391 995.558 0 960.474 0zM944.422 467.167 712.5 467.167 712.5 317.796l231.922 0L944.422 467.167zM399.5 701.833 399.5 547.166l233 0 0 154.667L399.5 701.833zM632.5 781.833l0 162.588-233 0L399.5 781.833 632.5 781.833zM319.5 701.833 79.58 701.833 79.58 547.166 319.5 547.166 319.5 701.833zM632.5 317.796l0 149.371-233 0L399.5 317.796 632.5 317.796zM712.5 547.166l231.922 0 0 154.667L712.5 701.833 712.5 547.166zM79.58 79.579l864.842 0 0 158.217L79.58 237.796 79.58 79.579zM319.5 317.796l0 149.371L79.58 467.167 79.58 317.796 319.5 317.796zM79.58 781.833 319.5 781.833l0 162.588L79.58 944.421 79.58 781.833zM712.5 944.421 712.5 781.833l231.922 0 0 162.588L712.5 944.421z" p-id="13321" fill="#1a9af3"></path><path d="M189.632 157m-32.387 0a32.387 32.387 0 1 0 64.774 0 32.387 32.387 0 1 0-64.774 0Z" p-id="13322" fill="#1a9af3"></path><path d="M317.901 157m-32.387 0a32.387 32.387 0 1 0 64.774 0 32.387 32.387 0 1 0-64.774 0Z" p-id="13323" fill="#1a9af3"></path><path d="M446.172 157m-32.387 0a32.387 32.387 0 1 0 64.774 0 32.387 32.387 0 1 0-64.774 0Z" p-id="13324" fill="#1a9af3"></path></svg><p>没有找到相关数据，请重新检索！</p></div>
           <!--  分页 -->
           <div class="gm-pagination "  v-if="gmTableTdListsFilter && gmTableTdListsFilter.length > 0" >
           <!-- 总条数 -->
            <span class="gm-pagination-info ">共 {{ gmTotalPage }} 条记录</span>
            <span class="gm-pagination-info" v-if="gmCanChoose">&nbsp;&nbsp;每页显示</span>
            <div class="gm-modle-select-box" v-if="gmCanChoose">
              <span>{{gmDefaultPageSize}} 条/页 <i class="iconfont icon-down-arrow"></i>
               <ul class="gm-modle-select-dropdown">
                <li :class="{'selected':gmDefaultPageSize == item}" v-for="item in gmSelectItem" @click="gmPerPage(item)">{{item}} 条/页</li>
              </ul>
              </span>
            </div>
            <!-- 跳转按钮 -->
            <span v-if="gmCanJump">
              <span class="gm-pagination-input">&nbsp;&nbsp;跳到第 <input type="text" onkeyup="value=value.replace(/[^\d]/g,'')" v-model="gmCanJumpNum" @keyup.enter="gmToPage(gmCanJumpNum)" ref="jump"> 页</span>
              <span class="gm-pagination-submit" @click.stop="gmToPage(gmCanJumpNum)">确定</span>
            </span>
            <div class="fr">
            <!-- 首部按钮 -->
            <span class="gm-pagination-button boundary" :class="{disable: gmHeadDisabled}" @click.stop="gmToHeadPage">首页</span>
            <span class="gm-pagination-button" :class="{disable: gmHeadDisabled}" @click.stop="gmToPrevPage"><i class="iconfont icon-prev"><</i></span>
            <!-- 首部省略号 -->
            <span v-if="gmHeadEllipsisShow" class="gm-pagination-info">...</span>
            <!-- 页码按钮 -->
            <span v-for="indexNum in gmShowBunNum">
              <span v-if="gmCurrentPage === indexNum" class="gm-pagination-button active">{{ indexNum }}</span>
              <span v-else class="gm-pagination-button" @click.stop="gmToPage(indexNum)">{{ indexNum }}</span>
            </span>
            <!-- 尾部省略号 -->
            <span v-if="gmTailEllipsisShow" class="gm-pagination-info">...</span>
            <!-- 尾部按钮 -->
            <span class="gm-pagination-button" :class="{disable: gmTailDisabled}" @click.stop="gmToNextPage"><i class="iconfont icon-next">></i></span>
            <span class="gm-pagination-button boundary" :class="{disable: gmTailDisabled}" @click.stop="gmToTailPage">尾页</span>
            </div>
          </div>
      </div>
    </div>
  </div>

</template>
<script>
import { gmCount, show_msg,formatTdFilters } from './tool'

export default {
  name: 'vue-table-pagination',
  props: {
    //总数据
    gmTableLists:{
       type: Array,
       default: Array
    },
    //列表操作列对应的事件回调
    // gmTableTdClicks:{
    //    type: Array,
    //    default: Array
    // },
    //列表头部字段配置
    gmTableThLists:{
       type: Object,
       default: Object
    },
    //启用序号默认不开启
    gmIsIndex:{
      type: Boolean,
      default: false
    },
    //启用操作默认不开启
    // gmIsOperation:{
    //  type: Boolean,
    //  default: false
    // },
   gmTableWidth:{
      type: Number,
      default: ''
    },
    gmTimeStampType:{
      type: Number,
      default: ''
    },
    // 当前所在页数
    gmCurrentPage: {
     type: Number,
     required: true
    },
    // 一共有多少页
    gmTotalPage:{
      type: Number,
      required: true
    },
    //打点
    gmHowMuchPageButtons:{
      type: Number,
      default: 5
    },
    //当前页码前后会展示几个页码按钮
    gmBaseOnCurrentPageButtonOffset: {
      type: Number,
      default: 2
    },
    // 是否显示跳转框
    gmCanJump:{
     type: Boolean,
     default: true
    },
    // 是否显示选择每页显示条数
    gmCanChoose: {
    type: Boolean,
     default: true
     },
    // 改变每页显示条数
    gmChagePageSizeDefault: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      gmCanJumpNum: null,
      gmDefaultPageSize:10,
      gmSelectItem:[10,20,30,50],
      checkAll:false,
      groupProductId:[]
    }
  },

  computed: {
    //过滤配置td字段
    gmTableTdListsFilter() {
      let res = []
      let filterKeys = Object.keys(this.gmTableThLists)
      // console.log("配置过滤字段:"+filterKeys)
      // console.log("时间转换"+this.gmTimeStampType)
      const timeType = this.gmTimeStampType
      function filter(obj, filterKeys) {
         let result = {};
         let keys = Object.keys(obj);
         let len = keys.length;
         for (let i = 0; i < len; i++) {
          let key = keys[i];
          if (filterKeys.indexOf(key) !== -1) {
             filterKeys.forEach(function(item){
                result[item] = obj[item];
               })
          }
       }
      return result;
     }

      this.gmTableLists.filter(function (item) {
          let obj = item
          res.push(filter(obj, filterKeys))
      })

      //console.log("原始数据",res)
       //字段增强修饰格式
      function map(obj, predicate) {
         let result = {};
         let keys = Object.keys(obj);
         let len = keys.length;
          for (let i = 0; i < len; i++) {
           let key = keys[i];
           result[key] = predicate(key, obj[key]);
          }
         return result;
       }
       // Object.values(test)[0].value;
       let temp = [];
       res.filter(function (item) {
            let obj = item
              temp.push(map(obj, function(key, value){
               return formatTdFilters(key,value,timeType)
             }));
        })
      // console.log("格式化字段数据",JSON.stringify(temp,null,2))
      //console.log(this.gmTableTdClicksFilter)
       return temp
    },
    //操作显示默认不显示
    gmIsOperationOperate(){
      let flag = false
      //还要判断是否都是空所有列表都是[] === [[],[],[]....]
      if(this.gmTableTdClicksFilter.length >0){
         flag = true
      }
      return flag
    },
    //table每列显示的按钮
    gmTableTdClicksFilter(){
      let gmTableTdClicks = []
      this.gmTableLists.filter(function (item) {
          let buttonList = item.operate.value
          // gmTableTdClicks.push(buttonList)
          //剔除额外参数通过外派到原始数据获取
            function getButtons(arr){
              let res = []
              for(let i=0;i<arr.length;i++){
                if(arr[i]['button_name']){
                  res.push({
                   "button_name": arr[i]['button_name'],
                   "action": arr[i]['action']
                  })
                }
              }
              return res
            }
            gmTableTdClicks.push(getButtons(buttonList))
      })
      return gmTableTdClicks
   },
    // 首尾按钮是否禁用
    gmHeadDisabled() { return !(this.gmCurrentPage > 1) },
    gmTailDisabled() { return !(this.gmCurrentPage < Math.ceil(this.gmTotalPage/this.gmDefaultPageSize)) },
    // 首尾省略号是否显示
    gmHeadEllipsisShow() {
      if (Math.ceil(this.gmTotalPage/this.gmDefaultPageSize) > this.gmHowMuchPageButtons)
        if (this.gmCurrentPage > this.gmBaseOnCurrentPageButtonOffset + 1) return true;
    },
    gmTailEllipsisShow() {
      if (Math.ceil(this.gmTotalPage/this.gmDefaultPageSize) > this.gmHowMuchPageButtons)
        if (Math.ceil(this.gmTotalPage/this.gmDefaultPageSize) > (this.gmCurrentPage + this.gmBaseOnCurrentPageButtonOffset)) return true;
    },

    // 结果： 最终显示的页码按钮数
    gmShowBunNum() {
      return gmCount(this.gmCurrentPage, Math.ceil(this.gmTotalPage/this.gmDefaultPageSize),
                                      this.gmHowMuchPageButtons,
                                      this.gmBaseOnCurrentPageButtonOffset);
    }
  },
  methods: {
    //派发
    gmEmitClick(list,index,type) {
         let game_uuid = list.game_uuid.value
      //   console.log("流水号:"+game_uuid+"---对外index:"+index+"--对外事件类型"+type)
         this.$emit('gmPerEmitClick', list,index,type);
    },
    gmPerPage(page){
      this.gmDefaultPageSize = page
      this.$emit('gmChagePageSize', page);
    // this.defaultPageSize = page
    // show_msg("每页显示"+page+"条数据")
    },
    gmToHeadPage() {
      if (this.gmHeadDisabled) return;
      let currentPage = 1
      this.$emit('gmChangePageButton', currentPage);
     //  show_msg("调到第"+currentPage+"页")
    },
    gmToTailPage() {
      if (this.gmTailDisabled) return;
      let currentPage = Math.ceil(this.gmTotalPage/this.gmDefaultPageSize);
      this.$emit('gmChangePageButton', currentPage);
     // show_msg("调到第"+currentPage+"页")
    },
    gmToPrevPage() {
      if (this.gmHeadDisabled) return;
      let currentPage = this.gmCurrentPage;
      this.$emit('gmChangePageButton', --currentPage);
      // show_msg("调到第"+currentPage+"页")
    },
    gmToNextPage() {
      if (this.gmTailDisabled) return;
      let currentPage = this.gmCurrentPage;
      this.$emit('gmChangePageButton', ++currentPage);
    //   show_msg("调到第"+currentPage+"页")
    },
    gmToPage(page) {
      let currentPage = parseInt(page);
      if(page == 0 || page == undefined || page == null || page > Math.ceil(this.gmTotalPage/this.gmDefaultPageSize) || isNaN(page)){
       // show_msg('无效页码')
        this.$refs.jump.focus()
        return
      }
      this.$emit('gmChangePageButton', currentPage);
     // show_msg("调到第"+page+"页")
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.checkbox{
     background: url(/static/radio-all.png) 0 0 no-repeat;
     width: 18px;
     height: 18px;
     display: inline-block;
     cursor: pointer;
       transition: all 0.2s ease-in;
     &.active {
         background: url(/static/radio-all-active.png) 0 0 no-repeat;
     }
 }
/*表格组件样式*/
.gm-table {
  font-size: 14px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
  position: relative;
  border-radius: 4px 4px 0 0;
  .gm-table-body {
    -webkit-transition: opacity .3s;
    -o-transition: opacity .3s;
    transition: opacity .3s;
    overflow-x: auto;
    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      text-align: center;
      border-radius: 4px 4px 0 0;
      overflow: hidden;
    }
    .gm-table-thead > tr, .gm-table-tbody > tr {
      -webkit-transition: all .3s;
      -o-transition: all .3s;
      transition: all .3s;

    }
    .gm-table-thead > tr > th {
      background: #fafafa;
      -webkit-transition: background .3s ease;
      -o-transition: background .3s ease;
      transition: background .3s ease;
      text-align: center;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
      border-bottom: 1px solid #e8e8e8;
    }
    .gm-table-thead > tr > th, .gm-table-tbody > tr > td {
      padding: 16px 16px;
      word-break: break-all;
    }
    .gm-table-tbody > tr > td {
      border-bottom: 1px solid #e8e8e8;
      -webkit-transition: all .3s;
      -o-transition: all .3s;
      transition: all .3s;
      &:last-child {
        white-space: nowrap;
      }
    }
    .gm-table-thead > tr.gm-table-row-hover > td,
    .gm-table-tbody > tr.gm-table-row-hover > td,
    .gm-table-thead > tr:hover > td,
    .gm-table-tbody > tr:hover > td {
      background: #e6f7ff;
    }
  }
}
/*表格中按钮组件样式*/
.table-btn,.gmDeafaultClick {
  line-height: 1;
  display: inline-block;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-color: #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  padding: 8px 20px;
  font-size: 14px;
  border-radius: 4px;
  &.is-disabled, &.is-disabled:hover, &.is-disabled:focus {
    color: #c0c4cc;
    cursor: not-allowed;
    background-image: none;
    background-color: #fff;
    border-color: #ebeef5;
  }
  & + .table-btn {
    margin-left: 10px;
  }
  &:hover, &:focus {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
  &.table-btn-primary,&.gmAddClick,&.add {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
    &:hover, &:focus {
      background: #66b1ff;
      border-color: #66b1ff;
      color: #fff;
    }
    &.is-disabled, &.is-disabled:hover, &.is-disabled:focus {
      color: #fff;
      background-color: #a0cfff;
      border-color: #a0cfff;
    }
  }
  &.table-btn-success,&.gmEditClick,&.edit {
    color: #fff;
    background-color: #67c23a;
    border-color: #67c23a;
    &:hover, &:focus {
      background: #85ce61;
      border-color: #85ce61;
      color: #fff;
    }
    &.is-disabled, &.is-disabled:hover, &.is-disabled:focus {
      color: #fff;
      background-color: #b3e19d;
      border-color: #b3e19d;
    }
  }
  &.table-btn-warning,&.gmLookClick,&.view {
    color: #fff;
    background-color: #e6a23c;
    border-color: #e6a23c;
    &:hover, &:focus {
      background: #ebb563;
      border-color: #ebb563;
      color: #fff;
    }
    &.is-disabled, &.is-disabled:hover, &.is-disabled:focus {
      color: #fff;
      background-color: #f3d19e;
      border-color: #f3d19e;
    }
  }
  &.table-btn-danger,&.gmDeleteClick,&.delete,&.delte {
    color: #fff;
    background-color: #f56c6c;
    border-color: #f56c6c;
    &:hover, &:focus {
      background: #f78989;
      border-color: #f78989;
      color: #fff;
    }
    &.is-disabled, &.is-disabled:hover, &.is-disabled:focus {
      color: #fff;
      background-color: #fab6b6;
      border-color: #fab6b6;
    }
  }
  &.table-btn-info,&.gmDisableClick,&.disable {
    color: #fff;
    background-color: #909399;
    border-color: #909399;
    &:hover, &:focus {
      background: #a6a9ad;
      border-color: #a6a9ad;
      color: #fff;
    }
    &.is-disabled, &.is-disabled:hover, &.is-disabled:focus {
      color: #fff;
      background-color: #c8c9cc;
      border-color: #c8c9cc;
    }
  }

  &.gmVerifyClick,&.verify,&.audit{
    color: #fff;
    background-color: #48CFAD ;
    border-color: #48CFAD ;
    &:hover, &:focus {
      background: #37BC9B;
      border-color: #37BC9B;
      color: #fff;
    }
  }
  &.gmEnableClick,&.enable{
    color: #fff;
    background-color: #656D78;
    border-color: #656D78;
    &:hover, &:focus {
      background: #434A54;
      border-color: #434A54;
      color: #fff;
    }
  }
}
/*分页组件样式*/
/*增加跳转和选页数封装*/

.gm-pagination {
  font-size: 14px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  &.gm-table-pagination {
    margin: 16px 0;
    float: right;
  }
  &:after {
    content: " ";
    display: block;
    height: 0;
    clear: both;
    overflow: hidden;
    visibility: hidden;
  }
  .gm-pagination-prev,
  .gm-pagination-next {
    outline: 0;
  }
  .gm-pagination-prev,
  .gm-pagination-jump-prev,
  .gm-pagination-jump-next {
    margin-right: 8px;
  }
  .gm-pagination-prev span,
  .gm-pagination-next span {
    color: rgba(0, 0, 0, 0.65);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .gm-pagination-prev,
  .gm-pagination-next,
  .gm-pagination-jump-prev,
  .gm-pagination-jump-next {
    cursor: pointer;
    color: rgba(0, 0, 0, 0.65);
    border-radius: 4px;
    list-style: none;
    min-width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    -webkit-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
    display: inline-block;
    vertical-align: middle;
  }
  .gm-pagination-prev .gm-pagination-item-link,
  .gm-pagination-next .gm-pagination-item-link {
    border: 1px solid #d9d9d9;
    background-color: #fff;
    border-radius: 4px;
    outline: none;
    display: block;
    height: 100%;
    -webkit-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
    .iconfont {
      font-size: 25px;
    }
  }
  .gm-pagination-disabled,
  .gm-pagination-disabled:hover,
  .gm-pagination-disabled:focus {
    cursor: not-allowed;
  }
  .gm-pagination-disabled span,
  .gm-pagination-disabled:hover span,
  .gm-pagination-disabled:focus span,
  .gm-pagination-disabled .gm-pagination-item-link,
  .gm-pagination-disabled:hover .gm-pagination-item-link,
  .gm-pagination-disabled:focus .gm-pagination-item-link {
    border-color: #d9d9d9;
    color: rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
  }
  .gm-pagination-item {
    cursor: pointer;
    border-radius: 4px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    min-width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    list-style: none;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid #d9d9d9;
    background-color: #fff;
    margin-right: 8px;
    font-family: Arial;
    outline: 0;
    span {
      text-decoration: none;
      color: rgba(0, 0, 0, 0.65);
      -webkit-transition: none;
      -o-transition: none;
      transition: none;
      margin: 0 6px;
    }
    &:focus, &:hover{
      -webkit-transition: all .3s;
      -o-transition: all .3s;
      transition: all .3s;
      border-color: #1890ff;
      span {
        color: #1890ff;
      }
    }
  }
  .gm-pagination-prev:focus .gm-pagination-item-link,
  .gm-pagination-next:focus .gm-pagination-item-link,
  .gm-pagination-prev:hover .gm-pagination-item-link,
  .gm-pagination-next:hover .gm-pagination-item-link {
    border-color: #1890ff;
    color: #1890ff;
  }
  .gm-pagination-disabled span,
  .gm-pagination-disabled:hover span,
  .gm-pagination-disabled:focus span,
  .gm-pagination-disabled .gm-pagination-item-link,
  .gm-pagination-disabled:hover .gm-pagination-item-link,
  .gm-pagination-disabled:focus .gm-pagination-item-link {
    border-color: #d9d9d9;
    color: rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
  }
  .gm-pagination-item-active {
    border-color: #1890ff;
    font-weight: 500;
    span {
      color: #1890ff;
    }
  }
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

td,th{
  text-align:center;

  span{
    text-align:center;

  }
}

.no-data-text {
    height: 190px;
    text-align: center;
    margin: 50px auto;
    p {
        margin: 30px 0;
        color: #8a8b98;
        font-size: 12px;
    }
}


$active_bg_color: #0092FF;
$active_font_color: #1890ff;
$border: 1px solid #ccc;
$disable_color: #ccc;
$normal_font_color: #999;
$btn_font_size: 14px;
$btn_border_radius: 2px;

.gm-pagination{
  padding:40px 0;
  height:200px;
}
.gm-pagination-button {
    cursor: pointer;
    border-radius: 4px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    min-width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    list-style: none;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid #d9d9d9;
    background-color: #fff;
    margin-right: 8px;
    font-family: Arial;
    outline: 0;
    &.boundary{
      padding:0 6px;
    }
}
.gm-pagination-info {
  display: inline-block;
  margin-right: 8px;
  text-align: center;
  line-height: 25px;
  color: $normal_font_color;
  font-size: $btn_font_size;
}

.gm-page-size{
width:80px;
margin:0;
padding:0;
}

.gm-pagination-input {
  display: inline-block;
  color: $normal_font_color;
  font-size: $btn_font_size;

  input {
    position: relative;
    display: inline-block;
    padding: 4px 11px;
    width: 100%;
    height: 32px;
    font-size: 14px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.65);
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    -webkit-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
    margin: 0 8px;
    width: 50px;
    outline:0;
    &:focus{
      border-color:#1890ff
    }
  }
}


.gm-pagination-submit{
    cursor: pointer;
    border-radius: 4px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    min-width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    list-style: none;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid #d9d9d9;
    background-color: #fff;
    margin-right: 8px;
    font-family: Arial;
    outline: 0;
    padding:0 6px;
    margin-left:10px;
    -webkit-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
    &:hover{
      border-color:#1890ff;
       font-weight:500;
      color: $active_font_color;
    }
}

.iconfont {
    font-size: 15px;
}
.gm-pagination-button.active,.gm-pagination-button:hover  {
 border-color:#1890ff;
 font-weight:500;
  color: $active_font_color;
}
.gm-pagination-button.disable { color: $disable_color; border: $border; cursor: not-allowed; }
.gm-pagination-button.disable:hover{
  background-color: #fff ;
  color: $disable_color;
}

.gm-modle-select-box{
  display:inline-block;
  cursor:pointer;
  width:80px;
  height:30px;
  line-height:30px;
  text-align:center;
  position:relative;
 vertical-align:bottom;
  span{
      border:1px solid #d9d9d9;
       border-radius:4px;
    position:absolute;
    left:0;
    top:0;
    width:80px;
    height:30px;
    color: rgba(0, 0, 0, 0.65);
    font-size:14px;
    text-align:left;
    text-indent:4px;
    .iconfont{
      font-size:12px;
    }
    i{
      position:absolute;
      top:0;
      right:3px;
    }

    &:hover{
      border-color:#1890ff;
      ul{
        display:block
      }
    }

     ul{
      display:none;
      position:absolute;
      box-sizing:border-box;
      z-index:3111;
      width:80px;
      left: -1px;
      top:30px;
    border:1px solid #d9d9d9;
    border-radius:4px;
      li{
        height:30px;
        text-align:center;
        line-height:30px;
        background:#fff;
        &:hover,&.selected{
          background:#1890ff;
          color: #fff;
        }


      }
    }

  }


}

</style>
