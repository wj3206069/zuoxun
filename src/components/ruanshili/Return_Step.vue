<template>
  <div class="holiday-detail" style=" min-width: 1500px;">
    <div class="company-zi-zhi__head">
      <h4 class="company-zi-zhi__head--text">归还详情</h4>
      <!-- <span @click.stop.prevent="show=1">申请人查看</span>
      <span @click.stop.prevent="show=2">审核人查看</span>
      <span @click.stop.prevent="show=3">总裁查看</span> -->
    </div>
    <div class="header_title">
      <a class="return_btn" @click="$router.back(-1)"><i class="zxicon zx-jt-left"></i>返回</a><span class="header_name">设备归还</span>
    </div>
    <div style="max-height: calc(100vh - 105px);" class="body_box">
      <div class="examine-box">
        <div class="examine-info">申请流程</div>
      </div>
      <div class="holiday-info">
        <div class="left-info">
          <div class="avatar-box">
            <img src="https://avatars2.githubusercontent.com/u/4921183?v=4" alt="用户头像" width="100%" height="100%" style="border-radius: 50%;">
          </div>
          <div class="user-name text-c mg-t-10">张三</div>
          <div class="apply-time text-c mg-t-10">2018-10-10 14:00</div>
        </div>
        <div class="wrap">

          <div class="w_wrap">
            <div style="font-size:14px" class="item_ys">
              <i class="zxicon zx-quyu" style="color: #3B9FEA; font-size: 20px;"></i>
              <span style="font-weight:bold">单位：</span>
              <span>深圳-产品部</span>
            </div>
            <div style="font-size:14px" class="item_ys">
              <i class="zxicon zx-chengyuan" style="color: #80cb59; font-size: 20px;"></i>
              <span style="font-weight:bold">使用人：</span>
              <span>康驰</span>
            </div>
            <div style="font-size:14px" class="item_ys">
              <i class="zxicon zx-riqi" style="color: #fc6749; font-size: 20px;"></i>
              <span style="font-weight:bold">设备归还日期：</span>
              <span>2018-1-4</span>
            </div>

          </div>

          <div class="w_wrap">
            <div style="font-size:14px" class="item_ys">
              <i class="zxicon zx-yuanyin" style="color: #f37a19; font-size: 20px;"></i>
              <span style="font-weight:bold">归还原因：</span>
              <span>设备升级</span>
            </div>
             <div style="font-size:14px" class="item_ys">
              <i class="zxicon zx-shebei" style="color: #3B9FEA; font-size: 20px;"></i>
              <span style="font-weight:bold">资产编号：</span>
              <span>s-261</span>
            </div>
                     <div style="font-size:14px" class="item_ys">
              <i class="zxicon zx-shebei" style="color: #3B9FEA; font-size: 20px;"></i>
              <span style="font-weight:bold">资产类型：</span>
              <span>笔记本</span>
            </div>
            
        
               <!-- <div style="font-size:14px" class="item_ys">
              <i class="zxicon zx-shebei" style="color: #3B9FEA; font-size: 20px;"></i>
              <span style="font-weight:bold">使用情况：</span>
              <span>良好</span>
            </div>  -->

          </div>
          <!-- <div class="w_wrap">

          </div> -->
          <div>
            <span class="bz">使用情况：由于之前的笔记本设备运行内存过低，办公不方便，申请换一台电脑</span>
          </div>
        </div>
      </div>

      <div class="examine-box">
        <div class="examine-info">审批信息</div>
      </div>
      <div v-show="show === 1" class="time-box">
        <div class="title-time">
          <p>2018-10-26</p>
          <span style="  width: 91px;  background-color: #3b9fea;">部门领导</span>
        </div>
        <div class="title-time" style="    top: 200px;right: 120px;">
          <p>2018-10-26</p>
          <span v-show="!isShenPi" style="  width: 91px;  background-color: #b8b8b8;">资产管理员</span>
          <span v-show="isShenPi" style="  width: 91px;  background-color: #3b9fea;">资产管理员</span>
        </div>
        <div class="time-content" style="height:388px; right: 124px;">
          <!-- 部门领导审批 -->
          <div class="time-item">
            <div class="time-foot" style="margin-top:0">
              <div class="duration-bag">
                <div style="display: flex;     width: 100%; align-item: center;">
                  <!-- <i class="zxicon zx-tongguo" style="color: #3B9FEA; font-size: 20px;"></i> -->
                  <div class="time-foot" style="    width: 100%;">
                    <div class="time_down">
                      <div>
                        <i class="zxicon zx-tongguo" style="color: #3B9FEA; font-size: 20px;"></i>
                        <span>赖旭军-已同意</span>
                      </div>
                        <span>11/06 14:05</span>
                    </div>
                    <div class="agree_sp">
                      <span>同意</span>

                    </div>
                    </li>
                  </div>
                </div>
              </div>
            </div>
          </div>
            <div class="triangle_border_left">
            <span></span>
          </div>
          <!-- 资产领导审批 -->
          <div class="time-item" style="min-height: 0; padding-top: 0; margin-top: 89px;">
            <div class="time-foot" style="margin-top:0">
              <div class="duration-bag">
                <div style="display: flex;     width: 100%; align-item: center;">
                  <div class="time-foot" style="  margin-top:0;  width: 100%;">
                    <div class="time_down">
                      <div v-show="!isShenPi">
                        <i class="zxicon zx-dengdai" style="color: #bfbfbf; font-size: 20px;"></i>
                        <span>查丽-审批中</span>
                      </div>
                      <div v-show="isShenPi">
                        <i class="zxicon zx-tongguo" style="color: #3B9FEA; font-size: 20px;"></i>
                        <span>查丽-审批通过</span>
                      </div>
                        <!-- <span>11/06 14:05</span> -->
                    </div>
                    <!-- <div class="agree_sp">
                      <span>同意</span>

                    </div> -->
                    </li>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
          <!-- 箭头 -->
          <div class="triangle_border_right">
            <span></span>
          </div>
        </div>
      </div>
      <div v-show="show === 2" class="time-box">
        <div class="title-time">
          <p>2018-10-26</p>
          <span>审批</span>
        </div>
        <div class="time-content">
          <div class="time-item">
            <div style="border-bottom: 1px dashed #A9B3BA; padding-bottom: 10px;">
              <div class="checker name same-layout">
                <div>
                  <span>查丽</span>
                  <span style="font-size: 12px; margin-left: 10px;">运营总监</span>
                </div>
                <div style="color: #666; font-size: 14px;">
                  10/27 14:05
                </div>
              </div>
            </div>
            <div class="time-foot">
              <el-input type="textarea" v-model="newIdea" placeholder="请输入意见"></el-input>
              <div style="display: flex; align-items: center; margin-top: 10px;">
                <el-button class="agree">同意</el-button>
                <el-button class="reject">拒绝</el-button>
                <el-button class="turn">转批</el-button>
              </div>
            </div>
          </div>
          <div class="triangle_border_left">
            <span></span>
          </div>
        </div>
      </div>
      <div v-show="show === 3" class="time-box">
        <div class="title-time">
          <p>2018-10-26</p>
          <span>审批</span>
        </div>
        <div class="time-content">
          <div class="time-item">
            <div class="time-foot">
              <div class="duration-bag">
                <div style="display: flex; align-item: center;">
                  <i class="zxicon zx-tongguo" style="color: #3B9FEA; font-size: 20px;"></i>
                  <div class="handle same-layout" style="margin-left: 5px;">查丽 • 已转批</div>
                </div>
                <div class="bottom-time same-layout">10/27 14:05</div>
              </div>
              <div class="idea same-layout">
                <p style="margin-left: 5px;">申请通过</p>
              </div>
            </div>
          </div>
          <div class="triangle_border_left">
            <span></span>
          </div>
        </div>
      </div>
      <div v-show="show === 3" class="time-box">
        <div class="title-time">
          <p>2018-10-27</p>
          <span style="background: #3B9FEA;">转批</span>
        </div>
        <div class="time-content">
          <div class="time-item">
            <div style="border-bottom: 1px dashed #A9B3BA; padding-bottom: 10px;">
              <div class="checker name same-layout">
                <div>
                  <span>邹纪根</span>
                  <span style="font-size: 12px; margin-left: 10px;">总裁</span>
                </div>
                <div style="color: #666; font-size: 14px;">
                  10/27 14:05
                </div>
              </div>
            </div>

            <div class="time-foot">
              <el-input type="textarea" v-model="newIdea" placeholder="请输入意见"></el-input>
              <div style="display: flex; align-items: center; margin-top: 10px;">
                <el-button class="agree">同意</el-button>
                <el-button class="reject">拒绝</el-button>
                <el-button class="turn">转批</el-button>
              </div>
            </div>
          </div>
          <div class="triangle_border_left">
            <span></span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import mixin from "~/assets/mixins";
import authen from "~/assets/utils/authen.js";
import CusAddMember from "../common/cusAddMember";
export default {
  name: "holidayStep",
  mixins: [mixin, authen],
  components: {
    "cus-add-member": CusAddMember
  },
  data () {
    return {
      show: 1,
      hide: false,
      selfHolidayList: [
        {
          name: "张三",
          starDate: "2018-10-25 09:00",
          endDate: "2018-10-26 09:00",
          duration: "1天",
          type: "事假",
          reason: "因为家里有事，需要请假！因为家里有事，需要请假！",
          work: "已交代",
          id: 1
        }
      ],
      options: [{
        value: '选项1',
        label: '台式机'
      }, {
        value: '选项2',
        label: '笔记本'
      }],
      value: '',
      holiday_type: [
        {
          value: "选项1",
          label: "调休"
        },
        {
          value: "选项2",
          label: "事假"
        },
        {
          value: "选项3",
          label: "病假"
        }
      ],
      changeType1: "",
      changeType2: "",
      newIdea: "",
      isShenPi:false
    };
  },
  methods: {
    // 提交申请
    handleSubmit () { },
    // 上传附件
    beforeupload (file) {
      // console.log(Object.prototype.toString.call(file));
      // var windowUrl = window.URL || window.webkitURL;
      // this.src = windowUrl.createObjectURL(file);
      // return false;
    },
    handlePicUpload (rule, value, callback) { },
    // 批准
    approveHoliday (done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    // 显示 请假信息 附件等
    showHolidayAdd () {
      this.hide = !this.hide;
    }
  },
  created () {
    console.log("this.$route.params.list.row;",this.$route.params.id.row.liuchengzhaungtai)
    if(this.$route.params.id.row.liuchengzhaungtai=="等待部门领导审批"){
      this.isShenPi=false
    }
    else{
      this.isShenPi=true
    }
    console.log("this,.data",this.isShenPi)
   },
   mounted() {
     
   },
};
</script>

<style lang="less" scoped>
@media only screen and (max-width: 1600px) {
   .holiday-detail .body_box .examine-box{
     margin-right: 20%!important
   }
}
@media only screen and (max-width: 1280px) {
   .holiday-detail .body_box .examine-box{
     margin-right: 0%!important
   }
}
.item_ys {
  width: 212px;
}
.agree_sp{
      padding-left: 24px;
    margin-top: 15px;
}
.time_down{
  display: flex;
    justify-content: space-between;
    align-items: center;
}
.bz {
  font-size: 14px;
  color: #adadad;
}
.wrap {
  display: flex;
  flex-direction: column;
  height: 93px;
  justify-content: space-between;
}
.w_wrap {
  display: flex;
  flex-wrap: wrap;
}
.holiday-detail {
  overflow: hidden;
  // margin-right: 10%;
  .agree {
    background-color: #28b610;
    color: #fff;
  }
  .reject {
    background-color: #f03f16;
    color: #fff;
  }
  .turn {
    background-color: #8d8d8d;
    color: #fff;
  }
  .el-input--mini .el-input__inner {
    height: 20px !important;
    overflow: hidden;
  }
  .el-textarea__inner {
    background-color: #f3f2f0;
  }
  .el-button {
    width: 60px;
    height: 25px;
    line-height: 25px;
    padding: 0;
    > span {
      display: block;
      width: inherit;
      height: inherit;
      line-height: inherit;
      text-align: center;
    }
  }
  .body_box {
    overflow-y: scroll;
    margin-right: -17px;
    margin-bottom: -17px;
    // padding-left: 100px;
    .holiday-info {
      display: flex;
      align-items: center;
      width: 95%;
      min-height: 85px;
      margin: 0 auto;
      padding: 5px 0;
      // border-left: 4px solid #3b9fea;
      // background-color: #29A0DD;
      // background-color: rgba(14, 160, 221, 0.1);
      .left-info {
        width: 150px;
        height: inherit;
        font-size: 14px;
        color: #333;
        .text-c {
          text-align: center;
        }
        .mg-t-10 {
          margin-top: 5px;
        }
        .avatar-box {
          width: 50px;
          height: 50px;
          margin: 0 auto;
        }
        .apply-time {
          color: #999;
          font-size: 12px;
        }
      }
      .right-info {
        flex: 1;
        font-size: 14px;
        color: #333;
        .holiday-duration {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .duration-left {
            display: flex;
            align-items: center;
            .holiday-type {
              height: 20px;
              line-height: 20px;
              padding: 0 5px;
              border-radius: 2px;
              margin-left: 10px;
              text-align: center;
              background-color: #3b9fea;
              color: #fff;
              font-size: 12px;
            }
          }
          .duration-right {
            display: flex;
            align-items: center;
            margin-right: 20px;
            font-size: 13px;
            cursor: pointer;
            color: #999;
            &:hover {
              color: #333;
            }
            .rotate180 {
              transition: all 0.5s;
              transform: rotateZ(180deg);
            }
            .rotate {
              transition: all 0.5s;
              transform: rotateZ(360deg);
            }
          }
        }
        .work-over {
          display: flex;
          align-items: center;
          margin-top: 5px;
          margin-bottom: 10px;
        }
        .hide {
          padding-top: 10px;
          border-top: 1px dashed #a9b3ba;
          .holiday-reason {
            color: #666;
          }
          .holiday-add {
            display: flex;
            margin-top: 5px;
            cursor: pointer;
          }
        }
      }
    }
    .examine-box {
      text-align: center;
          margin-right: 36%;
      .examine-info {
        position: relative;
        display: inline-block;
        height: 20px;
        line-height: 20px;
        margin: 20px 0;
        text-align: center;
        color: #999;
        font-size: 14px;
        &::before {
          content: '';
          position: absolute;
          top: 50%;
          margin-top: -0.5px;
          left: -40px;
          height: 1px;
          width: 30px;
          background-color: #999;
        }
        &::after {
          content: '';
          position: absolute;
          top: 50%;
          margin-top: -0.5px;
          right: -40px;
          height: 1px;
          width: 30px;
          background-color: #999;
        }
      }
    }

    .time-box {
      position: relative;
      display: flex;
      overflow: hidden;
      padding-left: 100px;
      &::after {
        content: ' ';
        position: absolute;
        left: 220px;
        top: -100000px;
        bottom: -100000px;
        width: 1px;
        background-color: #bbbbbb;
        transform: scaleY(0.5);
      }
      .title-time {
        position: relative;
        width: 120px;
        text-align: center;
        &::before {
          content: ' ';
          position: absolute;
          top: 18px;
          right: -6px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #3b9fea;
          z-index: 9;
        }
        &::after {
          content: ' ';
          position: absolute;
          top: 21px;
          right: -3px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #fff;
          z-index: 10;
        }
        > p {
          height: 20px;
          line-height: 20px;
          font-size: 16px;
          color: #333;
        }
        > span {
          display: block;
          width: 40px;
          height: 20px;
          margin: 0 auto;
          margin-top: 10px;
          border-radius: 2px;
          line-height: 20px;
          text-align: center;
          background-color: #8d8d8d;
          font-size: 12px;
          color: #fff;
        }
      }
      .time-content {
        position: relative;
        flex: 1;
        height: auto;
        .time-item {
          width: 400px;
          min-height: 90px;
          margin-left: 39px;
          padding: 15px;
          box-sizing: border-box;
          margin-bottom: 20px;
          border-radius: 8px;
          border: 1px solid #a9b3ba;
          background-color: #f3f2f0;
          color: #333333;
          font-size: 14px;
          .checker {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .name {
            font-size: 18px;
          }
          .apply-time {
            display: flex;
            align-items: center;
          }
          .same-layout {
            min-height: 20px;
            line-height: 20px;
          }
          .same-toTop {
            margin-top: 5px;
          }
          .duration-bag {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 10px;
          }
          .time-foot {
            margin-top: 10px;
            .idea {
              display: flex;
              align-items: center;
              margin-left: 20px;
              margin-top: 5px;
              .result-type {
                width: 44px;
                height: 20px;
                line-height: 20px;
                text-align: center;
                color: #3b9fea;
                border-radius: 2px;
                border: 1px solid #3b9fea;
              }
            }
          }
        }
        /*向左箭头*/
        .triangle_border_left {
          position: absolute;
          left: 10px;
          top: -26px;
          width: 0;
          height: 0;
          border-width: 10px 30px 10px 0;
          border-style: solid;
          border-color: transparent #a9b3ba transparent transparent;
          margin: 40px auto;
          z-index: 10;
        }
        .triangle_border_left span {
          display: block;
          width: 0;
          height: 0;
          border-width: 9px 28px 9px 0;
          border-style: solid;
          border-color: transparent #f3f2f0 transparent transparent; /*透明 黄 透明 透明 */
          position: absolute;
          top: -9px;
          left: 2px;
        }
        .triangle_border_right {
          position: absolute;
          left: 10px;
          top: 175px;
          width: 0;
          height: 0;
          border-width: 10px 30px 10px 0;
          border-style: solid;
          border-color: transparent #a9b3ba transparent transparent;
          margin: 40px auto;
          z-index: 10;
        }
        .triangle_border_right span {
          display: block;
          width: 0;
          height: 0;
          border-width: 9px 28px 9px 0;
          border-style: solid;
          border-color: transparent #f3f2f0 transparent transparent; /*透明 黄 透明 透明 */
          position: absolute;
          top: -9px;
          left: 2px;
        }
      }
    }
  }
}
</style>