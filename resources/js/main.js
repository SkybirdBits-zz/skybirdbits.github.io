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


const java = {id: 'java_article', isExpanded: false};
const kotlin = {id: "kotlin_article", isExpanded: false};
const android = {id: "android_article", isExpanded: false};
const web = {id: "web_article", isExpanded: false};

const courses = [ java, kotlin, android, web];

$(function(){
   for(var i =0; i<courses.length; i++){
        var course = courses[i];

        var parent = document.getElementById(course.id);

        var linkContainer = parent.querySelector('div');
        var btExpand = parent.querySelector('button');

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

