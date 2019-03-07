let settings = {
    //Size of hexagons
    size: 80,
    //none glowing color
    color: [.13,.1,.1],
    //colorMod
    colorMod: .02,
    //glowing color
    glow: [1,.2,.1],
    //Scale of the height field
    scale: .2,
    //Speed of the height field-movement
    speed: .01,
    //Target Height Value
    target: .5,
    //Range Of Heights Around target to render
    range: .2,
    //Scale of hexagon modifier
    widthModifier:1.01,
    heightModifier:1.21
}

let setupSettings = () => {
    let settingsBtn = document.querySelector(".settingsIcon");
    let settingsMenu = document.querySelector(".settings");
    let bg = document.querySelector('#display');
    let setting = {
        size: document.querySelector("#size"),
        scale: document.querySelector("#scale"),
        speed: document.querySelector("#speed"),
        range: document.querySelector("#range"),
    }
    settingsBtn.addEventListener("click", () => {
        settingsBtn.classList.toggle("active");
        settingsMenu.classList.toggle("active");
    });
    setting.size.addEventListener("change", () => {
        settings.size = getSetting(10,150,setting.size.value);
        updateSettings(bg);
    })
    setting.scale.addEventListener("change", () => {
        settings.scale = getSetting(.1,.4,setting.scale.value);
        updateSettings(bg);
    })
    setting.speed.addEventListener("change", () => {
        settings.speed = 0.0004*getSetting(0,100,setting.speed.value);
        updateSettings(bg);
    })
    setting.range.addEventListener("change", () => {
        settings.range = getSetting(0,.5,setting.range.value);
        updateSettings(bg);
    })
}
let getSetting = (min, max, val) => {
    let comparison = max-min;
    val *= .01;
    comparison = val*comparison;
    return comparison + min;
}
let updateSettings = (bg) => {
    refreshDisplayHexagons(bg);
}