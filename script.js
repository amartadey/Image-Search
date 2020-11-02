const body = document.querySelector('body');
document.querySelector('#search-box').addEventListener('keyup', inputSearch);
function inputSearch(e){
    if(e.keyCode ===13){
        searchImage(e)
    }
}
function searchImage(e){
    e.preventDefault();
    var query = document.querySelector('#search-box').value;
    query = query.replace(/^\s+|\s+$/gm,'');
    query=query.replace(/\s\s+/g, '+');
    if(query){
         console.log(query);
         const PIXABAY = `https://pixabay.com/api/?key=14324962-56bff7393668e4578aa7564c9&q=${query}&image_type=photo`;
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
            for(single in data.hits){
                
                    output +=`
                    <div class="img-block" id="myBtn">            
                        <figure >
                            <img src="${data.hits[single].webformatURL}" alt="${data.hits[single].tags}">
                        </figure>
                        <div class="img-details">
                            <p><img src="${data.hits[single].userImageURL?data.hits[single].userImageURL:"https://pixabay.com/static/img/logo_square.png"}" alt=""> <span>${data.hits[single].user}</span></p>
                            <div>
                                <a href="${data.hits[single].pageURL}" target="_blank" class="full-img"><span class="material-icons">zoom_out_map</span></a>
                                <a href="${data.hits[single].pageURL}" target="_blank" class="full-img"><span class="material-icons">nat</span></a>
                            </div>
                        </div>
                    </div>
                     
                `;
                console.log(data.hits[single].userImageURL);
                console.log(data.hits[single]);
            }
            document.querySelector('#img-results').innerHTML = output;
            // console.log(data.hits);
            
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



