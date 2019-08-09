'use strict';

console.log('>> Ready :)');

//buscamos los campos del HTML
const input = document.querySelector('.main__input');
const button = document.querySelector('.main__button');
const mainContainer = document.querySelector('.list__container');

const baseUrl = 'http://api.tvmaze.com/search/shows?q=';

const favsContainer = document.querySelector('.fav__container');
const favsArray = JSON.parse(localStorage.getItem('itemsArray')) || [];
// const favsArray = [];
// function createNewElement(myElement, myClass, myContent ) {
//   const newElement = document.createElement(myElement);
//   newElement.classList.add(myClass);
//   const newElementContent = document.createTextNode(myContent);
//   newElement.appendChild(newElementContent);
//   return newElement;
// }
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
      }
      mainContainer.appendChild(newList);


      const allSeries = document.querySelectorAll('.show__list-item');

      for (let i=0; i<allSeries.length; i++) {
        allSeries[i].addEventListener('click', addFav);
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
    if (favsArray.includes(favShow) === false) {
      favsArray.push(favShow);
      writeFavsArray();
      localStorage.setItem('itemsArray', JSON.stringify(favsArray));
    }
  } else {
    const index = favsArray.indexOf(favShow);
    console.log(favsArray.indexOf(favShow));
    favsArray.splice(index, 1);

    localStorage.setItem('itemsArray', JSON.stringify(favsArray));
    writeFavsArray();
  }
}

function writeFavsArray(){

  favsContainer.innerHTML = '';
  const newFavList = document.createElement('ul');
  const titleFavList = document.createTextNode('Favoritos');
  newFavList.appendChild(titleFavList);
  newFavList.classList.add('fav__list');

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

    newFavDiv.appendChild(newFavImage);
    newFavDiv.appendChild(newFavTitle);
    newFavLi.appendChild(newFavDiv);
    newFavList.appendChild(newFavLi);
  }
  favsContainer.appendChild(newFavList);
}

//lsitener
button.addEventListener('click', searchShow);
