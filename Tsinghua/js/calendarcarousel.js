//日历函数
var CURRENTDATE="2017-08-07";//最新有新闻图片的日期
var LIMITDATE="2014-03-01";
CURRENTDATE=parseISO8601(CURRENTDATE);
LIMITDATE=parseISO8601(LIMITDATE);
$(function () {
var cal=new Calendar(jdata);
cal.cal();
$('#imgPre').click(function(){
    goPreDate();
})
$('#imgNex').click(function(){
    goNextDate();
})
$('#calendarMonthPre').click(function(){
    cal.subMonth();
})
$('#calendarMonthNex').click(function(){
    cal.addMonth();
})
    $("#calendarDay").on("click", "li", function() {
        if (!$(this).hasClass("none")) {
            $("#calendarDay li").removeClass("current");
            GetImg(
                $("#calendarYear").text(),
                $("#calendarMonth").text(),
                $(this).text()
            );
        }
    });
function GetImg(y,m,d) {
    var date=takefulldate(y,m,d);
    if(jdata[date]){
        $('#calendarDay a').each(function () {
            if ($('#calendarYear').text()==y && dulnum($('#calendarMonth').text())==dulnum(m) && $(this).text()==d)
            {
                $(this).addClass('current');
            }
            else {$(this).removeClass('current');}
        })
            if (date==takefulldate(CURRENTDATE.Format("yyyy"),CURRENTDATE.Format("MM"),CURRENTDATE.Format("dd")))
            {
                $('#calendarToday').text(CURRENTDATE.Format('yyyy.M.d'));
                $('#imgNex').hide();//最新的日期要隐藏向下翻页的箭头
            }else
            {
                $('#calendarToday').text(parseISO8601(date).Format('yyyy.M.d'))
                if(date!=takefulldate(CURRENTDATE.Format("yyyy"),CURRENTDATE.Format("MM"),CURRENTDATE.Format("dd")))
                {
                    $('#imgNex').show()
                }else {
                    $('#imgNex').hide()
                }
                if(parseInt(y,10)==LIMITDATE.getFullYear() && parseInt(m,10)==LIMITDATE.getMonth()+1)//最早开始月份隐藏向前翻动的箭头
                {
                    $('#imgPre').hide();
                }else{
                    $('#imgPre').show();
                }
            }
            ImgAction(date);
    }
}
    function ImgAction(date){//图片动画以及图片的链接地址
    var calender_bigimg=$('.mainimg');
    var bimg;
        $('.txt').text(jdata[date].title);
        $('#imghref').attr('href',jdata[date].url);
        calender_bigimg.css("left","20px").hide();
        bimg = jdata[date].img;
        calender_bigimg.attr({"src":bimg,"title":date});
        calender_bigimg.animate({opacity:'show',left:0},500);
    }
    function goPreDate() {
        var p=$("#calendarDay a.current").parent();
        function getp() {//找到之前日中有数据的列
            if($(p)[0] == $('#calendarDay li:first')[0])//如果是第一列则要向后退一个月
            {
                cal.subMonth();
                p=$("#calendarDay li a:last").parent();
            }else{
                p=p.prev()
            }
            if(p.length == 0)
            {//每个月第一天，新图还未发布时问题
                p=$("#calendarDay a:not(.none):last").parent();
                p=p.prev();
            }
            if (p.children("a.none").length>0)
            {
                getp();
            }
            return p;
        }
        p=getp();
        GetImg($('#calendarYear').text(),$("#calendarMonth").text(),$(p).text())
    }
    function goNextDate() {
        var p=$("#calendarDay a.current").parent();
        function getp2() {//找到之后有数据的一列
            if($(p)[0] == $('#calendarDay li:last')[0])//如果是最后一列则要向前翻一个月
            {
                cal.addMonth();
                p=$('#calendarDay li a:first').parent();
            }else
            {
                p=p.next();
            }
            if (p.children("a.none").length>0)
            {
                getp2();
            }
            return p;
        }
        p=getp2();
        GetImg($('#calendarYear').text(),$("#calendarMonth").text(),$(p).text())
    }
})
Date.prototype.Format = function (fmt) {//获取自定义时间格式的 年/月/日
    var o = {
        "M+":this.getMonth()+1,//月份
        "d+":this.getDate(),// 日
        "h+":this.getHours(),//小时
        "m+":this.getMinutes(),//分
        "s+":this.getSeconds(),//秒
        "q+":Math.floor((this.getMonth()+3)/3),//季度
        "S":this.getMilliseconds()//毫秒
    }
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1,(this.getFullYear() + "" ).substr(4-RegExp.$1.length));
    for (var k in o)
        if (new RegExp("("+k+")").test(fmt))
            fmt = fmt.replace(RegExp.$1,(RegExp.$1.length==1) ? (o[k]):(("00"+o[k]).substr((""+ o[k]).length)));
    return fmt
}
function dulnum(num) {//正确显示日期的格式 一位数字补齐
    num=parseInt(num,10);
    if(num<10 && num>0)
    {
        return "0"+num;
    }
    return num;
}
function takefulldate(yer,mon,da) {//返回 yyyy-mm-dd 的日期格式
    var mon=parseInt(mon,10);
    var da=parseInt(da,10);
    return yer+"-"+dulnum(mon)+"-"+dulnum(da);
}
function parseISO8601(dateStringInRange) { //将如 yyyy-mm-dd 形式的时间格式转换为标准 ISO8601 形式的时间格式
    var isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/,
        date = new Date(NaN),month,
        parts = isoExp.exec(dateStringInRange);
    if(parts) {
        month = +parts[2];
        date.setFullYear(parts[1],month - 1,parts[3]);
        if (month != date.getMonth() + 1){
            date.setTime(NaN);
        }
    }
    return date;
}
function Calendar(data) {
    var oo = this;
    var daysInMonth = new Array(31,28,31,30,31,30,31,31,30,31,30,31)//非闰年的每个月的天数
    var today = new getToday();
    var year = today.year;
    var month = today.month;
    this.getDays=function (month,year) {
        if (1==month-1) return ((0==year % 4) && (0 != (year % 100))) || (0 == year % 400) ? 29 : 28;
        else  return daysInMonth[month-1]
    }//返回正确的月份天数
    function getToday() {
        this.now = new Date();
        this.year=this.now.getFullYear();
        this.month=this.now.getMonth()+1;
        this.day=this.now.getDate();
    }//得到正确的当今日期
    this.cal=function () {//匹配图片的日期 正确显示日期
        var startDay = 1;
        var endDay = this.getDays(month,year)
        var inh="";
        for(var intLoop = 1; intLoop<=endDay;intLoop++)
        {
            var date=year + "-" + dulnum(month) + "-" + dulnum(intLoop);
            if(data[date]){
                if(date==$('.imgshow .mainimg').attr('title')){
                    inh+='<li><a class="current">'+intLoop+'</a></li>';
                }
                else{
                    inh+='<li><a>'+intLoop+'</a></li>'
                }
            }else
            {
                inh+='<li><a class="none">'+intLoop+'</a></li>'
            }
        }
        $('#calendarDay').html(inh);
        $('#calendarMonth').html(month);
        $('#calendarYear').html(year);
    }
    this.subMonth=function (pos) {
        if(year == LIMITDATE.getFullYear() && month==LIMITDATE.getMonth()+1) return;//不得显示 2014-03-01之前的内容
        if((month)<2)
        {
            month=12;
            year=year-1;
        }else
        {
            month=month-1;
        }
        this.cal();
    }
    this.addMonth=function () {
        if(year==today.year && month==today.month) return;
        if((month)>11)
        {
            month=1;
            year=year+1;
        }
        else{
            month=month+1;
        }
        this.cal();
    }
}