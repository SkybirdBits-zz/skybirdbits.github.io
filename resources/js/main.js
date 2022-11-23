function loadFooter(){
    $('#footer_container').load('/ui-components/shared_footer.html')
}

$(function(){
    var sidebar = document.getElementById('sidebar');

    if(sidebar != null){
        sidebar.addEventListener('show.bs.offcanvas', function(){
           $("#brand").hide('slow');
        });
        sidebar.addEventListener('hide.bs.offcanvas', function(){
            $("#brand").show('slow');
        });
    }

    loadFooter();
});

const javaLinks = new Map([
    ["/article/java/selectors.html", "دستورات شرطی در جاوا"],
    ["/article/java/switch-statement-jdk-17.html", "دستور switch در jdk-17"],
    ["/article/java/loops.html", "حلقه ها در جاوا"],
    ["/article/java/static-keyword.html", "کلیدواژه ی استاتیک در جاوا"]
]);

const kotlinLinks = new Map([
    ["/article/kotlin/extension-function.html", "تابع اکستنشن در کاتلین"],
    ["/article/kotlin/anonymous-function-and-lambda.html", "عبارت لامبدا و توابع بی نام در کاتلین"]
]);

const androidLinks =new Map([
    ["/article/android/data-binding.html","دیتا بایندینگ در اندروید"],
    ["/article/android/navigation.html", "نویگیشن در اندروید"],
    ["/article/android/data-binding-navigation-sample.html","پروژه ی عملی از دیتابایندینگ و نویگیشن در اندروید"],
    ["/article/android/activity-lifecycle.html", "چرخه ی حیات اکتیویتی در اندروید"]
]);

const webLinks = new Map([
    ["/article/web/streaming-spring-boot.html", "ویدیو استریمینگ در اسپرینگ بوت"]
]);

const java = {id: 'java_article', links: javaLinks, isExpanded: false};
const kotlin = {id: "kotlin_article",links: kotlinLinks, isExpanded: false};
const android = {id: "android_article",links: androidLinks, isExpanded: false};
const web = {id: "web_article", links: webLinks, isExpanded: false};

const courses = [java, kotlin, android, web];

$(function(){
   for(var i =0; i<courses.length; i++){
        var course = courses[i];

        var parent = document.getElementById(course.id);


        var btExpand = parent.querySelector('button');

        var linkContainer = parent.querySelector('div');

        course.links.forEach(function(value, key){
            var anchor = document.createElement('a');
            anchor.href = key;
            anchor.innerHTML = value;
            anchor.classList.add("list-item");
            linkContainer.appendChild(anchor);
        });

        if(btExpand != null){
            var icon = btExpand.querySelector('span');
            icon.style.transform = getTransformRotation(90);
        }
   }
});


function toggleExpandState(btn){
    for(var i=0; i<courses.length; i++){
            var course = courses[i];

            var parent = document.getElementById(course.id);
            var btExpand = parent.querySelector('button');

            if(btExpand.id == btn.id){
                var icon = btExpand.querySelector('span');
                rotate(icon , course);
                course.isExpanded = !course.isExpanded;
                break;
            }
    }
}

function rotate(icon , course){
    if(!course.isExpanded){
        icon.style.transform = getTransformRotation(0);
    }else{
        icon.style.transform = getTransformRotation(90);
    }
}

function getTransformRotation(degree){
    return 'rotate('+ degree +'deg)';
}

