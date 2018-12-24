<style lang="less">
	.userinfo{
		min-height: calc(100vh - 95px);
		padding: 20px 0;
		.form_white_bg{
			background-color: white;
		    width: 1160px;
		    margin:0 auto;
		    padding:30px 26px 10px;
		    .info_heaer_box{
		    	border-bottom: 1px solid #d1d1d1;
		    	padding: 10px 15px 15px;
		    	.title{
		    		font-size:22px;
		    		color: #333;
		    		font-weight: normal;
		    	}
		    	.explain_text{
		    		font-size:14px;
		    		color:#999;
		    		margin-top:8px;
		    		>a{
		    			text-decoration: none;
		    		}
		    		.modify_btn{
		    			color:#0f82ed;
		    			margin-left:10px;
		    			&:hover{
		    				color:#0b62b4;
		    			}
		    		}
		    		.close_btn{
		    			color:#e92e2e;
		    			&:hover{
		    				color: #d00f0f;
		    			}
		    		}
		    	}
		    }
		    .info_content_box{
		    	padding:15px;
		    	padding-bottom: 50px;
		    	margin:15px;
		    	border-top:1px solid #e1e1e1;
		    	border-bottom:1px solid #e1e1e1;
		    	background-color: #fcfcfc;
		    	.left_box{  /*左*/
		    		font-size:14px;
		    		.user_info{
		    			overflow: hidden;
		    			border-bottom:1px solid #e1e1e1;
		    			padding: 5px 0 25px 10px;
		    			.user_img{
		    				min-width: auto;
		    				height:90px;
		    				border: 1px dashed #ccc;
		    				/*float: left;*/
		    			}
		    			.user{
		    				margin-top:8px;
		    				.user_xm{
		    					font-size: 16px;
		    					display:inline-block;
		    					.sex_man,.sex_woman{
	    						    font-size: 20px;
    								vertical-align: -5px;
    								margin-left:2px;
		    					}
		    					.sex_man{
		    						color: #409ef9;
		    					}
		    					.sex_woman{
		    						color:#f54088;
		    					}
		    				}
		    				.brith_date{
		    					margin-left: 15px;
		    					display:inline-block;
		    					font-size:14px;
		    					color:#666;
		    					margin-top:8px;
		    				}
		    			}
		    		}
		    		ul.list_box{
		    			padding: 20px 0 0 15px;
		    			li{
		    				color: #333;
	    				    padding: 8px 0;
		    				>.zxicon{
		    					font-size: 26px;
							    vertical-align: -8px;
							    margin-right: 12px;
							    width: 32px;
    							text-align: center;
		    				}
		    			}
		    		}
		    	}
		    	.right_box{  /*右*/
		    		font-size: 14px;
		    		padding-left:50px;
		    		.from_list_box{
		    			.list_title{
		    				font-size:14px;
		    				color:#999;
		    				border-bottom:#e1e1e1 1px solid;
		    				padding-bottom: 10px;
		    				margin-top:20px;
		    			}
		    			.list{
		    				margin-top:18px;
		    				.list_left{
		    					color:#999;
		    				}
		    				.list_right{
		    					padding-right: 15px;
		    					color:#333;
		    				}
		    				&:last-child{  /*最后一个下方的边距*/
		    					margin-bottom:18px;
		    				}
		    			}
		    			.from_list {  /*小整块下方描边*/
		    				margin-left: 8px;
		    				& + .from_list{
			    				border-top:1px dashed #e1e1e1;
		    				}
		    			}
		    		}
		    		.from_list_box + .from_list_box{  /*大整块上方边距*/
		    			margin-top:50px;
		    		}
		    	}
		    }
		}
		/*上传样式调整*/
		.upload_box_css1{
			.upload_form_box{
				margin:0;
				.el-upload{
					min-width: 90px;
					.el-upload-dragger{
						width: auto;
						height: 90px;
						border-radius: 0;
						position: relative;
						.mask_black{
							display: none;
							width: 100%;
							height: 100%;
							top:0;
							left:0;
							position: absolute;
							background: rgba(0,0,0,.3);
							.zxicon{
								color: white;
								font-size: 38px;
								position: absolute;
								top:50%;
								left:50%;
								transform: translate(-50%,-50%);
							}
						}
						&:hover .mask_black{
							display: block !important;
						}
						&:active .mask_black{
							display: none;
						} 
					}
				}
			}
			.upload_text_box{
				display:inline-block;
				a{
					text-decoration: none;
					margin:0 3px;
				}
				.zx_btn{
					color: #3283C8;
					&:hover{
						color: #1662a4;
					}
				}
				.bc_btn{
					color: #0d8a29;
				}
			}
			
		}
		.btn-modify{
			font-size:18px !important;
			color: #a7a7a7;
			vertical-align: -4px !important;
			cursor: pointer;
			margin: 0 5px;
			&:hover{
				color: #2196f3;
			}
		}
		.steps_css{  /*流程样式*/
			padding: 5px 8%;
			.el-step__title { /*字大小*/
				font-size:14px;
			}
			.el-step.is-simple:not(:last-of-type) .el-step__title{
				max-width:68%;
			}
		}
		.a_btn_box{
			padding-left:12px;
		}
		.steps{  /*步骤*/
			padding-top:20px;
			height: 150px;
			.tips_text{
				text-align: center;
				color: #00b71e;
				padding:10px 0;
				font-size:14px;
				margin-bottom: 10px;
				>font{
					margin:0 4px;
				}
			}
			.success_text{
				font-size: 16px;
				text-align: center;
				padding-top: 25px;
				.zxicon{
					font-size: 26px;
				    vertical-align: -8px;
				    margin-right: 5px;
					color: #ff5722;
				}
			}
		}
		.select_css{ /* 下拉*/
			.el-input>input{
			    border: 0;
			    width: 114px;
			    background: #e8eef3;
			    height: 34px;
			    border-radius: 5px;
			}
		}
	}
	
</style>
<template>
   	<div class="userinfo">	
   		<div class="form_white_bg">
   			<div class="info_heaer_box">
   			
   				<p class="explain_text">
   				
					   <a href="javascript: void(0);" class="modify_btn" @click="editPassword">修改密码</a>
   				</p>
   			</div>
   			<div class="info_content_box">
   				<el-row>
   					<el-col :span="7" class="left_box">
						<div class="user_info">
							<img :src="!!imageUrl ? imageUrl : imageUrlDefault" onerror="this.onerror = null; this.src = `static/images/defaultuser.jpg`" alt="" class="user_img"/>
							<div class="user">
								<h5 class="user_xm">
									<strong>{{!!formData.username?formData.username:'暂无'}}</strong><font class="zxicon zx-xiugai btn-modify" color="#39ad4c" @click="editAccount" v-show="isedit && isEditAccount"></font><i class="sex_woman zxicon zx-touxiang1" v-if="formData.sex === '0'"></i><i class="sex_man zxicon zx-touxiang1" v-else></i>
								</h5>
								<h6 class="brith_date">{{!!formData.birthday?formData.birthday:'暂无生日'}}</h6>
							</div>
						</div>
   						<ul class="list_box">
							<li><font class="zxicon zx-shouji1" color="#2bb2de"></font><span>{{!!formData.phone?formData.phone:'暂无'}}</span>
								<font class="zxicon zx-xiugai btn-modify" color="#39ad4c" v-if="!!formData.phone" @click="editAuthen('1')" v-show="isedit"></font>
								<font class="zxicon zx-xiugai btn-modify" color="#39ad4c" v-else @click="edit('phone')" v-show="isedit"></font>
								
							</li>
							<li><font class="zxicon zx-weixin" color="#39ad4c"></font>
								<span>{{!!formData.wechat?'已绑定':'暂无'}}</span><font class="zxicon zx-xiugai btn-modify" color="#39ad4c" @click="edit('wechat')" v-show="isedit"></font>
								<a v-show="!!formData.wechat && isedit" style="margin-left: 50px;" @click="cancelBing"><font class="zxicon zx-shanchu btn-modify" color="#e61212" style="color: #e61212;"></font>取消绑定</a>
							</li>
							<li><font class="zxicon zx-qq" color="#5999db"></font><span>{{!!formData.qq?formData.qq:'暂无'}}</span></li>
							<li><font class="zxicon zx-youxiang" color="#ec5757"></font><span>{{!!formData.email?formData.email:'暂无'}}</span>
							</li>
   						</ul>
   					</el-col>
   					<el-col :span="17" class="right_box">
   						<div class="from_list_box">
   							<h6 class="list_title">基础信息</h6>
   							<div class="from_list">
	   							<el-row class="list">
	   								<el-col :span="6" class="list_left">
	   									昵称
	   								</el-col>
	   								<el-col :span="18" class="list_right">
	   									{{!!formData.nickname?formData.nickname:'暂无'}}<font class="zxicon zx-xiugai btn-modify" color="#39ad4c" @click="edit('nickname')" v-show="isedit"></font>
	   								</el-col>
	   							</el-row>
	   							<el-row class="list">
	   								<el-col :span="6" class="list_left">
	   									身份证号码
	   								</el-col>
	   								<el-col :span="18" class="list_right">
	   									{{!!formData.idcard?formData.idcard:'暂无'}}
	   								</el-col>
	   							</el-row>
	   							<el-row class="list">
	   								<el-col :span="6" class="list_left">
	   									地址
	   								</el-col>
	   								<el-col :span="18" class="list_right">
	   									{{!!formData.address?formData.address:'暂无'}}<font class="zxicon zx-xiugai btn-modify" color="#39ad4c" @click="edit('address')" v-show="isedit"></font>
	   								</el-col>
	   							</el-row>
   							</div>
   						</div>
   						<div class="from_list_box">
   							<h6 class="list_title">企业信息</h6>
   							<div class="from_list" v-for="item in duties" v-show="duties.length > 0">
	   							<el-row class="list">
	   								<el-col :span="6" class="list_left">
	   									企业名称
	   								</el-col>
	   								<el-col :span="18" class="list_right">
	   									{{!!item.deptname?item.deptname:'暂无'}}
	   								</el-col>
	   							</el-row>
								<el-row class="list">
	   								<el-col :span="6" class="list_left">
	   									工号
	   								</el-col>
	   								<el-col :span="18" class="list_right">
	   									{{!!item.caid?item.caid:'暂无'}}<font class="zxicon zx-xiugai btn-modify" color="#39ad4c" @click="deptEdit('caid', item.id, item.caid, item.departid)" v-show="isqyedit"></font>
	   								</el-col>
	   							</el-row>
	   							<el-row class="list">
	   								<el-col :span="6" class="list_left">
	   									部门名称
	   								</el-col>
	   								<el-col :span="18" class="list_right">
										<span v-if="!!item.depts && item.depts.length> 0">
											<p v-for="item1, index of item.depts">
												<span v-if="index == item.depts.length-1">{{item1.text}}<font class="zxicon zx-xiugai btn-modify" color="#39ad4c" @click="deptEdit('deptname',item1.id, item.deptid, item.departid, item.depts)" v-show="isqyedit"></font></span>
												<span v-else>{{item1.text}}</span>
											</p>											
										</span>
										<span v-else>
											暂无<font class="zxicon zx-xiugai btn-modify" color="#39ad4c" @click="deptEdit('deptname', item.id, '',  item.departid)" v-show="isqyedit"></font>
										</span>
	   								</el-col>
	   							</el-row>
	   							<!-- <el-row class="list">
	   								<el-col :span="6" class="list_left">
	   									管理者
	   								</el-col>
	   								<el-col :span="18" class="list_right">
	   									{{item.playrole == '1'?'是':'否'}}<font class="zxicon zx-xiugai btn-modify" color="#39ad4c" @click="deptEdit('playrole', item.id, item.playrole)" v-show="isqyedit"></font>
	   								</el-col>
	   							</el-row> -->
								<el-row class="list">
	   								<el-col :span="6" class="list_left">
	   									职位
	   								</el-col>
	   								<el-col :span="18" class="list_right">
	   									{{!!item.duties?item.duties:'暂无'}}<font class="zxicon zx-xiugai btn-modify" color="#39ad4c" @click="deptEdit('duties', item.id, item.duties)" v-show="isqyedit"></font>
	   								</el-col>
	   							</el-row>
   							</div> 
							<div v-show="duties.length < 1">
								<el-row class="list">
	   								<el-col :span="24" class="list_left">
	   									暂无
	   								</el-col>
	   							</el-row>
							</div>     							
   						</div>
   					</el-col>
   				</el-row>
   			</div> 
   		</div>
		   <el-dialog :visible.sync="editmodal" class="dialog_css1" width="500px">
			<span slot="title" class="dialog_title" v-text="edittittle">昵称</span>
			<el-form :model="editData" :rules="formRules" ref="editData">
				<el-form-item :label="edittittle" label-width="150px" prop="edititem" v-show="!ispwd && !isplayrole &&!isdept">
					<el-input style="width:250px" v-model="editData.edititem"></el-input>
				</el-form-item>				
				<el-form-item :label="edittittle1" label-width="150px" prop="phonecode" v-show="isphone">
	               	<el-col :span="14">
	                    <el-input  class="input_bg" v-model="editData.phonecode" :disabled="isrightphone"></el-input>
	               	</el-col>
	               	<el-col :span="10" class="a_btn_box">
	               		<a href="javascript: void(0);" @click="sendCode" v-show="sendSms">发送验证码</a>
						<span v-show="!sendSms"><font color="#999">重新获取({{reloadTime}}S)</font></span>
	               	</el-col>
				</el-form-item>				
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="editmodal = false">取消</el-button>
				<el-button size="small" @click="save" type="primary">确认</el-button>
			</span>
		</el-dialog>

		
		
		<el-dialog :visible.sync="accountModal" class="dialog_css1" width="500px">
			<span slot="title" class="dialog_title">修改帐号</span>
			<el-form :model="accountData" :rules="accountRules" ref="accountData">
				<el-form-item label="旧帐号" label-width="150px">
					<el-input style="width:250px" v-model="formData.username" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="新帐号" label-width="150px" prop="username">
					<el-input style="width:250px" v-model="accountData.username"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="accountModal = false">取消</el-button>
				<el-button size="small" @click="saveAccount" type="primary">确认</el-button>
			</span>
		</el-dialog>
		
		<el-dialog :visible.sync="authenModal" class="dialog_css1" width="500px">
			<span slot="title" class="dialog_title" v-text="authenTitle">修改帐号</span>
			<el-form :model="authenData" :rules="accountRules" ref="authenData">
				<el-form-item label="验证方式" label-width="150px">
					<el-select  v-model="authenData.authentype"   placeholder="请选择">
							<el-option label="手机验证" value="1"></el-option>
							<el-option label="邮箱验证" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="验证码" label-width="150px" prop="code">
	               	<el-col :span="14">
	                    <el-input  class="input_bg" v-model="authenData.code" :disabled="isrightphone"></el-input>
	               	</el-col>
	               	<el-col :span="10" class="a_btn_box">
	               		<a href="javascript: void(0);" @click="sendValidateCode" v-show="sendSms">发送验证码</a>
						<span v-show="!sendSms"><font color="#999">重新获取({{reloadTime}}S)</font></span>
	               	</el-col>
				</el-form-item>	
				<el-form-item :label="authenNewText" label-width="150px" prop="editdata">
					<el-input style="width:250px" v-model="authenData.editdata"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="authenModal = false">取消</el-button>
				<el-button size="small" @click="saveAuthen" type="primary">确认</el-button>
			</span>
		</el-dialog>
		<!--修改绑定手机-->
		<el-dialog :visible.sync="phoneModal" class="dialog_css1" width="530px">
			<span slot="title" class="dialog_title" v-text="authenTitle"></span>
			<el-form :model="authenData" :rules="authenRules" ref="authenData">
				<el-steps simple :active="active" finish-status="success" class="steps_css">
				  <el-step :title="'验证原' + authenNewText"></el-step>
				  <el-step :title="'验证新' + authenNewText"></el-step>
				  <el-step title="完成"></el-step>
				</el-steps>
				<div v-show="active == 0" class="steps steps_01">
					<el-form-item label="验证方式" label-width="150px" style="margin-bottom:0;">
						<el-select  v-model="authenData.authentype" @change="selectValidateType"  class="select_css">
								<el-option label="手机验证" value="1" v-show="!!formData.phone"></el-option>
								<el-option label="邮箱验证" value="2" v-show="!!formData.email"></el-option>
						</el-select>
					</el-form-item>
					<p class="tips_text">您需发送验证码到
						<font color="#666">
							<span v-text="validateCodeInfo"></span>
							
						</font>
					</p>
					<el-form-item label="验证码" label-width="150px" prop="validatecode">
		               	<el-col :span="12">
		                    <el-input  class="input_bg" v-model="authenData.validatecode" :disabled="isrightphone"></el-input>
		               	</el-col>
		               	<el-col :span="12" class="a_btn_box">
		               		<a href="javascript: void(0);" @click="sendValidateCode" v-show="sendSms"><font color="#f94a15">发送验证码</font></a>
							<span v-show="!sendSms"><font color="#999">重新获取({{reloadTime}}S)</font></span>
		               	</el-col>
					</el-form-item>	
				</div>
				<div v-show="active == 1" class="steps steps_02">
					<el-form-item label="新手机号" label-width="150px" prop="editdata">
						<el-input style="width:250px" v-model="authenData.editdata"></el-input>
					</el-form-item>
					<el-form-item label="验证码" label-width="150px" prop="code">
		               	<el-col :span="12">
		                    <el-input  class="input_bg" v-model="authenData.code" :disabled="isrightphone"></el-input>
		               	</el-col>
		               	<el-col :span="12" class="a_btn_box">
		               		<a href="javascript: void(0);" @click="sendRegValidateCode" v-show="sendSms"><font color="#f94a15">发送验证码</font></a>
							<span v-show="!sendSms"><font color="#999">重新获取({{reloadTime}}S)</font></span>
		               	</el-col>
					</el-form-item>	
				</div>
				<div v-show="active == 2" class="steps steps_03">
					<p class="success_text"><i class="zxicon zx-wancheng"></i>您已完成{{authenNewText}}绑定</p>
				</div>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="phoneModal = false">{{opttext}}</el-button>
				<!--<el-button size="small" @click="phoneModal" type="primary">确认</el-button>-->
				<el-button size="small" @click="next" type="primary" v-show="active != 2">下一步</el-button>
			</span>
		</el-dialog>
		<!-- 密码修改 -->
		<el-dialog :visible.sync="passwordModal" class="dialog_css1" width="500px">
			<span slot="title" class="dialog_title">修改密码</span>
			<el-form :model="passwordData" :rules="passwordRules" ref="passwordData">
				<el-form-item label="原密码" label-width="150px" prop="oldpassword">
					<el-input type="password" style="width:250px" v-model="passwordData.oldpassword"></el-input>
				</el-form-item>
				<el-form-item label="新密码" label-width="150px" prop="password">
					<el-input type="password" style="width:250px" v-model="passwordData.password"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" label-width="150px" prop="repassword">
					<el-input type="password" style="width:250px" v-model="passwordData.repassword"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="passwordModal = false">取消</el-button>
				<el-button size="small" @click="savePassword" type="primary">确认</el-button>
			</span>
		</el-dialog>
		<!-- 企业信息修改 -->
		<el-dialog :visible.sync="deptModal" class="dialog_css1" width="500px">
			<span slot="title" class="dialog_title" v-text="depttittle">职务</span>
			<el-form :model="deptData" :rules="deptRules" ref="deptData">
				<el-form-item label="职位" label-width="150px" prop="duties" v-show="isduties">
					<el-input style="width:250px" v-model="deptData.duties"></el-input>
				</el-form-item>
				<el-form-item label="工号" label-width="150px" prop="caid" v-show="iscaid">
					<el-input style="width:250px" v-model="deptData.caid"></el-input>
				</el-form-item>
				<el-form-item label="管理员" label-width="150px" prop="playrole" v-show="isplayrole">
					<el-switch style="width:250px" v-model="deptData.playrole"></el-switch>
				</el-form-item>
				<!-- <el-form-item label="上级部门" label-width="150px" prop="departid" v-show="isdept">
					<el-select style="width:250px" v-model="deptData.departid"   placeholder="请选择" @change="selectDir">
							<el-option v-for="item in deptlist" :label="item.deptname" :value="item.id"></el-option>
					</el-select>
				</el-form-item> -->
				<el-form-item label="部门" label-width="150px" prop="ssdeptid" v-show="isdept">
					<tree-select style="width:250px" class="ats-tree--small" :treeData="ssdeptlist"  :only-leaf="false" :treeProps="defaultProps" :value="deptData.ssdeptid" @setSelectedId="selectTree"></tree-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="deptModal = false">取消</el-button>
				<el-button size="small" @click="saveQy" type="primary">确认</el-button>
			</span>
		</el-dialog>
		<el-dialog :visible.sync="addDept" class="dialog_css1" width="500px">
			<span slot="title" class="dialog_title">部门</span>
			<cus-add-dept v-if="addDept"
				name-space="memberTree" 
				:datas="ssdeptlist"
				:defaultProps="defaultProps"
				:default-checked-keys="defaultCheckedKeys"
				:render-after-expand="false"
				right-node-key="deptid"
				check-strictly
				:defaultMember="defaultMemberList"
				@handle="checkHandle"></cus-add-dept>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="addDept = false">取消</el-button>
				<el-button size="small" @click="saveDept" type="primary">确认</el-button>
			</span>
		</el-dialog>
  	</div>
</template>

<script>
    
    import mixin from "~/assets/mixins";
    import authen from "~/assets/utils/authen.js";

	var ws = null;
	var timer = null;

    export default {
        name: 'userInfo',
        mixins: [mixin, authen],
        data() {
        	return{
				opttext: '取消',
        		addDept: false,
        		defaultCheckedKeys: [],
        		defaultMemberList: [],
				active:0,
				deptModal: false,
				depttittle: '',
				passwordModal: false,
        		phoneModal:false,
				isedit: false,
				isqyedit: false,
				iseditqrcode: false,
				duties: [],	
				ssdeptlist: [],
				editmodal: false,
				edittittle: '',
				edittittle1: '',
				edittittle2: '',
				isphone: false,
				ispwd: false,
				isplayrole: false,
				iscaid: false,
				isduties: false,
				isrightphone: false,
				isdept: false,
				issaveqy: false,
				sendSms: true,
				reloadTime: 60,
				isitem: true,
				currentedit: '',
				ismyaccount: false,		
				issuperormanager: false,
				isEditUserInfo: false,
				imageUrl: '',
				imageUrlDefault: '',
				accountModal: false,
				authenModal: false,
				authenNewText: '',
				authenTitle: '',
				deptid: '',
				defaultProps: {
					label: "text",
					children: "children"
				},
				formData: {
					id: '',
					nickname: '',
					phone: '',
					wechar: '',
					qq: '',
					email: '',
					imgurl: ''
                },	
				passwordData: {
					id: this.userid,
					oldpassword: '',
					password: '',
					repassword: ''
				},
				accountData: {
					id: this.userid,
					username: ''
				},
				authenData: {
					authentype: '1',
					code: '',
					edittype: '',
					editdata: '',
					validatecode: ''
				},	
				authenRules: {
					editdata:[
                		{required: true, message: '不能为空', trigger: 'blur'},
						/* {type: 'string', min: 2,max: 18, message: '账号长度2-18', trigger: 'blur'}, */
						{pattern: /^[\u4e00-\u9fff\w]{2,18}$/, message: '账号只能包括数字、字母、汉字和下划线，字母区分大小写，长度2~18之间', trigger: 'blur'}
				    ],
				},
				accountRules: {
					username:[
                		{required: true, message: '帐号不能为空', trigger: 'blur'},
						/* {type: 'string', min: 2,max: 18, message: '账号长度2-18', trigger: 'blur'}, */
						{pattern: /^[\u4e00-\u9fff\w]{2,18}$/, message: '账号只能包括数字、字母、汉字和下划线，字母区分大小写，长度2~18之间', trigger: 'blur'}
				    ],
				},
				passwordRules: {
					oldpassword: [
						{required: true, message: '原密码不能为空', trigger: 'blur'},
						{validator: this.isrightoldpwd, trigger: 'blur'}
					],
					password: [
						{required: true, message: '新密码不能为空', trigger: 'blur'}
					],
					repassword: [
						{required: true, message: '确认密码不能为空', trigger: 'blur'},
						{validator: this.isrightrepwd}

					]
				},
				deptRules: {},
				editData: {
					edititem: '',
					phonecode: '',
					phonekey: '',
					password: '',
					repassword: '',
					playrole: 'false',
					ssdeptid: ""
				},
				deptData: {
					id: '',
					userid: this.userid,
					departid: '',
					duties: '',
					playrole: '',
					caid: '',
					ssdeptid: ''
				},
				formRules: {},
				msgid: '',
				wxconfig: '',
				wsurl: '',
				lockReconnect: false,
				isEditAccount: false,
				deptlist: [],
				validateCodeInfo : "",
				addDepts: [],
				delDepts:[]
        	}
        },
        methods: {
        	checkHandle(a, b, c, d) {
        		console.log(a, b, c, d);
        		this.addDepts = c;
        		this.delDepts = b;
        	},
			load_dwlist(){           
				this.$axios.get("/proxyapiAuthen/" + "qymgr/getalldept").then(res => {       
	        		 this.deptlist= res;
                });
			},
			selectDir(){
				this.load_depttreedatas(data);
			},
			deptEdit(name, id, value, deptid, depts){
				this.deptData.id = id;
				this.currentedit = '';
				this.isplayrole = false;
				this.isduties = false;
				this.isdept = false;
				this.iscaid = false;
				this.deptData.ssdeptid = '';
				this.deptData.caid = '';
				this.deptData.duties = '';
				this.deptData.playrole = '';
				if(name === 'deptname'){	
					let _arr = [];
					if (!!depts) {
						depts.forEach(item => {
							_arr.push(item.deptid);
						})
						this.defaultCheckedKeys = _arr;
					}
					this.defaultMemberList = depts;
					console.log(this.defaultMemberList, "defaultMemberList");
					this.deptData.departid = deptid;
					this.depttittle = '部门';
					this.currentedit = 'deptname';
					this.$axios.get("/proxyapiAuthen/" + "qymgr/tree/"+deptid).then(res => {  
						if(!!res && res.length > 0){
							this.ssdeptlist = res;
							this.issaveqy = true;
							this.isdept = true;
							this.$nextTick(function() {
								this.$set(this.editData, "ssdeptid", value);
							});
						}else{
							this.ssdeptlist= [];
						}         
					});
					this.addDept = true;
				}else if(name === 'caid'){
					this.deptData.edititem = value;
					this.depttittle = '工号';
					this.currentedit = 'caid';
					this.iscaid = true;
					this.deptModal = true;
				}else if(name === 'duties'){
					this.deptData.edititem = value;
					this.depttittle = '职位';
					this.currentedit = 'duties';
					this.isduties = true;
					this.deptModal = true;
				}else if(name === 'playrole'){
					if(value == '1'){
						this.deptData.playrole = true;
					}else{
						this.deptData.playrole = false;
					}
					this.depttittle = '管理员';
					this.currentedit = 'playrole';
					this.isplayrole = true;
					this.deptModal = true;
				}
			},
			saveDept() {
				if (this.addDepts.length > 0 || this.delDepts.length > 0) {
					this.$axios.post("/proxyapiAuthen/" + "updateuserdeparts", {
						ids: this.addDepts.join(),
						userid: this.userid,
						departid: this.deptData.departid,
						deldepts: JSON.stringify(this.delDepts)
					}).then(res => {
						this.loadData();
					})
				}
				/* if (this.delDepts.length > 0) {
					let _arr = [];
					this.delDepts.forEach(item => {
						_arr.push("'" + item.dutyid + "'");
					})
					this.$axios.delete("/proxyapiAuthen/" + "deleteuserdeparts", {
						data: {
							ids: _arr.join()
						}
					}).then(res => {
						console.log(res, "del res");
						this.loadData();
					})
				} */
				this.addDept = false;
			},
			isrightoldpwd(rule, value, callback){
				this.$axios.get("/proxyapiAuthen/" + 'validatepwd?oldpassword=' + value).then(res => {
					if(!res){
						callback(new Error('原密码不正确'));
					}else{
						callback();
					}
				});
			},
			isrightpwd(rule, value, callback){

			},
			isrightrepwd(rule, value, callback){
				if(value != this.passwordData.password){
					callback(new Error('确认密码和密码不一致'));
				}
				callback();
			},
			editPassword(){
				this.passwordModal = true;
				this.$nextTick(function() {
					this.$refs['passwordData'].resetFields()
				});
			},
			savePassword(){
				this.$refs["passwordData"].validate(valid => {
					if(!!valid){
                        this.passwordData.id = this.userid
						this.$axios.put("/proxyapiAuthen/" + 'updatepwd', this.passwordData).then(res => {
							if(res.success){
								this.passwordModal = false;
							}
							this.loadMsg(res);
						});
					}
				});
			},
			selectTree(data){
				 this.deptData.ssdeptid = data.id;
			},
        	next(){
				if (this.active == 0) {
					let url = "/proxyapiAuthen/" + 'validateRegCode/' + this.userid + '?authentype=' + this.authenData.authentype + '&code=' + this.authenData.validatecode;
					this.$axios.get(url).then(res => {
						if (res.success) {
							clearInterval(timer);
							this.sendSms = true;
							this.reloadTime = 60;
							this.isrightphone = true;
        					if(this.active++ >2) {
								this.active = 0;
								this.opttext = '确定';
							}
						} else {
							this.loadMsg(res);
						}
					})	
				} else {
					this.saveAuthen();
				}
        	},
			sendCode() {
				if (!!this.editData.edititem) {
					this.$axios.get("/proxyapiAuthen/" + 'api/sendPhoneRegCode?phone=' + authenData.editdata).then(res => {
						this.editData.phonekey = res.phonekey;
						if (res.success) {
							this.sendSms = false;
							this.isPhone = false;
							clearInterval(timer);
							let that = this;
							let timer = setInterval(function() {
								--that.reloadTime;
								if (that.reloadTime < 1) {
									that.sendSms = true;
									that.reloadTime = 60;
									clearInterval(timer);
								}
							}, 1000);
						} else {
							this.loadMsg(res);
						}
					})	
				} else {
					this.loadMsg({"msg":"手机号码不能为空", "success":false})
				}
			},
			sendRegValidateCode() {
				this.$refs['authenData'].validate((valid) => {
					if (valid) {	
						let url = "/proxyapiAuthen/" + 'sendRegValidateCode?authentype=' + this.authenData.edittype + '&authendata=' + this.authenData.editdata;
						this.$axios.get(url).then(res => {
							if (res.success) {
								this.isrightphone = false;
								this.sendSms = false;
								this.isPhone = false;
								clearInterval(timer);
								let that = this;
								timer = setInterval(function() {
									--that.reloadTime;
									if (that.reloadTime < 1) {
										that.sendSms = true;
										that.reloadTime = 60;
										clearInterval(timer);
									}
								}, 1000);
							} else {
								this.loadMsg(res);
							}
						})	
					}
				});
			},
			sendValidateCode() {
				let url = "/proxyapiAuthen/" + 'sendValidateCode/' + this.userid + '?authentype=' + this.authenData.authentype;
				this.$axios.get(url).then(res => {
					if (res.success) {
						this.isrightphone = false;
						this.sendSms = false;
						this.isPhone = false;
						clearInterval(timer);
						let that = this;
						timer = setInterval(function() {
							--that.reloadTime;
							if (that.reloadTime < 1) {
								that.sendSms = true;
								that.reloadTime = 60;
								clearInterval(timer);
							}
						}, 1000);
					} else {
						this.loadMsg(res);
					}
				})	
			},
			showedit(){
				if(this.ismyaccount){
					this.isedit = !this.isedit;
				}
				if(this.issuperormanager || this.isEditUserInfo){
					this.isqyedit = !this.isqyedit;
				}
			},
			edit(name, id, value, deptid){
				if(name === 'wechat'){
					this.iseditqrcode = true;
				} else {
					this.editData.edititem = '';
					this.isitem = true;
					this.currentedit = '';
					this.isphone = false;
					this.ispwd = false;					
					if(name === 'nickname'){
						this.editData.edititem = this.formData.nickname;
						this.edittittle = '昵称';
						this.currentedit = 'nickname';
					}else if(name === 'phone'){
						this.editData.edititem = '';
						this.editData.yzm = '';
						this.isphone = true;
						this.edittittle = '手机号';
						this.edittittle1 = '验证码';
						this.currentedit = 'phone';
					}else if(name === 'qq'){
						this.editData.edititem = this.formData.qq;
						this.edittittle = 'qq';
						this.currentedit = 'qq';
					}else if(name === 'email'){
						this.editData.edititem = this.formData.email;
						this.edittittle = '邮箱';
						this.currentedit = 'email';
					}else if(name === 'address'){
						this.editData.edititem = this.formData.address;
						this.edittittle = '住址';
						this.currentedit = 'address';
					}else if(name === 'password'){
						this.editData.edititem = '';
						this.editData.password = '';
						this.editData.repassword = '';
						this.edittittle = '原密码';
						this.edittittle1 = '新密码';
						this.edittittle2 = '确认密码';
						this.currentedit = 'password';
						this.ispwd = true;
					}
					this.editmodal = true;
				}
			},
			save(){
				if(!!this.currentedit){
					if(this.currentedit === 'nickname'){
						this.formData.nickname = this.editData.edititem;
					}else if(this.currentedit === 'phone'){
						this.formData.phone = this.editData.edititem;
					}else if(this.currentedit === 'wechat'){
						this.formData.wechat = this.editData.edititem;
					}else if(this.currentedit === 'qq'){
						this.formData.qq = this.editData.edititem;
					}else if(this.currentedit === 'email'){
						this.formData.email = this.editData.edititem;
					}else if(this.currentedit === 'address'){
						this.formData.address = this.editData.edititem;
					}
					this.$axios.put("/proxyapiAuthen/" +'qymember/userinfo', this.formData).then(res => {
						this.loadMsg(res);
						this.editmodal = false;
					});
				}else{
					this.$axios.put("/proxyapiAuthen/" +'qymember/userinfo', this.formData).then(res => {
						this.imageUrl = '';
						this.imageUrlDefault = this.context + "/proxyapiAuthen/" + "api/basefile/view/" + this.formData.imgurl; 
						res.msg = '上传成功';
						this.loadMsg(res);
					});
				}
			},
			saveQy(){
				if(this.currentedit == 'playrole'){
					this.deptData.playrole = !!this.deptData.playrole?'1': '2';
				}
				this.$axios.post("/proxyapiAuthen/" +'qymember/saveorupdateuserdepart', this.deptData).then(res => {
					this.loadMsg(res);
					this.loadData();
					this.deptModal = false;
				});
			},
			loadMsg(data) {
				
                if (data.success) {
                    this.$message.success(data.msg)
                    
                } else {
                    this.$message.error(data.msg)
                }
			},
			closewp(){
				open(location, '_self').close();
				return false;
			},		
			loadData(){
				let timer = setTimeout(() => {
					
				})
				this.$axios.get("/proxyapiAuthen/" +'qymember/userinfo/' + this.userid + "?deptid=" + this.deptid).then(res => {
					this.formData = res.userinfo;
					this.duties = res.duties;
					console.log(this.duties, "duties");
					if(!!!this.formData.birthday && !!this.formData.idcard){
						this.formData.birthday = this.getBirthdayByIDcard(this.formData.idcard);
					}
					if(!!!this.formData.sex && !!this.formData.idcard){
						this.formData.sex = this.getSexByIDcard(this.formData.idcard);
					}
					if (!!res.userinfo.imgurl) {
						if (res.userinfo.imgurl.indexOf('http') != -1) {
							this.imageUrlDefault = res.userinfo.imgurl; 
						} else {
							this.imageUrlDefault = this.context + "/proxyapiAuthen/" + "api/basefile/view/" + res.userinfo.imgurl; 
						}
					}
					if (res.isEditAccount) {
						this.isEditAccount = res.isEditAccount;
					}
					if (res.isEditUserInfo) {
						this.isEditUserInfo = res.isEditUserInfo;
					}

				});
			},
			getSexByIDcard(idcardno){
				var len = idcardno.length;
				var sex = '';
				if(len == 15){
					sex = parseInt(idcardno.substring(14, 1),10) % 2 ? "1" : "0";
				}else if(len == 18){
					sex = parseInt(idcardno.substring(17, 1),10) % 2 ? "1" : "0";
				}else{
					sex = '';
				}
				return sex;
			},
			getBirthdayByIDcard(idcardno){
				var len = idcardno.length;
				var year = '';
				var month = '';
				var day = '';
				if(len == 15){
					year = '19' + idcardno.substring(6, 8);
					month = idcardno.substring(8, 10);
					day = idcardno.substring(10, 12);
				}else if(len == 18){
					year = idcardno.substring(6, 10);
					month = idcardno.substring(10, 12);
					day = idcardno.substring(12, 14);
				}else{
					return;
				}
				return year + '-' + month + '-' + day;
			},
        	uploadFileSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
				if (!!res) {
					this.formData.imgurl = res.id;
					//this.save();
				}
			},
			uploadBefore(file) {
				this.currentedit = '';
				const isJPG = file.type === "image/jpeg";
				const isPNG = file.type === "image/png";
				if (isJPG || isPNG) {
					return true;
				} else {
					this.loadMsg({ msg: "文件格式只能为JPG或PNG", success: false });
					return false;
				}
			},
			uploadError(err) {
				this.loadMsg({ msg: "文件上传失败", success: false });
			},
			delImg() {
				this.formData.logo = "";
				this.imageUrl = "";
			},
			uploadChange(file, fileList) {
				this.fileList = fileList;
				this.$nextTick(() => {
					let upload_list_li = document.getElementsByClassName("el-upload-list")[0].children;
					for (let i = 0; i < upload_list_li.length; i++) {
						let li_a = upload_list_li[i];
						let imgElement = document.createElement("img");
						imgElement.setAttribute("src", fileList[i].url);
						if (li_a.lastElementChild.nodeName !== "IMG") {
							li_a.appendChild(imgElement);
						}
					}
				});
			},
			
			editAccount() {
				let _this = this;
				this.accountData={
					id: _this.userid,
					username: ''
				}
				this.accountModal = true;
			},
			saveAccount() {
				this.$refs['accountData'].validate((valid) => {
					if (valid) {	
						this.$axios.post("/proxyapiAuthen/" + 'qymember/editAccount', this.accountData).then(res => {
							this.loadMsg(res);
							this.accountModal = false;
							this.loadData();
						})
					}
				});
			},
			editAuthen(edittype) {
				this.sendSms = true;
				this.isrightphone = true;
				this.opttext = '取消';
				if (edittype == '1') {
					this.authenTitle = '修改手机绑定';
					this.authenNewText = '手机';
				} else {
					this.authenTitle = '修改邮箱绑定';
					this.authenNewText = '邮箱';
				}
				this.authenData = {
					authentype: edittype,
					code: '',
					edittype: edittype,
					editdata: ''
				}
				this.active = 0;
				this.phoneModal = true; 
				this.selectValidateType();
			},
			selectValidateType() {
				if (this.authenData.authentype == '1') {
					this.validateCodeInfo =	 !!this.formData.phone? this.formData.phone.substring(0, 3) + "***" + this.formData.phone.substring(this.formData.phone.length - 4, this.formData.phone.length) : "";
				} else {
					this.validateCodeInfo =	 !!this.formData.email? this.formData.email.substring(0, 5) + "***" + this.formData.email.substring(this.formData.email.indexOf("@"), this.formData.email.length) : "";
				}
			},
			saveAuthen() {
				this.$refs['authenData'].validate((valid) => {
					if (valid) {	
						this.$axios.post("/proxyapiAuthen/" + 'qymember/editAuthenBind/' + this.userid, this.authenData).then(res => {
							if (res.success) {
								if(this.active++ >2) {
									this.active = 0;
									this.opttext = '确定';
								}
								this.loadData();
							} else {
								this.loadMsg(res);
							}
						})
					}
				});
			},
			cancelBing() {
				this.$confirm('确认取消', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios.delete("/proxyapiAuthen/" + 'qymember/cancelWxBind/' + this.userid).then(res => {
						this.loadMsg(res);
						this.loadData();
					})
				})
			}
		},
		mounted() {
			this.load_dwlist();
			if (ws != null) {
				ws.close();
			}
			
			this.loadData();
        },
        computed: {
            userid() {
                let userstr = sessionStorage.getItem('user');
                let userinfo = JSON.parse(userstr);
                return userinfo.userid;
            }
        }
    }

</script>
