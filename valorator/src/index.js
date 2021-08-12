window.$ = window.jQuery = require('jquery');

import map from "./controller/map";
import evaluateController from "./controller/evaluate";
import consultCotroller from "./controller/consult";


const entryPoint = 'subcontent'
let currentAction = evaluateController

const actionsElement = document.getElementsByClassName('route-action')

for (const element of actionsElement) {
    element.addEventListener('click', action)    
}

init();

function action(event) {
    currentAction.destroy();
    const typeAction = event.target.attributes.action.value;
    switch (typeAction) {
        case 'evaluate':
            currentAction = evaluateController;
            break;
        case 'consult':
            currentAction = consultCotroller;
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