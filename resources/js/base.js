const linkCoursesRepo = [
   "/skybirdbits.github.io/resources/json/java-links.json",
   "/skybirdbits.github.io/resources/json/kotlin-links.json",
   "/skybirdbits.github.io/resources/json/android-links.json",
   "/skybirdbits.github.io/resources/json/web-links.json"
]

function initSidebar(){
    var sidebar = document.getElementById('sidebar');

        if(sidebar != null){
            sidebar.addEventListener('show.bs.offcanvas', function(){
               $("#brand").hide('slow');
            });
            sidebar.addEventListener('hide.bs.offcanvas', function(){
                $("#brand").show('slow');
            });
        }
}


/*
    Functions to create list with links to article subjects
    views: createArticleListView(article), createListItemView(link) ,createExpandableButton(article),
    utils: rotate(icon, article), getTransformRotation(degree)
    json: readJsonFile(url, onResponseOkListener)
*/


//retrieve links stored in json files inside path: /resources/json
function loadAllArticleLinks(){
    const articleListViewContainer = document.getElementById('article_container');

    if(articleListViewContainer){
        for(var i =0; i<linkCoursesRepo.length; i++){
            readJsonFile(linkCoursesRepo[i],function(data){

                var articleData = JSON.parse(data);
                var article = {
                                id: articleData.id,
                                title: articleData.title,
                                links: articleData.links, isExpanded: false
                               };

                var articleListView = createArticleListView(article);

                articleListViewContainer.appendChild(articleListView);

            });
        }
    }
}

//read a json file with a specific url
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

    var unorderedList = document.createElement('ol');
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

//create an expandable button for every lists which contain links
function createExpandableButton(article){
    var btExpand = document.createElement('button');
    btExpand.classList.add('md-bt-expandable');
    btExpand.dataset.bsTarget = ('#' + article.id);
    btExpand.dataset.bsToggle = 'collapse'

    var icon = document.createElement('span');
    icon.classList.add('material-icons');
    icon.innerHTML = 'arrow_drop_down'
    icon.style.transform = 'rotate(90deg)';

    var text = document.createElement('span');
    text.innerText = article.title;

    btExpand.appendChild(icon);
    btExpand.appendChild(text);

    btExpand.addEventListener('click', function(){
            rotate(icon, article);
    });

    return btExpand;
}

function rotate(icon , article){
    if(!article.isExpanded){
        icon.style.transform = 'rotate(0deg)';
    }else{
        icon.style.transform = 'rotate(90deg)';
    }

    article.isExpanded = !article.isExpanded;
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


//create and load items of footer
function createAndLoadFooterItems(){
    let footer = document.querySelector('footer');

    let brandLicenseContainer = createFooterItemContainer('brand-license-container');

    let itemBrandLicense = createFooterItem("2022 Skybirdbits, GPL","https://github.com/skybirdbits/" )
    brandLicenseContainer.appendChild(itemBrandLicense);

    let telegramLinksContainer = createFooterItemContainer('telegram-links-container');

    let itemTelegramChannel = createFooterItem("کانال تلگرام", "https://t.me/java_kotlin_dev");
    let itemTelegramGroup = createFooterItem("گروه تلگرام" ,"https://t.me/java_kotlin_dev_gp");

    telegramLinksContainer.append(itemTelegramChannel, itemTelegramGroup);

    let socialMediaContainer = createFooterItemContainer('social-media-container');

    let itemLinkedIn = createFooterItem("Linkedin","https://linkedin.com/in/skybirdbits")
    let itemGithub = createFooterItem("Github","https://github.com/skybirdbits")

    socialMediaContainer.append(itemLinkedIn, itemGithub);

    footer.append(brandLicenseContainer, telegramLinksContainer, socialMediaContainer);
}

function createFooterItemContainer(styleClassName){
    let container = document.createElement('div');
    container.classList.add('footer-item-container', styleClassName);
    return container;
}

function createFooterItem(text, href){
    let item = document.createElement('a');
    item.innerText = text;
    item.href = href;
    item.classList.add('footer-item');
    return item;
}

function base(){
    createAndLoadFooterItems();
    initSidebar();
    loadAllArticleLinkLists();
}

export {initSidebar , loadAllArticleLinks , createAndLoadFooterItems};