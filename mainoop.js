class Fish {
    constructor(fishName, difficulty, quality, basePrice){
        this.name = fishName;
        this.difficulty = difficulty;
        this.quality = quality;
        this.price = basePrice;
        this.fishElement = null;
    }
    calculateFishXP(difficulty, quality){
        const normal = "normal";
        const silver = "silver";
        const gold = "gold";
        const baseXP = null;
        if(quality === normal){
            baseXP = 3 + (difficulty/3);
        }
        if(quality === silver){
            baseXP = 6 + (difficulty/3);
        }
        if(quality === gold){
            baseXP = 9 + (difficulty/3);
        }
        baseXP = Math.round((baseXP + 0.00001) * 100) / 100;
        return baseXP;
    }
    calculateFishValue(quality, basePrice){

    }
    render(){
        this.fishElement = $("<div>").hasClass("calculator__display__fish");
        this.fishName = $("<p>").text(this.name).hasClass("calculator__display__fish__item");
        this.fishXP = $("<p>").text(this.calculateFishValue(this.difficulty, this.quality)).hasClass("calculator__display__fish__item");
        this.fishPrice = $("<p>").text("result of price processing here").hasClass("calculator__display__fish__item");
        $(this.fishElement).append(this.fishName, this.fishXP, this.fishPrice);
        $(".calculator__display").append(this.fishElement);

    }
}
class Calculator {
    constructor(){

    }
    addFish(fishName, difficulty, quality, basePrice){
        const fish = new Fish(fishName, difficulty, quality, basePrice)
        const makeFish = Fish.render();

    }
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
    let itemBaseXP = null;
    if(item === "Trash" || item === "Algae"){
        calculationInfo.itemType = item;
        itemBaseXP = 3;
        $(".modifiers").removeClass("display-none");
        return;
    }
    if(item === "Crab Pot"){
        calculationInfo.itemType = item;
        itemBaseXP = 5;
        addedItems.push({"item": item, "xp": 5});
        $(".calculator__display").removeClass("display-none");
        $(".calculator__display").append(`<p>Your ${item} is worth 5xp.</p>`)
        return;
    }

    if(item==="Fish"){
        calculationInfo.itemType = item;

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