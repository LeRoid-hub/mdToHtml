const { readFile } = require('fs/promises');

async function readThisFile(filePath) {
    let newLine = true;
    let currentState = null;
    let previousState = null;

    let finalString = '';
    let currentString = null; 

    try {
        const data = await readFile(filePath);
        console.log(data);
        let stringdata = data.toString();
        markdownToHtml(stringdata);



    } catch (error) {
        console.error(`Got an error trying to read the file: ' . ${error.message}`);
    }
}

function markdownToHtml(markdown) {
    // Replace headers (h1 - h6)
    markdown = markdown.replace(/######(.*?)\n/g, '<h6>$1</h6>');
    markdown = markdown.replace(/#####(.*?)\n/g, '<h5>$1</h5>');
    markdown = markdown.replace(/####(.*?)\n/g, '<h4>$1</h4>');
    markdown = markdown.replace(/###(.*?)\n/g, '<h3>$1</h3>');
    markdown = markdown.replace(/##(.*?)\n/g, '<h2>$1</h2>');
    markdown = markdown.replace(/#(.*?)\n/g, '<h1>$1</h1>');

    // Replace bold and italic
    markdown = markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    markdown = markdown.replace(/\_\_(.*?)\_\_/g, '<strong>$1</strong>');
    markdown = markdown.replace(/\*(.*?)\*/g, '<em>$1</em>');
    markdown = markdown.replace(/\_(.*?)\_/g, '<em>$1</em>');

    // Replace lists (ul and ol)
    markdown = markdown.replace(/\n\*(.*?)\n/g, '\n<ul><li>$1</li></ul>');
    markdown = markdown.replace(/\n\d\.(.*?)\n/g, '\n<ol><li>$1</li></ol>');

    // Replace line breaks
    markdown = markdown.replace(/  \n/g, '<br>');

    //Replace Quotes
    markdown = markdown.replace(/\n>(.*?)\n/g, '\n<blockquote>$1</blockquote>'); 

    //Replace Horizontal Rule
    markdown = markdown.replace(/\n---\n/g, '<hr>');

    //Replace Links
    markdown = markdown.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');


    //Replace New Lines
    markdown = markdown.replace(/\n/g, '<br>');
    console.log(markdown);
    return markdown;
}



readThisFile('./test.md');
