<template>
    <el-row>
        <el-col :span="24">
            <div class="title">
                <span class="title_icon">
                    <i class="zxicon zx-zx-logo"></i>
                </span>
                <span class="title_name">卓讯运营平台</span>
                <span class="title_triangle">
                    <el-dropdown @command="handleDropdown" :show-timeout="50" placement="bottom-start">
                        <span class="el-dropdown-link">
                            系统书签
                            <i class="zxicon zx-sanjiao1"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="item in bookMarksData.bookMarkbar" :command="item.url"><span :class="item.smallicon"></span>{{item.abbrname}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </span>
                <div style="position: relative; flex-shrink: 1; flex-grow: 1;">
                    <div class="title_left">
                        <ul>
                            <li v-for="item in bookMarksData.toolbar" @click="openBookMarksUrl(item.url)">
                                
                                <span v-text="loadBookMarksName(item.abbrname)"></span>
                               
                            </li>
                           
                        </ul>
                    </div>
                    <div class="title_right">
                        <!-- <el-input placeholder="关键词">
                            <i slot="prefix" class="zxicon zx-sousuo"></i>
                        </el-input> -->
                        <ul>
                        <li @click="openDoing">
                                <!-- <i class="zxicon zx-daiban icon_red"></i> -->
                                待办件
                                <span v-if="worlflowstat.doing">
                                    {{worlflowstat.doing}}
                                </span>
                            </li>
                            <li @click="openSolvedBusiness">
                                <!-- <i class="zxicon zx-yiban icon_blue"></i> -->
                                已办件
                                <span v-if="worlflowstat.done">
                                    {{worlflowstat.done}}
                                </span>
                            </li>
                            <li @click="openReadBusiness('0')">
                                <!-- <i class="zxicon zx-daiyue icon_red"></i> -->
                                待阅件
                                <span v-if="worlflowstat.unread">
                                    {{worlflowstat.unread}}
                                </span>
                            </li>
                            <li @click="openReadBusiness('1')">
                                <!-- <i class="zxicon zx-yiyue icon_blue"></i> -->
                                已阅件
                                <span v-if="worlflowstat.read">
                                    {{worlflowstat.read}}
                                </span>
                            </li>
                            
                            <li @click="openBookMarks()">
                                <!-- <i class="zxicon zx-yiyue icon_blue"></i> -->
                                书签管理
                                
                            </li>
                            <!-- <li @click="handleDropdown(`https://www.zxpaas.com/userreg/?access_token=${access_token}#/personal/${userid}/userinfo`)"> -->
                            <li @click="openUserInfo">
                            <img :src="img" />{{username}}</li>
                            <li @click="logout">退出</li>
                        </ul>
                    </div>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>

import headImg from '../../../../static/head.jpg'
import { getBusinessTaskCount, getBusinessWaitReadCount } from '~/assets/utils/api.js'
import { contextPath } from '~/assets/config/index.js'
var ws = null;
var lockReconnect = false;
export default {
    data () {
        return {
            img: headImg,
            name: '',
            userid: '',
            access_token: '',
           
            worlflowstat: {
                doing: 0,
                done: 0,
                read:0,
                unread:0
            },
            bookMarksData: {
                toolbar: [],
                bookMarkbar: []
            }
        }
    },
    methods: {
        loadBookMarks() {
            console.log("start load bookMarks")
             this.$axios.get('/proxyapiBusiness/syncdata/bookMarks/data').then(res => {
                if (!!res) {
                    this.bookMarksData = res;
                    this.$store.dispatch('changeBookMarksData', false);
                }
            });
        },
        openBookMarks() {
            this.$router.push("/bookBarks");
        },
        openBookMarksUrl(url) {
            window.open(url);
        },
        loadBookMarksName(name) {
            if (!!name && name.length > 4) {
                return name.substring(0, 4) + '...';
            }
            return name;
        },
        openUserInfo() {
            this.$router.push("/user");
        },
        init() {
            let userInfo=JSON.parse(sessionStorage.getItem('user'));
            let access_token = sessionStorage.getItem('access_token');
            this.username=userInfo.username;
            this.userid=userInfo.userid;
            this.access_token = access_token;
            this.loadBusinessData();
        },
        loadBusinessData() {
            getBusinessTaskCount(this.userid, '1').then(res => {
                if (!!res) {
                    this.worlflowstat.doing = res;
                }
            });
            getBusinessTaskCount(this.userid, '2').then(res => {
                if (!!res) {
                    this.worlflowstat.done = res;
                }
            });
            getBusinessWaitReadCount(this.userid, '0').then(res => {
                if (!!res) {
                    this.worlflowstat.unread = res;
                }
            });
            getBusinessWaitReadCount(this.userid, '1').then(res => {
                if (!!res) {
                    this.worlflowstat.read = res;
                }
            });
        },
        handleDropdown(command) {
            if (!!command) {
                window.open(command,"_blank")
            }
        },
        logout() {
            let url = window.location.href;
            let hash = window.location.hash;
            let access_token = sessionStorage.getItem('access_token');
            let href = url.replace(hash, '');
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('refresh_token');
            window.location.href = 'https://www.zxpaas.com/authen/oauth/ssologout?access_token='+access_token+'&next='+href;
            
        },
        openIcon(){
            let href = window.document.location.href;
            let prefixpath = href.split("#")[0];
            window.open(prefixpath+'static/iconfont/demo_fontclass.html')
        },
        openDoing() {
            this.$router.push("/business");
        },
        openSolvedBusiness() {
            this.$router.push("/solvedBusiness");
        },
        openReadBusiness(status) {
            this.$router.push("/readBusiness/" + status);
        },
        loadWebSocketMessage(event) {
            let data = JSON.parse(event.data);
            let that = this;
            that.loadBusinessData();
            if (!!data.iscc) {
                let msg = "";
                if (data.iscc == '0') {
                    msg = '您有一个新的待办任务处理信息';
                } else if (data.iscc == '1') {
                    msg = '您有一个新的待阅信息';
                }
                that.$notify({
                    title: '提示',
                    message: msg,
                    type: 'success',
                    duration: 0
                });
            }
        },
        initWebSocket() {
            if (ws != null) {
                ws.close();
            }
            let url =  'ws://';
            let protocol = window.location.protocol;
            let host = window.location.host;
            if (protocol == 'https') {
                url =  'wss://';
            }
            url += host;
            if (!contextPath) {
                url += "/";
            }
            url += 'proxyapiBusiness/api/buiness/info/' + this.userid;
            ws = new WebSocket(url);
                console.log('连接websocket');
            this.loadWebSockeMethods();
        },
        loadWebSockeMethods() {
            let that = this;
            ws.onopen = function () {
            };
            ws.onmessage = function (event) {
                if (!!event.data) {
                    that.loadWebSocketMessage(event);
                }
            }
            ws.onclose = function () {
                console.log('websocket关闭');
                that.reconnect();
            };
            ws.onerror = function () {
                console.log('websocket出错');
                that.reconnect();
            };
        },
        reconnect(url) {
            let that = this;
            if(lockReconnect) return;
            lockReconnect = true;
            setTimeout(function () {     //没连接上会一直重连，设置延迟避免请求过多
                that.initWebSocket();
                lockReconnect = false;
            }, 2000);
        }
    },
    created() {
        this.init();
        if (ws != null) {
            ws.close();
        }
        this.initWebSocket();
        this.loadBookMarks();
    },
    watch:{
        changeBookMarksStatus(newVal, oldVal) {
            if (newVal) {
                this.loadBookMarks();
            }
        }
    },
    computed: {
        changeBookMarksStatus() { 
            return this.$store.state.changeBookMarksStatus
        }
    }
}

</script>

<style>

</style>