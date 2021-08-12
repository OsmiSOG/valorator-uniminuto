window.$ = window.jQuery = require('jquery');

import map from "./controller/map";
import evaluateController from "./controller/evaluate";
import consultCotroller from "./controller/consult";
// import borrarContorller from "./controller/remove";


const entryPoint = 'subcontent'
let currentAction = evaluateController

const actionsElement = document.getElementsByClassName('route-action')

for (const element of actionsElement) {
    element.addEventListener('click', action)    
}

init();

function action(event) {
    const typeAction = event.target.attributes.action;
    switch (typeAction) {
        case 'evaluate':
            currentAction = evaluateController;
            break;
        case 'consult':
            currentAction = consultCotroller;
            break;
        case 'borrar':
        
            break;
        default:
            break;
    }

    init();
}

function init() {
    render(currentAction.template, entryPoint)
    currentAction.init(map)
}

function render(template, entryPoint = 'App') {
    document.getElementById(entryPoint).innerHTML = template
}