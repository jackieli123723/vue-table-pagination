import { shallow, mount } from 'vue-test-utils'
import { createRenderer } from 'vue-server-renderer'

import Table from '@/components/Table.vue'

//通用参数
let gmTableLists = [
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
]
let gmTableThLists = {
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

let gmCurrentPage =1
let gmPageSize =10
let gmTotalPage = 100
let gmTableWidth = 3000
let gmTimeStampType = 63
let gmIsIndex = true
let gmHowMuchPageButtons =5
let gmBaseOnCurrentPageButtonOffset =2
let gmCanJump =true
let gmCanChoose = true
let gmChagePageSizeDefault =10
describe('Table.vue', () => {
  it('renders tr for each gmTableTd in props.gmTableLists', () => {
    const wrapper = shallow(Table, {
      propsData: {
         gmTableLists,
         gmTableThLists,
         gmTableWidth,
         gmTimeStampType,
         gmCurrentPage,
         gmTotalPage,
         gmIsIndex,
         gmHowMuchPageButtons,
         gmBaseOnCurrentPageButtonOffset,
         gmCanJump,
         gmCanChoose,
         gmChagePageSizeDefault
       }
    })
    expect(wrapper.findAll('tbody > tr')).toHaveLength(gmTableLists.length)
  })

  it('matches table snapshot', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Table, {
      propsData: {
        gmTableLists,
        gmTableThLists,
        gmTableWidth,
        gmTimeStampType,
        gmCurrentPage,
        gmTotalPage,
        gmIsIndex,
        gmHowMuchPageButtons,
        gmBaseOnCurrentPageButtonOffset,
        gmCanJump,
        gmCanChoose,
        gmChagePageSizeDefault
       }
    })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })

  })

  it('total span dom should return total pages', () => {
    const wrapper = shallow(Table, {
      propsData: {
         gmTableLists,
         gmTableThLists,
         gmTableWidth,
         gmTimeStampType,
         gmCurrentPage,
         gmTotalPage,
         gmIsIndex,
         gmHowMuchPageButtons,
         gmBaseOnCurrentPageButtonOffset,
         gmCanJump,
         gmCanChoose,
         gmChagePageSizeDefault
       }
    })
    expect(wrapper.findAll('.gm-pagination-info').at(0).text()).toBe('共 '+gmTotalPage+' 条记录');
  })

  it('per page size number should return gmDefaultPageSize', () => {
    const wrapper = shallow(Table, {
      propsData: {
         gmTableLists,
         gmTableThLists,
         gmTableWidth,
         gmTimeStampType,
         gmCurrentPage,
         gmTotalPage,
         gmIsIndex,
         gmHowMuchPageButtons,
         gmBaseOnCurrentPageButtonOffset,
         gmCanJump,
         gmCanChoose,
         gmChagePageSizeDefault
       }
    })
    expect(wrapper.find('.gm-modle-select-box > span > ul >li.selected').text()).toBe(`${gmPageSize} 条/页`);
  })

  it('table should return no-data view', () => {
    let gmTableLists = []
    let gmTotalPage = 0
    const wrapper = shallow(Table, {
      propsData: {
         gmTableLists,
         gmTableThLists,
         gmTableWidth,
         gmTimeStampType,
         gmCurrentPage,
         gmTotalPage,
         gmIsIndex,
         gmHowMuchPageButtons,
         gmBaseOnCurrentPageButtonOffset,
         gmCanJump,
         gmCanChoose,
         gmChagePageSizeDefault
       }
    })
   //判断dom元素
    const divNoData = wrapper.findAll('.no-data-text').at(0);
    const divPagination = wrapper.findAll('.gm-pagination');
    expect(divNoData.is('div')).toBe(true);
    expect(divPagination.length).toBe(0);
  })

  it('table should hide change choose page', () => {
    let gmCanChoose = false
    const wrapper = shallow(Table, {
      propsData: {
         gmTableLists,
         gmTableThLists,
         gmTableWidth,
         gmTimeStampType,
         gmCurrentPage,
         gmTotalPage,
         gmIsIndex,
         gmHowMuchPageButtons,
         gmBaseOnCurrentPageButtonOffset,
         gmCanJump,
         gmCanChoose,
         gmChagePageSizeDefault
       }
    })
    const divPageLis = wrapper.findAll('.gm-modle-select-dropdown li');
    expect(divPageLis.length).toBe(0);
  })

  it('table should hide jump  page', () => {
    let gmCanJump = false
    const wrapper = shallow(Table, {
      propsData: {
         gmTableLists,
         gmTableThLists,
         gmTableWidth,
         gmTimeStampType,
         gmCurrentPage,
         gmTotalPage,
         gmIsIndex,
         gmHowMuchPageButtons,
         gmBaseOnCurrentPageButtonOffset,
         gmCanJump,
         gmCanChoose,
         gmChagePageSizeDefault
       }
    })
    const divJumpSpanInput = wrapper.findAll('.gm-pagination-input');
    const divJumpSpanBtn = wrapper.findAll('.gm-pagination-submit');
    expect(divJumpSpanInput.length).toBe(0);
    expect(divJumpSpanBtn.length).toBe(0);
  })

  it('table hide index number first', () => {
    let gmIsIndex = false
    const wrapper = shallow(Table, {
      propsData: {
         gmTableLists,
         gmTableThLists,
         gmTableWidth,
         gmTimeStampType,
         gmCurrentPage,
         gmTotalPage,
         gmIsIndex,
         gmHowMuchPageButtons,
         gmBaseOnCurrentPageButtonOffset,
         gmCanJump,
         gmCanChoose,
         gmChagePageSizeDefault
       }
    })
    expect(wrapper.findAll('tbale > tr > th > span').length).toBe(0);
  })

  it('table return style width number', () => {
    let gmTableWidth = 0
    const wrapper = shallow(Table, {
      propsData: {
         gmTableLists,
         gmTableThLists,
         gmTableWidth,
         gmTimeStampType,
         gmCurrentPage,
         gmTotalPage,
         gmIsIndex,
         gmHowMuchPageButtons,
         gmBaseOnCurrentPageButtonOffset,
         gmCanJump,
         gmCanChoose,
         gmChagePageSizeDefault
       }
    })
    expect(wrapper.findAll('table').hasStyle('width', '0px')).toBe(false)
  })

  it('mount change pageSize increment the number', () => {
    const wrapper = mount(Table, {
      propsData: {
         gmTableLists,
         gmTableThLists,
         gmTableWidth,
         gmTimeStampType,
         gmCurrentPage,
         gmTotalPage,
         gmIsIndex,
         gmHowMuchPageButtons,
         gmBaseOnCurrentPageButtonOffset,
         gmCanJump,
         gmCanChoose,
         gmChagePageSizeDefault
       }
    })
    expect(wrapper.vm.gmDefaultPageSize).toBe(10)
    const pageBtn1 = wrapper.findAll('.gm-modle-select-box > span > ul >li').at(0);
    const pageBtn2 = wrapper.findAll('.gm-modle-select-box > span > ul >li').at(1);
    const pageBtn3 = wrapper.findAll('.gm-modle-select-box > span > ul >li').at(2);
    const pageBtn4 = wrapper.findAll('.gm-modle-select-box > span > ul >li').at(3);
    pageBtn2.trigger('click')
    expect(wrapper.vm.gmDefaultPageSize).toBe(20)
    pageBtn3.trigger('click')
    expect(wrapper.vm.gmDefaultPageSize).toBe(30)
    pageBtn4.trigger('click')
    expect(wrapper.vm.gmDefaultPageSize).toBe(50)
    pageBtn1.trigger('click')
    expect(wrapper.vm.gmDefaultPageSize).toBe(10)
  })

  it('mount can jump to number page', () => {
    let gmCurrentPage = 3
    const wrapper = mount(Table, {
      propsData: {
         gmTableLists,
         gmTableThLists,
         gmTableWidth,
         gmTimeStampType,
         gmCurrentPage,
         gmTotalPage,
         gmIsIndex,
         gmHowMuchPageButtons,
         gmBaseOnCurrentPageButtonOffset,
         gmCanJump,
         gmCanChoose,
         gmChagePageSizeDefault
       }
    })
    const pageJumpInput = wrapper.find('input')
    expect(wrapper.vm.gmCanJumpNum).toBe(null)
    expect(wrapper.props().gmCurrentPage).toBe(3)
    expect(pageJumpInput.vnode.elm.value).toBe('')
    pageJumpInput.vnode.elm.value = '2';
    //input复制点击确定跳转
    expect(pageJumpInput.vnode.elm.value).toBe('2')
    wrapper.vm.$refs['jump'].value = '3'
    expect(pageJumpInput.vnode.elm.value).toBe('3')
    const pageJumpBtn = wrapper.findAll('.gm-pagination-submit').at(0)
    pageJumpBtn.trigger('click')
    //高亮的gm-pagination-button active 数据相等 gm-pagination-button
    // expect(wrapper.props().gmCurrentPage).toBe(3)
    // wrapper.setProps({ gmCurrentPage: 3 })
    // expect(wrapper.props().gmCurrentPage).toBe(3)


   expect(wrapper.find('.gm-pagination-button.active').text()).toBe('3');

  })

  it('mount to page first', () => {
    const wrapper = mount(Table, {
      propsData: {
         gmTableLists,
         gmTableThLists,
         gmTableWidth,
         gmTimeStampType,
         gmCurrentPage,
         gmTotalPage,
         gmIsIndex,
         gmHowMuchPageButtons,
         gmBaseOnCurrentPageButtonOffset,
         gmCanJump,
         gmCanChoose,
         gmChagePageSizeDefault
       }
    })
    const pageBtnFirst = wrapper.findAll('.boundary').at(0);
    expect(wrapper.find('.gm-pagination-button.active').text()).toBe('1');
    pageBtnFirst.trigger('click')
    expect(wrapper.find('.gm-pagination-button.active').text()).toBe('1');
  })

  it('mount to page last', () => {
    const wrapper = mount(Table, {
      propsData: {
         gmTableLists,
         gmTableThLists,
         gmTableWidth,
         gmTimeStampType,
         gmCurrentPage,
         gmTotalPage,
         gmIsIndex,
         gmHowMuchPageButtons,
         gmBaseOnCurrentPageButtonOffset,
         gmCanJump,
         gmCanChoose,
         gmChagePageSizeDefault
       }
    })
    const pageBtnFirst = wrapper.findAll('.boundary').at(1);
    pageBtnFirst.trigger('click')
    expect(wrapper.find('.gm-pagination-button.active').text()).toBe('1');
  })

  it('mount to page middle', () => {
    const wrapper = mount(Table, {
      propsData: {
         gmTableLists,
         gmTableThLists,
         gmTableWidth,
         gmTimeStampType,
         gmCurrentPage,
         gmTotalPage,
         gmIsIndex,
         gmHowMuchPageButtons,
         gmBaseOnCurrentPageButtonOffset,
         gmCanJump,
         gmCanChoose,
         gmChagePageSizeDefault
       }
    })
    expect(wrapper.find('.gm-pagination-button.active').text()).toBe('1');
  })

})
