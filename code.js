
let photos_array = [];
let folder = document.querySelector("#Photosfolder").value;
let common_name = document.querySelector("#commonname").value;
let current_index = -1;
let prev_index = -1;
let idGlobal;
//1. Display initial image
document.getElementById("PhotoView").src = "InitialImage.jpg"
document.getElementById("PhotoLoad").onclick = create_photogrid;
//2. Create photogrid (array containing images)
function create_photogrid(){
    //get start and end values
    let start_img = document.getElementById("startnumber").value;
    let end_img = document.getElementById("endnumber").value;
    //Error: Invalid range
    if(end_img < start_img){
        document.getElementById("messages").innerHTML="Error: Invalid Range";
    }
    //load all photos in the array (photos in range)
    for(let i = start_img; i<=end_img; i++){
        let url = folder+common_name+i+".jpg";
        photos_array.push(url);
    }
}
//3. Create function to cycle through images that are needed
    //a. Standard slideshow
    document.getElementById("StandardSlideshow").onclick = slideshow;
    function slideshow(){
        idGlobal = setInterval("cycleImages()", 1000);
    }
    function cycleImages(){
       let imageElement = document.querySelector("#PhotoView");
       let currentElement = imageElement.src;
       let img_num = currentElement.indexOf("umcp");
       let img_url = currentElement.slice(img_num);
       let arr_pos = photos_array.indexOf(img_url);

       if(arr_pos == photos_array.length-1){
        arr_pos=0;
       }else{
        arr_pos+=1;
       }
       let img = photos_array[arr_pos];
       imageElement.src = img;
       document.getElementById("photoDisplayed").value = img;
    }
//  b. shuffle images then call cycling function
    let get_random = (num)=>Math.floor(Math.random()*num); /*LAMBDA*/
    document.getElementById("RandomSlideshow").onclick = random_slideshow;
    function random_slideshow(){
        idGlobal = setInterval("cycleImages_random()", 1000);
    }
    function cycleImages_random(){
       let random = get_random(photos_array.length);
       let imageElement = document.querySelector("#PhotoView");
       let img = photos_array[random];
       imageElement.src = img;
       document.getElementById("photoDisplayed").value = img;
    }
//  c. stop slideshow when needed
    document.getElementById("EndShow").onclick = end_show;
    function end_show(){
        clearInterval(idGlobal);
    }
//  d. Reset form
    document.getElementById("reset").onclick = resetform;
    function resetform(){
        let imageElement = document.querySelector("#PhotoView");
        imageElement.src="InitialImage.jpg";
        document.getElementById("messages").innerHTML = "Photo Viewer System";
    }
//4. JSON
    document.getElementById("JSONLoad").onclick = loadJSON;
    function loadJSON(){
        process();
    }
    async function process(){
        let url = document.querySelector("#JSONURL");
        console.log(url.value);
        const result = await fetch(url.value);
        const json = await result.json();
        console.log(json);
        let str = JSON.stringify(json);
        let new_photos = JSON.parse(str);

        if(new_photos && Array.isArray(new_photos.images)){
            //load images
            photos_array = new_photos.images.map(img=> img.url);
            
            //update images
            let imageElement = document.getElementById("PhotoView");
            imageElement.src = photos_array[0];
            document.querySelector("photoDisplayed").value = photos_array[0];
            curr_photo = 0;
        }
    }
//5. Iteration
//  a. First Photo

//  b. Previous Photo

//  c. Next Photo

//  d. Last Photo

