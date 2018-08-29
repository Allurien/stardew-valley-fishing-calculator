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
