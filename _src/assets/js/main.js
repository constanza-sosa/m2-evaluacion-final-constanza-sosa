'use strict';

console.log('>> Ready :)');

//buscamos los campos del HTML
const input = document.querySelector('.main__input');
const button = document.querySelector('.main__button');
const mainContainer = document.querySelector('.main__container');




//lsitener
button.addEventListener('click', searchShow);
