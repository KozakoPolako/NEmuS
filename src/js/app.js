
import "core-js/stable";
import "regenerator-runtime/runtime";


/**
 * Download games covers from server and inserting them into document
 */
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
      img.name = game;
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


    //Play button
    const play_btn = document.createElement("div");
    play_btn.className = "playBtn";
    play_btn.innerHTML = "Play";


    //Back button
    const back_btn = document.createElement("div");
    back_btn.className = "backBtn";
    back_btn.innerHTML = "Back";

    //Blur screen element
    const blur = document.createElement("div");
    blur.className = "blur";

    //Style tag which contains position of specific title 
    const style = document.createElement('style');
    style.type = 'text/css';
    let i = 0;




    
    /**
     * Add css class which contain element position to parent element of passed IMG element 
     * @param {IMG} element 
     */
    const addPos = function (element) {
     
      style.innerHTML += '.imgAnm' + i + ' img { left: ' + element.x + "px" + '; top: ' + (element.y) + "px" + '; transition: left 1s linear, top 1s linear;  } ';
      document.getElementsByTagName('head')[0].appendChild(style);

      element.parentElement.className += " imgAnm" + i;
      console.log(element.y + " X "+element.x);
      //console.log("dzień dobry");

      //console.dir(element.children[0]);
      i++;
    };

    /**
     * Determinate how back button works
     */
    const back = () => {

      chosen.classList.remove("chosen");
      table.style.pointerEvents = "";
      document.body.style.overflow = "";
      blur.remove();
      back_btn.remove();
      play_btn.remove();
      
    };

    /**
     * Determinate how back button works
     */
    const play = () => {
      console.log("play");
    };
    
    let chosen = {};

    titles.forEach(element => {
      /** 
       * Determinate action after click on a title
       */
      element.addEventListener("click", (e) => {
        
        addPos(e.target);
        //console.dir(e.target);

        element.classList.add("chosen");
        
        //Remove class given by addPos() to triger annimation and disable pointer events of all titles
        const classes = element.className.split(" ");
        element.classList.remove(classes[1]);
        chosen = e.target.parentElement;
        table.style.pointerEvents = "none";

        //Disable scrolling
        document.body.style.overflow = 'hidden';
        


        //Build sellection screen
        document.body.insertBefore(blur, document.body.lastChild);
        document.body.insertBefore(play_btn, document.body.lastChild);
        document.body.insertBefore(back_btn, document.body.lastChild);
        back_btn.addEventListener("click", back);
        play_btn.addEventListener("click", play);

        


      });

    });


    console.log("to jest to zajebiście śmiga, jak zła");
  });
