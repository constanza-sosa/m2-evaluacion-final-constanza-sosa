'use strict';

function createNewImageElement(myElement, myClass, mySrc, myAlt) {
  const newElement = document.createElement(myElement);
  newElement.classList.add(myClass);
  newElement.src = mySrc;
  newElement.alt = myAlt;
  return newElement;
}

function createNewElement(myElement, myClass, myContent ) {
  const newElement = document.createElement(myElement);
  newElement.classList.add(myClass);
  const newElementContent = document.createTextNode(myContent);
  newElement.appendChild(newElementContent);
  return newElement;
}

for (const item of data) {

  const newLI = createNewElement('li', 'news__item', '');

  const newTitle = createNewElement('h2', 'news__title', item.title);
  const newImg = createNewImageElement('img', 'news__image', item.image, item.title);

  newLI.appendChild(newTitle);
  newLI.appendChild(newImg);

  newsList.appendChild(newLI);

}

fetch(endpoint)
  .then(response => response.json())
  .then(data => {
    console.log(data.news);

    for (const item of data.news) {

      const newLI = createNewElement('li', 'news__item', '');
      newLI.classList.add('news__item--no-image-visible');

      const newTitle = createNewElement('h2', 'news__title', item.title);
      const newImg = createNewImageElement('img', 'news__image', item.image, item.title);

      newLI.appendChild(newTitle);
      newLI.appendChild(newImg);

      newsList.appendChild(newLI);

    }

    const newsItems = document.querySelectorAll('.news__item');
    for (const item of newsItems) {
      const title = item.querySelector('.news__title').innerHTML;

      if (title.includes('Mars') || title.includes('Martian')) {
        item.classList.add('news__item--from-mars');
      }
      item.addEventListener('click', changeImageClass);
    }


  });
