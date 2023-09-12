$(".list").click(function () {
  var work_field = [];
  $.each($("input[name='work_field']:checked"), function () {
    work_field.push($(this).val());
  });

  var turnover = [];
  $.each($("input[name='turnover']:checked"), function () {
    turnover.push($(this).val());
  });

  var total_employee = [];
  $.each($("input[name='total_employee']:checked"), function () {
    total_employee.push($(this).val());
  });
  $('[name="cnpj"]').on("keyup", () => {
    if (
      work_field.length > 0 &&
      turnover.length > 0 &&
      total_employee.length > 0 &&
      $("#cnpj").val().length === 18
    ) {
      $(".action_button").addClass("active");
      $(".action_button").prop("disabled", false);
    } else {
      $(".action_button").removeClass("active");
      $(".action_button").prop("disabled", true);
    }
  });
});

$(".action_button").click(function () {
  alert("Success");
});

// By @webozza
const foxSwiper = new Swiper(".swiper", {
  direction: "vertical",
  slidesPerView: 2,
  allowTouchMove: false,
  mousewheel: false,
});

let toggleMousewheel = (shouldEnable) => {
  if (shouldEnable) {
    foxSwiper.mousewheel.enable(); // Enable mousewheel control
  } else {
    foxSwiper.mousewheel.disable(); // Disable mousewheel control
  }
};

let multipleOptions = () => {
  const okBtn = $(".ok_button");
  $('[name="work_field"]').change(function () {
    let selectedChoices = $('input[name="work_field"]:checked').length;
    console.log("selectedChoices", selectedChoices);
    if (selectedChoices !== 0) {
      toggleMousewheel(true);
      okBtn.addClass("active");
      okBtn.removeAttr("disabled");
    } else {
      toggleMousewheel(false);
      okBtn.removeClass("active");
      okBtn.attr("disabled");
    }
  });
};

let singleOptions = () => {
  $('[name="turnover"], [name="total_employee"]').click(function (e) {
    setTimeout(() => {
      foxSwiper.slideNext();
    }, 600);
  });
};

let slideNextExecuted = false;

$('[name="work_field"]').one("click", function (e) {
  if (!slideNextExecuted) {
    // Set the flag to true to prevent further execution
    slideNextExecuted = true;

    setTimeout(() => {
      foxSwiper.slideNext();
    }, 3000);
  }
});

$(".ok_button").click(function (e) {
  e.preventDefault();
  foxSwiper.slideNext();
});

foxSwiper.on("slideChange", function () {
  //toggleDraggable(false);
  slideNextExecuted = false;
  console.log("change");
});

// prev next button
// cnpj input field
function validateCNPJ(cnpj) {
  // Remove any non-numeric characters from the input
  cnpj = cnpj.replace(/\D/g, "");

  if (cnpj.length === 14) {
    // CNPJ is valid
    document.getElementById("cnpj").classList.add("valid");
  } else {
    // CNPJ is not valid
    document.getElementById("cnpj").classList.remove("valid");
  }
}

// Function to go to the next slide
function goToNextSlide() {
  foxSwiper.slideNext(); // Change to the next vertical slide
}

// Function to go to the previous slide
function goToPreviousSlide() {
  foxSwiper.slidePrev(); // Change to the previous vertical slide
}

var lastScrollTime = 0;
var scrollTimeout;

// Attach click event listeners to the navigation buttons
document
  .querySelector(".swiper-button-next")
  .addEventListener("click", goToNextSlide);
document
  .querySelector(".swiper-button-prev")
  .addEventListener("click", goToPreviousSlide);

multipleOptions();
singleOptions();
