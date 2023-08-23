enum TokenType {
    newline,
    paragraph,
    heading,
    blockquote,
    code,
    hr,
    list,
}

class Token {
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


function tokenize(content: string){
    const tokens: Token[] = [];

    let currentString: string = "";
    let newLine: boolean = true;
    let currentState: TokenType = TokenType.newline;

    for (let i = 0; i < content.length; i++) {
        const char = content[i];
        if (char === '\n') {
            tokens.push(new Token(currentState, currentString));
            currentString = '';
            currentState = TokenType.newline;
            newLine = true;
        }else{
            currentString += char;
            if(newLine === true){
                if(char === ' '){
                    if(currentString === '#'){
                        currentState = TokenType.heading;
                    }else if(currentString === '>'){
                        currentState = TokenType.blockquote;
                    }else if(currentString === '```'){
                        currentState = TokenType.code;
                    }else if(currentString === '---'){
                        currentState = TokenType.hr;
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




