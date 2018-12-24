<template>
  <el-main class="content_middle">
    <el-main>
      <p class="content_middle_title">
        <i class="zxicon zx-daiban"></i>
        <span>待办业务</span>
        <span class="icons">
            <!-- <i class="zxicon zx-ai61"></i>
                <i class="zxicon zx-shezhi"></i> -->
          </span>
      </p>
      <el-table :data="workData.list" tooltip-effect="dark" style="width: 100%" height="80%">
        <el-table-column type="index" width="26"></el-table-column>
        <el-table-column type="selection" width="20">
        </el-table-column>
        <!--<el-table-column label="系统名称" width="70">-->
        <!--<template slot-scope="scope">{{ scope.row.systemName }}</template>-->
        <!--</el-table-column>-->
        <el-table-column prop="appname" label="系统名称">
        </el-table-column>
        <el-table-column prop="businessname" label="业务名称">
        </el-table-column>
        <el-table-column prop="businesscontent" label="业务内容" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="pushusername" label="推送人" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="pushtime" label="推送时间" width="140"  show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="tasktype" label="业务类型" width="80" >
            <template slot-scope="scope">
                <span v-if="scope.row.tasktype === '1'">正常</span>
                <span v-if="scope.row.tasktype === '2'">紧急</span>
            </template>
        </el-table-column>
        <el-table-column
            label="操作"
            width="100">
            <template slot-scope="scope">
                <el-button v-if="!!scope.row.handlelinkurl" @click="showBusiness(scope.row)" type="text" size="small">办理</el-button>
            </template>
            </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="workData.pageNum"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="workData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="workData.total">
        </el-pagination>
    </el-main>

  </el-main>
</template>
<style lang="less">

  /*快捷入口弹框样式-修改*/
  .dialog_add {
    .el-dialog__header {
      .dialog_title {
        font-size: 14px;
        .zxicon {
          vertical-align: -2px;
        }
      }
    }
    .el-dialog__body {
      padding: 0;
      .title_x {
        color: #999;
        font-size: 14px;
        line-height: 32px;
        padding-left: 20px;
        margin-top: 8px;
      }
      .el-aside {
        > ul.menu_group {
          border-right: 1px solid #d1d4d8;
          height: 500px;
          overflow-y: auto;
          li {
            line-height: 36px;
            padding-left: 25px;
            cursor: pointer;
            margin: 0 5px;
            &:before {
              content: '';
              display: inline-block;
              width: 5px;
              height: 5px;
              border: 2px solid #999;
              border-radius: 50%;
              margin-right: 8px;
              vertical-align: 1px;
            }
            &:hover {
              background-color: #ececec;
              &:before {
                border: 2px solid #3283c8;
              }
            }
          }
        }
      }
      .dialog-right {
        border: 0;
        padding: 0;
        .dialog_right_info {
          overflow-y: auto;
          height: 500px;
          .dialog-right-content {
            padding-left: 15px;
            .dialog-right-title {
              position: relative;
              height: 15px;
              line-height: 14px;
              font-size: 14px;
              color: #333;
              margin-top: 12px;
              .text {
                position: absolute;
                display: inline-block;
                background: white;
                z-index: 2;
                padding-right: 12px;
                top: 0;
              }
              &:before {
                content: '';
                display: block;
                height: 1px;
                width: 98%;
                position: absolute;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
                border-top: 1px solid #e1e1e1;
                z-index: 1;
              }
            }
            ul {
              margin-top: 10px;
              display: block;
              /*overflow: hidden;*/
              li {
                display: inline-block;
                padding: 5px;
                position: relative;
                cursor: pointer;
                border: 1px solid transparent;
                margin-right: 5px;
                box-sizing: border-box;
                width: 85px;
                margin-bottom: 5px;
                border: solid 1px #ddd;
                .sel_icon.zxicon {
                  position: absolute;
                  top: 2px;
                  right: 4px;
                  color: #f34646 !important;
                  font-size: 20px !important;
                }
                .child_icon.zxicon {
                  margin: 0 auto;
                  display: block;
                  width: 40px;
                  height: 40px;
                  line-height: 40px;
                  text-align: center;
                  font-size: 40px;
                  color: #18b532;
                }
                p {
                  font-size: 13px;
                  width: 100%;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                  text-align: center;
                }
                &:hover {
                  border: solid 1px #ddd;
                }
              }
            }
          }
        }
      }
    }
  }
</style>

<script>
    export default {
        name: 'MainLeft',
        data() {
            return {
                isCollapse: false,
                activeName: 'first',
                isA: false,
                isShow: true,
                isEdit: false,
                btnValue: "",
                openeds: ['1', '2'],
                tabPosition: "left",
                listChooseTitle: "",
                dialogVisible: false,
                navMenu: [],
                currentMenu: {},
                currentZiMenu: {},
                quickMenu: [],
                readyQuickMenu: [],
                user: {},
                tableData3: [
                ],
                multipleSelection: [],
                menu: {
                    one: [],
                    two: [],
                    three: []
                },
                workData: {
                    list: [],
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                worlflowstat: {
                    doing: 0,
                    done: 0
                }
            }
        },
        methods: {
          
            getUserInfo() {
                this.user = JSON.parse(sessionStorage.getItem("user"));
                this.loadWorkData();
            },

            //加载工作流数据
            loadWorkData() {
                // https://www.zxpaas.com/waas/?pageSize=5&pageNum=1&userid=123&queryParam
                this.$axios.get('/proxyapiBusiness/business/task/' + this.user.userid, {
                    params: {
                        pageSize: this.workData.pageSize,
                        pageNum: this.workData.pageNum,
                        status: '1',
                        queryParam: ''
                    }
                }).then(res => {
                    if (!!res) {
                        this.workData = res;
                    }
                });
            },
            handleSizeChange(val) {
                this.workData.pageSize=val;
                this.loadWorkData();
            },
            handleCurrentChange(val) {
                this.workData.pageNum=val;
                this.loadWorkData();
            },
            showBusiness(data) {
                this.$axios.put('/proxyapiBusiness/business/waitRead/readBusinessStatus?taskid=' + data.taskid + '&userid=' + this.user.userid);
                window.open(data.handlelinkurl);
            }

        },
        created() {
            this.getUserInfo();
        },
        mounted() {

        }
    }
</script>

