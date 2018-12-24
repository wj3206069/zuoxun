<template>
  <div class="holiday-step">
    <div class="company-zi-zhi__head">
      <h4 class="company-zi-zhi__head--text">考勤</h4>
    </div>
    <div class="header_title">
      <a class="return_btn" @click="$router.back(-1)"><i class="zxicon zx-jt-left"></i>返回</a><span class="header_name">添加打卡规则</span>
    </div>
    <div class="body_box" v-if="heightPower">
      <el-form ref="formName" :model="formName" :rules="rules" label-width="150px" style="padding-top:15px">
        <ul class="item_ul">
          <li>
            <el-form-item label="所属单位" prop="groupid">
              <el-select v-model="formData.groupid">
                <el-option label="深圳市卓讯信息技术有限公司" value="深圳市卓讯信息技术有限公司"></el-option>
              </el-select>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="规则名称" prop="name">
              <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="规则类型" prop="type">
              <el-radio-group v-model="formData.type">
              	<el-radio :label="item.fieldcode" v-for="(item, i) in ruleTypeList" style="width: 100%;" :key="i"><span>{{item.fieldname}}</span><span>{{item.remark}}</span></el-radio>
                <!--<el-radio :label="3"><span>固定时间上下班</span><span>所有人按照相同时间打卡</span></el-radio><br>
                <el-radio :label="6"><span>按班次上下班</span><span>不同人员按照各自排班打卡</span></el-radio><br>
                <el-radio :label="9"><span>自由上下班上下班</span><span>所有人无时间限制,可随时打卡,只统计旷工</span></el-radio>-->
              </el-radio-group>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="打卡人员" prop="objectid" :class="defaultMemberList.length=='0'?'':'li_boder'">
              <input type="hidden" :value="formData.objectid">
              <ul class="approver-icon clearfix">
                <li class="cared_s" v-if="defaultMemberList" v-for="(item, index) in showMemberList" :key="index">
                  <span style="height:30px;display: inline-block">{{item.text}}</span>
                  <span class="btn-close" @click="removeCard(item.id, index)"><i class="zxicon zx-guanbi"></i></span>
                </li>
                <li class="approver-item">
                  <span class="delte_s" @click="addMemberModal">添加</span>
                </li>
              </ul>
            </el-form-item>
            <el-form-item label="白名单" prop="bmd">
              <input type="hidden" :value="formData.bmd">
              <ul class="approver-icon clearfix">
                <li class="approver-item">
                  <button type="button" class="addname_c" @click="openWhiteModal">添加</button><span class="addname_d">白名单内成员不参与打卡</span><br>
                  <ol :class="showWhiteList.length=='0'?'':'ol_bod'">
                    <li  v-for="(item, index) in showWhiteList" :key="item.id">
                      <span>{{item.text}}</span>
                      <span>深圳市卓讯信息技术有限公司/运营管理部</span>
                      <span class="delte_s" @click="removeWhide(item.id, index)">删除</span>
                    </li>
                  </ol>
                </li>
              </ul>
            </el-form-item>
            <el-form-item label="汇报对象" prop="hbdx">
              <input type="hidden" :value="submitInfo.cclist">
              <ul class="approver-icon clearfix">
                <li class="approver-item" v-if="showReportList.length > 0" v-for="(item, index) in showReportList" :key="item.id">
                  <img :src="item.imgUrl || defaultimg" width="40" height="40">
                  <span class="btn-close" @click="removeCclist(item.id, index)"><i class="zxicon zx-guanbi"></i></span>
                </li>
                <li class="approver-item">
                  <i class="zxicon zx-zengjia" @click="openReportModal"></i>
                </li>
              </ul>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="打卡方式" prop="dkfs" class="clock_way">
              <span>成员只能选择一种打卡方式</span>
              <br>
              <el-radio-group v-model="formData.dkfs">
                <el-radio :label="item.fieldcode" v-for="(item, i) in signInTypeList" :key="i" style="width: 100%;"><span>{{item.fieldname}}</span><span>{{item.remark}}</span></el-radio>
              </el-radio-group>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="打卡地点" prop="dkdd">
              <!-- <input type="hidden" :value="submitInfo.punch_card"> -->
              <ul class="approver-icon clearfix">
                <li class="approver-item">
                  <span v-if="!!formData.fulladdress">{{formData.fulladdress}} | {{formData.dkfw}} 米</span>
                  <button v-if="!!formData.dkdd" type="button" class="addname_c" @click="editAddressModal">修改</button>
                  <button v-if="!!!formData.dkdd" type="button" class="addname_c" @click="openAddressModal">添加</button>
                </li>
                <li class="map_list" v-if="!!formData.dkdd">
                  <baidu-map :center="mapCenter" :zoom="mapZoom" @ready="mapHandler" class="showmap">
                    <bm-circle :center="circlePath.center" :radius="circlePath.radius" :fillColor="circlePath.fillColor" :fillOpacity="circlePath.fillOpacity" :stroke-color="circlePath.strokeColor" :stroke-opacity="circlePath.strokeOpacity" :stroke-weight="circlePath.strokeWeight" @lineupdate="updateCirclePath" :editing="circlePath.edit"></bm-circle>
                    <bm-marker :position="markerPoint"></bm-marker>
                  </baidu-map>
                </li>
              </ul>
            </el-form-item>
            <el-form-item label="WiFi" prop="wifi">
              <!-- <input type="hidden" :value="submitInfo.punch_card"> -->
              <ul class="approver-icon clearfix">
                <li class="approver-item">
                  <button type="button" class="addname_c" @click="openAddWiFiModal">添加</button><span class="addname_d">可添加多个WiFi，连上指定的WiFi即可打卡</span>
                  <ol class="ol_bod" v-show="defaultWiFiList.length > 0">
                    <li v-for="(item,index) in defaultWiFiList" :key="index">
                      <span>{{item.name}}</span>
                      <span>{{item.f1}} : {{item.f2}} : {{item.f3}} : {{item.f4}} : {{item.f5}} : {{item.f6}}</span>
                      <span class="delte_s">
                        <i @click="removeWifi(item.key)">删除</i>
                      </span>
                    </li>
                  </ol>
                </li>
              </ul>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="打卡时间" prop="sjdksj">
              <!-- <input type="hidden" :value="submitInfo.punch_card"> -->
              <ul class="approver-icon clearfix">
                <li class="approver-item">
                  <button type="button" class="addname_c" @click="dialogFormVisible = true">添加</button><span class="addname_d">可添加多个打卡地点,并设置有效打卡范围</span><br>
                  <ol class="ol_bod">
                    <li v-for="(item,index) in form_time_arr" :key="index">
                      <span>周一至周五</span>
                      <span v-for="(time,index) in item.dynamicValidateForm.domains" :key="index">上班<i>{{time.startTime}}</i>-下班<i>{{time.endTime}}</i></span>
                      <span class="delte_s">
                        <i>编辑</i>
                        <i>|</i>
                        <i @click="delteS(item.id)">删除</i>
                      </span>
                    </li>
                  </ol>
                </li>
              </ul>
            </el-form-item>
            <el-form-item label="特殊日期">
              <input type="hidden" :value="submitInfo.punch_card">
              <ul class="approver-icon clearfix">
                <li class="approver-item">
                  <button type="button" class="addname_c">添加</button><span class="addname_d">必须打卡的日期</span><br>
                  <button type="button" class="addname_c">添加</button><span class="addname_d">不用打卡的日期</span><br>
                  <el-checkbox v-model="formData.fgzrdk" true-label="1" false-label="0">非工作日允许打卡</el-checkbox>
                </li>
              </ul>
            </el-form-item>
            <el-form-item label="拍照片打卡">
              <el-checkbox v-model="formData.the_holiday" true-label="1" false-label="0">同步中国节假日</el-checkbox><span class="the_holiday_no">节假期间不用打卡</span>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="手机提醒时间1" prop="warningtype">
              <span>上班</span>
              <span class="screen_status_s">
                <el-select v-model="formData.warningtype" class="screen_status" clearable>
                  <el-option v-for="item in warningTypeList" :key="item.fieldcode" :label="item.fieldname" :value="item.fieldcode">
                  </el-option>
                </el-select>
                <span>下班</span>
                <span>准点</span>
              </span>

            </el-form-item>
            <el-form-item label="拍照片打卡" prop="pzdk">
              <el-checkbox v-model="formData.pzdk"  true-label="1" false-label="0" >员工打卡时必须拍照</el-checkbox>
            </el-form-item>
            <el-form-item label="备注图片" prop="sfbdtp">
              <el-checkbox v-model="formData.sfbdtp"  true-label="1" false-label="0">备注不允许上传本地图片,只能拍照</el-checkbox>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="规则生效时间" prop="zxdate">
              <el-radio-group v-model="formData.zxdate">
                <el-radio :label="item.fieldcode" v-for="(item, i) in effectiveTypeList" :key="i" style="width: 100%;"><span>{{item.fieldname}}</span></el-radio>
              </el-radio-group>
            </el-form-item>
          </li>
          <li>
            <el-form-item>
              <el-button type="primary" @click="saveOrUpdate()">保存</el-button><span class="tomorrow_to_perform"><i>修改点将于明日执行</i></span>
            </el-form-item>
          </li>
        </ul>
      </el-form>

    </div>

    <!-- 汇报对象 -->
    <el-dialog title="汇报对象" :visible.sync="addCclist">
      <div class="add-approver" v-if="addCclist">
        <cus-add-member 
            :datas="userTree" 
            nameSpace='cclist' 
            :defaultimg='defaultimg' 
            :render-after-expand="false" 
            :defaultProps="defaultProps" 
            :default-member="showReportList"
            @handle="addCclistHandle">
        </cus-add-member>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCclist = false">取 消</el-button>
        <el-button type="primary" @click="saveOrDeleteReport">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 打卡人员 -->
    <el-dialog title="打卡人员" :visible.sync="addname">
      <div class="add-approver" v-if="addname">
        <cus-add-name 
            :data_name="userTree" 
            nameSpace='punch_card' 
            :defaultimg='defaultimg' 
            :render-after-expand="false" 
            :defaultProps="defaultProps" 
            :default-member="showMemberList"
            @handle="addName"></cus-add-name>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addname = false">取 消</el-button>
        <el-button type="primary" @click="addOrDeleteMemberToDefault">确 定</el-button>
        <!-- <el-button type="primary" @click="addname = false">确 定</el-button> -->
      </div>
    </el-dialog>

    <!-- 白名单 -->
    <el-dialog title="白名单设置" :visible.sync="addwhite">
      <div class="add-approver" v-if="addwhite">
        <cus-add-white 
            :get_white="userTree" 
            nameSpace='punch_white' 
            :defaultimg='defaultimg' 
            :render-after-expand="false" 
            :defaultProps="defaultProps" 
            :default-member="showWhiteList"
            @handle="addWhite">
          </cus-add-white>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addwhite = false">取 消</el-button>
        <el-button type="primary" @click="saveOrDeleteWhite">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 打卡地点 -->

    <el-dialog title="添加打卡地点" :visible.sync="Clockplace" width="40%">
      关键字
      <el-input v-model="searchKeyword"></el-input>
      范围
      <el-input v-model="addressScope"></el-input>
      <baidu-map>
        <bm-view class="subMpa"></bm-view>
        <bm-local-search :keyword="searchKeyword" :auto-viewport="true" :panel="false" @infohtmlset="selectAddress"></bm-local-search>
      </baidu-map>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Clockplace= false">取 消</el-button>
        <el-button type="primary" @click="addAddress">确 定</el-button>
      </div>
    </el-dialog>
    <!-- WiFi -->

    <el-dialog title="添加打卡WiFi" :visible.sync="wifiModal" width="623px">
      WiFi名称
      <el-input v-model="wifiData.name"></el-input>
      BSSID
      <div>
        <el-input v-model="wifiData.f1" style="width: 15%;"></el-input><span> : </span>
        <el-input v-model="wifiData.f2" style="width: 15%;"></el-input><span> : </span>
        <el-input v-model="wifiData.f3" style="width: 15%;"></el-input><span> : </span>
        <el-input v-model="wifiData.f4" style="width: 15%;"></el-input><span> : </span>
        <el-input v-model="wifiData.f5" style="width: 15%;"></el-input><span> : </span>
        <el-input v-model="wifiData.f6" style="width: 15%;"></el-input>
      </div>
      <div>
        <div>
          <span style="color: #4475A7;">获取方式：</span>
        </div>
        <div>
          <div>
            <ul>
              <li>1.可以向公司IT部门询问公司WiFi的BSSID</li>
              <li>2.也可以通过使用最新版企业微信扫描右侧二维码获取</li>
            </ul>
          </div>
          <div>
            二维码图片
          </div>
        </div>

      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="wifiModal= false">取 消</el-button>
        <el-button type="primary" @click="addWiFi">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 打卡时间 -->
    <el-dialog title="打卡时间" :visible.sync="wifiModal" width="40%">
      <el-form :model="form_time">
        <el-form-item label="工作日：">
          <el-checkbox-group v-model="form_time.checkList" :min="1">
            <el-checkbox v-for="(item, index) in week" :key="index" :label="item.value">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="打卡时间：">
          <span @click="addDomain" class="delte_s">新增时段</span>
          <ul class="time_card">
            <li v-for="(domain, index) in form_time.dynamicValidateForm.domains" :key="index" :prop="'domains.' + index + '.value'">
              <span>上班</span>
              <span class="time_d">
                <el-time-select v-model="domain.startTime" :picker-options="{start: '08:30',step: '00:15',end: '18:30'}" width="100px">
                </el-time-select>
              </span>
              <span>-下班</span>
              <span class="time_d">
                <el-time-select v-model="domain.endTime" :picker-options="{step: '00:15',minTime: startTime}" width="100px">
                </el-time-select>
              </span>
            </li>
          </ul>
        </el-form-item>
        <!-- <el-form-item label="高级设置" :label-width="formLabelWidth"> -->
        <!-- <el-collapse accordion width="40%">
          <el-collapse-item title="高级设置" name="1">
            <div>这是高级设置的内容</div>
          </el-collapse-item>
        </el-collapse> -->
        <!-- </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveDit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="打卡时间" :visible.sync="dialogFormVisible" width="50%">
      <el-row>
        <el-col :span="10" >
          <DatePicker class="lg" :defaultDate="val" :data="cell" @nextClick="nextClick" @prevClick="prevClick" @pick="handleClick" />
        </el-col>
        <el-col :span="12" :offset="2">
          <el-form :model="form_time">
            <el-form-item label="打卡时间：">
              <span @click="addDomain" class="delte_s">新增时段</span>
              <ul class="time_card">
                <li v-for="(domain, index) in form_time.dynamicValidateForm.domains" :key="index" :prop="'domains.' + index + '.value'">
                  <span class="time_d">
                    <el-time-select v-model="domain.startTime" :picker-options="{start: '08:30',step: '00:15',end: '18:30'}" style="width: 200px;">
                    </el-time-select>
                  </span>
                </li>
              </ul>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveDit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import mixin from "~/assets/mixins";
import authen from "~/assets/utils/authen.js";
import { timeDifc } from "~/assets/common/common";
import CusAddMember from "../common/cusAddMember";
import cusAddName from "../common/cusAddName";
import cusAddWhite from "../common/cusAddWhite";
import avator from "../../../static/head.jpg"

var datas = [
  {
    id: 1,
    label: "一级 1",
    children: [
      {
        id: 4,
        label: "二级 1-1",
        children: [
          {
            id: 9,
            label: "三级 1-1-1",
            type: "user",
            imgUrl: ""
          },
          {
            id: 10,
            label: "三级 1-1-2",
            type: "user",
            imgUrl:
              "https://y.gtimg.cn/music/photo/radio/track_radio_199_13_1.jpg?max_age=2592000"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: "一级 2",
    children: [
      {
        id: 5,
        label: "二级 2-1",
        type: "user",
        imgUrl:
          "https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg?max_age=2592000"
      },
      {
        id: 6,
        label: "二级 2-2",
        type: "user",
        imgUrl:
          "https://y.gtimg.cn/music/photo_new/T006R300x300M00000333So02drvak.jpg?max_age=2592000"
      }
    ]
  },
  {
    id: 3,
    label: "一级 3",
    children: [
      {
        id: 7,
        label: "二级 3-1",
        type: "user",
        imgUrl:
          "https://y.gtimg.cn/music/photo_new/T006R300x300M000004bFmjW2PXSqF.jpg?max_age=2592000"
      },
      {
        id: 8,
        label: "二级 3-2",
        type: "user",
        imgUrl:
          "https://y.gtimg.cn/music/photo_new/T005R600x600M000002CJKAY1LKpcz.jpg?n=1"
      }
    ]
  }
];

var data_name = [
  {
    id: 1,
    label: "一级 1",
    children: [
      {
        id: 4,
        label: "二级 1-1",
        children: [
          {
            id: 10,
            label: "市场运营部",
            type: "user",
            name: "市场运营部"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: "一级 2",
    children: [
      {
        id: 5,
        label: "IT部",
        type: "user",
        name: "IT部"
      },
      {
        id: 6,
        label: "行政部",
        type: "user",
        name: "行政部"
      }
    ]
  }
];
var white = [
  {
    id: 1,
    label: "一级 1",
    children: [
      {
        id: 4,
        label: "二级 1-1",
        children: [
          {
            id: 10,
            label: "市场运营部",
            type: "user",
            name: "辉子"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: "运营管理部",
    children: [
      {
        id: 5,
        label: "华子",
        type: "user",
        name: "华子"
      },
      {
        id: 6,
        label: "俊子",
        type: "user",
        name: "俊子"
      }
    ]
  }
];

var time = [
  {
    id:"1",
    checkList: [],
    dynamicValidateForm: {
      domains: [
        {
          startTime: "09:00",
          endTime: "18:00",
        }
      ]
    }
  }
];

export default {
  name: "editor",
  mixins: [mixin, authen],
  components: {
    "cus-add-member": CusAddMember,
    "cus-add-name": cusAddName,
    "cus-add-white": cusAddWhite
  },
  data() {
    return {
      id: this.$route.params.id,
      ruleTypeList: [],
      signInTypeList: [],
      warningTypeList: [],
      effectiveTypeList: [],
      //打卡人员
      defaultMemberIdList: [],
      defaultMemberList: [],
      delMemberIdList: [],
      tempDelMemberIdList: [],
      delMemberList: [],
      addMemberIdList: [],
      tempAddMemberList: [],
      addMemberList: [],
      showMemberList: [],
      //白名单
      defaultWhiteIdList: [],
      defaultWhiteList: [],
      delWhiteIdList: [],
      delWhiteList: [],
      showWhiteList:[],
      showWhiteIdList:[],
      tempAddWhiteIdList: [],
      tempDelWhiteIdList:[],
      addWhiteIdList: [],
      //汇报对象
      defaultReportIdList: [],
      defaultReportList: [],
      delReportIdList: [],
      delReportList: [],
      showReportList: [],
      showReportIdList: [],
      tempAddReportIdList: [],
      tempDelReportIdList:[],
      addReportIdList: [],
      //打卡地点
      punchingAddressList: [],
      //WiFi
      wifiModal: false,
      defaultWiFiList: [],
      tempWiFiList: [],
      wifiData: {
        key: '',
        name: '',
        f1: '',
        f2: '',
        f3: '',
        f4: '',
        f5: '',
        f6: ''
      },
      userTree: [],
    	formData: {
    		id: '',
    		name: '',//规则名称
    		type: '',//规则类型
    		objectid: '',//需要打卡对象，对应t_punching_object
    		hbdx: '',//打卡汇报对象
    		dkdd: '',//打卡地点
    		bmd: '',//无需打卡的人员，白名单，多个人用逗号隔开
    		dkfs: '',//0手机打卡1U盘导入
    		dksjgz: '',//打卡时间规则，T_PUNCHING_TIMERULES
    		fgzrdk: '',//非正常上班时间是否允许打卡,0不允许1允许
    		zxdate: '',//开始执行时间
    		pzdk: '',//员工打卡时必须拍照0不需要1需要
    		sfbdtp: '',//备注不允许上传本地图片，只能拍照,0可以本地图片1不可
        sjdksj: '',//打卡提醒时间，多少分钟
        warningtype: '',//打卡提醒类型
        fulladdress: ''
    	},
      defaultProps: {
        label: "text",
        children: "children"
      },
      // dynamicValidateForm: {
      //   domains: [
      //     {
      //       startTime: "",
      //       endTime: ""
      //     }
      //   ]
      // },
      
      form_time: {
        checkList: ['1', '2', '3', '4', '5'],
        dynamicValidateForm: {
          domains: [
            {
              startTime: "09:00",
              endTime: "18:00"
            }
          ]
        }
      },
      form_time_arr: [],
      Clockplace: false,
      datas: [], //
      dialogFormVisible: false,
      get_status: [],
      get_white: [],
      data_name: [],
      startTime: "",
      endTime: "",
      addCclist: false,
      addname: false,
      addwhite: false,
      defaultimg: avator,
      holidayList: [],
      heightPower: 1,
      formName: {
        picture_list: [], // 说明附件
        rule_name: "运营管理部",
        rule_type: "",
        rule_way: "",
        rule_come: "",
        rule_img: false,
        rule_paizhao: false,
        rule_take: false,
        status_value: "",
        no_day: "",
        the_holiday: false
      },
      rules: {
        rule_name: [{ required: true, message: "不能为空", trigger: "blur" }],
        rule_type: [
          { required: true, message: "请至少选择一个", trigger: "change" }
        ],
        // office_hours: [
        //   { required: true, message: "请至少选择一个", trigger: "change" }
        // ],
        punch_card: [
          { required: true, message: "请至少选择一个", trigger: "change" }
        ],
        punch_site: [
          { required: true, message: "请至少选择一个", trigger: "change" }
        ],
        punch_time: [
          { required: true, message: "请至少选择一个", trigger: "change" }
        ]
      },
      submitInfo: {
        cclist: [],
        punch_card: [],
        punch_white: []
      },
      src: "",
      approveHolidayVisible: false,
      week: [
        {name: '星期一', value: '1'},
        {name: '星期二', value: '2'},
        {name: '星期三', value: '3'},
        {name: '星期四', value: '4'},
        {name: '星期五', value: '5'},
        {name: '星期六', value: '6'},
        {name: '星期日', value: '0'}
      ],
      
      //百度地图
      showAddress: '',
      mapCenter: {lng: 0, lat: 0},
      mapZoom: 3,
      //圆
      circlePath: {
        center: {
          lng: 113.999446,
          lat: 22.595516
        },
        radius: 300,
        fillColor: 'lightblue',
        fillOpacity: 0.5,
        strokeColor: 'blue',
        strokeoPacity: 0.5,
        strokeWeight: 1,
        edit: false
      },
      //点
      markerPoint: {lng: 113.999446, lat: 22.595516},
      //
      searchKeyword: '',
      addressScope: 500,

      // 日历选择
      cell: null,
      val: new Date(2017, 1, 0)
    };
  },
  created() {
    this.datas = datas;
    this.form_time_arr=time//
    this.getRuleTypeList(); //加载打卡规则类型
    this.getSignInTypeList(); //加载打卡方式类型
    this.getWarningTypeList(); //加载打卡提醒类型
    this.getEffectiveTypeList();//加载打卡规则生效时间类型
    this.loadUserTree();//加载人员树    
  },
  mounted(){
    if(!!this.id){
      this.loadData();//加载页面信息
    }
  },
  methods: {
    nextClick(val) {
      this.getDateCell()
    },
    prevClick(val) {
      this.getDateCell()
    },
    getDateCell() {
      const random = Math.ceil(Math.random() * 10)
      const cell = []
      for (let i = 0; i < random; i += 1) {
        let obj = {
          text: i + 1,
          status: Math.ceil(Math.random() * 3)
        }
        cell.push(obj)
      }
      setTimeout(() => {
        this.cell = cell
      }, 1000)
    },
    handleClick(val) {
      this.val = val
    },
    removeWifi(key){
      if(!!this.defaultWiFiList && this.defaultWiFiList.length > 0){
        this.defaultWiFiList.forEach((ele, index) =>{
          if(ele.key === key){
            this.defaultWiFiList.splice(index, 1);
          }
        })
      }
    },
    openAddWiFiModal(){
      this.wifiModal = true;
    },
    addWiFi(){
      if(!!this.formData.wifi){
        this.defaultWiFiList = JSON.parse(this.formData.wifi);
      }
      this.wifiData.key = this.getRoundString(6);
      this.defaultWiFiList.push(this.wifiData);
      this.wifiModal = false;
    },
    initMap(){
      if(!!this.formData.dkzb){
        this.mapCenter = JSON.parse(this.formData.dkzb);
        this.markerPoint = this.mapCenter;
        this.circlePath.radius = this.formData.dkfw;        
      }
    },
    openAddressModal(){
      this.searchKeyword = '';
      this.Clockplace = true;
    },
    editAddressModal(){
      this.searchKeyword = this.formData.dkdd;
      this.addressScope = this.formData.dkfw;
      this.Clockplace = true;
    },
    addAddress(){
      this.formData.dkfw = this.addressScope;
      this.formData.dkzb = JSON.stringify(this.mapCenter);
      this.circlePath.center = this.mapCenter;
      this.markerPoint = this.mapCenter;
      this.circlePath.radius = this.addressScope;
      this.Clockplace = false;
    },
    selectAddress(poi){
      this.formData.dkdd = poi.title;
      this.formData.fulladdress = poi.province + poi.city + poi.address + poi.title;
      this.mapCenter = poi.point;
    },
    mapHandler ({BMap, map}) {
      console.log(BMap, map)
      this.mapCenter.lng = 113.999446
      this.mapCenter.lat = 22.595516
      this.mapZoom = 15
    },
    updateCirclePath (e) {
      this.circlePath.center = e.target.getCenter()
      this.circlePath.radius = e.target.getRadius()
    },
    addMemberModal(){
      this.addname = true;
    },
    loadDefaultMemberList(){
      this.$axios.get('/proxyapi/punching/getMemberListByRuleId?ruleid=' + this.id).then(res => {
        if(!!res && res.length > 0){
          let ids = [];
          res.forEach(ele => {
            ids.push(ele.objectid);
          })
          let temp = [];
          this.showMemberList = [];
          this.getDefaultMemberList(this.userTree, temp, ids.join(','));
          this.defaultMemberList = temp;
          this.showMemberList = JSON.parse(JSON.stringify(this.defaultMemberList));
        }      
  		});
    },
    loadAddressList(){
      this.$axios.get('/proxyapi/punching/getPunchingAddressListByRuleId?ruleid=' + this.id).then(res => {
        this.defaultMemberList = res;    
           
  		});
    },
    openReportModal(){
      this.addCclist = true;
    },
    loadDefaultReportList(){      
      let temp = [];
      if(!!this.formData.hbdx){
        this.defaultReportIdList = this.formData.hbdx.split(',');
        this.showReportIdList = this.defaultReportIdList;
      }
      this.getDefaultMemberList(this.userTree, temp, this.formData.hbdx);
      this.defaultReportList = temp;
      this.showReportList = JSON.parse(JSON.stringify(this.defaultReportList));
    },
    loadDefaultWhiteList(){      
      let temp = [];
      if(!!this.formData.bmd){
        this.defaultWhiteIdList = this.formData.bmd.split(',');
        this.showWhiteIdList = this.defaultWhiteIdList;
      }
      this.getDefaultMemberList(this.userTree, temp, this.formData.bmd);
      this.defaultWhiteList = temp;
      this.showWhiteList = JSON.parse(JSON.stringify(this.defaultWhiteList));
    },
    openWhiteModal(){
      this.addwhite = true;
    },
    getDefaultMemberList(userTree, resList, ids){
      if(!!!ids){
        return;
      }
      userTree.forEach(element => {
        if(ids.indexOf(element.id) > -1 && element.type === 'user'){
          let flag = true;
          resList.forEach(ele => {
            if(element.id === ele.id){
              flag = false;
            }
          });
          if(flag){
            resList.push(element);
          }
          
        }
        if(!!element.children && element.children.length > 0){
          this.getDefaultMemberList(element.children, resList, ids);
        }else{
          return false;
        }
      });
    },
    loadUserTree(){
      this.$axios.get('/proxyapiAuthen/usermgr/001/userinfo/tree').then(res => {
        this.userTree = res;        
  		});
    },
    loadData(){
      this.$axios.get('/proxyapi/punching/getPunchingRuleById?id=' + this.id).then(res => {
        if(!!res && res.length > 0){
          this.formData = res[0];
          this.initMap();                  
          this.$nextTick(function(){
            this.loadDefaultMemberList();
            if(!!this.formData.bmd){
              this.loadDefaultWhiteList();
            }
            if(!!this.formData.hbdx){
              this.loadDefaultReportList();
            }   
            if(!!this.formData.wifi){
              this.defaultWiFiList = JSON.parse(this.formData.wifi);
            } 
          });
        }        
  		});
    },
  	getRuleTypeList(){
  		this.$axios.get('/proxyapi/codevaluebycode/RULETYPE').then(res => {
        this.ruleTypeList = res;
        if(!!!this.id && this.ruleTypeList && this.ruleTypeList.length > 0){
          this.formData.type = this.ruleTypeList[0].fieldcode;
        }
  		});
    },
    getSignInTypeList(){
      this.$axios.get('/proxyapi/codevaluebycode/SIGNINTYPE').then(res => {
        this.signInTypeList = res;
        if(!!!this.id && this.signInTypeList && this.signInTypeList.length > 0){
          this.formData.sjdksj = this.signInTypeList[0].fieldcode;
        }
      });
    },
    getWarningTypeList(){
  		this.$axios.get('/proxyapi/codevaluebycode/WARNINGTYPE').then(res => {
        this.warningTypeList = res;
        if(!!!this.id && this.warningTypeList && this.warningTypeList.length > 0){
          this.formData.warningtype = this.warningTypeList[2].fieldcode;
        }
  		});
    },
    getEffectiveTypeList(){
  		this.$axios.get('/proxyapi/codevaluebycode/EFFECTIVETYPE').then(res => {
        this.effectiveTypeList = res;
        if(!!!this.id && this.effectiveTypeList && this.effectiveTypeList.length > 0){
          this.formData.zxdate = this.effectiveTypeList[0].fieldcode;
        }
  		});
    },
    saveOrUpdate(){
      if(!!this.showMemberList && this.showMemberList.length > 0){
        this.addMemberList = [];
        let flag = true;
        this.showMemberList.forEach((ele1) => {
          flag = true;
          if(!!this.defaultMemberList && this.defaultMemberList.length > 0){
              this.defaultMemberList.forEach((ele2) => {
                if(ele1.id === ele2.id){
                  flag = false;
                }
              })
          }
          if(flag){
            this.addMemberList.push(ele1);
          }
        })
      }
      if((!!!this.defaultMemberList || this.defaultMemberList.length < 1) && (!!!this.addMemberList || this.addMemberList.length < 1)){
        this.loadMsg('请添加打卡人员', 'warning')
        return ;
      }
      if(!!this.showWhiteIdList && this.showWhiteIdList.length > 0){
        this.formData.bmd = this.showWhiteIdList.join(',');
      }else{
        this.formData.bmd = '';
      }
      if(!!this.showReportIdList && this.showReportIdList.length > 0){
        this.formData.hbdx = this.showReportIdList.join(',');
      }else{
        this.formData.hbdx = '';
      }
      if(!!this.defaultWiFiList && this.defaultWiFiList.length > 0){
        this.formData.wifi = JSON.stringify(this.defaultWiFiList);
      }else{
        this.formData.wifi = '';
      }
      if(!!!this.id){
        this.formData.id = this.getRoundString(32);
        this.gzid = this.formData.id
        this.$axios.post('/proxyapi/punching/insertPunchingRules', this.formData).then(res => {
          if(res === 1){
            this.saveMember();  
            this.loadData();          
            this.loadMsg('保存成功', 'success')
          }else{
            this.loadMsg('保存失败', 'warning')
          }
        });
      }else{
        this.$axios.put('/proxyapi/punching/updatePunchingRules', this.formData).then(res => {
          if(res === 1){   
            console.log('saveOrUpdate', this.delMemberIdList);         
            if(!!this.delMemberIdList && this.delMemberIdList.length > 0){
              this.deleteMember();
            }
            if(!!this.addMemberList && this.addMemberList.length > 0){
              this.saveMember();
            }
            this.loadData();
            this.loadMsg('修改成功', 'success')
          }else{
            this.loadMsg('修改失败', 'warning')
          }
        });
      }
    },
    loadMsg(msg, type){
      this.$alert(msg, '提示', {
        confirmButtonText: '确定',
        type: type
      });
    },
    submitForm(formName) {
      console.log(111);
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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

    // 获取添加汇报对象调用子组件返回值
    addCclistHandle(addArr, delArr, AddId, delId) {
      this.tempAddReportIdList = AddId;
      this.tempDelReportIdList = delId;
      
    },
    //
    saveOrDeleteReport(){
      let tempList = [];
      if(!!this.showReportIdList && this.showReportIdList.length > 0){
        tempList = JSON.parse(JSON.stringify(this.showReportIdList));   
      }
      if(!!this.tempAddReportIdList && this.tempAddReportIdList.length > 0){
        this.tempAddReportIdList.forEach(ele1 => {
          let flag1 = true;
          tempList.forEach(ele2 => {
            if(ele1 === ele2){
              flag1 = false;
            }
          });
          if(flag1){
            tempList.push(ele1);
          }
        });
      }
      if(!!this.tempDelReportIdList && this.tempDelReportIdList.length > 0){
        this.tempDelReportIdList.forEach(ele3 => {
          tempList.forEach((ele4, index) => {
            if(ele3 === ele4){
              tempList.splice(index, 1);
            }
          });
        });
      }
      this.showReportIdList = tempList;
      let temp = [];
      this.getDefaultMemberList(this.userTree, temp, this.showReportIdList.join(','));
      this.showReportList = temp;
      this.addCclist = false;
    },
    // 删除汇报对象
    removeCclist(id, index) {
      this.showReportIdList.splice(index, 1);
      let temp = [];
      this.getDefaultMemberList(this.userTree, temp, this.showReportIdList.join(','));
      this.showReportList = temp;
      this.addCclist = false;
    },

    // 获取打卡人员调用子组件返回值
    addName(addArr, delArr, AddId, delId) { 
      this.tempDelMemberIdList = delId; 
      this.tempAddMemberList = addArr; 
    },
    addOrDeleteMemberToDefault(){  
      let tempList = [];
      if(!!this.showMemberList && this.showMemberList.length > 0){
        tempList = JSON.parse(JSON.stringify(this.showMemberList));   
      }
      if(!!this.tempAddMemberList && this.tempAddMemberList.length > 0){
        this.tempAddMemberList.forEach(ele1 => {
          let flag1 = true;
          tempList.forEach(ele2 => {
            if(ele1.id === ele2.id){
              flag1 = false;
            }
          });
          if(flag1){
            tempList.push(ele1);
          }
        });
      }
      if(!!this.tempDelMemberIdList && this.tempDelMemberIdList.length > 0){
        this.tempDelMemberIdList.forEach(ele3 => {
          tempList.forEach((ele4, index) => {
            if(ele3 === ele4.id){
              tempList.splice(index, 1);
              if(!!this.defaultMemberList && this.defaultMemberList.length > 0){
                let flag2 = false;
                this.tempDelMemberIdList.forEach(ele5 => {
                  if(ele5 === ele3){
                    flag2 = true;
                  }
                });
                if(flag2){
                  this.delMemberIdList.push(ele3);
                }
              }
            }
          });
        });
      }
      this.showMemberList = tempList;
      this.addname = false;
    },
    saveMember(){
      if(!!this.addMemberList && this.addMemberList.length > 0){
        let memberList = [];
        let member = {};
        this.addMemberList.forEach((ele, index) => {
          member = {};
          member.id = this.getRoundString(32);
          member.gzid = this.id;
          member.objectid = ele.id;
          member.objectname = ele.text;
          if(ele.type === 'user'){
            member.type = '1';
          }else{
            member.type = '2';
          }
          member.groupid = '001';
          member.groupname = '深圳卓讯信息技术有限公司';
          memberList.push(member);
        });
        this.$axios.post('/proxyapi/punching/insertPunchingMember', {memberList: memberList}).then(res => {
          this.addMemberList = [];
        });
      }
    },
    deleteMember(){
      if(!!this.delMemberIdList && this.delMemberIdList.length > 0){    
        this.$axios.post('/proxyapi/punching/deleteMembersByRuleIdAndObjectIds?ruleid=' + this.id, {objectids: this.delMemberIdList}).then(res => {  
          this.delMemberIdList = [];         
        });
      }
    },
    // 删除打卡人员
    removeCard(objid, index) {
      this.showMemberList.splice(index, 1);
      if(!!this.defaultMemberList && this.defaultMemberList.length > 0){
        let flag = false;
        this.defaultMemberList.forEach(ele => {
          if(ele.id === objid){
            flag = true;
          }
        });
        if(flag){
          this.delMemberIdList.push(objid);
        }
      }
    },

    // 获取白名单人员调用子组件返回值
    addWhite(addArr, delArr, AddId, delId) {
      this.tempAddWhiteIdList = AddId;
      this.tempDelWhiteIdList = delId;
    },
    saveOrDeleteWhite(){
      let tempList = [];
      if(!!this.showWhiteIdList && this.showWhiteIdList.length > 0){
        tempList = JSON.parse(JSON.stringify(this.showWhiteIdList));   
      }
      if(!!this.tempAddWhiteIdList && this.tempAddWhiteIdList.length > 0){
        this.tempAddWhiteIdList.forEach(ele1 => {
          let flag1 = true;
          tempList.forEach(ele2 => {
            if(ele1 === ele2){
              flag1 = false;
            }
          });
          if(flag1){
            tempList.push(ele1);
          }
        });
      }
      if(!!this.tempDelWhiteIdList && this.tempDelWhiteIdList.length > 0){
        this.tempDelWhiteIdList.forEach(ele3 => {
          tempList.forEach((ele4, index) => {
            if(ele3 === ele4){
              tempList.splice(index, 1);
            }
          });
        });
      }
      this.showWhiteIdList = tempList;
      let temp = [];
      this.getDefaultMemberList(this.userTree, temp, this.showWhiteIdList.join(','));
      this.showWhiteList = temp;
      this.addwhite = false;
    },
    // 删除白名单
    removeWhide(id, index) {
      this.showWhiteIdList.splice(index, 1);
      this.getDefaultMemberList(this.userTree, this.showWhiteList, this.showWhiteIdList.join(','));     
    },    

    // 新增时段
    addDomain() {
      if(!!this.form_time.dynamicValidateForm.domains && this.form_time.dynamicValidateForm.domains.length > 0){
        let tempTimes = this.form_time.dynamicValidateForm.domains;
        let len = tempTimes.length;
        let tempStartTime = Number(tempTimes[len-1].endTime.substr(0,2)) + 1;
        let newStartTime = '';
        if(tempStartTime < 10){
          newStartTime = '0' + tempStartTime + ':00';
        }else if(tempStartTime === 25){
          newStartTime = '01:00';
        }else{
          newStartTime = tempStartTime + ':00';
        }
        alert('endTime' + tempTimes[len-1].endTime + 'newStartTime' + newStartTime);
        this.form_time.dynamicValidateForm.domains.push({
          startTime: newStartTime,
          endTime: "22:00",
          key: Date.now()
        });
      }
    },
    // 打卡时间
    saveDit() {
      console.log(this.form_time);
      this.dialogFormVisible = false;
      this.form_time_arr.push(this.form_time);
      console.log(this.form_time_arr);
    },


    //删除打卡时间
    delteS(id){
        let name_Data = [];
      for (let i = 0; i < this.form_time_arr.length; i++) {
        if (this.form_time_arr[i].id !== id) {
          name_Data.push(this.form_time_arr[i]);
          console.log(name_Data);
        }
      }
      this.form_time_arr = name_Data;
    },

    // 初始渲染
    getOutArr() {
      this.get_status = status;
      this.data_name = data_name;
      this.get_white = white;
    },
    //生成随机字符串 len 期望的字符串长度   
    getRoundString(len) {
      let chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
      var res = "";
      for(var i = 0; i < len ; i ++) {
          var id = Math.ceil(Math.random()*35);
          res += chars[id];
      }
      return res;
    }
  }
};
</script>

<style lang="less" scoped>
.holiday-step {
  overflow: hidden;
  .step {
    height: 48px;
    line-height: 48px;
    .zxicon {
      font-size: 1.6em;
      vertical-align: middle;
      color: #13b745;
      font-weight: normal;
    }
  }
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
  .el-select,
  .el-date-editor {
    width: 100%;
  }
  .body_box {
    // overflow-y: scroll;
    margin-right: -17px;
    margin-bottom: -17px;
    padding: 0 40px;
    height: calc(100vh - 200px);
    overflow-y: auto;
    overflow-x: hidden;
    .item_ul {
      > li {
        border-bottom: 1px solid #e1e1e1;
        margin-top: 15px;
        line-height: 0;
        .el-form-item {
          width: 800px;
          .el-radio-group {
            margin-top: 13px;
            .el-radio,
            .el-radio {
              margin: 0;
              margin-bottom: 6px;
              .el-radio__label {
                span:nth-child(1) {
                  color: #333;
                  padding-right: 15px;
                }
                span:nth-child(2) {
                  color: #999;
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
    }
  }
  .approver-icon {
    height: 50px;
    .approver-item {
      position: relative;
      margin-right: 15px;
      float: left;
      height: inherit;
      > img {
        border-radius: 4px;
      }
      > .btn-close {
        position: absolute;
        top: -25px;
        right: -15px;
        cursor: pointer;
        color: #bdbdbd;
        height: 32px;
        width: 20px;
        opacity: 0.8;
        &:hover {
          color: #f55555;
        }
      }
      > i {
        font-size: 50px;
        &:hover {
          color: #333;
          cursor: pointer;
        }
      }
    }
  }
  // .clock_way .el-form-item__content {
  //   line-height: 0;
  //   margin-top: 20px;
  //   color: #606266;
  // }
}
.app-company-zi-zhi .screen_status_s .screen_status {
  float: none;
  padding-left: 0;
}
.holiday-step .approver-icon {
  height: 100%;
}
.ol_bod {
  border: 1px solid #999;
}
.approver-item ol li {
  line-height: 26px;
  width: 600px;
  padding: 5px 10px;
}
.approver-item ol li span:nth-child(1) {
  width: 100px;
  display: inline-block;
}
.approver-item ol li span:nth-child(2) {
  color: #9999;
  margin-left: 30px;
}
.approver-item ol li span:nth-child(3) {
  float: right;
  cursor: pointer;
}
.delte_s {
  color: #7aa1c0;
  cursor: pointer;
}
.addname_c {
  width: 55px;
}
.approver-item .addname_d {
  margin-left: 15px;
  color: #999;
  font-size: 12px;
}
i {
  font-style: normal;
}
.the_holiday_no {
  margin-left: 15px;
  font-size: 12px;
  color: #999;
}
.tomorrow_to_perform {
  margin-left: 15px;
  color: #999;
}
.li_boder .cared_s {
  border: 1px solid #e1e1e1;
  line-height: 34px;
  padding: 0 15px;
  float: left;
  margin-right: 10px;
}
// .holiday-step .el-select[data-v-0384eac6],
// .holiday-step .time_d .el-date-editor[data-v-0384eac6] {
//   width: 120px;
// }
.time_card > li {
  margin-left: 80px;
  padding-bottom: 20px;
}

::-webkit-scrollbar {
  display: none;
}
.el-message-box__wrapper .el-message-box{
  width: 420px;
  height: 136px;
}
.map_list{
  clear: both;
  .showmap{
    width: 400px;
    height: 200px;
  }
}
.subMpa{
  height: 300px;
}
.BMap_cpyCtrl {
    display:none;
}
.anchorBL{
    display:none;
}
</style>