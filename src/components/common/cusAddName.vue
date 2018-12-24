<template>
  <div class="cus-add-member">
    <div>
      <el-input size="small" placeholder="搜索" v-model="filterText"><i slot="prefix" class="zxicon zx-sousuo2"></i></el-input>
      <el-tree :ref="nameSpace" :props="defaultProps" :show-checkbox="isShowCheckbox" :data="data_name" :render-after-expand="renderAfterExpand" :node-key="nodeKey" :check-strictly="checkStrictly" :expand-on-click-node="isExpandOnClickNode" :default-expand-all="isExpandAll" :filter-node-method="filterNode" :default-expanded-keys="defaultExpandedKeys" :default-checked-keys="defaultCheckedKeys" @check-change="checkChange" @node-click="nodeClick">
        <span class="cus-tree-node" slot-scope="{node, data}">
          <template>
            <span v-if="data.children && data.children.length > 0">
              <span v-if="!!data.icon" :class="data.icon"></span>
              <span v-else class="zxicon zx-wenjianjia9"></span>
            </span>
            <img v-else class="user-photo" :src="data.imgUrl || defaultimg" @error.once="handleImgError" alt="用户头像" />
          </template>
          <span>{{ node.label || data.text }}</span>
        </span>
      </el-tree>
    </div>
    <div>
      <ul class="tip">
        <li v-if="defaultMemberList.length == 0">请选择需要添加的成员</li>
        <li v-else>已选择<font class="num" color="#0cb200">{{ defaultMemberList.length }}</font>个成员</li>
      </ul>
      <ul class="checked-member-list">
        <li v-for="(item, index) in defaultMemberList" :key="index">
          <img class="user-photo" :src="item.imgUrl || defaultimg" @error.once="handleImgError" alt="用户头像" />
          <span v-text="item[defaultProps.label]"></span>
          <span v-if="!currentApp.iuserid || currentApp.iuserid != item.userid" class="btn-close" @click="removeMember(item, index)"><i class="zxicon zx-guanbi9"></i></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "cusAddMember",
  props: {
    nameSpace: {
      required: true,
      type: String
    },
    selectType: {
      // 某个值作为选中的标识
      type: String,
      default: "user"
    },
    data_name: {
      type: Array,
      default: function() {
        return [];
      }
    },
    defaultProps: {
      type: Object,
      default: function() {
        return {
          label: "name",
          children: "children",
          isLeaf: "leaf"
        };
      }
    },
    defaultExpandedKeys: {
      type: Array,
      default: function() {
        return [];
      }
    },
    nodeKey: {
      type: String,
      default: "id"
    },
    checkStrictly: {
      type: Boolean,
      default: false
    },
    renderAfterExpand: {
      type: Boolean,
      default: true
    },
    // nodeClick: {
    //   type: Function,
    //   default() {
    //     return {};
    //   }
    // },
    nodeExpand: {
      type: Function,
      default() {
        return {};
      }
    },
    isShowCheckbox: {
      type: Boolean,
      default: true
    },
    isExpandOnClickNode: {
      type: Boolean,
      default: false
    },
    isExpandAll: {
      type: Boolean,
      default: false
    },
    defaultimg: String,
    defaultMember: {
      type: Array,
      default() {
        return [];
      }
    },
    currentApp: {
      type: Object,
      default: function() {
        return {};
      }
    },
    onlyChooseOne: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultCheckedKeys: [],
      filterText: "",
      defaultMemberList: [],
      defaultMemberIdList: [],
      addMemberList: [],
      addMemberIdList: [],
      delMemberList: [],
      delMemberIdList: [],
      tempCheckedNodesLen: 0,
      removeFlag: false,
      isInit: true,
      orgsid: [],
      checkedId: null
    };
  },
  watch: {
    filterText(val) {
      this.$refs[this.nameSpace].filter(val);
    },
    data_name: {
      handler: function(val) {
        console.log(val, "data_name");
      },
      deep: true
    }
  },
  methods: {
    extractId(arr) {
      let arrTemp = [];
      arr.forEach(item => {
        arrTemp.push(item[this.nodeKey]);
      });
      return arrTemp;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data[this.defaultProps.label].indexOf(value) !== -1;
    
    },
    checkChange(data, status, childrenStatus) {
      if (!data.children && data.type === this.selectType) {
        this.doSelectMember(data, status, childrenStatus);
      }
      // TODO: 测试单选 注释的这个是带warning提示
      // if (this.onlyChooseOne) {
      //   let indexs = this.orgsid.indexOf(data.id);
      //   if (indexs < 0 && this.orgsid.length === 1 && status) {
      //     this.$message({
      //       message: "审批人只能选择一个",
      //       type: "warning",
      //       showClose: true
      //     });
      //     this.$refs[this.nameSpace].setChecked(data, false);
      //   } else if (this.orgsid.length === 0 && status) {
      //     this.orgsid = [];
      //     this.orgsid.push(data.id);
      //   } else if (indexs >= 0 && this.orgsid.length === 1 && !status) {
      //     this.orgsid = [];
      //   }
      // }
      // 单选操作
      if (this.onlyChooseOne) {
        if (status === true) {
          this.checkedId = data.id;
          this.$refs[this.nameSpace].setCheckedNodes([data]);
        }
      }
    },
    // 单选操作
    nodeClick(data, status, childrenStatus) {
      if (this.onlyChooseOne) {
        if (status === true) {
          this.checkedId = data.id;
          this.$refs[this.nameSpace].setCheckedNodes([data]);
        }
      }
    },
    removeMember(data, index) {
      if (this.currentApp.iuserid) {
        if (data.userid === this.currentApp.iuserid) return false;
      }
      let id = !!data.userid ? data.userid : data.id;
      let _index = this.defaultMemberIdList.indexOf(id);
      if (this.addMemberIdList.indexOf(id) != -1) {
        let index = this.addMemberIdList.indexOf(id);
        this.addMemberIdList.splice(index, 1);
        this.addMemberList.splice(index, 1);
      } else {
        this.delMemberIdList.push(id);
        this.delMemberList.push(data);
      }
      this.defaultMemberList.splice(_index, 1);
      this.defaultMemberIdList.splice(_index, 1);
      this.setDefault();
    },
    doSelectMember(data, status, childrenStatus) {
      // data.username = data.text;
      if (status) {
        if (this.defaultMemberIdList.indexOf(data.id) > -1) return;
        let _index = this.delMemberIdList.indexOf(data.id);
        if (_index != -1) {
          let d_id = this.delMemberIdList.splice(_index, 1);
          let d = this.delMemberList.splice(_index, 1);
          this.defaultMemberIdList.push(...d_id);
          this.defaultMemberList.push(...d);
        } else {
          this.addMemberList.push(data);
          this.addMemberIdList.push(data.id);
          this.defaultMemberList.push(data);
          this.defaultMemberIdList.push(data.id);
        }
      } else {
        if (data.id == this.currentApp.iuserid) {
          this.setDefault();
          this.$message.warning("不能删除应用创建者。");
          return;
        }
        let _index = this.addMemberIdList.indexOf(data.id);
        let _index2 = this.defaultMemberIdList.indexOf(data.id);
        if (_index != -1) {
          this.addMemberIdList.splice(_index, 1);
          this.addMemberList.splice(_index, 1);
          this.defaultMemberIdList.splice(_index2, 1);
          this.defaultMemberList.splice(_index2, 1);
        } else {
          if (_index2 != -1) {
            let d = this.defaultMemberList.splice(_index2, 1);
            let d_id = this.defaultMemberIdList.splice(_index2, 1);
            this.delMemberList.push(...d);
            this.delMemberIdList.push(...d_id);
          }
        }
      }
      this.$emit(
        "handle",
        this.addMemberList,
        this.delMemberList,
        this.addMemberIdList,
        this.delMemberIdList
      );
    },
    handleImgError(e) {
      e.target.src = this.defaultimg;
    },
    setDefault() {
      this.$nextTick(() => {
        this.$refs[this.nameSpace].setCheckedKeys(this.defaultMemberIdList);
        this.$emit(
          "handle",
          this.addMemberList,
          this.delMemberList,
          this.addMemberIdList,
          this.delMemberIdList
        );
      });
    }
  },
  created: function() {
    this.defaultMemberList = JSON.parse(JSON.stringify(this.defaultMember));
    this.defaultMemberIdList = this.extractId(this.defaultMember);
    this.defaultCheckedKeys = JSON.parse(
      JSON.stringify(this.defaultMemberIdList)
    );
    this.addMemberList = [];
    this.ddMemberIdList = [];
    this.delMemberList = [];
    this.delMemberIdList = [];
  }
};
</script>

<style lang="less">
.cus-add-member {
  display: flex;
  height: 40vh;
  .user-photo {
    margin: 0 6px 0 3px;
    width: 18px;
    height: 18px;
    vertical-align: middle;
    & ~ span {
      vertical-align: middle;
    }
  }
  > div {
    /*左*/
    padding: 10px;
    flex: 1;

    display: flex;
    flex-direction: column;
    .el-input {
      margin-bottom: 12px;
      input {
        border-radius: 0;
      }
      .zxicon {
        font-size: 18px;
        line-height: 33px;
      }
      &.el-input--prefix {
        .zxicon {
          color: #b2b2b2;
        }
        .el-input__inner {
          padding-left: 26px;
          border: 1px solid #cecece;
          height: 32px;
          line-height: 32px;
        }
      }
    }
    .el-tree {
      flex: 1;
      overflow-y: auto;
      color: #333;
      .cus-tree-node {
        .zxicon {
          /*图标*/
          color: #2993ff;
          font-size: 21px;
          margin-right: 4px;
          vertical-align: -6px;
        }
      }
      .el-tree-node__expand-icon {
        /*小三角*/
        color: #666;
        font-size: 14px;
        &.is-leaf {
          color: transparent;
        }
      }
      .el-tree-node__content {
        height: 28px;
        > span {
          -webkit-user-select: none;
        }
        &:hover {
          background-color: #e5eaef;
        }
        .el-checkbox__input {
          /*勾选框*/
          .el-checkbox__inner {
            /*大小*/
            height: 16px;
            width: 16px;
            border-radius: 50%;
            border: 1px solid #acacac;
            &::after {
              height: 8px;
              left: 5px;
              width: 4px;
              top: 1px;
            }
          }
          &.is-checked {
            /*勾选样式“√”*/
            .el-checkbox__inner {
              border: 1px solid #2993ff;
              background-color: #2993ff;
            }
          }
          &.is-indeterminate {
            /*勾选“﹣”*/
            .el-checkbox__inner {
              border: 1px solid #2993ff;
              background-color: #2993ff;
              &::before {
                top: 6px;
                height: 3px;
              }
            }
          }
        }
      }
    }
  }
  > div + div {
    /*右*/
    border-left: 1px solid #ddd;
    ul.tip {
      line-height: 32px;
      color: #333;
      li {
        padding: 0 5px;
        color: #999;
        > .num {
          margin: 0 3px;
        }
      }
    }
    ul.checked-member-list {
      flex: 1;
      overflow-y: auto;
      li {
        line-height: 32px;
        color: #333;
        padding: 0 12px;
        &:hover {
          cursor: pointer;
        }
        .btn-close {
          float: right;
          cursor: pointer;
          color: #bdbdbd;
          height: 32px;
          width: 20px;
          .zxicon {
            font-size: 20px;
            line-height: 36px;
            &:hover {
              color: #969696;
            }
          }
        }
        &:hover {
          background-color: #e5eaef;
        }
      }
    }
  }

  .el-tree-node__content > .el-checkbox {
    /*勾选框靠右显示*/
    position: absolute;
    right: 0;
  }
}
ul,
li {
  list-style: none;
}
</style>