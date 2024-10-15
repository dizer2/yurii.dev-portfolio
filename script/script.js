if ($(window).width() > 820) {
  $(".section").addClass("section");
  $(".header").addClass("page");
} else {
  $(".section").removeClass("section");
  $(".header").removeClass("page");
  let opened = false;
  $(".burger").click(function () {
    if (opened == false) {
      $("body").css({ overflow: "hidden" });
      opened = true;
    } else {
      $("body").css({ overflow: "auto" });
      opened = false;
    }
  });
}

$(".header").hide();

setTimeout(() => {
  $(".header").show();
}, 600);

$(".header__logo").click(function () {
  location.href = "./index.html";
});

$(".container").fsScroll({
  keyboard: true,
  loop: false,

  beforeScroll: function (el, index) {
    console.log(index);
    if (index == 0) {
      $(".header__color").css({ fill: "#" + `CCF381` });
      $(".header__img").css("right", "0%");
      document.documentElement.style.setProperty("--text-color", "#4831d4");
      $("[data-fs-scroll] .page li").css("display", "flex");
      setTimeout(() => {
        $(".header__logo").css("color", "#CCF381");
      }, 100);
      $("#first__logo").addClass("first__logo-active");
      $("#last__logo").addClass("last__logo-active");

      new Vivus("line__home", {
        type: "delayed",
        duration: 200,
        start: "autostart",
      });

      new Vivus("touch__home", {
        type: "oneByOne",
        duration: 150,
        start: "autostart",
      });

      new Vivus("blue__home", {
        type: "delayed",
        duration: 150,
        start: "autostart",
      });

      new Vivus("line__gg", {
        type: "delayed",
        duration: 130,
        start: "autostart",
      });

      new Vivus("line__gg2", {
        type: "delayed",
        duration: 130,
        start: "autostart",
      });

      new Vivus("line__gg3", {
        type: "delayed",
        duration: 130,
        start: "autostart",
      });
    }
    if (index == 1) {
      $(".header__color").css({ fill: "#" + `4831d4` });
      $(".header__logo").css("color", "transparent");
      $(".header__img").css("right", "20%");
      document.documentElement.style.setProperty("--text-color", "#4831d4");
      $("[data-fs-scroll] .page li").css("display", "flex");
      $("#first__logo").removeClass("first__logo-active");
      $("#last__logo").removeClass("last__logo-active");

      new Vivus("section1__touch", {
        type: "delayed",
        duration: 200,
        start: "autostart",
      });

      new Vivus("section1__touch2", {
        type: "oneByOne",
        duration: 200,
        start: "autostart",
      });

      new Vivus("section1__green", {
        type: "oneByOne",
        duration: 200,
        start: "autostart",
      });

      new Vivus("section1__touch3", {
        type: "delayed",
        duration: 200,
        start: "autostart",
      });

      new Vivus("section1__touch4", {
        type: "oneByOne",
        duration: 200,
        start: "autostart",
        reverseStack: true,
      });

      $(".sections1__titel").addClass("sections1__titel-active");
      $(".section1__description").addClass("section1__description-active");

      $(".sections1__titel2").addClass("sections2__titel-active");
      $(".section1__description2").addClass("section2__description-active");
    }

    if (index == 2) {
      $(".header__color").css({ fill: "#" + `CCF381` });
      document.documentElement.style.setProperty("--text-color", "#CCF381");
      $("[data-fs-scroll] .page li").css("display", "flex");
      $(".header__logo").css("color", "transparent");
      $(".header__img").css("right", "20%");
      $("#first__logo").removeClass("first__logo-active");
      $("#last__logo").removeClass("last__logo-active");

      new Vivus("section2__photo", {
        type: "delayed",
        duration: 200,
        start: "autostart",
      });

      $(".sections2__titel").addClass("sections2__titel-active2");
      $(".section2__description").addClass("sections2__description-active2");
    }
    if (index == 3) {
      $(".header__color").css({ fill: "#" + `4831d4` });
      document.documentElement.style.setProperty("--text-color", "#4831d4");
      $("[data-fs-scroll] .page li").css("display", "flex");
      $(".header__logo").css("color", "transparent");
      $(".header__img").css("right", "20%");
      $("#first__logo").removeClass("first__logo-active");
      $("#last__logo").removeClass("last__logo-active");
      new Vivus("section3__svg", {
        type: "delayed",
        duration: 150,
        start: "autostart",
        reverseStack: true,
      });

      new Vivus("section3__svg2", {
        type: "delayed",
        duration: 150,
        start: "autostart",
        reverseStack: true,
      });

      $(".section3__description").addClass("sections3__description-active");
      $(".section3__titel").addClass("sections3__titel-active");
      $(".section3__description").addClass("sections3__description-active2");
      $(".section3__titel").addClass("sections3__titel-active2");
    }

    if (index == 4) {
      $(".header__color").css({ fill: "#" + `CCF381` });
      $("[data-fs-scroll] .page li").css("display", "none");
      $("#first__logo").removeClass("first__logo-active");
      $("#last__logo").removeClass("last__logo-active");
      document.documentElement.style.setProperty("--text-color", "#CCF381");
      $(".header__logo").css("color", "transparent");
      $(".header__img").css("right", "20%");
    }
  },

  afterScroll: function (el, index) {},
});

$("ul").removeClass("vertical2");

$(".section3__button").mouseenter(function () {
  $(".section3__button").removeClass("section3__button-non");
  $(".section3__button").addClass("section3__button-active");
});

$(".section3__button").mouseleave(function () {
  $(".section3__button").addClass("section3__button-non");
  $(".section3__button").removeClass("section3__button-active");
});

$(".section3__button2").mouseenter(function () {
  $(".section3__button2").removeClass("section3__button2-non");
  $(".section3__button2").addClass("section3__button2-active");
});

$(".section3__button2").mouseleave(function () {
  $(".section3__button2").addClass("section3__button2-non");
  $(".section3__button2").removeClass("section3__button2-active");
});

let opened = false;

$(".burger").click(function () {
  if (opened == false) {
    $(".contact__box1").addClass("contact__box-active");
    setTimeout(() => {
      $(".contact__box2").addClass("contact2__box-active");
    }, 200);
    setTimeout(() => {
      $(".sociable__box").addClass("sociable__box-active");
    }, 400);

    $(".contact__menu").removeClass("contact__menu-non");
    $(".burger").addClass("burger__active");
    $(".contact__menu").addClass("contact__menu-active");
    $("[data-fs-scroll] .page.vertical").removeClass("activesii");

    opened = true;
  } else {
    $(".burger").removeClass("burger__active");
    $(".contact__box2").removeClass("contact2__box-active");
    $(".sociable__box").removeClass("sociable__box-active");

    $(".contact__menu").addClass("contact__menu-non");
    $(".contact__menu").removeClass("contact__menu-active");
    $("[data-fs-scroll] .page.vertical").addClass("activesii");
    $(".contact__box1").removeClass("contact__box-active");

    opened = false;
  }
});
