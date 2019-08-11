'use strict';

const input = document.querySelector('.main__input');
const button = document.querySelector('.main__button');
const mainContainer = document.querySelector('.list__container');

const baseUrl = 'http://api.tvmaze.com/search/shows?q=';

const favsContainer = document.querySelector('.fav__container');
let favsArray = JSON.parse(localStorage.getItem('itemsArray')) || [];

writeFavsArray();

function createNewImageElement(myElement, myClass, mySrc, myAlt) {
  const newElement = document.createElement(myElement);
  newElement.classList.add(myClass);
  newElement.src = mySrc;
  newElement.alt = myAlt;
  return newElement;
}

function createNewElement(myElement, myClass, myContent) {
  const newElement = document.createElement(myElement);
  newElement.classList.add(myClass);
  const newElementContent = document.createTextNode(myContent);
  newElement.appendChild(newElementContent);
  return newElement;
}

function searchShow(){
  const searchedShow = input.value;
  const endpoint = `${baseUrl+searchedShow}`;

  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      mainContainer.innerHTML = '';
      const newList = document.createElement('ul');
      newList.classList.add('show__list');

      for (const item of data){
        const name = item.show.name;
        const imageAlt = item.show.name;
        const id = `a${item.show.id}`;
        let imageURL = '';
        if (item.show.image === null){
          imageURL = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
        }
        else{
          imageURL = item.show.image.medium;
        }

        const newLi = createNewElement('li', 'show__list-item', '');
        newLi.setAttribute('id', id);
        const newDiv = createNewElement('div', 'show__list-container', '');
        const newImage = createNewImageElement('img', 'show__list-image', imageURL, imageAlt);
        const newTitle = createNewElement('h2', 'show__list-title', name);

        newDiv.appendChild(newImage);
        newDiv.appendChild(newTitle);
        newLi.appendChild(newDiv);
        newList.appendChild(newLi);

        let obj = favsArray.find(data => data.id === `${id}`);
        if(obj !== undefined){
          newLi.classList.add('show__fav');
        }
        else {
          newLi.classList.remove('show__fav');
        }
      }
      mainContainer.appendChild(newList);

      const allSeries = document.querySelectorAll('.show__list-item');

      for (const item of allSeries) {
        item.addEventListener('click', addFav);
      }

    });
}

function addFav(event){
  const selectedShow = event.currentTarget;
  const showId = selectedShow.getAttribute('id');
  const shwowTitle = selectedShow.querySelector('.show__list-title').innerHTML;
  const showImage = selectedShow.querySelector('.show__list-image').src;
  const favShow = {
    'id': showId,
    'title': shwowTitle,
    'image': showImage
  };

  selectedShow.classList.toggle('show__fav');

  if (selectedShow.classList.contains('show__fav')) {
    let obj = favsArray.find(data => data.id === `${showId}`);
    if (obj === undefined) {
      favsArray.push(favShow);
      localStorage.setItem('itemsArray', JSON.stringify(favsArray));
      writeFavsArray();
    }
  } else {
    deleteObject(showId);
  }
}

function deleteObject(id){
  let obj = favsArray.find(data => data.id === `${id}`);
  const index = favsArray.indexOf(obj);
  favsArray.splice(index, 1);
  localStorage.setItem('itemsArray', JSON.stringify(favsArray));
  writeFavsArray();
}

function writeFavsArray(){

  favsContainer.innerHTML = '';

  const newFavList = createNewElement('ul', 'fav__list', 'Tus favoritos:');
  const resetButton = createNewElement('button', 'reset__button', 'Reset');
  resetButton.type = button;


  for (const item of favsArray){

    const newFavLi = createNewElement('li', 'fav__list-item', '');
    newFavLi.id = item.id;

    const newFavDiv = createNewElement('div', 'fav__list-container', '');
    const newFavImage = createNewImageElement('img', 'fav__list-image', item.image, item.title);
    const newFavTitle = createNewElement('h2', 'show__list-title', item.title);
    const newFavButton = createNewElement('button', 'close__button', 'X');
    resetButton.type = button;


    newFavDiv.appendChild(newFavButton);
    newFavDiv.appendChild(newFavImage);
    newFavDiv.appendChild(newFavTitle);
    newFavLi.appendChild(newFavDiv);
    newFavList.appendChild(newFavLi);

  }
  newFavList.appendChild(resetButton);
  favsContainer.appendChild(newFavList);

  if (favsArray.length === 0){
    newFavList.classList.add('hidden');
    resetButton.classList.add('hidden');
  }

  const closeButton = document.querySelectorAll('.close__button');

  for (const item of closeButton) {
    item.addEventListener('click', deleteStorage);
  }

  const resetButtonli = document.querySelector('.reset__button');
  resetButtonli.addEventListener('click', resetFav);
}

function deleteStorage(event){
  const li = event.currentTarget.parentElement.parentElement;
  const liId = li.id;

  deleteObject(liId);

  const allSeries = document.querySelectorAll('.show__list-item');
  for (const item of allSeries){
    if (item.id === `${liId}`){
      item.classList.toggle('show__fav');
    }
  }
}

function resetFav(){
  favsContainer.innerHTML = '';
  localStorage.removeItem('itemsArray');
  favsArray = [];
  const favsSelected = document.querySelectorAll('.show__fav');
  for (const item of favsSelected){
    item.classList.toggle('show__fav');
  }
}

button.addEventListener('click', searchShow);
input.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    button.click();
  }
});
