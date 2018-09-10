$(document).ready(goGoApp);
function goGoApp(){
    const fishCalc = new Calculator;
    fishCalc.addWizard();
}
class Fish {
    constructor(fishName, xp, basePrice){
        this.name = fishName;
        this.xp = xp;
        this.price = basePrice;
    }
    render(){
        const fishElement = $("<div>").addClass("calculator__display__fish");
        const fishName = $("<p>").text(this.name).addClass("calculator__display__fish__item");
        const fishXP = $("<p>").text(`Your ${this.name} is worth ${this.xp}xp`).addClass("calculator__display__fish__item");
        const fishPrice = $("<p>").text(`Your ${this.name} is worth ${this.price} gold.`).addClass("calculator__display__fish__item");
        $(fishElement).append(fishName, fishXP, fishPrice);
        $(".calculator__display").append(fishElement);
    }
}
class Item {
    constructor(fishName, basePrice, xp){
        this.name = fishName;
        this.price = basePrice;
        this.xp = xp;
    }
    render(){
        const itemElement = $("<div>").addClass("calculator__display__fish");
        const itemName = $("<p>").text(this.name).addClass("calculator__display__fish__item");
        const itemXP = $("<p>").text(`Your ${this.name} is worth ${this.xp}xp`).addClass("calculator__display__fish__item");
        const itemPrice = $("<p>").text(`Your ${this.name} is worth ${this.price} gold.`).addClass("calculator__display__fish__item");
        $(itemElement).append(itemName, itemXP, itemPrice);
        $(".calculator__display").append(itemElement);
    }
}
class Calculator {
    constructor(){
        this.addedItems = [];
        this.addFish = this.addFish.bind(this);
        this.addItem = this.addItem.bind(this);
        this.addWizard = this.addWizard.bind(this);
        this.addAdditionalWizard = this.addAdditionalWizard.bind(this);
        // this.createItemSelectorElement = this.createItemSelectorElement.bind(this);
    }
    addWizard(){
        const fishWiz = new FishWizard(this.addFish, this.addItem);
        console.log("adding a new wizard");
        $(".start-item-selector").click(fishWiz.startCalculator);
        // $(".start-fish-selector").click(fishWiz.startFishSelector);
        $(".start-quality-selector").click(fishWiz.startQualitySelector);
        $(".start-modifier-selector").click(fishWiz.startModifierSelector);
        $(".start-final-calculation").click(fishWiz.startFinalCalculation);
        $(".addition-item").click(this.addAdditionalWizard);
        if($(".calculator__display__buttons").hasClass("display-none")){
            fishWiz.startCalculator();
        }
    }
    addAdditionalWizard(){
        $(".calculator__display__buttons").addClass("display-none");
        
        this.addWizard();
        
    }
    // createItemSelectorElement(){
    //     const itemSelector = $("<div>").addClass("item-selector");
    //     const selectBox = $("<select>").addClass("item-selector__dropdown")
    //                         .append(itemSelectorOptions.map(function(item) {
    //                             return $('<option/>', {
    //                                 value: item,
    //                                 text: item
    //                             })
    //                             }))
    //                         .attr("id", "item-selector__dropdown");
    //     const itemSelectButton = $("<button>Next</button>").addClass("start-fish-selector").live("click", this.startFishSelector);
    //     $(itemSelector).append(selectBox, itemSelectButton);
    //     $(".calculator__selections").append(itemSelector);
    // }
    addFish(fishName, difficulty, quality, basePrice){
        const fish = new Fish(fishName, difficulty, quality, basePrice)
        const makeFish = fish.render();
        $(".calculator__display").append(makeFish);
        this.addedItems.push(fish);
        console.log(this.addedItems, "parent added items");
    }
    addItem(fishName, basePrice, xp){
        const item = new Item(fishName, basePrice, xp)
        const makeItem = item.render();
        $(".calculator__display").append(makeItem);
        this.addedItems.push(item);
        console.log(this.addedItems, "parent added items");
    }
    render(){
    }
}


class FishWizard {
// Controls the options for fish selection and value setting
//TODO: Complete converting functions to dynamically create the dom elements
    constructor(addFish, addItem){
        this.price = null;
        this.fishElement = null;
        this.addedItems = [];
        this.calculationInfo = {
            "itemType": null,
            "itemBaseXP": null,
            "fishType": null,
            "difficulty": null,
            "quality": null,
            "modifiers": null
        }
        this.startCalculator = this.startCalculator.bind(this);
        this.startFishSelector = this.startFishSelector.bind(this);
        this.startQualitySelector = this.startQualitySelector.bind(this);
        this.startModifierSelector = this.startModifierSelector.bind(this);
        this.startFinalCalculation = this.startFinalCalculation.bind(this);
        this.calculateFishXP = this.calculateFishXP.bind(this);
        this.addFish = addFish;
        this.addItem = addItem;

    }
    
    startCalculator(){
        const itemSelectorOptions = ["Select Item", "Trash", "Algae", "Crab Pot", "Fish"];
        console.log('started fish wizard!');
        $('.calculator__text__item').text('What did you catch?');
        $('.start-item-selector').detach();
        const itemSelector = $("<div>").addClass("item-selector");
        const selectBox = $("<select>").addClass("item-selector__dropdown")
                            .append(itemSelectorOptions.map(function(item) {
                                return $('<option/>', {
                                    value: item,
                                    text: item
                                })
                                }))
                            .attr("id", "item-selector__dropdown");
        const itemSelectButton = $("<button>Next</button>").addClass("start-fish-selector").click(this.startFishSelector);
        $(itemSelector).append(selectBox, itemSelectButton);
        $(".calculator__selections").append(itemSelector);
    }
    startFishSelector(){
        console.log('starting fish selector');
        const item = $(".item-selector :selected").text();
        $('.item-selector').detach();
        if(item === "Trash" || item === "Algae"){
            this.calculationInfo.itemType = item;
            this.calculationInfo.itemBaseXP = 3;
            $('.calculator__text__item').text('Did you have any catch modifiers? Choose your highest one.');
            $(".modifiers").removeClass("display-none");
            return;
        }
        if(item === "Crab Pot"){
            this.calculationInfo.itemType = item;
            this.calculationInfo.itemBaseXP = 5;
            // this.addedItems.push({"item": item, "xp": 5});
            this.addItem("name", "price", this.calculationInfo.itemBaseXP);
            $(".calculator__display").removeClass("display-none");
            $(".calculator__display__buttons").removeClass("display-none");
            return;
        }
        if(item==="Fish"){
            this.calculationInfo.itemType = item;
            $('.calculator__text__item').text('What fish did you catch?');
            $(".fish-selector").removeClass("display-none");
            return;
        }
    }
    startQualitySelector(){
        const fishType = $(".fish-selector :selected").text();
        this.calculationInfo.fishType = fishType;
        $(".fish-selector").detach();
        $('.calculator__text__item').text('What quality fish did you catch?');
        $(".fish-quality").removeClass("display-none");
    }
    startModifierSelector(){
        if(this.calculationInfo.itemType === "Fish"){
            const quality = $("input[name=quality]:checked").val();
            this.calculationInfo.quality = quality;
        }
        $(".fish-quality").detach();
        $('.calculator__text__item').text('Did you have any catch modifiers? Choose your highest one.');
        $(".modifiers").removeClass("display-none");
    }
    startFinalCalculation(){
        const modifiers = $("input[name=modifiers]:checked").val();
        let finalXP = null;
        if(modifiers === "None"){
            this.calculationInfo.modifiers = 1;
        }
        if(modifiers === "Treasure"){
            this.calculationInfo.modifiers = 2.2;
        }
        if(modifiers === "Perfect"){
            this.calculationInfo.modifiers = 2.4;
        }
        if(modifiers === "Legendary"){
            this.calculationInfo.modifiers = 5;
        }
        $(".modifiers").detach();
        if(this.calculationInfo.itemType === "Fish"){
            this.calculationInfo.difficulty = fish[this.calculationInfo.fishType].difficulty;
            this.price = fish[this.calculationInfo.fishType].basePrice;
            console.log(this.calculationInfo.difficulty, "Difficulty");
            finalXP = this.calculateFishXP(this.calculationInfo.difficulty, this.calculationInfo.quality, this.calculationInfo.modifiers);
            this.addFish(this.calculationInfo.fishType, finalXP, this.price);
        }
        if(this.calculationInfo.itemType === "Trash" || this.calculationInfo.itemType === "Algae"){
            finalXP = Math.round(((3*this.calculationInfo.modifiers) + 0.00001) * 100) / 100;
            this.addItem(this.calculationInfo.itemType, 0, finalXP);
        }
        $(".calculator__display").removeClass("display-none");
        $(".calculator__display__buttons").removeClass("display-none");
    }
    calculateFishXP(difficulty, quality, modifiers){
        const normal = "normal";
        const silver = "silver";
        const gold = "gold";
        let baseXP = null;
        if(quality === normal){
            baseXP = 3 + (difficulty/3);
        }
        if(quality === silver){
            baseXP = 6 + (difficulty/3);
        }
        if(quality === gold){
            baseXP = 9 + (difficulty/3);
        }
        let finalXP = baseXP*modifiers;
        finalXP = Math.round((finalXP + 0.00001) * 100) / 100;
        console.log(finalXP, "finalxp");
        return finalXP;
    }
}

