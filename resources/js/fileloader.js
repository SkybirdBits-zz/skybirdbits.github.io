function loadJavaScript(url ,integrity,crossOrigin){
    const script = document.createElement('script');
    script.src = url;
    script.integrity = integrity;
    script.crossOrigin = crossOrigin;
    document.head.appendChild(script);
}


function loadStylesheet(url , integrity, crossOrigin){
    const link = document.createElement('link');
    link.href = url;
    link.integrity = integrity;
    link.crossOrigin = crossOrigin;
    link.rel = "stylesheet";
    document.head.appendChild(link);
}


//read a json file with a specific url
function loadJson(url, onResponseOkListener){
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


export {loadJavaScript, loadStylesheet, loadJson};