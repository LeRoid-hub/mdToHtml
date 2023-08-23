const { readFile } = require('fs/promises');

import './token.ts';


async function readThisFile(filePath: string) {

    try {
        const data = await readFile(filePath);
        let stringdata = data.toString();
        console.log(stringdata);
        
        let token:Token[] = tokenize(stringdata);
        convert_to_html(token);



    } catch (error) {
        console.error(`Got an error trying to read the file: ' . ${error.message}`);
    }
}




readThisFile('./test.md');
