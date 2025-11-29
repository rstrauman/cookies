'use strict';

const cookieModal = document.querySelector('.cookie-modal');
const settingsModal = document.querySelector('.settings-modal');
const accept = document.querySelector('.accept');
const settings = document.querySelector('.settings');
const browserToggle = document.querySelector('.browser');
const opSys = document.querySelector('.os');
const width = document.querySelector('.width');
const height = document.querySelector('.height');
const save = document.querySelector('.save');

function setCookie(name, value, maxAge = 20){
        const options = {
        path: '/',
        SameSite: 'Lax'
    }

    if(maxAge){
        options.maxAge = maxAge; 
    }

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    for (let option in options){
        cookieString += `; ${option}=${options[option]}`;
    }
    document.cookie = cookieString; 
    return cookieString;
}

function getCookie(name){
    const cookies = document.cookie.split('; ');
    for(const cookie of cookies){
        const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim());
        if (decodeURIComponent(cookieName) === name) {
            return decodeURIComponent(cookieValue);
        }
    }
}

function getBrowser(){
    const browser = navigator.userAgent;

    if(browser.includes("Edg")) return "Edge";
    if(browser.includes("Chrome") && !browser.includes("Edg")) return "Chrome";
    if(browser.includes("Firefox")) return "Firefox";
    if(browser.includes("Safari") && !browser.includes("Chrome")) return "Safari";
    if(browser.includes("OPR")) return "Opera";

    return "Other";

}

function getOS(){
    const OS = navigator.platform.toLowerCase();

    if(OS.includes("win")) return "Windows";
    if(OS.includes("mac")) return "MacOS";
    if(OS.includes("linux")) return "Linux";
}

function getScreenSize(){
    return `${screen.width}x${screen.height}`;
}

function getWidth(){
    return screen.width;
}

function getHeight(){
    return screen.height;
}

window.addEventListener('load', () => {
    setTimeout(() => {
        if(navigator.cookieEnabled) {
            if(!document.cookie || document.cookie.length === 0) 
                cookieModal.showModal();
        }
    }, 2000 );
});

accept.addEventListener('click', () => {
    setCookie("browser", getBrowser());
    setCookie("os", getOS());
    setCookie("screenSize", getScreenSize());
    setCookie("consent", "all");

    cookieModal.close();
});

save.addEventListener('click', () => {
    if(browserToggle.checked) setCookie("browser", getBrowser());
    if(opSys.checked) setCookie("os", getOS());
    if(width.checked) setCookie("width", getWidth());
    if(height.checked) setCookie("height", getHeight());
    if(!browserToggle.checked && !opSys.checked && !width.checked && !height.checked) setCookie("consent", "rejected");
    settingsModal.close();
});

settings.addEventListener('click', () => {
    cookieModal.close();
    settingsModal.showModal();
});

