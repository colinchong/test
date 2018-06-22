(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
    });
})();

const searchedForText = 'hippos';
const unsplashRequest = new XMLHttpRequest();
unsplashRequest.onload = addImage;
unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
unsplashRequest.setRequestHeader('Authorization', 'Client-ID b2dd398a92a12647f3fd9e99fd4548c823e6497bfc086b8f0f3eecde7ca16404');
unsplashRequest.send();

function addImage(){
  debugger;
}

function addArticles () {}
const articleRequest = new XMLHttpRequest();
articleRequest.onload = addArticles;
articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=60ba585c35084a86b2fc31291e0b39f9`);
articleRequest.send();
