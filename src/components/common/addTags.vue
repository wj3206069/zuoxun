<template>
	<div :class="['add-tags', isFocus ? 'is-focus' : '']">
		<span v-for="(item, index) of tagList" class="tag"><span>{{ item }}</span><span @click="clearSelf(item, index)" class="closetag">&times;</span></span>
		<div class="add-tags-input-box">
			<input ref="addtagInput" :style="{'min-width': minWidth + 'em'}" @keyup.enter="handleEnter" @focus="addTagFocus" @blur="handleBlur" @input="handleInput" class="add-tags-input" type="text" v-model="tagVal" :placeholder="inputPlaceholder"/>
			<div :class="['hidebox', tagList.length > 0 ? 'show' : '']">
				<span ref="hideboxText" class="text" :style="{'min-width': minWidth + 'em'}">{{ hideboxText }}</span>
				<span @click="clearAll" class="cleartag" title="全部清除">&times;</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: "addTags",
		props: {
			placeholder: {
				type: String,
				default: ""
			},
			value: {
				type: Array,
				default: function() {
					return [];
				}
			}
		},
		data() {
			return {
				isFocus: false,
				tagList: this.value,
				tagVal: "",
				hideboxText: this.placeholder,
				inputPlaceholder: this.placeholder,
			}
		},
		computed: {
			minWidth() {
				if (this.placeholder && !!this.placeholder.length) {
					return this.placeholder.length;
				}
				return 3;
			}
		},
		watch: {
			value: {
				handler: function(newVal) {
					if (Array.isArray(newVal)) {
						this.tagList = newVal;
					}
					else {
						this.tagList = [];
					}
				},
				deep: true
			}
		},
		mounted() {
			console.log(this.tagList.length, "++++");
		},
		methods: {
			addTag() {
				if (this.tagVal.trim() !== "") {
					this.tagList.push(this.tagVal);
					this.$emit("on-change", this.tagList);
				}
			},
			handleEnter() {
				this.addTag();
				this.tagVal = "";
				this.hideboxText = this.placeholder;
			},
			addTagFocus() {
				this.isFocus = true;
			},
			handleBlur() {
				this.isFocus = false;
				setTimeout(() => {
					this.addTag();
					this.tagVal = "";
					this.hideboxText = this.placeholder;
					this.$emit("on-blur");
				}, 150)
			},
			handleInput() {
				this.hideboxText = this.tagVal;
			},
			clearSelf(item, index) {
				this.tagList.splice(index, 1);
				this.$emit("on-change", this.tagList);
				this.$emit("on-blur");
			},
			clearAll() {
				this.tagVal = "";
//				this.tagList.length = 0;
				this.tagList.splice(0, this.tagList.length);
				this.$emit("on-change", this.tagList);
				this.$emit("on-blur");
			}
		}
	}
</script>
<style lang="less">
	.add-tags {
	    width: auto;
	    border: 1px solid #dcdfe6;
	    border-radius: 4px;
	    padding: 7px 15px;
	    vertical-align: top;
	    box-sizing: border-box;
	    overflow-x: hidden;
	    overflow-y: auto;
	    line-height: 17px;
	    .tag { 
	        border: 1px solid #3395e5;
	        border-radius: 4px;
	        display: inline-block;
	        /*font-size: 0;*/
	        padding: 3px 3px 3px 6px;
	        margin-right: 5px;
	        margin-bottom: 5px;
		    /*background-color: #f274b0;*/
	        background-color: #3395e5;
	        word-wrap: break-word;
	        word-break: break-all;
	        span {
	            font-size: 14px;
	            line-height: 16px;
	            color: #fff;
	            cursor: default;
	        }
	        span.closetag {
	            display: inline-block;
	            padding: 0 5px;
	            position: relative;
	            cursor: pointer;
	            color: #fff; 
	            &:active {
	                top: 1px;
	                left: -1px;
	            }
	        }
	        &.nonstandard {
	            border-color: #f274b0;
	            background-color: #f274b0;
	        }
	        &.standard {
	            border-color: #2a8fdd; //#33ae11
	            background: #2a8fdd;
	        }
	    }
	    .add-tags-input-box {
	        margin-right: -5px;  
	    }
	    .add-tags-input-box {
	        display: inline-block;
	        max-width: 100%;
	        position: relative;
	        height: 24px;
	        vertical-align: middle;
	    }
	    .hidebox {
	        display: inline-block;
	        width: auto;
	        visibility: hidden;
	        font-family: arial, "微软雅黑";
	        font-size: 14px;
	        line-height: 17px;
	        padding: 1px 3px;
	        .text {
	            display: inline-block;
	            padding: 0 22px 0 3px;
	            height: 1px;
	            box-sizing: content-box;
	            overflow: hidden;
	            word-wrap: break-word;
	            word-break: break-all;
	        }
	        &.show {
	            .text {
	            	padding: 0 3px;
	                max-width: calc(100% - 19px);
	            }
	            .cleartag {
	                display: inline-block;
	                visibility: visible;
	            }
	        }
	    }
	    .add-tags-input {
	        border: none;
	        width: calc(100% - 19px);
	        box-sizing: border-box;
	        padding: 1px 3px;
	        outline: none;
	        line-height: 17px;
	        font-size: 14px;
	        visibility: visible;
	        position: absolute;
	        left: 0;
	        top: 2px;
	        font-family: arial, "微软雅黑";
	        color: #666; 
	        &::-webkit-input-placeholder {
	        	font-size: 14px;
	        	color: #bbb;
	        }
	        &::-moz-placeholder {
	        	font-size: 14px;
	        	color: #999;
	        }
	        &:-moz-placeholder {
	        	font-size: 14px;
	        	color: #999;
	        }
	        &:-ms-input-placeholder {
	        	font-size: 14px;
	        	color: #999;
	        }
	    }
	    .cleartag {
	        color: red;
	        font-size: 14px;
	        line-height: 21px;
	        position: relative;
	        top: -2px;
	        padding: 0 5px;
	        cursor: pointer;
	        display: none;
	    }
	    &:hover {
	    	border-color: #c0c4cc;
	    }
	    &.is-focus {
	    	border-color: #409eff;
	    }
	}
	.is-success .add-tags {
		border-color: #67c23a;
	}
	.is-error .add-tags {
		border-color: #f56c6c;
	}
</style>