$(".section").removeClass("section");
$(".header").removeClass("page");
$(".contact__menu").hide();

if ($(window).width() > 820) {
} else {
  let opened = false;
  $(".burger").click(function () {
    if (opened == false) {
      $("body").addClass("body-active");
      $(".contact__menu").show();
      
      opened = true;
    } else {
      $("body").removeClass("body-active");
      $(".contact__menu").hide();
      opened = false;
    }
  });
}

$(".header__logo").click(function () {
  location.href = "../../index.html";
});

let opened = false;

$(".burger").click(function () {
  if (opened == false) {
    $(".contact__menu").show();
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
    $(".contact__menu").hide();

    opened = false;
  }
});

function getAllProject(teg) {
  console.log("Selected tag: ", teg);

  // Вимкнути кнопки на час завантаження
  $(".container__buttons-button").prop("disabled", true);

  $(".card__container").empty();
  $(".skeleton-loader").show();

  // Fetch the project data
  fetch("./script/projects.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);

      // Create a promise for image loading
      const imageLoadPromises = [];
      const cardsHTML = []; // Store the card HTML here

      if (teg === "#all") {
        data.forEach((project) => {
          const cardHTML = createProjectCard(project);
          cardsHTML.push(cardHTML); // Store the card HTML

          // Preload the image
          const imgLoadPromise = preloadImage(`./img/${project.imgLink}`);
          imageLoadPromises.push(imgLoadPromise);
        });
      } else {
        const filteredProjects = data.filter((project) =>
          project.tegList.includes(teg)
        );

        filteredProjects.forEach((project) => {
          const cardHTML = createProjectCard(project);
          cardsHTML.push(cardHTML); // Store the card HTML

          // Preload the image
          const imgLoadPromise = preloadImage(`./img/${project.imgLink}`);
          imageLoadPromises.push(imgLoadPromise);
        });
      }

      // Wait for all images to load
      return Promise.all(imageLoadPromises)
        .then(() => {
          return new Promise((resolve) => setTimeout(resolve, 1500)); // Wait for at least 1.5 seconds
        })
        .then(() => {
          // After the wait, hide the loader and append the cards
          $(".skeleton-loader").hide();
          $(".card__container").append(cardsHTML.join("")); // Append all card HTML at once

          $(".buttons__container-id")
            .off("click")
            .on("click", function () {
              let id = $(this).attr("id");
              console.log(id);
              localStorage.setItem("idDetail", id);
            });

          $(".container__buttons-button").prop("disabled", false);
        });
    })
    .catch((error) => {
      console.error("Error fetching the projects:", error);
      $(".skeleton-loader").hide();

      $(".container__buttons-button").prop("disabled", false);
    });
}

// Function to preload an image
function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = resolve;
    img.onerror = reject; // Handle error case if needed
  });
}

function createProjectCard(project) {
  return `
        <div class="container__card">
            <div class="container__card-img" style="background-image: url(./img/${
              project.imgLink
            });">
                <div class="teg-box">
                    ${project.tegList
                      .map(
                        (tag) => `<button class="button__teg">${tag}</button>`
                      )
                      .join("")}
                </div>
            </div>
            <div class="container__card-text">
                <p class="card__title">${project.title}</p>
                <div class="buttons__container">
                    <a id="${
                      project.id
                    }" class="buttons__container-link buttons__container-id" href="./workAbout/detail/detail.html">
                        <button class="buttons__container-button buttons__container-blue">More details</button>
                    </a>
                    <a class="buttons__container-link" href="${
                      project.link
                    }" target="_blank">
                        <button class="buttons__container-button buttons__container-red">Link</button>
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Initially load all projects
getAllProject("#all");

// Event listener for tag buttons
$(".container__buttons-button")
  .off("click")
  .on("click", function () {
    $(".container__buttons-button").removeClass("container__buttons-active");
    $(this).addClass("container__buttons-active");

    let id = $(this).attr("id");
    getAllProject(id);
  });
