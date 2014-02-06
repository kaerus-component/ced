var $ = require('elem'),
    commander = require('./commander');

module.exports = function Ced(container) {
    if(!(this instanceof Ced))
        return new Ced(container);

    container = $(container); 
    
    container.append(commander);

    container.on('click',oneditor);

    this.container = container;    
}

function oneditor(e){
    var cmd = e.target.getAttribute('data-ced'),
        state = document.queryCommandState(cmd);

    console.log("command(%s) state:", cmd, state);
    switch(cmd) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'p':
            document.execCommand('formatblock', false, '<'+cmd+'>');
            break;
        case 'insertUnorderedList': 
        case 'insertOrderedList': 
            if(document.queryCommandState(cmd)) { cmd = 'outdent'; }
        default:
            document.execCommand(cmd, false, null);
            break;
    }
}
