/*-----------------------------------------------------------------------------------

 Template Name:Chitchat
 Template URI: themes.pixelstrap.com/chitchat
 Description: This is Chat website
 Author: Pixelstrap
 Author URI: https://themeforest.net/user/pixelstrap

 ----------------------------------------------------------------------------------- */
// 01. Switchery  js
// 02. calling timer js
// 03 .Add class to body for identify this is application page
// 04. Mobile responsive screens

(function($) {
 "use strict";

 /*=====================
 02 . calling timer js
 ==========================*/
 var timer = new Timer();
 timer.start();
 timer.addEventListener('secondsUpdated', function(e) {
  $('#basicUsage').html(timer.getTimeValues().toString());
});
 timer.addEventListener('secondsUpdated', function(e) {
  $('#basicUsage3').html(timer.getTimeValues().toString());
});
 timer.addEventListener('secondsUpdated', function(e) {
  $('#basicUsage2').html(timer.getTimeValues().toString());
});

 /*=====================
 03 .Add class to body for identify this is application page
 ==========================*/
 var body = document.body;
 $(body).addClass("main-page");

 /*=====================
 04. Mobile responsive screens
 ==========================*/
 if($( window ).width() <= 992 ) {
  $(".main-nav").removeClass("on");
  $('body').removeClass("sidebar-active");
  $('.app-sidebar').removeClass("active");
  $('.chitchat-main').removeClass("small-sidebar");
};
if($( window ).width() <= 800 ) {
  $("ul.chat-main  li").on('click', function () {
   $('.main-nav').removeClass("on");
 });  
}


})(jQuery);
function toggleFullScreen() {    
  $('#videocall').toggleClass("active");
}

function removedefault(){
       $('body').removeClass("sidebar-active");
       $('.app-sidebar').removeClass("active");
}
