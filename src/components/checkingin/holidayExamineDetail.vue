<template>
  <div class="holiday-detail">
    <div class="company-zi-zhi__head">
      <h4 class="company-zi-zhi__head--text">请假审批</h4>
    </div>
    <div class="header_title">
      <a class="return_btn"
        @click="$router.back(-1)"><i class="zxicon zx-jt-left"></i>返回</a><span class="header_name">申请详情</span>
    </div>
    <div style="max-height: calc(100vh - 105px);"
      class="body_box">
      <div class="holiday-info">
        <div class="left-info">
          <div class="avatar-box">
            <img src="https://avatars2.githubusercontent.com/u/4921183?v=4"
              alt="用户头像"
              width="100%"
              height="100%"
              style="border-radius: 50%;">
          </div>
          <div class="user-name text-c mg-t-10">康驰</div>
          <div class="apply-time text-c mg-t-10"
            v-show="hide">2018-10-10 14:00</div>
        </div>
        <div class="right-info">
          <div class="holiday-duration">
            <div class="duration-left">
              <i class="zxicon zx-riqi"
                style="font-size: 18px; color: #29A0DD;"></i>
              <p style="margin-left: 3x;">2018-10-27 09:00--2018-10-28 09:00</p>
              <i class="zxicon zx-shichang1"
                style="font-size: 18px; color: #FF7200; margin-left: 20px;"></i>
              <p style="margin-left: 3px;">1.5天</p>
              <div class="holiday-type">事假</div>
            </div>
            <div class="duration-right"
              @click.stop.prevent="showHolidayAdd">
              <p>{{ !hide ? '展开' : '收起'}}</p>
              <i class="zxicon zx-jt-x"
                :class="{'rotate180': hide, 'rotate': !hide}"
                style="font-size: 14px; margin-left: 4px; margin-top: 3px;"></i>
            </div>

          </div>
          <div class="work-over">
            <i class="zxicon zx-zhuanjiao"
              style="font-size: 18px; color: #4FC614;"></i>
            <p style="margin-left: 3px;">已将卓讯运营平台效果图交给朱钦鹏</p>
          </div>
          <div class="hide"
            v-show="hide">
            <p class="holiday-reason">因为家里有事，需要请假！因为家里有事，需要请假！因为家里有事，需要请假！</p>
            <div class="holiday-add">
              <i class="zxicon zx-fujian"
                style="font-size: 18px; color: #333; margin-right: 3px;"></i>
              <p style="font-size: 13px;">请假附件.png</p>
            </div>
          </div>
        </div>
      </div>
      <div class="examine-box">
        <div class="examine-info">审批信息</div>
      </div>
      <div v-show="show === 1"
        class="time-box">
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
              <el-input type="textarea"
                v-model="newIdea"
                placeholder="请输入意见"></el-input>
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
      <div v-show="show === 2"
        class="time-box">
        <div class="title-time">
          <p>2018-10-26</p>
          <span>审批</span>
        </div>
        <div class="time-content">
          <div class="time-item">
            <div class="time-foot">
              <div class="duration-bag">
                <div style="display: flex; align-item: center;">
                  <i class="zxicon zx-tongguo"
                    style="color: #3B9FEA; font-size: 20px;"></i>
                  <div class="handle same-layout"
                    style="margin-left: 5px;">查丽 • 已转批</div>
                </div>
                <div class="bottom-time same-layout">10/27 14:05</div>
              </div>
              <div class="idea same-layout">
                <p style="margin-left: 5px;">我改为调休，转批给你！</p>
              </div>
            </div>
          </div>
          <div class="triangle_border_left">
            <span></span>
          </div>
        </div>
      </div>
      <div v-show="show === 2"
        class="time-box">
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
              <el-input type="textarea"
                v-model="newIdea"
                placeholder="请输入意见"></el-input>
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
import mixin from "assets/mixins";
import authen from "assets/utils/authen.js";
import CusAddMember from "../common/cusAddMember";
export default {
  name: "holidayStep",
  mixins: [mixin, authen],
  components: {
    "cus-add-member": CusAddMember
  },
  data() {
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
      newIdea: ""
    };
  },
  methods: {
    // 提交申请
    handleSubmit() {},
    // 上传附件
    beforeupload(file) {
      // console.log(Object.prototype.toString.call(file));
      // var windowUrl = window.URL || window.webkitURL;
      // this.src = windowUrl.createObjectURL(file);
      // return false;
    },
    handlePicUpload(rule, value, callback) {},
    // 批准
    approveHoliday(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 显示 请假信息 附件等
    showHolidayAdd() {
      this.hide = !this.hide;
    }
  },
  created() {
    if (this.$route.params.id == 1) {
      this.show = 1;
    } else {
      this.show = 2;
    }
  }
};
</script>

<style lang="less">
.holiday-detail {
  overflow: hidden;
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
      border-left: 4px solid #3b9fea;
      // background-color: #29A0DD;
      background-color: rgba(14, 160, 221, 0.1);
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
          content: "";
          position: absolute;
          top: 50%;
          margin-top: -0.5px;
          left: -40px;
          height: 1px;
          width: 30px;
          background-color: #999;
        }
        &::after {
          content: "";
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
        content: " ";
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
          content: " ";
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
          content: " ";
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
      }
    }
  }
}
</style>