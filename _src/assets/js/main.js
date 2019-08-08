'use strict';

console.log('>> Ready :)');

//buscamos los campos del HTML
const input = document.querySelector('.main__input');
const button = document.querySelector('.main__button');
const mainContainer = document.querySelector('.main__container');

const baseUrl = 'http://api.tvmaze.com/search/shows?q=';

// function createNewElement(myElement, myClass, myContent ) {
//   const newElement = document.createElement(myElement);
//   newElement.classList.add(myClass);
//   const newElementContent = document.createTextNode(myContent);
//   newElement.appendChild(newElementContent);
//   return newElement;
// }

function searchShow(){
  const searchedShow = input.value;
  const endpoint = `${baseUrl+searchedShow}`;
  console.log(endpoint);

  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      for (let i = 0; i < data.length ; i++){
        const name = data[i].show.name;
        const imageAlt = data[i].show.name;
        const showId = data[i].show.id;
        const show = data[i].show;
        console.log(data[i].show.name);


        let imageURL = '';
        if (data[i].show.image === null){
          imageURL = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
        }
        else{
          imageURL = data[i].show.image.medium;
        }

        const newList = document.createElement('ul');
        newList.classList.add('show__list');

        const newLi = document.createElement('li');
        newLi.classList.add('show__list-item');
        newLi.id = showId;

        const newDiv = document.createElement('div');
        newDiv.classList.add('show__list-container');


        const newImage = document.createElement('img');
        newImage.classList.add('show__list-image');
        newImage.src = imageURL;
        newImage.alt = imageAlt;

        const newTitle = document.createElement('h2');
        newTitle.classList.add('show__list-title');
        const titleContent = document.createTextNode(name);
        newTitle.appendChild(titleContent);

        newDiv.appendChild(newImage);
        newDiv.appendChild(newTitle);
        newList.appendChild(newDiv);
        mainContainer.appendChild(newList);


      }


    });
}


//lsitener
button.addEventListener('click', searchShow);
