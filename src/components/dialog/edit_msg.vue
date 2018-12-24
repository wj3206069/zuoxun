<template>
  <div role='dialog' class="el-message-box__wrapper" v-show="show">
		<!-- 通知界面 -->
		<div class="el-message-box" v-show="indexx  == '通知'">
			<div class="edit_msg_header"  v-drag="greet">
				<i class="zxicon zx-ai61"></i>
				<span>通知编辑</span>
				<i class="zxicon zx-guanbi" v-on:click="changeShow"></i>
			</div>
			<div class="edit_msg_content">
				<!--<el-tabs v-model="activeName">
					
				    <el-tab-pane label="发通知" name="first">-->
				<div class="edit_msg_title">
					<span>标题</span>
					<input type="text" placeholder="请输入通知标题"/>
				</div>
				<div class="choose_person">
					<span>选择成员</span>
					<ul>
						<li @click="addMember"><button class="addMember">添加</button></li>
					</ul>
				</div>
				<div class="edit_msg_neirong  inform_box">
					<span>内容</span>
					<textarea placeholder="请输入内容"></textarea>
					<span>
						<i class="zxicon zx-yiban"><b>添加图片</b></i>
						<i class="zxicon zx-msnui-attachment"><b>添加附件</b></i>
					</span>	
				</div>
				<div class="edit_msg_zhaiyao">
					<span>摘要</span>
					<input type="text"  placeholder="请输入内容"/>
				</div>
				    <!--</el-tab-pane>-->
				    
				    <!--<el-tab-pane label="发公告" name="second">
				    	<div class="edit_msg_title">
				    		<span>标题</span>
				    		<input type="text" placeholder="请输入公告标题"/>
				    	</div>
				    	<div class="edit_msg_neirong">
				    		<span>内容</span>
				    		<textarea placeholder="请输入内容"></textarea>
				    	</div>
				    	<div class="edit_msg_zhaiyao">
				    		<span>摘要</span>
				    		<input type="text"  placeholder="请输入内容"/>
				    	</div>
				    	<i class="zxicon zx-yiban"><span>添加图片</span></i>
				    	<i class="zxicon zx-msnui-attachment"><span>添加附件</span></i>
				    </el-tab-pane>
				    
				</el-tabs>-->
			</div>
			<div class="edit_msg_footer">
				<button type="button" class="el-button el-button--info">
					取消
				</button>
				<button type="button" class="el-button el-button--primary">
					发布
				</button>
				<button type="button" class="el-button el-button--success">
					存为草稿
				</button>
			</div>
			
			<!-- 添加成员 -->
			<div class="add_detail" v-show="addMemberShow">
				<el-collapse>
					<el-collapse-item title="项目开发部">
						<el-checkbox v-model="checkboxGroup1"  :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
						<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
							<el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
						</el-checkbox-group>
					</el-collapse-item>
					<el-collapse-item title="项目研发部">
						<el-checkbox v-model="checkboxGroup2"  :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
						<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
							<el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
						</el-checkbox-group>
					</el-collapse-item>
				</el-collapse>
			</div>
		</div>
		<!-- 公告界面 -->
		<div class="el-message-box" v-show="indexx  == '公告'">
			<div class="edit_msg_header"  v-drag="greet">
				<i class="zxicon zx-ai61"></i>
				<span>公告编辑</span>
				<i class="zxicon zx-guanbi" v-on:click="changeShow"></i>
			</div>
			<div class="edit_msg_content">
				<div class="edit_msg_title">
					<span>标题</span>
					<input type="text" placeholder="请输入通知标题"/>
				</div>
				<div class="edit_msg_neirong notice_box">
					<span>内容</span>
					<textarea placeholder="请输入内容"></textarea>
					<i class="zxicon zx-yiban"><b>添加图片</b></i>
					<i class="zxicon zx-msnui-attachment"><b>添加附件</b></i>
				</div>
				<div class="edit_msg_zhaiyao">
					<span>摘要</span>
					<input type="text"  placeholder="请输入内容"/>
				</div>
			</div>
			<div class="edit_msg_footer">
				<button type="button" class="el-button el-button--info">
					取消
				</button>
				<button type="button" class="el-button el-button--primary">
					发布
				</button>
				<button type="button" class="el-button el-button--success">
					存为草稿
				</button>
			</div>
		</div>  
	</div>
  
</template>

<script>
const cityOptions = ['上海','北京','广州','深圳'];
export default {
  name: 'DialogMsg',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    show: {
    	type: Boolean,
    	default: false
	},
	indexx: ""
  },
  data () {
  	return{
  		activeName: 'first',
		tzShow: false,
		addMemberShow: false,
		checkAll1: false,
		checkAll2: false,
		checkboxGroup1:"",
		checkboxGroup2:"",
		checkedCities: [],
        cities: cityOptions,
        isIndeterminate: true
  	}
  },
  methods: {
    changeShow(){
		this.$emit('msgShow', false);
		// console.log(this.show)
	},
	greet(val){
		this.val = val;
	},
	addMember(){
		this.addMemberShow = true;
	},
	handleCheckAllChange(val) {
		this.checkedCities = val ? cityOptions : [];
		this.isIndeterminate = false;
	},
	handleCheckedCitiesChange(value) {
		let checkedCount = value.length;
		this.checkAll = checkedCount === this.cities.length;
		this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
	}
  },
  mounted: function() {
	  	console.log(this.show, this.indexx);
  }
}
</script>

<style>
</style>