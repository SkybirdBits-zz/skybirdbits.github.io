function loadFooter(){
    $('#footer_container').load('/ui-components/shared_footer.html')
}

function loadStartPageItems(){
    $('#android_items_container').load('/ui-components/android_tab_items.html');
    $('#kotlin_items_container').load('/ui-components/kotlin_tab_items.html');
    $('#java_items_container').load('/ui-components/java_tab_items.html')
    $('#web_items_container').load('/ui-components/web_tab_items.html')
}


$(function(){
    var startPage = document.getElementById('start_page');

    if(startPage != null){
        loadStartPageItems()
    }

    loadFooter();
});



