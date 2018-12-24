import {getDataCode} from  '@/assets/utils/api'
import config from  '@/assets/config'
// 给action注册事件处理函数。当这个函数被触发时候，将状态提交到mutations中处理
export function modifyAName({commit}, name) { // commit 提交；name即为点击后传递过来的参数，此时是 'A餐馆'
    return commit ('modifyAName', name)
}
export function modifyNavTitle({commit}, name) {
    return commit ('modifyNavTitle', name)
}
export function modifyDefaultCheckedKeys({commit}, name) {
    return commit ('modifyDefaultCheckedKeys', name)
}
export function modifyDefaultExpandedKeys({commit}, name) {
    return commit ('modifyDefaultExpandedKeys', name)
}

//书签改变,触发事件
export function changeBookMarksData({commit}, status) {
    return commit ('changeBookMarksData', status)
}

export function GetBaseData({commit}, name) {
    for(let i=0;i<config.dataCode.length;i++){
        getBaseDataCode(commit,config.dataCode[i])
    }
}

function getBaseDataCode(commit, code ){
    getDataCode(code).then(res=>{
        let data={
             code:code,
             data:res
        }
        commit ('GetBaseData', data)
    }).catch(err=>{
        console.log(err)
    })
}
// ES6精简写法
// export const modifyAName = ({commit},name) => commit('modifyAName', name)
