export enum TokenType {
    newline,
    paragraph,
    heading,
    heading2,
    heading3,
    heading4,
    heading5,
    heading6,
    blockquote,
    code,
    hr,
    list,
    unordered_list,
    task,
    task_checked,
    bold,
}

export class Token {
    type: TokenType;
    text?: string;

    constructor(type: TokenType, text?: string) {
        this.type = type;
        this.text = text;
    }

    getType() {
        return this.type;
    }

    getText() {
        return this.text;
    }

}


export function tokenize(content: string){
    const tokens: Token[] = [];

    let currentString: string = "";
    let newLine: boolean = true;
    let currentState: TokenType = TokenType.newline;

    for (let i = 0; i < content.length; i++) {
        const char = content[i];
        if (char === '\n') {
            if(currentString === '---'){
                currentState = TokenType.hr;
            }
            if(currentString  === '```'){
                currentState = TokenType.code;
                currentString = '';
                newLine = false;
                continue;
            }
            if(currentState === TokenType.code){
                if(currentString.length > 3 && currentString.substring(currentString.length - 3, currentString.length) === '```'){
                        currentString = currentString.substring(0, currentString.length - 3);
                        tokens.push(new Token(currentState, currentString));
                        currentString = '';
                        currentState = TokenType.newline;
                        newLine = true; 
                }else{
                    currentString += char;
                }
            }else if(currentString.trim().length > 0 && currentState === TokenType.newline){
                tokens.push(new Token(TokenType.paragraph, currentString));
                currentString = '';
                currentState = TokenType.newline;
                newLine = true;
            }else{
                tokens.push(new Token(currentState, currentString));
                currentString = '';
                currentState = TokenType.newline;
                newLine = true;
            }
        }else{
            currentString += char;
            //TODO: fix checkboxes - [] and - [x]
            if(newLine === true){
                if(char === ' ' && currentString.trim().length >0){
                    if(currentString.trim() === '#'){
                        currentState = TokenType.heading;
                        currentString = '';
                    }else if(currentString.trim() === '##'){
                        currentState = TokenType.heading2;
                        currentString = '';
                    }else if(currentString.trim() === '###'){
                        currentState = TokenType.heading3;
                        currentString = '';
                    }else if(currentString.trim() === '####'){
                        currentState = TokenType.heading4;
                        currentString = '';
                    }else if(currentString.trim() === '#####'){
                        currentState = TokenType.heading5;
                        currentString = '';
                    }else if(currentString.trim() === '######'){
                        currentState = TokenType.heading6;
                        currentString = '';
                    }else if(currentString.trim() === '>'){
                        currentState = TokenType.blockquote;
                        currentString = '';
                    }else if(currentString.trim() === '```'){
                        currentState = TokenType.code;
                        currentString = '';
                    }else if(currentString.trim() === '---'){
                        currentState = TokenType.hr;
                    }else if(currentString.trim() === '-[]'){
                        currentState = TokenType.task;
                        currentString = '';
                    }else if(currentString.trim() === '-[x]'){
                        currentState = TokenType.task_checked;
                        currentString = '';
                    }else if(currentString.trim() === '-'){
                        currentState = TokenType.unordered_list;
                        currentString = '';
                    }else {
                        currentState = TokenType.paragraph;
                    }
                    newLine = false;
                }

            }


        }

    }
    return tokens;
}




