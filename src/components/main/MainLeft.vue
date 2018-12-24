<template>
  <el-main class="content_middle">
    <el-header v-clickoutside="cancelQuickEdit">
      <p class="content_middle_title">
        <i class="zxicon zx-gongju1"></i>
        <span>快捷入口</span>
        <span class="icons">
            <i class="zxicon zx-gengduo1" @click="editkj"></i>
            <i class="zxicon zx-ai61" @click="quickEdit"></i>
          </span>
      </p>
      <ul @click="quickDelete" style="overflow-y: auto;">
        <li v-for=" m in quickMenu" >
          <i v-if="!m.icon" class="zxicon icon zx-huihe" @click="goto(m)"></i>
          <i v-if="m.icon" :class="'zxicon icon ' +m.icon" @click="goto(m)"></i>
          <i class="zxicon zx-shanchu" v-show="isEdit" @click="delkj(m)"></i>
          <p @click="goto(m)" >
            {{m.name}}
          </p>
        </li>
      </ul>
    </el-header>
    <el-main>
      <p class="content_middle_title">
        <i class="zxicon zx-daiban"></i>
        <span>待办业务</span>
        <span class="icons">
            <!-- <i class="zxicon zx-ai61"></i>
                <i class="zxicon zx-shezhi"></i> -->
            <i class="zxicon zx-gengduo" @click="openwordflow"></i>
          </span>
      </p>
      <el-table :data="workData" tooltip-effect="dark" style="width: 100%" height="80%">
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
        <el-table-column prop="pushusername" label="推送人" width="80" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="pushtime" label="推送时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="tasktype" label="业务类型">
            <template slot-scope="scope">
                <span v-if="scope.row.tasktype === '1'">正常</span>
                <span v-if="scope.row.tasktype === '2'">紧急</span>
            </template>
        </el-table-column>
        <!--<el-table-column prop="operation" label="操作" width="70" show-overflow-tooltip>-->
          <!--<template slot-scope="scope">操作</template>-->
        <!--</el-table-column>-->
      </el-table>
    </el-main>
    <!-- <el-footer>
      <p class="content_middle_title">
        <i class="zxicon zx-gongju"></i>
        <span>业务办理</span>
      </p>
      <div class="business_handle">
        <div>
          <i class="zxicon zx-daiban icon_red"></i>
          <p class="business_handle_top">
            <span>{{worlflowstat.doing}}</span>
            <span>个</span>
          </p>
          <p class="business_handle_bottom">
            待办件
          </p>
        </div>
        <div>
          <i class="zxicon zx-yiban icon_blue"></i>
          <p class="business_handle_top">
            <span>{{worlflowstat.done}}</span>
            <span>个</span>
          </p>
          <p class="business_handle_bottom">
            已办件
          </p>
        </div>
        <div>
          <i class="zxicon zx-daiyue icon_red"></i>
          <p class="business_handle_top">
            <span>2</span>
            <span>个</span>
          </p>
          <p class="business_handle_bottom">
            待阅件
          </p>
        </div>
        <div>
          <i class="zxicon zx-yiyue icon_blue"></i>
          <p class="business_handle_top">
            <span>2</span>
            <span>个</span>
          </p>
          <p class="business_handle_bottom">
            已阅件
          </p>
        </div>
      </div>
    </el-footer> -->

    <!--新增弹框-->
    <el-dialog v-dialog-drag width="900px" :visible.sync="dialogVisible" class="dialog_add">
            <span slot="title" class="dialog_title">
              <i class="zxicon zx-gongju1"></i>
              <font color="white">快捷入口</font>
            </span>
      <el-container>
        <el-aside width="200px">
          <p class="title_x">选择主菜单</p>
          <ul class="menu_group">
            <li :id="nav.menuid" @click="taggleMenu(nav.menuid)" v-for="nav in navMenu">{{nav.name}}</li>
          </ul>
        </el-aside>
        <el-main class="dialog-right">
          <p class="title_x">选择子菜单</p>
          <div class="dialog_right_info">
            <div class="dialog-right-content" v-for="m in currentMenu.children">
              <div class="dialog-right-title">
		                  	<span class="text">
		                  		{{m.name}}({{m.children.length}}个)
		                  	</span>
              </div>
              <ul>
                <li v-for="cm in m.children" @click="xuanzhong(cm)" v-if="!cm.children" :title="cm.name">
                  <i v-if="!!cm.icon" :class="'zxicon '+cm.icon+' child_icon'"></i>
                  <i v-if="!cm.icon" class="zxicon zx-shujuguanli child_icon"></i>
                  <i class="zxicon zx-xuanzhong sel_icon" v-show="cm.isXZ"></i>
                  <p>{{cm.name}}</p>
                </li>
              </ul>
            </div>
          </div>
        </el-main>

      </el-container>
      <span slot="footer" class="dialog-footer">
              <el-button @click="saveQuickMenu">确认</el-button>
              <el-button @click="dialogVisible = false">取消</el-button>
            </span>
    </el-dialog>
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
    const clickoutside = {
        bind(el, binding, vnode) {
            function documentHandler(e) {
                if (el.contains(e.target)) {
                    return false;
                }
                if (binding.expression) {
                    binding.value(e);
                }
            }

            el.__vueClickOutside__ = documentHandler;
            document.addEventListener('click', documentHandler);
        },
        update() {
        }, unbind(el, binding) {
            document.removeEventListener('click', el.__vueClickOutside__);
            delete el.__vueClickOutside__;
        },
    };
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
                    //   {
                    //   systemName: '运营平台',
                    //   bisinessName: '市场营销主流程...',
                    //   bisinessContent: '海珠区重大项目廉...',
                    //   handle: '商务方案',
                    //   lastHandle: '商务方案工作安排',
                    //   transactor: '2017/04/10 12:47:22',
                    //   operation: <i class="zxicon zx-banli"></i>
                    // }, {
                    //   systemName: '运营平台',
                    //   bisinessName: '需求申报流程',
                    //   bisinessContent: '无',
                    //   handle: '需求申报',
                    //   lastHandle: '实施方部门经理',
                    //   transactor: '2017/04/10 12:47:22',
                    //   operation: <i class="zxicon zx-banli"></i>
                    // }, {
                    //   systemName: '运营平台',
                    //   bisinessName: '设备归还流程',
                    //   bisinessContent: '申请人解妮',
                    //   handle: '设备归还',
                    //   lastHandle: '商务方案工作安排',
                    //   transactor: '2017/04/10 12:47:22',
                    //   operation: <i class="zxicon zx-banli"></i>
                    // }, {
                    //   systemName: '运营平台',
                    //   bisinessName: '需求申报流程',
                    //   bisinessContent: '无',
                    //   handle: '需求申报',
                    //   lastHandle: '实施方部门经理',
                    //   transactor: '2017/04/10 12:47:22',
                    //   operation: <i class="zxicon zx-banli"></i>
                    // }, {
                    //   systemName: '运营平台',
                    //   bisinessName: '需求申报流程',
                    //   bisinessContent: '无',
                    //   handle: '需求申报',
                    //   lastHandle: '实施方部门经理',
                    //   transactor: '2017/04/10 12:47:22',
                    //   operation: <i class="zxicon zx-banli"></i>
                    // }
                ],
                multipleSelection: [],
                menu: {
                    one: [],
                    two: [],
                    three: []
                },
                workData: [],
                worlflowstat: {
                    doing: 0,
                    done: 0
                }
            }
        },
        directives: {clickoutside},
        methods: {
            openwordflow() {
                //window.open('/proxyapiwaas/#/?access_token=' + sessionStorage.getItem("access_token"));
                this.$router.push("/business");
            },
            goto(menu) {
                if (!!menu.path) {
                    this.$router.push(menu.path);
                }
            },

            homePage() {
                $(".content_middle").css("display", "flex");
                $(".content_right").css("display", "flex");
                $(".list_three_title").css("display", "none");
                $(".list_three_content").css("display", "none");
            },
            toogle() {
                this.isA = !this.isA;
                this.btnValue = this.isA ? 50 : 184;
                if (this.isA) {
                    $(".el-radio-group").find(".zx-btn-").css("transform", "rotate(90deg)");
                } else {
                    $(".el-radio-group").find(".zx-btn-").css("transform", "rotate(0deg)");
                }
            },
            selected() {
                // console.log($(event.currentTarget).find(".show_name").text());
                this.listChooseTitle = $(event.currentTarget).find(".show_name").text()
                $(".content_middle").css("display", "none");
                $(".content_right").css("display", "none");
                $(".list_three_title").css("display", "block");
                $(".list_three_content").css("display", "block");
            },
            mouseIn(event) {
                if (this.isA) {
                    $(event.currentTarget).find(".show_name").addClass("hover_name");
                }
            },
            mouseOut(event) {
                $(event.currentTarget).find(".show_name").removeClass("hover_name");
            },
            pack() {
                this.isShow = !this.isShow;
                if (this.isShow) {
                    $(".list_three_title").find(".el-tabs__header").css("display", "block");
                    $(".list_three_title").find(".list_choose_title").css("display", "block");
                    $(".list_three_title").find(".trapezoid").css(
                        {
                            "border-right-color": "white",
                            "transform": "rotate(0deg)",
                            "left": "161px"
                        }
                    );
                } else {
                    $(".list_three_title").find(".el-tabs__header").css("display", "none");
                    $(".list_three_title").find(".list_choose_title").css("display", "none");
                    $(".list_three_title").find(".trapezoid").css(
                        {
                            "border-right-color": "rgb(234,237,241)",
                            "transform": "rotate(180deg)",
                            "left": "0"
                        }
                    );
                }
                // console.log($("list_three_title").find(".el-tabs__nav-wrap"));
            },
            quickEdit() {
                this.isEdit = !this.isEdit;
                // this.document.addEventListener('click',this.cancelEdit);
            },
            cancelQuickEdit() {
                // console.log("取消编辑");
                this.isEdit = false;
                // this.document.addEventListener('click',this.cancelEdit);
            },
            cancelEdit() {
                this.document.removeEventListener("click", () => {
                });
                this.isEdit = !this.isEdit;
            }
            ,
            //添加是发选中标志
            initXZFlag(arr) {
                if (!!arr && arr.length > 0) {
                    arr.forEach((c, index) => {
                        c.isXZ = false;
                        if (!!c.children && c.children.length > 0) {
                            this.initXZFlag(c.children);
                        }
                    })
                }
            },


            taggleMenu(menuid) {
                this.navMenu.forEach(e => {
                    if (menuid === e.menuid) {
                        this.currentMenu = e;
                    }
                });
                this.handleCurrentMenu();
            },
            handleCurrentMenu() {
                // this.currentZiMenu
                // if(!!this.currentMenu && !!this.currentMenu.children && this.currentMenu.children.length > 0){
                //     this.currentMenu.children.forEach((m)=>{
                //         if(!!m.children){
                //             m.children.forEach((z,index)=>{
                //                 if(!!z.children && z.children.length >0){
                //                     m.children.splice(index,1);
                //                     z.children.forEach(zz=>{
                //                         m.children.push(zz);
                //                     })
                //                 }
                //             })
                //         }
                //     })
                // }

            }
            ,
            delkj(m) {
                this.quickMenu.forEach((e, index) => {
                    if (e.menuid === m.menuid) {
                        this.quickMenu.splice(index, 1);
                    }
                });
                this.navMenu.forEach(e => {
                    this.signMenu(m.menuid, e, false);
                });
                this.delQuickRequest(m.menuid);

            },
            editkj() {
                this.currentMenu = this.navMenu[0];
                this.handleCurrentMenu();
                this.dialogVisible = true;
            },


            //将地4级菜单放到第3级
            del4menu(menu, j) {
                if (!!menu.children && menu.children.length > 0) {
                    j++;
                    // console.log(j,menu.children);//3 ======= 2.children
                    menu.children.forEach((c, index) => {
                        if (!!c.children && c.children.length > 0) {
                            if (j === 3) {
                                c.children.forEach(e => {
                                    menu.children.push(e);
                                });
                            } else {
                                this.del4menu(c, j);
                            }
                        }
                    })

                    if (j === 3) {
                        menu.children.forEach((c, index) => {
                            if (!!c.children && c.children.length > 0) {
                                menu.children.splice(index, 1)
                            }
                        })
                    }
                }
            }


            , signMenu(menuid, menu, bool) {
                if (!!menu.children && menu.children.length > 0) {
                    menu.children.forEach(e => {
                        if (e.menuid === menuid) {
                            e.isXZ = bool;
                        } else {
                            if (!!e.children && e.children.length > 0) {
                                this.signMenu(menuid, e, bool);
                            }
                        }
                    })
                }
            },
            xuanzhong(cm) {
                let bool = !cm.isXZ;
                cm.isXZ = bool;
                if (bool) {
                    this.readyQuickMenu.push(cm);
                } else {
                    this.readyQuickMenu.forEach((e, index) => {
                        if (e.menuid === cm.menuid) {
                            this.readyQuickMenu.splice(index, 1);
                        }
                    })
                }
                this.navMenu.forEach(e => {
                    this.signMenu(cm.menuid, e, bool)
                });
            },
            findXZMenu(menu) {
                if (!!menu.children && menu.children.length > 0) {
                    menu.children.forEach(e => {
                        if (e.isXZ) {
                            this.readyQuickMenu.push(e);
                        }
                        this.findXZMenu(e);
                    })
                }
            },
            //找出目标菜单，加入快捷菜单表
            findMenu(menus, id, index) {
                // console.log('menus===>',menus);
                if (!!menus && menus.length > 0) {
                    menus.forEach(e => {
                        if (id === e.menuid) {
                            // this.quickMenu.push(e);
                            this.quickMenu.splice(index, 1, e);
                            // console.log(e);
                        }
                        this.findMenu(e.children, id, index);
                    })
                }
            },
            //保存快捷菜单
            saveQuickMenu() {
                this.readyQuickMenu = [];
                this.navMenu.forEach(e => {
                    this.findXZMenu(e);
                });
                if (!this.readyQuickMenu || this.readyQuickMenu.length < 0) {
                    return;
                }
                // let user = sessionStorage.getItem("user");
                //保存到数据库
                this.$axios.delete('/proxyapi/shortcut/delbyuserid?userid=' + this.user.userid).then(res => {
                    let menus = [];
                    this.readyQuickMenu.forEach(e => {
                        let m = {
                            id: this.guid(), menuid: e.menuid, userid: this.user.userid
                        };
                        let f = true;
                        if (menus.length > 0) {
                            menus.forEach(me => {
                                if (m.menuid === me.menuid) {
                                    f = false;
                                }
                            })
                        }
                        if (f) {
                            menus.push(m);
                        }
                    });
                    // this.quickMenu =  this.readyQuickMenu;
                    this.batchAddRewquest(menus);
                });

                this.dialogVisible = false;
            },
            batchAddRewquest(menus) {
                // 、、shortcuts
                if (!!menus && menus.length > 0) {
                    this.$axios.post('/proxyapi/shortcut/add', {shortcuts: menus}).then(res => {
                        console.log('addRewquest==>',res);
                        this.loadQuickMenu();
                    });
                }

            },
            delQuickRequest(id) {
                this.$axios.delete('/proxyapi/shortcut/del?id=' + id).then(res => {
                    // console.log('delQuickRequest==>',res);
                });
            }
            , getUserInfo() {
                this.user = JSON.parse(sessionStorage.getItem("user"));
            }

            , quickDelete(event) {
                // console.log(event.target.nodeName);
                // if(event.target.nodeName.toLocaleLowerCase() == "i" && $(event.target).hasClass("zx-shanchu")){
                //   event.target.parentNode.remove();
                // }
            },


            // //加载快捷菜单
            loadQuickMenu() {
                        let navStr = sessionStorage.getItem("navMenu");
                        let mobj;
                        if (!!navStr) {
                            mobj = JSON.parse(navStr);
                            if (!!mobj) {
                                console.log('mobj',mobj)
                                mobj.forEach(e => {
                                    if (!!e.children && e.children.length > 0) {
                                        this.initXZFlag(e.children);
                                    }
                                });
                                mobj.forEach(e => {
                                    if (!!e.children && e.children.length > 0) {
                                        this.del4menu(e, 1);
                                    }
                                });
                                this.navMenu = mobj;
                                this.$axios.get('/proxyapi/shortcut/select?userid=' + this.user.userid).then(res => {
                                    if (!!res && res.length > 0) {
                                        // console.log('quick:',res);
                                        this.quickMenu = [];
                                        res.forEach((e, index) => {
                                            this.findMenu(this.navMenu, e.menuid, index);
                                            this.navMenu.forEach(n => {
                                                this.signMenu(e.menuid, n, true);
                                            });
                                        });
                                        console.log("this.quickMenu：", this.quickMenu)
                                    }
                                });
                            }
                        } else {
                            this.$axios.get('/proxyapiAuthen/authencenter/appmenutree/f293f3b273ef41b9b7a65739c6a68dad?enabled=1').then(res => {
                                if (!!res) {
                                    mobj = res;
                                    sessionStorage.setItem("navMenu", JSON.stringify(res));
                                    mobj.forEach(e => {
                                        if (!!e.children && e.children.length > 0) {
                                            this.initXZFlag(e.children);
                                        }
                                    });
                                    mobj.forEach(e => {
                                        if (!!e.children && e.children.length > 0) {
                                            this.del4menu(e, 1);
                                        }
                                    });
                                    this.navMenu = mobj;
                                    this.$axios.get('/proxyapi/shortcut/select?userid=' + this.user.userid).then(res => {
                                        if (!!res && res.length > 0) {
                                            // console.log('quick:',res);
                                            this.quickMenu = [];
                                            res.forEach((e, index) => {
                                                this.findMenu(this.navMenu, e.menuid, index);
                                                this.navMenu.forEach(n => {
                                                    this.signMenu(e.menuid, n, true);
                                                });
                                            });
                                            console.log("this.quickMenu：", this.quickMenu)
                                        }
                                    });
                                }
                            });
                        }
            },


            //加载工作流数据
            loadWorkData() {
                // https://www.zxpaas.com/waas/?pageSize=5&pageNum=1&userid=123&queryParam
                this.$axios.get('/proxyapiBusiness/business/task/' + this.user.userid, {
                    params: {
                        pageSize: 5,
                        pageNum: 1,
                        status: '1',
                        queryParam: ''
                    }
                }).then(res => {
                    if (!!res) {
                        this.workData = res.list;
                    }
                });

                

                // /flow/monitor/getHomePageData


            },

            S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            },
            guid() {
                return (this.S4() + this.S4() + this.S4() + this.S4() + this.S4() + this.S4() + this.S4() + this.S4());
            }

        },
        created() {
            this.getUserInfo();
            this.loadQuickMenu();
            this.loadWorkData();
        },
        mounted() {

        }
    }
</script>

