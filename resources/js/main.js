import {createCodeViews} from './article.js';
import {initSidebar , loadAllArticleLinkLists , createAndLoadFooterItems} from './base.js';


function loadJsFile(url ,integrity,crossOrigin){
    const script = document.createElement('script');
    script.src = url;
    script.integrity = integrity;
    script.crossOrigin = crossOrigin;
    document.head.appendChild(script);
}

loadJsFile(
"https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js",
"sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3",
"anonymous"
);

loadJsFile(
"https://code.jquery.com/jquery-3.6.1.min.js",
"sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=",
"anonymous"
);

window.onload = function(){
    initSidebar();
    loadAllArticleLinkLists();
    createAndLoadFooterItems();
    createCodeViews();
}