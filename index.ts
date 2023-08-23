const { readFile, writeFile } = require('fs/promises');

import './token.ts';
import './tohtml.ts';

function readThisFile(filePath: string) {
        let content: string ;

    try {
        const data = readFile(filePath);
        content = data.toString();
        return content; 

    } catch (error) {
        console.error(`Got an error trying to read the file: ' . ${error.message}`);
    }
}

function convert (filePath: string, speichern:boolean){
    let content: string = readThisFile(filePath);
    let tokens: Token[] = tokenize(content);
    let html: string = convert_to_html(tokens);
    if(speichern === true){
        try{
            writeFile(filePath.replace(".md", ".html"), html);
        } catch (error){
            console.error(`Got an error trying to write the file: ' . ${error.message}`);
        }
    }
    return html;
}


convert('./test.md', true);
