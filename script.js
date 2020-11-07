const body = document.querySelector('body');
var allObj,query;
var page=1;

            



document.querySelector('#search-box').addEventListener('keyup', inputSearch);
function inputSearch(e){
    if(e.keyCode ===13){
        query = document.querySelector('#search-box').value;
        e.preventDefault();
        body.querySelector('#img-results').innerHTML = "";
        page=1;
        searchImage(query);
    }
}
function catSearch(catQuery){
    body.querySelector('#img-results').innerHTML = "";
    page=1;
    query = catQuery;
    searchImage(catQuery);
}
function searchImage(searchKey = query){
    if(document.querySelector('.box-large-container')){
        let elem = document.querySelector('.box-large-container');
        elem.parentNode.removeChild(elem);
        body.classList.remove('open-container-img');
    }

    if(searchKey){
         const PIXABAY = `https://pixabay.com/api/?key=14324962-56bff7393668e4578aa7564c9&q=${encodeURIComponent(searchKey)}&image_type=photo&per_page=20&page=${page}`;
         const search = async ()=>{
            const response = await fetch(PIXABAY);
            if(response.status !==200){
                throw new Error('Cannot fetch the Data');
            }
            const data = await response.json();
            return data;
         }
         var output = '';
        search()
        .then((data)=>{
            allObj = data.hits;
            for(single in data.hits){
                
                    output =`
                            
                        <figure class="gradient">
                            <img src="${data.hits[single].webformatURL}" alt="${data.hits[single].tags}">
                        </figure>
                        <div class="img-details">
                            <p><img src="${data.hits[single].userImageURL?data.hits[single].userImageURL:"https://pixabay.com/static/img/logo_square.png"}" alt=""> <span>${data.hits[single].user}</span></p>
                            <div>
                                <a href="javascript:void(0);" class="full-img-popup" onclick = "imgZoom(${data.hits[single].id})" ><span class="material-icons">zoom_out_map</span></a>
                                <a href="${data.hits[single].pageURL}" target="_blank" class="full-img"><span class="material-icons">nat</span></a>
                            </div>
                        </div>
                    
                `;

            console.log(data.hits[single]);

            let imgBlock = document.createElement('div');
            imgBlock.classList.add('img-block');
            imgBlock.setAttribute("id", data.hits[single].id);
            imgBlock.innerHTML = output;
            body.querySelector('#img-results').appendChild(imgBlock);
                
               
            }
        })
        .catch((err)=>{ 
            document.querySelector('#error').style.display = "block";  
        })
    }
     
}

// Dark Light Mode Button

document.querySelector("#toggle-switch").addEventListener('click', modeButton);
function modeButton(e){
    e.preventDefault();
    if(this.querySelector('img').src.split("/").pop() =='moon.png'){
        this.querySelector('img').src = "sun.png";
        body.classList.remove("day");
        body.classList.toggle("dark");
    } else {
        this.querySelector('img').src = "moon.png";
        body.classList.toggle("day");
        body.classList.remove("dark");
    }
}

function imgZoom(imgId){


    const PIXABAYBIG = `https://pixabay.com/api/?key=14324962-56bff7393668e4578aa7564c9&id=${imgId}`;
    const search2 = async ()=>{
       const response2 = await fetch(PIXABAYBIG);
       if(response2.status !==200){
           throw new Error('Cannot fetch the Data');
       }
       const data2 = await response2.json();
       return data2;
    }
    var output = '';
   search2()
   .then((data2)=>{
       
        let allObj = data2.hits[0];
        console.log(allObj );
       let insertHtml = `
                <div class="large-container">
                    <div class="large-img-container">
                        <div class="title-block">
                            <div class="author">
                            <img src="${allObj.userImageURL?allObj.userImageURL:"https://pixabay.com/static/img/logo_square.png"}" alt="${allObj.user}">
                                <p><span>${allObj.user}</span></p>
                            </div>
                            <div class="img-by">
                                <a href="${allObj.pageURL}" target="_blank">
                                <span>Image By</span>
                                    <img src="https://pixabay.com/static/img/logo.svg" style="width:94px">
                                </a>
                            </div>
                            <div class="right-block">
                                <p> <a href="${allObj.pageURL}/#comments" target="_blank"><span class="material-icons">add_comment</span>${allObj.comments}</a></p>
                                <p><span class="material-icons">star_border</span>${allObj.favorites}</a></p>
                                <p><span class="material-icons">thumb_up</span>${allObj.likes}</a></p>
                            </div>
                        </div>
                        <div class="close-button" onclick = "closeImgbox()"><span class="material-icons">close</span></div>
                        <figure>
                            <img src="${allObj.largeImageURL}" alt="" id="big-mage">
                        </figure>
                        <div class="bottom-block">${makeAnchors((allObj.tags).split(","))}</div>
                    </div>
                </div>
           `;
           
           function makeAnchors(a){
               var anchrs='';
            a.forEach(element => {
                anchrs +=`
                <p onclick="catSearch('${element.trim()}')">${element.trim()}</p>
                `;
            });
            return anchrs;
           };
            var createLargeDiv = document.createElement('div');
           body.classList.add('open-container-img');
           createLargeDiv.classList.add('box-large-container');
           createLargeDiv.innerHTML = insertHtml;
           body.appendChild(createLargeDiv);
      
 })
   .catch((err)=>{ 
       document.querySelector('#error').style.display = "block";  
   })   
    
}

function closeImgbox(){
    var elem = document.querySelector('.box-large-container');
    elem.parentNode.removeChild(elem);
    body.classList.remove('open-container-img');
          
}

window.addEventListener("scroll",function(){
let limitBottom = document.documentElement.offsetHeight - window.innerHeight;
// console.log("Page: "+page);  
    limitBottom -=200;
  if(document.documentElement.scrollTop >= limitBottom){
    // console.log("Window scroll is at the bottom");
    if(page>6){
        page == 1;
    } else if(page<=3){
        page++;
    searchImage(query)
    }    
  }
})








