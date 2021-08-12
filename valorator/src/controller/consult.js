function template() {
    return FormEvaluate.toString();
}

function init(map) {
    myMap = map
    myMap.on('click', onMapClick)
    $('#formEvaluateMapPoint').ready(() => {
        document.getElementById('formEvaluateMapPoint').onsubmit = sendInfo
    })
}

export default {
    template: template(),
    init
}