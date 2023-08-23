function convert_to_html(token: Token[]){
    let html = '';
    for(let i = 0; i < token.length; i++){
        if(token[i].getType() === TokenType.heading){
            html += `<h1>${token[i].getText()}</h1>`;
        }else if(token[i].getType() === TokenType.paragraph){
            html += `<p>${token[i].getText()}</p>`;
        }else if(token[i].getType() === TokenType.blockquote){
            html += `<blockquote>${token[i].getText()}</blockquote>`;
        }else if(token[i].getType() === TokenType.code){
            html += `<pre><code>${token[i].getText()}</code></pre>`;
        }else if(token[i].getType() === TokenType.hr){
            html += `<hr>`;
        }
    }
    console.log(html);
    return html;
}
