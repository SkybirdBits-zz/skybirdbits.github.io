const linkCoursesRepo = [
   "/skybirdbits.github.io/resources/json/java-links.json",
   "/skybirdbits.github.io/resources/json/kotlin-links.json",
   "/skybirdbits.github.io/resources/json/android-links.json",
   "/skybirdbits.github.io/resources/json/web-links.json"
]

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


function retrieveLinksAndInsertIntoContainer(){
       if(articleListViewContainer)
            retrieveLinks();
}

//retrieve links stored in json files inside path: /resources/json
function retrieveLinks(){
    for(var i =0; i<linkCoursesRepo.length; i++){
        readJsonFile(linkCoursesRepo[i],function(data){
            var article = JSON.parse(data);
            //var articleObject = {id: article.id, title: article.title, links: article.links, isExpanded: false};

            var articleListView = createArticleListView(article);

            articleListViewContainer.appendChild(articleListView);

        });
    }
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

//create list view for an article to show its related links
function createArticleListView(article){
    var parent = document.createElement('div');

    var btExpand = createExpandableButton(article);

    var subjectListContainer = document.createElement('div');
    subjectListContainer.classList.add('collapse');
    subjectListContainer.id = article.id;

    var unorderedList = document.createElement('ul');
    unorderedList.classList.add('list');

    var links = article.links;
    for(var i =0; i<links.length; i++){
        var item = createListItemView(links[i]);
        unorderedList.appendChild(item);
    }

    subjectListContainer.appendChild(unorderedList);

    parent.appendChild(btExpand);
    parent.appendChild(subjectListContainer);

    return parent;
}


function createExpandableButton(articleObject){
    var btExpand = document.createElement('button');
    btExpand.classList.add('md-bt-expandable');
    btExpand.dataset.bsTarget = ('#' + articleObject.id);
    btExpand.dataset.bsToggle = 'collapse'

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


function createListItemView(link){
   var item = document.createElement('li');
   item.classList.add('list-item');

   var anchor = document.createElement('a');
   anchor.classList.add('list-item-link');
   anchor.href = link.href;
   anchor.innerHTML = link.subject;
   item.appendChild(anchor);

   return item;
}