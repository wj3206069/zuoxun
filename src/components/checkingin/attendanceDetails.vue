<template>
  <div class="statistics">
    <div class="company-zi-zhi__head">
      <h4 class="company-zi-zhi__head--text">出勤统计</h4>
    </div>
    <div class="header_title">
      <a class="return_btn" @click="$router.back(-1)"><i class="zxicon zx-jt-left"></i>返回</a><span class="header_name">出勤统计详情</span>
    </div>
    <div class="zi-zhi-records">
      <div class="zi-zhi__table-box">
        <div class="content_t">
          <div class="details_content details_s">
            <ul>
              <li>
                <p>时间</p>
                <p>姓名</p>
                <p>员工状态</p>
                <p>账号</p>
              </li>
              <li>
                <p>2018</p>
                <p>华子</p>
                <p>正常</p>
                <p>这是账号</p>
              </li>
            </ul>
          </div>
          <div class="details_content details_s">
            <ul>
              <li>
                <p>部门</p>
                <p>所属规则</p>
                <p>所属规则</p>
                <p>打卡类型</p>
              </li>
              <li>
                <p>研发部</p>
                <p>正常</p>
                <p>是</p>
                <p>常规</p>
              </li>
            </ul>
          </div>
          <div class="details_content">
            <ul>
              <li>
                <p>打卡时间</p>
                <p>状态</p>
                <p>原始状态</p>
                <p>打卡地点</p>
                <p>迟到时间</p>
              </li>
              <li>
                <p>2018-10-22 9:00</p>
                <p>正常</p>
                <p>正常</p>
                <p>塘朗</p>
                <p>30分钟</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value6: "",
      value7: "",
      route_id: this.$route.params.id
    };
  },
  created() {
    console.log(this.$route.params.id);
  },
  methods: {}
};
</script>




