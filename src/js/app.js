//window.onscroll = function() {myFunction()};
//lista tytułow
import "core-js/stable";
import "regenerator-runtime/runtime";

const getGames = async () => {
  const bag = document.querySelector(".row");
  //const games = new Array();
  try {
    const res = await fetch("http://localhost:8081/list");
    const games = await res.json();
    console.dir(games);
    let title;
    let img;
    games.forEach(game => {

      title = document.createElement("div");
      img = document.createElement("img");
      title.classList.add("title");
      img.src = `http://localhost:8081/${game}/${game}.jpg`;
      title.appendChild(img);
      bag.appendChild(title);
      console.log(`http://localhost:8081/games/${game}.jpg`);
    });
  } catch(e) {
    console.error(e);
  }
  

};

getGames()
  .then(() => {




    const titles = document.querySelectorAll(".title");
    const table = document.querySelector(".row");


    //przycisk play 
    const play_btn = document.createElement("div");
    play_btn.className = "playBtn";
    play_btn.innerHTML = "Play";


    //przycisk cofnij
    const back_btn = document.createElement("div");
    back_btn.className = "backBtn";
    back_btn.innerHTML = "Back";

    //element blurujący ekran z-index 5 
    const blur = document.createElement("div");
    blur.className = "blur";


    const style = document.createElement('style');
    style.type = 'text/css';
    let i = 0;




    //dodawanie klasy CSS do elementu

    const addPos = function (element) {
      //style.innerHTML += '.imgAnm' + i + ' img { left: ' + element.children[0].x + "px" + '; top: ' + (element.children[0].y) + "px" + '; transition: left 1s linear, top 1s linear;  } ';
      style.innerHTML += '.imgAnm' + i + ' img { left: ' + element.x + "px" + '; top: ' + (element.y) + "px" + '; transition: left 1s linear, top 1s linear;  } ';
      document.getElementsByTagName('head')[0].appendChild(style);

      element.parentElement.className += " imgAnm" + i;
      console.log(element.y + " X "+element.x);
      //console.log("dzień dobry");

      //console.dir(element.children[0]);
      i++;
    };

    const back = function () {

      chosen.classList.remove("chosen");
      table.style.pointerEvents = "";
      document.body.style.overflow = "";
      blur.remove();
      back_btn.remove();
      play_btn.remove();
      
      //addPos(chosen.children[0]);
    };

    const play = function () {
      console.log("play");
    };
    //zaznaczony tytuł
    let chosen = {};

    titles.forEach(element => {
      element.addEventListener("click", function (e) {
        
        addPos(e.target);
        //console.dir(e.target);

        element.classList.add("chosen");
        //console.dir(element);
        const classes = element.className.split(" ");
        element.classList.remove(classes[1]);
        chosen = this;
        table.style.pointerEvents = "none";

        //wylaczanie scroola 
        document.body.style.overflow = 'hidden';
        //document.querySelector('html').scrollTop = window.scrollY;
        //**** */


        //blur.style.top = window.scrollY;
        document.body.insertBefore(blur, document.body.lastChild);
        document.body.insertBefore(play_btn, document.body.lastChild);
        document.body.insertBefore(back_btn, document.body.lastChild);
        back_btn.addEventListener("click", back);
        play_btn.addEventListener("click", play);

        //element.style +=" top: calc(50% - "+rect.height/2+") ; left: calc(50% - "+rect.width/2+") ;"; 
        //element.style +=" top: 50% ; left: 50% ;"; 


      });

    });


    console.log("to jest to zajebiście śmiga, jak zła");
  });
