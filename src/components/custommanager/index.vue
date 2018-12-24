<template>
    <el-main class="app-ruanshili">
        <el-container>
            <el-aside v-if="treeExpand" :class="['cus-ruanshili-aside', {'expanded': !treeExpand}]" width="200px" class="aside_tree_css1">
                <h3 class="tree-title">客户关系管理</h3>
                <el-tree class="cus-ruanshili-tree" :data="treeData" @node-click="handleNodeClick" highlight-current></el-tree>
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
    export default {
        name: "ruanshiliIndex",
        data() {
            return {
                treeExpand: true,
                treeData: [
                    {
                        id: "1",
                        label: "客户",
                        path: {
                            name:'CustomTable'
                        }
                    },
                    {
                        id: "2",
                        label: "联系人",
                        path: {
                            name:'ContactTable'
                        }
                    },{
                        id: "3",
                        label: "商机",
                        path: {
                            name:'BCTable'
                        }
                    },{
                        id: "4",
                        label: "拜访",
                        path: {
                            name:'VisitTable'
                        }
                    },
                ]
            }
        },
        methods: {
            treeTrigger() {
                this.treeExpand = !this.treeExpand;
            },
            handleNodeClick(data) {
                if (!!data.path && !!data.path.name) {
                    console.log(data.path.name)
                    this.$router.push({name: data.path.name});
                }
            }
        },
        created(){
            setTimeout(function(){
                $('.el-tree-node').first().addClass('is-current')
            },100) 
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

