const linkCoursesRepo = [
   "https://skybirdbits.github.io/resources/json/java-links.json",
   "https://skybirdbits.github.io/resources/json/kotlin-links.json",
   "https://skybirdbits.github.io/resources/json/android-links.json",
   "https://skybirdbits.github.io/resources/json/web-links.json"
]

let allArticleObjects = [];

const articleListViewContainer = document.getElementById('article_container');

function loadFooter(){
    $('#footer_container').load('/ui-components/shared_footer.html');
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

function rotate(icon , articleObject){
    if(!articleObject.isExpanded){
        icon.style.transform = getTransformRotation(0);
    }else{
        icon.style.transform = getTransformRotation(90);
    }

    articleObject.isExpanded = !articleObject.isExpanded;
}

function getTransformRotation(degree){
    return 'rotate('+ degree +'deg)';
}


function readJsonFile(url, onResponseOkListener){
    var request = new XMLHttpRequest();
    request.overrideMimeType = "application/json";
    request.open("GET", url , true);
    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == "200"){
            onResponseOkListener(request.responseText);
        }
    }

    request.send();
}

//retrieve links stored in json files inside path: /resources/json
function retrieveLinks(){
    for(var i =0; i<linkCoursesRepo.length; i++){
        readJsonFile(linkCoursesRepo[i],function(data){
            var article = JSON.parse(data);
            var articleObject = {id: article.id, title: article.title, links: article.links, isExpanded: false};
            allArticleObjects.push(articleObject);

            var articleListView = createArticleListView(articleObject);

            articleListViewContainer.appendChild(articleListView);

        });
    }
}

//create list view for an article to show its related links
function createArticleListView(articleObject){
    var parent = document.createElement('div');

    var btExpand = createExpandableButton(articleObject);

    var chapterListContainer = document.createElement('div');
    chapterListContainer.classList.add('collapse');
    chapterListContainer.id = articleObject.id;

    var unorderedList = document.createElement('ul');
    unorderedList.classList.add('list');

    var links = articleObject.links;
    for(var i =0; i<links.length; i++){
        var item = createListItem(articleObject.links[i]);
        unorderedList.appendChild(item);
    }

    chapterListContainer.appendChild(unorderedList);

    parent.appendChild(btExpand);
    parent.appendChild(chapterListContainer);

    return parent;
}


function createExpandableButton(articleObject){
    var btExpand = document.createElement('button');
    btExpand.classList.add('md-bt-expandable');
    btExpand.dataset.bsTarget = ('#' + articleObject.id);
    btExpand.dataset.bsToggle = 'collapse'

    console.log(btExpand.dataset.bsTarget)

    var icon = document.createElement('span');
    icon.classList.add('material-icons');
    icon.innerHTML = 'arrow_drop_down'
    icon.style.transform = getTransformRotation(90);

    var text = document.createElement('span');
    text.innerHTML = articleObject.title;

    btExpand.appendChild(icon);
    btExpand.appendChild(text);

    btExpand.addEventListener('click', function(){
            rotate(icon, articleObject);
    });

    return btExpand;
}


function createListItem(link){
   var item = document.createElement('li');
   item.classList.add('list-item');

   var anchor = document.createElement('a');
   anchor.classList.add('list-item-link');
   anchor.href = link.href;
   anchor.innerHTML = link.subject;
   item.appendChild(anchor);

   return item;
}

retrieveLinks();