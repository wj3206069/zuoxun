<template>
    <div class="app-company-zi-zhi">
        <div class="company-zi-zhi__head">
            <h4 class="company-zi-zhi__head--text">联系人</h4>          
        </div>
        <div class="company-zi-zhi__body zi-zhi-box">
            <router-view />
        </div>
    </div>
</template>
<script>
    export default {
        name: "custommanager",
        data() {
            return {
                
            }
        },
        methods: {
            
        },
        mounted(){
            console.log(this.$route)
        }
    }
</script>
<style lang="less">
    .app-company-zi-zhi {
    	/*border:1px solid red;*/
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
                padding-left:15px;
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
            .btn-tool--num {
                display: inline-block;
                padding: 2px 5px;
                border-radius: 20px;
                background: #3d95d8;
                font-size: 12px;
                color: #fff;
                vertical-align: 2px;
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
            &.btn-shenqing {
                position: absolute;
                right: -50px;
                bottom: 200px;
                padding: 7px 20px 7px 10px;
                border: 1px solid #e1e1e1;
                border-radius: 40px;
                font-size: 14px;
                transition: right .3s;
                z-index: 1000;
                color: #13b745;
                span {
                    vertical-align: middle;
                }
                .zxicon {
                    font-size: 1.4em;
                    color: #13b745;
                }
                &:hover {
                    right: -15px;
                }
            }
        }
        .zi-zhi-box {
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
            }
        }
    }
</style>

