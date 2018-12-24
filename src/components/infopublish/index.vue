<template>
    <el-main class="app-ruanshili">
        <el-container>
            <el-aside v-if="treeExpand" :class="['cus-ruanshili-aside', {'expanded': !treeExpand}]" width="200px" class="aside_tree_css1">
                <h3 class="tree-title">{{navTitle.title}}</h3>
                <el-tree node-key="menuid"
                         :default-expanded-keys="this.$store.state.defaultExpandedKeys"
                         :default-checked-keys="this.$store.state.defaultCheckedKeys"
                         class="cus-ruanshili-tree"
                         :props="defaultProps"
                         :data="resturantName.val"
                         @node-click="handleNodeClick"
                         highlight-current
                         expand-on-click-node
                         accordion
                         ref = "tree"
                ></el-tree>
                
            </el-aside>
            <el-main class="cus-ruanshili-main">
                <button @click="treeTrigger" :class="['btn-trigger', {'expanded': !treeExpand}]">
                    <span :class="['zxicon', 'zx-xiala', {'zxicon-rotate': !treeExpand}]"></span>
                </button>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-main>
</template>
<script>
import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "infopublish",
        data() {
            return {
                treeExpand: true,
                treeData: [
                ],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                defaultExpandedKeys:[],
                defaultCheckedKeys:[]
            }
        },
        methods: {
            treeTrigger() {
                this.treeExpand = !this.treeExpand;
            },
            handleNodeClick(data) {
                if (!!data.path ) {
                    this.$router.push(data.path);
                }
            },
            setDefaultNote(){
                if(!!this.treeData &&this.treeData.length > 0){
                    this.treeData.forEach(e=>{
                        if(e.isCurrentMenu){
                            if(!!e.children && e.children.length>0){
                                this.defaultExpandedKeys.push(e.menuid);
                                e.children.forEach(r=>{
                                    if(r.isCurrentMenu){
                                        this.defaultCheckedKeys.push(r.menuid);
                                        this.$refs.tree.setCurrentKey(r.menuid);
                                    }
                                })
                            }else {
                                this.defaultCheckedKeys.push(e.menuid);
                                this.$refs.tree.setCurrentKey(r.menuid);
                            }
                        }
                    })
                }

            },
            openFirstPage(){
                let dataArr = this.$store.state.resturantName.val;
                // console.log('dataArr',dataArr);
                if(!!dataArr && dataArr.length>0){
                    for (let i = 0; i < dataArr.length; i++) {
                        const arg = dataArr[i];
                        // console.log('arg',arg);
                        if(!!arg.children && arg.children.length>0){
                            if(!!arg.children[0].path){
                                this.$router.push(arg.children[0].path);
                            }else if(!!arg.children[1].path){
                                this.$router.push(arg.children[1].path);
                            }
                            break;
                        }else if(!!arg.path){
                            this.$router.push(arg.path);
                            break;
                        }
                    }
                }
            }
        },
        computed:{
            ...mapGetters(['resturantName']), // 动态计算属性，相当于this.$store.getters.resturantName
            ...mapGetters(['navTitle'])
        },
        created(){
            let path = this.$route.path;
            let l = path.split('/').length;
            if(l<4){
                this.openFirstPage();
            }

            // let _this = this;
            // this.$nextTick(function () {
            //     // 直接调用
            //     _this.setDefaultNote();
            // })
        }
    }
</script>
<style lang="less">
    .app-ruanshili {
        position: relative;
        padding: 0 !important;
        overflow-x: hidden;
    }
    .cus-ruanshili-aside.expanded {
        width: 0 !important;
    }
    .cus-ruanshili-main {
        padding-top: 15px;
        background: #fff;
    }
    .cus-ruanshili-tree {
        margin-right: -20px;
        height: 100%;
        overflow-y: scroll;
        background: transparent;
    }
    .btn-trigger {
    	cursor: pointer;
        position: absolute;
        top: 50%;
        left: calc(200px - 16px);
        transform: translateY(-50%);
        border: none;
        background: #fff;
        outline: none;
        z-index: 1;
    }
    .btn-trigger:hover .zxicon{
    	color:#0f619f;
    }
    .btn-trigger.expanded {
        left: 0;
        background: #d9dee4;
    }
    .btn-trigger:before {
        position: absolute;
        left: 0;
        top: -10px;
        display: block;
        content: " ";
        border: solid transparent;
        border-width: 5px 8px;
        border-right-color: #fff;
        border-bottom-color: #fff;
    }
    .btn-trigger:after {
        position: absolute;
        left: 0;
        display: block;
        content: " ";
        border: solid transparent;
        border-width: 5px 8px;
        border-right-color: #fff;
        border-top-color: #fff;
    }
    .btn-trigger.expanded:before {
        position: absolute;
        left: 0;
        top: -10px;
        display: block;
        content: " ";
        border: solid transparent;
        border-width: 5px 8px;
        border-left-color: #d9dee4;
        border-bottom-color: #d9dee4;
    }
    .btn-trigger.expanded:after {
        border-left-color: #d9dee4;
        border-top-color: #d9dee4;
    }
    .btn-trigger span {
        display: inline-block;
        transform: rotateZ(0);
        transition: transform .3s;
    }
    .btn-trigger span.zxicon-rotate {
        transform: rotateZ(180deg);
    }
</style>

