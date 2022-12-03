const keyword = /(?<!([A-Za-z\d_\"=]|\/\/.*))(public|private|protected|void|return|static|instanceof|for|while|do|if|switch|override|fun|var|val|companion|data|false|true|null|class|short|byte|int|long|double|float|boolean|throw|throws|try|catch|finally|final|static|interface|enum|abstract|import|this|super|new)(?![A-Za-z\d_\"=])/g;
const string = /(?<!\/\/.*)["']([a-zA-Z-=.\s\d]*|\[.*\]|(\/.+\/)|(\/{1}.+\/{0,1})|\{.*\})["']/g;
const className = /(?<![a-zA-Z\d"'_@\/-]|\/\/.*)[A-Z][a-zA-Z\d]*(?![A-Za-z_/]*"')/g;
const digit = /(?<![A-Za-z\d\"_])\d+/g;
const annotation = /(?<![a-zA-Z\d"'_@\/-])@[A-Z][a-zA-Z\d]*/g
const comment = /\/\/.*/g

const elements = document.querySelectorAll('.code-container');

function createCodeViews(){

    for(var i =0; i<elements.length; i++){

        let codeLines = elements[i].innerHTML.split('\n');
        elements[i].innerHTML = "";

        let codeViewContents = createCodeViewContents(codeLines);

        let codeHead = createCodeViewHead(function(){
             let text = collectTextCodes(codeViewContents);
             navigator.clipboard.writeText(text);
             $('.copy-message').animate({bottom: "0px"}, 512);
             $('.copy-message').delay(3000).animate({bottom: "-128px"}, 512);
        });

        elements[i].appendChild(codeHead);
        elements[i].appendChild(codeViewContents);

    }

}


function createCodeViewHead(onClickListener){
     var codeHead = document.createElement('div');
     codeHead.classList.add('code-head');

     var copyButton = document.createElement('button');
     copyButton.classList.add('md-bt', 'md-bt-light', 'material-icons');
     copyButton.innerHTML = "content_copy";

     copyButton.addEventListener('click', onClickListener);

     codeHead.appendChild(copyButton);

     return codeHead;
}

function createCodeViewContents(codeLines){
     var codeWrap = document.createElement('div');
     codeWrap.classList.add('code-wrap');

     var table = document.createElement('table');
     var tBody = table.createTBody();
     tBody.classList.add('code-body');

    for(var lineIndex = 0; lineIndex < codeLines.length; lineIndex++){
        let line = codeLines[lineIndex];
        line = styleAllSensitiveWords(line);
        insertLine(tBody, line, lineIndex);
    }

    table.appendChild(tBody);

    codeWrap.appendChild(table);

    return codeWrap;
}

function styleAllSensitiveWords(textLine){
        textLine = styleSensitiveWords(textLine, string, "string");
        textLine = styleSensitiveWords(textLine, keyword, "keyword");
        textLine = styleSensitiveWords(textLine, className, "class-name");
        textLine = styleSensitiveWords(textLine, digit, "digit")
        textLine = styleSensitiveWords(textLine, annotation, "annotation")
        textLine = styleSensitiveWords(textLine, comment, "comment");
        return textLine;
}

function styleSensitiveWords(text, regex ,styleClassName){
    return text.replaceAll(regex, function(word){
        return `<span class=\"${styleClassName}\">${word}</span>`;
    });
}

//create a row to insert code line
function insertLine(tBody , line, lineIndex){

    var row = tBody.insertRow(0);

    var col0 = row.insertCell(0);
    col0.classList.add('code-line-number');
    col0.innerHTML = lineIndex + 1;

    var col1 = row.insertCell(0);
    col1.classList.add('code');
    col1.innerHTML = line;

    row.appendChild(col0);
    row.appendChild(col1);

    tBody.appendChild(row);
}

function collectTextCodes(codeViewContents){
    const tBody = codeViewContents.querySelector('tbody');
    const rows = tBody.rows;
    let text = "";
    for(var i=0; i<rows.length; i++){
        var codeLine = rows[i].cells[1];
        text += codeLine.innerHTML +"\n";
    }

    text = text.replaceAll(/\&lt;/g, "<");
    text = text.replaceAll(/\&gt;/g, ">");
    text = text.replaceAll(/<\/span>/g, "");
    text = text.replaceAll(/<span class="(keyword|string)">/g, "")

    return text;
}

export {createCodeViews};