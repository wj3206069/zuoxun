<template>
  <el-main class="app-ruanshili">
    <el-container>
      <el-aside v-if="treeExpand"
        :class="['cus-ruanshili-aside', {'expanded': !treeExpand}]"
        width="200px"
        class="aside_tree_css1">
        <h3 class="tree-title">{{this.$store.state.navTitle.title}}</h3>
        <!--:class="['cus-ruanshili-tree', {'coutt_f':coutt_f}]"-->
        <el-tree  class="cus-ruanshili-tree"
              :data="this.$store.state.resturantName.val"
              @node-click="handleNodeClick"
              :props="defaultProps"
             node-key="menuid"
             :default-expanded-keys="this.$store.state.defaultExpandedKeys"
             :default-checked-keys="this.$store.state.defaultCheckedKeys"
             expand-on-click-node
             accordion
                 highlight-current
        ></el-tree>
      </el-aside>
      <el-main class="cus-ruanshili-main">
        <button @click="treeTrigger"
          :class="['btn-trigger', {'expanded': !treeExpand}]">
          <span :class="['zxicon', 'zx-xiala', {'zxicon-rotate': !treeExpand}]"></span>
        </button>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-main>
</template>
<script>
export default {
  name: "checkingIn",
  data() {
    return {
      treeExpand: true,
      coutt_f: true,
      defaultProps: {
          children: 'children',
          label: 'name'
      },
      treeData: [
        // {
        //   id: "1",
        //   label: "上下班打卡",
        //   path: {
        //     name: "onDuty"
        //   }
        // },
        // {
        //   id: "2",
        //   label: "外出打卡",
        //   path: {
        //     name: "punchOut"
        //   }
        // },
        // {
        //   id: "3",
        //   label: "考勤规则",
        //   path: {
        //     name: "setClock"
        //   }
        // },
        // {
        //   id: "4",
        //   label: "请假申请",
        //   path: {
        //     name: "holidaystep"
        //   }
        // },
        // {
        //   id: "5",
        //   label: "请假审批",
        //   path: {
        //     name: "holidayExamine"
        //   }
        // },
        // {
        //   id: "6",
        //   label: "调休处理",
        //   path: {
        //     name: "holidayTakeWork"
        //   }
        // },
        // {
        //   id: "7",
        //   label: "出勤统计",
        //   path: {
        //     name: "attendanceStatistics"
        //   }
        // },
        // {
        //   id: "8",
        //   label: "餐补统计",
        //   path: {
        //     name: "subsidizedStatistics"
        //   }
        // },
        // {
        //   id: "9",
        //   label: "可调休时间统计",
        //   path: {
        //     name: "paidTime"
        //   }
        // },
        // {
        //   id: "10",
        //   label: "休假统计",
        //   path: {
        //     name: "vacationStatistics"
        //   }
        // },
        // {
        //   id: "11",
        //   label: "休假汇总统计",
        //   path: {
        //     name: "statisticsholiday"
        //   }
        // }
      ]
    };
  },
  methods: {
    treeTrigger() {
      this.treeExpand = !this.treeExpand;
    },
    handleNodeClick(data) {
        if (!!data.path) {
            this.$router.push({path: data.path});
        }
    },
      openFirstPage(){
          let dataArr = this.$store.state.resturantName.val;
          // console.log('dataArr',dataArr);
          if(!!dataArr && dataArr.length>0){
              for (let i = 0; i < dataArr.length; i++) {
                  const arg = dataArr[i];
                  // console.log('arg',arg);
                  if(!!arg.children && arg.children.length>0){
                      if(!!arg.children[0].path){
                          this.$router.push(arg.children[0].path);
                      }else if(!!arg.children[1].path){
                          this.$router.push(arg.children[1].path);
                      }
                      break;
                  }else if(!!arg.path){
                      this.$router.push(arg.path);
                      break;
                  }
              }
          }
      }
  }
    ,
    created(){
        let path = this.$route.path;
        let l = path.split('/').length;
        if(l<4){
            this.openFirstPage();
        }

    }
};
</script>
<style lang="less">
.app-ruanshili {
  position: relative;
  padding: 0 !important;
  overflow-x: hidden;
}
.cus-ruanshili-aside.expanded {
  width: 0 !important;
}
.cus-ruanshili-main {
  padding-top: 15px;
  background: #fff;
}
.cus-ruanshili-tree {
  margin-right: -20px;
  height: 100%;
  overflow-y: scroll;
  background: transparent;
}
.btn-trigger {
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: calc(200px - 16px);
  transform: translateY(-50%);
  border: none;
  background: #fff;
  outline: none;
  z-index: 1;
}
.btn-trigger:hover .zxicon {
  color: #0f619f;
}
.btn-trigger.expanded {
  left: 0;
  background: #d9dee4;
}
.btn-trigger:before {
  position: absolute;
  left: 0;
  top: -10px;
  display: block;
  content: " ";
  border: solid transparent;
  border-width: 5px 8px;
  border-right-color: #fff;
  border-bottom-color: #fff;
}
.btn-trigger:after {
  position: absolute;
  left: 0;
  display: block;
  content: " ";
  border: solid transparent;
  border-width: 5px 8px;
  border-right-color: #fff;
  border-top-color: #fff;
}
.btn-trigger.expanded:before {
  position: absolute;
  left: 0;
  top: -10px;
  display: block;
  content: " ";
  border: solid transparent;
  border-width: 5px 8px;
  border-left-color: #d9dee4;
  border-bottom-color: #d9dee4;
}
.btn-trigger.expanded:after {
  border-left-color: #d9dee4;
  border-top-color: #d9dee4;
}
.btn-trigger span {
  display: inline-block;
  transform: rotateZ(0);
  transition: transform 0.3s;
}
.btn-trigger span.zxicon-rotate {
  transform: rotateZ(180deg);
}
.aside_tree_css1 .coutt_f > div:first-child {
  background-color: white;
}
</style>

