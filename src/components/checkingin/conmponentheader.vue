<template>
  <div class="app-company-zi-zhi">
    <div class="company-zi-zhi__body zi-zhi-box">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  name: "conmponentheader",
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="less">
.app-company-zi-zhi {
  .company-zi-zhi__head {
    height: 42px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e1e1e1;
    &--text {
      position: relative;
      font-weight: 400;
      font-size: 14px;
      color: #333;
      padding-left: 15px;
      &:before {
        display: block;
        content: "";
        position: absolute;
        top: 50%;
        left: 5px;
        height: 16px;
        border-left: 4px solid #62b1f3;
        transform: translateY(-50%);
        z-index: 1;
      }
    }
  }
  .btn-tool {
    display: inline-block;
    align-items: center;
    border: none;
    background: #fff;
    font-size: 14px;
    color: #666;
    cursor: pointer;
    outline: none;
    .zxicon {
      font-size: 25px;
      color: #3d95d8;
      vertical-align: -5px;
    }
    .btn-tool--text {
      margin: 0 6px;
    }
    & + .btn-tool {
      margin-left: 30px;
      &:before {
        /*display: block;*/
        content: " ";
        position: relative;
        top: 0;
        left: -15px;
        height: 16px;
        border-left: 1px solid #dcdfe6;
      }
    }
  }
  .zi-zhi-box {
    .content_t {
      padding: 0 80px 0 40px;
      .details_content {
        margin-top: 20px;
        min-height: 150px;
        ul {
          height: 100%;
          padding: 0 100px;
          list-style: none;
          font-size: 14px;
          li:first-child {
            float: left;
            color: #999;
          }
          li:last-child {
            float: left;
            margin-top: 2px;
            margin-left: 100px;
            color: #333;
          }
          p {
            padding-bottom: 12px;
          }
        }
      }
      .details_s {
        border-bottom: 1px solid #e1e1e1;
      }
    }
    .zi-zhi__title {
      height: 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h5 {
        font-weight: 400;
        font-size: 14px;
        color: #333;
        span {
          vertical-align: middle;
        }
        .zxicon {
          font-size: 1.6em;
          color: #13b745;
        }
      }
      .data_time {
        float: left;
      }
      .search__toolbar_css {
        float: right;
        padding-left: 10px;
      }
    }
  }
  .search__toolbar_css .t_time .el-input--suffix .el-input__inner {
    padding: 0 30px;
  }
  .el-date-editor .el-range__icon {
    line-height: 25px !important;
  }
  .el-date-editor .el-range-separator {
    line-height: 25px !important;
  }
  .el-input__prefix,
  .el-input__suffix,
  .el-date-editor .el-range__icon {
    color: #14b3c7;
  }
  .el-select .el-input .el-select__caret {
    line-height: 2px;
  }
  .screen_status {
    width: 120px;
    float: right;
    padding-left: 10px;
  }
}
</style>

