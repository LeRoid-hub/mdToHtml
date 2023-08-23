import { Token, TokenType } from "./token";
export function convert_to_html(token: Token[]){
    let html = '';
    for(let i = 0; i < token.length; i++){
        if(token[i].getType() === TokenType.heading){
            html += `<h1>${token[i].getText()}</h1>`;
        }else if(token[i].getType() === TokenType.heading2){
            html += `<h2>${token[i].getText()}</h2>`;
        }else if(token[i].getType() === TokenType.heading3){
            html += `<h3>${token[i].getText()}</h3>`;
        }else if(token[i].getType() === TokenType.heading4){
            html += `<h4>${token[i].getText()}</h4>`;
        }else if(token[i].getType() === TokenType.heading5){
            html += `<h5>${token[i].getText()}</h5>`;
        }else if(token[i].getType() === TokenType.heading6){
            html += `<h6>${token[i].getText()}</h6>`;
        }else if(token[i].getType() === TokenType.paragraph){
            html += `<p>${token[i].getText()}</p>`;
        }else if(token[i].getType() === TokenType.blockquote){
            html += `<blockquote>${token[i].getText()}</blockquote>`;
        }else if(token[i].getType() === TokenType.code){
            html += `<pre><code>${token[i].getText()}</code></pre>`;
        }else if(token[i].getType() === TokenType.hr){
            html += `<hr>`;
        }else if(token[i].getType() === TokenType.newline){
            html += `<br>`;
        }else if(token[i].getType() === TokenType.unordered_list){
            html += `<ul><li>${token[i].getText()}</li>`;
            while(i< token.length -1 ){
                if(token[i+1].getType() === TokenType.unordered_list){
                    html += `<li>${token[i+1].getText()}</li>`;
                    i++;
                }else{
                    break;
                }
            }
            html += `</ul>`;
        }else if(token[i].getType() === TokenType.task || token[i].getType() === TokenType.task_checked){
            if(token[i].getType() === TokenType.task_checked){
                html += `<ul><li><input type="checkbox" checked>${token[i].getText()}</li>`;
            }else{
                html += `<ul><li><input type="checkbox">${token[i].getText()}</li>`;
            }
            while(i<token.length -1 ){
                if(token[i+1].getType() === TokenType.task_checked){
                    html += `<li><input type="checkbox" checked>${token[i+1].getText()}</li>`;
                    i++;
                }else if(token[i+1].getType() === TokenType.task){
                    html += `<li><input type="checkbox">${token[i+1].getText()}</li>`;
                    i++;
                }else{
                    break;
                }
            }
            html += `</ul>`;
        }
    }

    console.log(html);
    return html;
}
