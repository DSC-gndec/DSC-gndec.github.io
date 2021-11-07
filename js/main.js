$(document).ready(function (e) {
    $(document).bind("contextmenu",function(e) {
      return false;
  });
});

function Fid(idv){if(document.getElementById(idv)===null){throw "Error:\n  Unable to find element with id '"+idv+"'"}else{return document.getElementById(idv);}}

// function myFunction(x) {
//   x.classList.toggle("change");
//   document.getElementsByClassName
// }

Fid('menu-btn').onclick=function(){
  Fid('menu-btn').classList.toggle("change");
  if (Fid('nav-links').classList.contains("nav-open")){Fid('nav-links').classList.add("nav-close");Fid('nav-links').classList.remove("nav-open");}
  else{Fid('nav-links').classList.add("nav-open");Fid('nav-links').classList.remove("nav-close");}
};

// document.getElementById("").style.display