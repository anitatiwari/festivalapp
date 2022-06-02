let scheduleJson;
let spotsJson;
window.addEventListener("DOMContentLoaded", init);

async function init() {
  const schedulePromise = await fetch(
    "https://festevent-book.herokuapp.com/schedule"
  )
    .then((res) => res.json())
    .then((d) => {
      scheduleJson = d;
      displaySchedule();
    });

  console.log(scheduleJson);}
  
function displaySchedule() {
    // console.log("hello" , scheduleJson["Jotunheim"]);
    let temp = document.querySelector(".time");
   var keys = Object.keys(scheduleJson);

    let content1 = document.querySelector("#content1");
    let content2 = document.querySelector("#content2");
    let content3 = document.querySelector("#content3");
   
  
    content1.style.height = "50vw";
    content2.style.height = "50vw";
    content3.style.height = "50vw";
  
    document.querySelector("#tablinks1").addEventListener("click", tab);
    function tab() {
      if (content1.style.display === "block") {
        content1.style.display = "none";
  
        document.querySelector("#tablinks1").style.backgroundColor = "";
      } else {
        content1.style.display = "block";
        document.querySelector("#tablinks1").style.backgroundColor = "#000000";
        document.querySelector("#tablinks2").style.backgroundColor = "";
        document.querySelector("#tablinks3").style.backgroundColor = "";
        // content1.style.overflow = "scroll";
      }
      content2.style.display = "none";
      content3.style.display = "none";
    }
    tab();
    document.querySelector("#tablinks2").addEventListener("click", function () {
      if (content2.style.display === "block") {
        content2.style.display = "none";
        document.querySelector("#tablinks2").style.backgroundColor = "";
      } else {
        content2.style.display = "block";
        document.querySelector("#tablinks2").style.backgroundColor = "#000000";
        document.querySelector("#tablinks3").style.backgroundColor = "";
        document.querySelector("#tablinks1").style.backgroundColor = "";
      }
      content1.style.display = "none";
      content3.style.display = "none";
    });
    document.querySelector("#tablinks3").addEventListener("click", function () {
      if (content3.style.display === "block") {
        content3.style.display = "none";
        document.querySelector("#tablinks3").style.backgroundColor = "";
      } else {
        content3.style.display = "block";
        document.querySelector("#tablinks3").style.backgroundColor = "#000000";
        document.querySelector("#tablinks2").style.backgroundColor = "";
        document.querySelector("#tablinks1").style.backgroundColor = "";
      }
      content1.style.display = "none";
      content2.style.display = "none";
    });
    keys.forEach((key) => {
      let clone = temp.cloneNode(true);
      let data = scheduleJson[key];
  
      Object.keys(data).forEach((day) => {
        let daydata = data[day];
        daydata.forEach((time) => {
          let list = document.createElement("li");
          list.setAttribute("class", "scheduleList")
          let element3 = document.createElement("div");
          let element1 = document.createElement("div");
          let element2 = document.createElement("div");
        
          element1.setAttribute("class", "stylethis");
      element3.innerText =
          "Act:   " +
          time["act"]
          element1.innerText =
            "Start:  - " +
            time["start"]
            element3.setAttribute("class", "stylethis3");
          
            element2.setAttribute("class", "stylethis2");
            element2.innerText =
              "end:  - " +
              time["end"];
              list.appendChild(element3);
              list.appendChild(element1);
              list.appendChild(element2);
            
        

          let listelem = clone.querySelector("#" + day + " ul").appendChild(list);
          //  listelem.style.border="0.4px solid"
           listelem.style.fontSize="1em"

        });
      });
  
      clone.removeAttribute("hidden");
      document.querySelector("." + key).appendChild(clone);
    });
  }