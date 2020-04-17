let getRandomColor = () => {
    let r = parseInt(Math.random() * 256);
    let g = parseInt(Math.random() * 256);
    let b = parseInt(Math.random() * 256);

    //默认是深色
    let isDark = true;

    //判断是否是浅色
    if(r*0.299 + g*0.578 + b*0.114 >= 192){
        isDark = false;
    }

    return {
        color : `rgb(${r},${g},${b})`,
        isDark : isDark
    }
}

let getClassDetial = (classList) => {
    let classArr = [];

    classList.map((ele) => {
        let name = ele.name;
        let teacher = ele.teacher;

        //调用随机颜色生成器生成颜色备用
        let randomColor = getRandomColor();

        //设置课程背景颜色 如果有设置就用设置好的 没有就用随机颜色
        let bgColor = ele.bgColor || randomColor.color;
        //根据是否深色来设置字体颜色
        let fontColor = randomColor.isDark ? 'white' : 'black';

        ele.detial.map((ele) => {
            let weekNum = ele.weeks.split('-');
            let weekDay = ele.days;
            let classNum = ele.dayTime;
            let classroom = ele.classroom;
            
            for(let i = parseInt(weekNum[0]);i <= parseInt(weekNum[1]); i++){
                classNum.map((ele) => {
                    classArr.push({
                        weekNum : i - 1,
                        classNum : ele - 1,
                        weekDay : weekDay - 1,
                        name : name,
                        teacher : teacher,
                        bgColor : bgColor,
                        fontColor : fontColor,
                        classroom : classroom
                    })
                })
            }
        })
    })

    return classArr;
}

let getNowAdays = () => {
    let nowAdays = new Date();

    //s设置2019/25是第四周
    let targetDate = new Date();
    targetDate.setFullYear(2019 , 8 , 23);
    let targetWeekNum = 4;

    //与目标日期相隔的周数
    let diffWeekNum = parseInt((parseInt(Math.abs(nowAdays - targetDate ) / 1000 / 60 / 60 /24) + 1) / 7);

    //设置汉字星期数
    let cnDays = ['一','二','三','四','五','六','日'];

    return {
        year : nowAdays.getFullYear(),
        month : nowAdays.getMonth() + 1,
        day : nowAdays.getDate(),
        days : nowAdays.getDay(),
        cndays : cnDays[nowAdays.getDay()-1],
        weekNum : targetWeekNum + diffWeekNum
    }
}