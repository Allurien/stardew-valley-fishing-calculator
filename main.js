// There are 63 types of fish, including crab pot and seaweed, etc.
//Doc Prep
$(document).ready(goGoApp);
function goGoApp(){
    addClickHandlers();
}
const addClickHandlers=()=>{
    $(".start-item-selector").click(startCalculator);
    $(".start-fish-selector").click(startFishSelector);
    $(".start-quality-selector").click(startQualitySelector);
    $(".start-modifier-selector").click(startModifierSelector);
    $(".start-final-calculation").click(startFinalCalculation);
}
//Click Handlers
const startCalculator = () => {
    $(".calculator__text").addClass("display-none");
    $(".item-selector").removeClass("display-none");
}
const startFishSelector = () => {
    $(".item-selector").addClass("display-none");
    const item = $(".item-selector :selected").text();
    let itemNumber = null;
    if(item === "Trash" || item === "Algae"){
        calculationInfo.itemType = item;
        calculationInfo.itemsCalculated = calculationInfo.itemsCalculated + 1;
        itemNumber = `calculatorItems.item${calculationInfo.itemsCalculated}`
        itemNumber.baseXP = 3;
        $(".modifiers").removeClass("display-none");
        // $(".calculator__display").append(`<p>Your ${item} is worth 3xp.</p>`)
        return;
    }
    if(item === "Crab Pot"){
        calculationInfo.itemType = item;
        calculationInfo.itemsCalculated = calculationInfo.itemsCalculated + 1;
        itemNumber = `calculatorItems.item${calculationInfo.itemsCalculated}`
        itemNumber.baseXP = 3;
        $(".calculator__display").removeClass("display-none");
        $(".calculator__display").append(`<p>Your ${item} is worth 5xp.</p>`)
        return;
    }

    if(item==="Fish"){
        $(".fish-selector").removeClass("display-none");
        return;
    }

}
const startQualitySelector = () => {
    $(".fish-selector").addClass("display-none");
    $(".fish-quality").removeClass("display-none");
    const quality = $("input[name=quality]:checked").val();
}
const startModifierSelector = () => {
    $(".fish-quality").addClass("display-none");
    $(".modifiers").removeClass("display-none");
}
const startFinalCalculation = () => {
    $(".modifiers").addClass("display-none");
    $(".calculator__display").removeClass("display-none");
}

const calculationInfo = {
    "itemsCalculated": 0,
    "itemType": null,
    "fishType": null,
    "fishQuality": null,
    "modifiers": null
}
const calculatorItems = {

}

