 // 计算时间差
 const timeDifc = (start, end) => {
   if (!start && !end) return false
   let starts = new Date(start),
     ends = new Date(end),
     year = '',
     month = '',
     day = '',
     hours = ''
   let startDays = getDaysInMonth(starts); // 开始时间当月天数
   let endDays = getDaysInMonth(ends); // 结束时间当月天数
   if (ends.getFullYear() > starts.getFullYear() && ends.getMonth() >= starts.getMonth())
     year += ends.getFullYear() - starts.getFullYear() + "年";
   // 处理跨年
   if (ends.getFullYear() > starts.getFullYear() && ends.getMonth() < starts.getMonth()) {
     month += 12 - starts.getMonth() + ends.getMonth() - 1 + '个月';
     day += startDays - starts.getDate() + ends.getDate() + '天';
     if ((ends.getFullYear() - starts.getFullYear()) > 1) {
       year += ends.getFullYear() - starts.getFullYear() - 1 + "年";
     }
   }
   if (ends.getMonth() > starts.getMonth() && ends.getDate() >= starts.getDate())
     month += ends.getMonth() - starts.getMonth() + "个月";

   // 处理跨月
   if (ends.getMonth() > starts.getMonth() && ends.getDate() < starts.getDate()) {
     day += startDays - starts.getDate() + ends.getDate() + '天';
     if ((ends.getMonth() - starts.getMonth()) > 1) {
       month += ends.getMonth() - starts.getMonth() - 1 + "个月";
     }
   }

   // 跨天 不满一天
   if (starts.getHours() > ends.getHours() && ends.getDate() > starts.getDate()) {
     if (ends.getHours() <= 9) {
       hours += 18 - starts.getHours() + "小时";
     } else if (9 < ends.getHours() <= 13) {
       hours += 18 - starts.getHours() + ends.getHours() - 9 + "小时";
     } else if (ends.getHours() >= 14) {
       hours += 18 - starts.getHours() + ends.getHours() - 9 - 2 + "小时";
     }
   }

   if (ends.getDate() > starts.getDate() && ends.getHours() >= starts.getHours())
     day += ends.getDate() - starts.getDate() + "天";
   if (ends.getHours() > starts.getHours() && ends.getMinutes() >= starts.getMinutes()) {
     if ((ends.getHours() - starts.getHours()) > 8) {
       !day ? day = 1 + "天" : day = parseInt(day[0]) + 1 + "天"
     } else if (ends.getHours() === 13) {
       hours += ends.getHours() - starts.getHours() - 1 + "小时";
     } else if (ends.getHours() >= 14) {
       hours += ends.getHours() - starts.getHours() - 2 + "小时";
     } else {
       hours += ends.getHours() - starts.getHours() + "小时";
     }
   }
   return year + month + day + hours;
 };


 const getDaysInMonth = function (nowTime) {
   let nowYear = nowTime.getFullYear();
   let nowMonth = nowTime.getMonth() + 1;
   return new Date(nowYear, nowMonth, 0).getDate();
 }

 let formatDateTime = (date) => {
   let y = date.getFullYear();
   let m = date.getMonth() + 1;
   m = m < 10 ? ('0' + m) : m;
   let d = date.getDate();
   d = d < 10 ? ('0' + d) : d;
   return y + '-' + m + '-' + d;
 };
 export {
   timeDifc,
   formatDateTime
 }