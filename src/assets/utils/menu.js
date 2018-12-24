export default {
    beforeRouteEnter(to, from, next) {
        let navStr = sessionStorage.getItem('navMenu');
        if(!!navStr && navStr.startsWith('[')){
            let navMenu = JSON.parse(navStr);
            let path = to.path;
            let l = path.split('/').length;
            if(l<4){
                next();
            }

            let menu = {
                one:[],
                two:[],
                three:[],
                four:[]
            };
            //获取一级菜单
            navMenu.forEach(e=>{
                menu.one.push(e);
            });
            //获取2级菜单
            menu.one.forEach(e=>{
                let m = e;
                if(!!m.children && m.children.length>0){
                    m.children.forEach(r=>{
                        r.parentMenu = e.menuid;
                        menu.two.push(r);
                    })
                }
            });
            //获取三级菜单
            menu.two.forEach(e=>{
                let m = e;
                if(!!m.children && m.children.length>0){
                    m.children.forEach(r=>{
                        r.parentMenu = e.menuid;
                        menu.three.push(r);
                    })
                }
            });
            //获取四级菜单
            menu.three.forEach(e=>{
                let m = e;
                if(!!m.children && m.children.length>0){
                    m.children.forEach(r=>{
                        r.parentMenu = e.menuid;
                        menu.four.push(r);
                    })
                }
            });

            let currentParentMenuId;
            let currentParentMenu;
            let defaultExpandedKeys=[];
            let defaultCheckedKeys=[];
            menu.three.forEach(e=>{
                if(path===e.path){
                    e.isCurrentMenu=true;
                    currentParentMenuId = e.parentMenu;
                    defaultCheckedKeys.push(e.menuid);
                }

            });
            //三季菜单找不到，到第四级菜单找
            if(!currentParentMenuId){
                menu.four.forEach(e=>{
                    if(path===e.path){
                        e.isCurrentMenu=true;
                        let threeMenuID = e.parentMenu;
                        defaultCheckedKeys.push(e.menuid);
                        defaultExpandedKeys.push(threeMenuID);
                        menu.three.forEach(r=>{
                            if(threeMenuID===r.menuid){
                                r.isCurrentMenu=true;
                                currentParentMenuId = r.parentMenu;
                            }
                        });
                    }
                });
            }

            if(!!currentParentMenuId){
                menu.two.forEach(e=>{
                    if(currentParentMenuId===e.menuid){

                        currentParentMenu = e;
                    }
                })
            }
            // console.log('currentParentMenu:',currentParentMenu);
            if(!!currentParentMenu){
                let val = currentParentMenu.children;
                let title = currentParentMenu.name;
                next(t=>{
                    t.$store.dispatch('modifyAName', {val});
                    t.$store.dispatch('modifyDefaultCheckedKeys', defaultCheckedKeys);
                    t.$store.dispatch('modifyDefaultExpandedKeys', defaultExpandedKeys);
                    t.$store.dispatch('modifyNavTitle', {title});
                });
            }
        }
        next();
    }
}
