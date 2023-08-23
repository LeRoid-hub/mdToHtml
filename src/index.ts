import { readFileSync, writeFileSync } from 'fs';
import { Token, tokenize } from './token';
import { convert_to_html } from './tohtml';

function readThisFile(filePath: string) {
        let content: string ;

    try {
        const data = readFileSync(filePath);
        content = data.toString();
        return content; 

    } catch (error) {
        console.error(`Got an error trying to read the file: ' . ${(error as Error).message}`);
    }
    return "";
}

function convert (filePath: string, speichern:boolean){
    let content: string = readThisFile(filePath);
    let tokens: Token[] = tokenize(content);
    let html: string = convert_to_html(tokens);
    if(speichern === true){
        try{
            writeFileSync(filePath.replace(".md", ".html"), html);
        } catch (error){
            console.error(`Got an error trying to write the file: ' . ${(error as Error).message}`);
        }
    }
    return html;
}


convert('./test.md', true);
