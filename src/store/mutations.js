// 提交 mutations是更改Vuex状态的唯一合法方法
export const modifyAName = (state, name) => { // A组件点击更改名称
    state.resturantName = name // 把方法传递过来的参数，赋值给state中的resturantName
}
export const modifyNavTitle = (state, name) => { // B组件点击更改名称
    state.navTitle = name
}
export const modifyDefaultCheckedKeys = (state, name) => { // B组件点击更改名称
    state.defaultCheckedKeys = name
}
export const modifyDefaultExpandedKeys = (state, name) => { // B组件点击更改名称
    state.defaultExpandedKeys = name
}


//书签改变,触发事件
export const changeBookMarksData = (state, status) => { // B组件点击更改名称
    state.changeBookMarksStatus = status
}


export const GetBaseData = (state, data) => { 
    let row={
        fieldcode:'', 
        fieldname:'请选择',
    }
    state.baseData[data.code]=[]
    state.baseData[data.code].push(row)
    for(let i=0;i<data.data.length;i++){
        let row={}
        row.fieldcode=data.data[i].fieldcode
        row.fieldname=data.data[i].fieldname
        row.levelcode=data.data[i].levelcode
        row.pfieldcode=data.data[i].pfieldcode
        row.plevelcode=data.data[i].plevelcode
        state.baseData[data.code].push(row)
    }
}

