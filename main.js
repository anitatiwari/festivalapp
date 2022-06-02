import './style.css'


let scheduleJson;

let lineup = [];
let bandJson;


window.addEventListener("DOMContentLoaded", start);

async function start() {


//------------------------ FETCH ALL DATA

//Fetch bands
    const bandsPromise = await fetch("https://festevent-book.herokuapp.com/bands?max=10")
        .then(res => res.json())
        .then(d => {
            bandJson = d;
            displayLineup();
        });

        const schedulePromise = await fetch(
            "https://festevent-book.herokuapp.com/schedule"
          )
            .then((res) => res.json())
            .then((d) => {
              scheduleJson = d;
              displaySchedule();
            });    


//Fetch schedule

}
function displaySchedule() {
    var keys = Object.keys(scheduleJson);
    keys.forEach((key) => {
        let data = scheduleJson[key];
    
        Object.keys(data).forEach((day) => {
          let daydata = data[day];
          daydata.forEach((time) => {
            let list = document.createElement("li");
            list.setAttribute("class", "scheduleList")
            let element3 = document.createElement("div");
                  element3.innerText =
            "Act:   " +
            time["act"];
           
              element3.setAttribute("class", "stylethis3");
                          list.appendChild(element3);
            let listelem = dov.querySelector("#lineUp").appendChild(list);
            //  listelem.style.border="0.4px solid"
             listelem.style.fontSize="1em"
          
            })})})}
function displaySpots(spots){
  console.log(spots)
 spots.forEach((spot)=>{

  const template= document.querySelector("template#spots").content;
  const copy=template.cloneNode (true);


copy.querySelector(".area").textContent=spot.area;


  const parent=document.querySelector("#availableSpots");
  parent.appendChild(copy);
});
}
// Fetch Camping spots


// //................ Fetch all done


function displayLineup() {

    let temp = document.querySelector("#artist").content;
    let cont = document.querySelector(".elementcontainer");
    bandJson = bandJson.filter(artist=>{
      return artist.genre.startsWith("Pop");
      
    })
    bandJson = bandJson.filter(artist=> {
      return artist.logo.startsWith("http://");
    })

    bandJson.forEach((artist) => {
        let clone = temp.cloneNode(true);
        clone.querySelector("#bandName").innerHTML = artist.name;
        clone.querySelector("#genre").innerHTML =  "(" + artist.genre +")";
        if (artist.logo.startsWith("http://")) {
            clone.querySelector("#logo").src = artist.logo;
        } else {
            clone.querySelector("#logo").src = "http://placeimg.com/720/480/nature?76645";
        }
        artist.members.forEach(m=>{
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(m))
            clone.querySelector("#member").appendChild(li)
        })
        clone.querySelector("#details").addEventListener('click', function () {
            openArtist(artist);
        });

        document.querySelector(".elementcontainer").appendChild(clone);
        
    });
}


//------------------------ SHOW SINGLE ARTIST

function openArtist(artist) {


    // SHOW ARTIST INFO

    const modal = document.querySelector("#modal")
    openModal(modal)

    document.querySelector(".title").innerHTML = artist.name
    document.querySelector(".modal-body").innerHTML = artist.bio
    document.querySelector(".logo2").src = artist.logo
document.getElementById("member2").innerHTML=artist.members
}


const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')


overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}


