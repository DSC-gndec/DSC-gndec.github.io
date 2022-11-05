$(document).ready(function (e) {
  var CurrentYear = new Date().getFullYear();
  document.getElementById('date').innerText = CurrentYear;

  $(document).bind("contextmenu",function(e) {
    return false;
  });

  $(".event-img>img").each(function() {
      $(this).on('error', function(){
        $(this).hide();
        $(this).parent().attr('style','display: flex; justify-content: center; align-items: center; background-color: #ffe3e9; font-size: 13px; color: #ae4b65; font-weight: 500; padding-bottom: 20px;');
        $(this).parent().html('<i class="fa fa-exclamation-circle" style="font-size: 15px;padding-top: 2px;"></i>&nbsp;Image not found');
        // $(this).parent().html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style >.fa-secondary{opacity:.4}</style></defs><path d="M256 8C119 8 8 119.08 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 376a32 32 0 1 1 32-32 32 32 0 0 1-32 32zm38.24-238.41l-12.8 128A16 16 0 0 1 265.52 288h-19a16 16 0 0 1-15.92-14.41l-12.8-128A16 16 0 0 1 233.68 128h44.64a16 16 0 0 1 15.92 17.59z" class="fa-secondary" /><path d="M278.32 128h-44.64a16 16 0 0 0-15.92 17.59l12.8 128A16 16 0 0 0 246.48 288h19a16 16 0 0 0 15.92-14.41l12.8-128A16 16 0 0 0 278.32 128zM256 320a32 32 0 1 0 32 32 32 32 0 0 0-32-32z" class="fa-primary" /></svg> Image not found');
      });
  });
  
});





url_hash = window.location.hash;
if(url_hash == "#Developers"){
  window.addEventListener('load', function() {
    var developer_section = document.querySelector('.developer-section');
    document.querySelector('#Developers').scrollIntoView({
      behavior: 'smooth'
    });
    developer_section.classList.add('flash');
    this.setTimeout(function() {
      developer_section.classList.remove('flash');
    },10000);
  });
}


function Fid(idv){if(document.getElementById(idv)===null){throw "Error:\n  Unable to find element with id '"+idv+"'"}else{return document.getElementById(idv);}}
function Dqs(sv){if(document.querySelector(sv)===null){throw "Error:\n  Unable to select element with selector '"+sv+"'"}else{return document.querySelector(sv);}}
function Dqsa(sv){if(document.querySelectorAll(sv)===null){throw "Error:\n  Unable to select any element with selector '"+sv+"'"}else{return document.querySelectorAll(sv);}}

// function myFunction(x) {
//   x.classList.toggle("change");
//   document.getElementsByClassName
// }



// Navbar-controller
Fid('menu-btn').onclick=function(){
  Fid('menu-btn').classList.toggle("change");
  if (Fid('nav-links').classList.contains("nav-open")){Fid('nav-links').classList.add("nav-close");Fid('nav-links').classList.remove("nav-open");}
  else{Fid('nav-links').classList.add("nav-open");Fid('nav-links').classList.remove("nav-close");}
};
// End of Navbar-controller




// Scroll to top button
const scrollToTopButton = document.getElementById('js-top');
const scrollFunc = () => {
    let y = window.scrollY;
    if (y > 700) { scrollToTopButton.className = "btn btn-dark show";}
    else { scrollToTopButton.className = "btn btn-dark hide"; }
};
window.addEventListener("scroll", scrollFunc);

var pre = document.documentElement.scrollTop || document.body.scrollTop;
const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        if(pre<c){
            return;
        }
        else{
            pre = c;
            window.requestAnimationFrame(scrollToTop);
            window.scrollTo(0, c - c / 25);
        }
    }
};
scrollToTopButton.onclick = function (e) {
    e.preventDefault();
    pre = document.documentElement.scrollTop || document.body.scrollTop;
    scrollToTop();
}
// END Scroll to top button



function snackbar(Notification) {var x = document.getElementById("snackbar");x.innerHTML=Notification;x.className = "show";setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);}


// ========================= /Start-subscribe-form/=================================
var subscribe_local_data = get_data_object("subscribe_form_data");
var Subscribe_form = document.getElementById("my-form");
// var s_form_check = 0;
async function handleSubscribe(event) {
  event.preventDefault();
  subscribe_local_data = get_data_object("subscribe_form_data");

  var data = new FormData(event.target);
  if (data.get("email") == ""){
    document.querySelector('.f-subscribe').setAttribute('required', '');
    snackbar("Please fill the Email");
    return;
  }
  else{
    fetch(event.target.action, {
      method: Subscribe_form.method,
      body: data,
      headers: {
          'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        snackbar("Thanks for subscribing!");
        Subscribe_form.reset();
        subscribe_local_data.data+=1;
        Update_data("subscribe_form_data",subscribe_local_data.data);
      } else {
        // console.log(response.status);
        snackbar("Oops! Facing some issues<br>Please try again later");
      }
    }).catch(error => {
      // console.log(error);
      snackbar("Oops! Facing some issues<br>Please try again later");
    });
  }
}
Subscribe_form.addEventListener("submit", function(event){
  event.preventDefault();
  subscribe_local_data = get_data_object("subscribe_form_data");
  if(subscribe_local_data != null){
    if(is_date_expired(subscribe_local_data.expire_date)){
      Delete_data("subscribe_form_data");
    }
    else{
      if(subscribe_local_data.data<2){
        handleSubscribe(event);
      }
      else{
        snackbar("Max 2 Attempts Reached<br>Try again later");
        Subscribe_form.reset();
      }
    }
  }
  else{
    Save_data("subscribe_form_data",0,Add_24_Hours_to_Current_Date());
    handleSubscribe(event);
  }
});

// ========================= /End-subscribe-form/=================================



// ========================= /Start-Contact-form/=================================
try{
  var Contact_form = document.getElementById("contact-form");
  var contact_local_data = get_data_object("contact_form_data");

  async function handleContactForm(event) {
    event.preventDefault();
    contact_local_data = get_data_object("contact_form_data");
    var data = new FormData(event.target);
    if (data.get("name") == ""){
      document.querySelector('#name').setAttribute('required', '');
      snackbar("Please fill your name");
      return;
    }
    if (data.get("email") == ""){
      document.querySelector('#email').setAttribute('required', '');
      snackbar("Please fill your email");
      return;
    }
    if (data.get("message") == ""){
      document.querySelector('#message').setAttribute('required', '');
      snackbar("Please fill type something in message");
      return;
    }
    else{
      fetch(event.target.action, {
        method: Contact_form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          snackbar("Thanks for giving your details<br>We will catch you soon.."); 
          Contact_form.reset();
          contact_local_data.data+=1;
          Update_data("contact_form_data",contact_local_data.data);
        } else {
          snackbar("Oops! Facing some issues<br>Please try again later");
        }
      }).catch(error => {
        snackbar("Oops! Facing some issues<br>Please try again later");
      });
    }

    

  }
  Contact_form.addEventListener("submit", function(event){
    event.preventDefault();
    contact_local_data = get_data_object("contact_form_data");
    if(contact_local_data != null){
      if(is_date_expired(contact_local_data.expire_date)){
        Delete_data("contact_form_data");
      }
      else{
        if(contact_local_data.data<2){
          handleContactForm(event);
        }
        else{
          snackbar("Max 2 Attempts Reached<br>Try again later");
          Contact_form.reset();
        }
      }
    }
    else{
      Save_data("contact_form_data",0,Add_24_Hours_to_Current_Date());
      handleContactForm(event);
    }
  });
}
catch(err){};

// ========================= /End-Contact-form/=================================




// ========================= /Start-Modal/=================================
var enlargable_elements = document.querySelectorAll('img[data-enlarge-available="true"]');
enlargable_elements.forEach(element => {
  element.addEventListener('click', function(e) {
      // console.log("here");
    document.querySelector('#modal-body>img').setAttribute('src', element.getAttribute('src'));
    document.querySelector('#modal-body>img').setAttribute('alt', element.getAttribute('alt'));
    document.querySelector('#modal-title').innerHTML = element.getAttribute('alt')+" EVENT";
    $('#ImageModal').modal('show');
  });
});

// $('img[data-enlarge-available="true"]').each(function () {
//   $(this).on('click', function () {
//     $('#modal-body>img').attr('src', $(this).attr('src'));
//     $('#modal-body>img').attr('alt', $(this).attr('alt'));
//     $('#modal-title').html($(this).attr('alt')+" EVENT");
//     $('#ImageModal').modal('show');
//   });
// });
// ========================= /End-Modal/=================================




// ====================== /Handle Image Not Found/=========================
document.onreadystatechange = function () {
  var state = document.readyState
  if (state == 'interactive' || state == 'complete') {
    document.querySelectorAll(".event-img>img").forEach(img => {
      img.addEventListener("error", function () {
        img.style.display = "none";
        img.parentElement.setAttribute('style','display: flex; justify-content: center; align-items: center; background-color: #ffe3e9; font-size: 13px; color: #ae4b65; font-weight: 500; padding-bottom: 20px;');
        img.parentElement.innerHTML = '<i class="fa fa-exclamation-circle" style="font-size: 15px;padding-top: 2px;"></i>&nbsp;Image not found';
      });
    });
  }
}
// ====================== /End-Handle Image Not Found/=========================




// ========================= /Start-Profile/=================================
var profile_bg = document.querySelector('.bg-overlay');
document.querySelectorAll('#show-profile').forEach(element => {
  element.addEventListener('click', function(e) {
    var profile_container = document.querySelector('[data-profile-container='+element.getAttribute('data-profile')+']');

    profile_container.classList.add("show");
    profile_bg.classList.add("show");
    document.body.style.overflow = "hidden";

    profile_container.querySelector('button.close-button').addEventListener('click', function(e) {
      profile_container.classList.remove("show");
      profile_bg.classList.remove("show");
      document.body.style.overflow = "visible";
      profile_container.querySelector('button.close-button').removeEventListener('click', function(e) {});
    });
    
    document.querySelector('.bg-overlay').addEventListener('click', function(e) {
      profile_container.classList.remove("show");
      profile_bg.classList.remove("show");
      document.body.style.overflow = "visible";
      document.querySelector('.bg-overlay').removeEventListener('click', function(e) {});
    });
  });
});
// ========================= /End-Profile/=================================


// ==================== /Start-Local-Storage-Management/====================
function Add_24_Hours_to_Current_Date(){
  var newDate = new Date();
  newDate.setDate(newDate.getDate() + 1);
  return newDate;
}

function Save_data(key,data,expire_date) {
  var object = {data: data, expire_date: expire_date}
  localStorage.setItem(key, JSON.stringify(object));
}

function Update_data(main_key,data_value) {
  var val = JSON.parse(localStorage.getItem(main_key));
  var object = {data: data_value, expire_date: val.expire_date};
  localStorage.removeItem(main_key);
  localStorage.setItem(main_key, JSON.stringify(object));
  // console.log(JSON.parse(localStorage.getItem(main_key)).data);
}

function Delete_data(key) {
  localStorage.removeItem(key);
}

function get_data_object(key) {
  var object = JSON.parse(localStorage.getItem(key));
  if(object == null) {
    return null;
  }
  else{
    return object;
  }
}

function is_date_expired(expire_date) {
  if (expire_date != null && expire_date < new Date()) {
    return true;
  }
  else{
    return false;
  }
}
// ==================== /End-Local-Storage-Management/====================


// document.getElementById("").style.display