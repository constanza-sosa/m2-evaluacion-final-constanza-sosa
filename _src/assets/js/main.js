'use strict';

const input = document.querySelector('.main__input');
const button = document.querySelector('.main__button');
const mainContainer = document.querySelector('.list__container');

const baseUrl = 'http://api.tvmaze.com/search/shows?q=';

const favsContainer = document.querySelector('.fav__container');
let favsArray = JSON.parse(localStorage.getItem('itemsArray')) || [];

writeFavsArray();


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

        const newLi = document.createElement('li');
        newLi.classList.add('show__list-item');
        newLi.id = id;

        const newDiv = document.createElement('div');
        newDiv.classList.add('show__list-container');

        const newImage = document.createElement('img');
        newImage.classList.add('show__list-image');
        newImage.src = imageURL;
        newImage.alt = imageAlt;

        const newTitle = document.createElement('h2');
        newTitle.classList.add('show__list-title');
        newTitle.classList.add(`'show__list-title${id}'`);
        const titleContent = document.createTextNode(name);
        newTitle.appendChild(titleContent);

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
      writeFavsArray();
      localStorage.setItem('itemsArray', JSON.stringify(favsArray));
    }
  } else {
    let obj = favsArray.find(data => data.id === `${showId}`);
    const index = favsArray.indexOf(obj);
    favsArray.splice(index, 1);
    localStorage.setItem('itemsArray', JSON.stringify(favsArray));
    writeFavsArray();
  }
}

function writeFavsArray(){

  favsContainer.innerHTML = '';
  const newFavList = document.createElement('ul');
  const titleFavList = document.createTextNode('');
  newFavList.appendChild(titleFavList);
  newFavList.classList.add('fav__list');

  const resetButton = document.createElement('button');
  const resetButtonContent = document.createTextNode('Reset');
  resetButton.appendChild(resetButtonContent);
  resetButton.classList.add('reset__button');


  for (const item of favsArray){

    const newFavLi = document.createElement('li');
    newFavLi.classList.add('fav__list-item');
    newFavLi.id = item.id;

    const newFavDiv = document.createElement('div');
    newFavDiv.classList.add('fav__list-container');

    const newFavImage = document.createElement('img');
    newFavImage.classList.add('fav__list-image');
    newFavImage.src = item.image;
    newFavImage.alt = item.title;

    const newFavTitle = document.createElement('h2');
    newFavTitle.classList.add('show__list-title');
    const titleFavContent = document.createTextNode(item.title);
    newFavTitle.appendChild(titleFavContent);

    const newFavButton = document.createElement('button');
    newFavButton.classList.add('close__button');
    const buttonFavContent = document.createTextNode('X');
    newFavButton.setAttribute('type', 'button');
    newFavButton.appendChild(buttonFavContent);

    newFavDiv.appendChild(newFavButton);
    newFavDiv.appendChild(newFavImage);
    newFavDiv.appendChild(newFavTitle);
    newFavLi.appendChild(newFavDiv);
    newFavList.appendChild(newFavLi);

  }
  newFavList.appendChild(resetButton);
  favsContainer.appendChild(newFavList);

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

  let obj = favsArray.find(data => data.id === `${liId}`);
  const index = favsArray.indexOf(obj);
  favsArray.splice(index, 1);
  localStorage.setItem('itemsArray', JSON.stringify(favsArray));
  writeFavsArray();
}

function resetFav(){
  favsContainer.innerHTML = '';
  mainContainer.innerHTML = '';
  localStorage.removeItem('itemsArray');
  favsArray = [];
}

button.addEventListener('click', searchShow);
input.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    button.click();
  }
});
