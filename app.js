let next;
let back;
let stepNumber = 0;
let fullStepNumber = 3;
let choosedOne = {
  Arcade: { monthly: "$9/mo", yearly: "$90/yr" },
  Advanced: { monthly: "$12/mo", yearly: "$120/yr" },
  Pro: { monthly: "$15/mo", yearly: "$150/yr" },
};

// let choosedOneNext = "$9/mo"
let choosedOneNext = { title: "", moneyMonth: "", extra: [], fullSum: 0 };

window.addEventListener("load", () => {
  // let windowWith = window.innerWidth;
  let sections = document.querySelectorAll("section");
  let topStepsDOM = document.querySelectorAll(".top .nav-item-box");
  let cards = document.querySelector(".cardsBox");
  let cards1_3 = document.querySelectorAll(".cardsBox .card");
  let chk = document.querySelector("#trueFalse");
  let checkBoxes = document.querySelectorAll(".section-3 .checkbox-card input");

  checkBoxes.forEach((element) => {
    element.addEventListener("click", () => {
      element.classList.contains("normal")
        ? element.classList.replace("normal", "checked")
        : element.classList.replace("checked", "normal");
    });
  });

  chk.addEventListener("click", (e) => {
    sections[1].querySelector("#yearly").classList.toggle("selectedOption");
    sections[1].querySelector("#monthly").classList.toggle("selectedOption");
    let arc = { ...choosedOne.Arcade };
    let adv = { ...choosedOne.Advanced };
    let pro = { ...choosedOne.Pro };
    if (chk.checked) {
      cards1_3[0].querySelector(".money").innerHTML = arc.yearly;
      cards1_3[1].querySelector(".money").innerHTML = adv.yearly;
      cards1_3[2].querySelector(".money").innerHTML = pro.yearly;
      cards1_3[0]
        .querySelector(".hide")
        ?.classList.replace("hide", "freeMonthsText");
      cards1_3[1]
        .querySelector(".hide")
        ?.classList.replace("hide", "freeMonthsText");
      cards1_3[2]
        .querySelector(".hide")
        ?.classList.replace("hide", "freeMonthsText");
    } else {
      // havi
      cards1_3[0].querySelector(".money").innerHTML = arc.monthly;
      cards1_3[1].querySelector(".money").innerHTML = adv.monthly;
      cards1_3[2].querySelector(".money").innerHTML = pro.monthly;

      cards1_3[0]
        .querySelector(".freeMonthsText")
        ?.classList.replace("freeMonthsText", "hide");

      cards1_3[1]
        .querySelector(".freeMonthsText")
        ?.classList.replace("freeMonthsText", "hide");

      cards1_3[2]
        .querySelector(".freeMonthsText")
        ?.classList.replace("freeMonthsText", "hide");
    }
  });
  const find = () => {
    let nextBtns = document.querySelectorAll(".next");
    let backBtns = document.querySelectorAll(".back");

    nextBtns.forEach((next) => {
      next.addEventListener("click", () => {
        if (inputFieldsRequired()) {
          return;
        }

        saveDetailsSection2();
        saveDetailsSection3();

        if (stepNumber > 1) {
          choosedOneNext.fullSum =
            Number(moneyFromTextFunc(choosedOneNext.moneyMonth)) +
            choosedOneNext.extra.reduce((acc, current) => {
              acc = acc + moneyFromTextFunc(current[1]);
              return acc;
            }, 0);
          document.querySelector(".section-4 .total-sum").innerHTML = `$${
            choosedOneNext.fullSum
          }/${choosedOneNext.moneyMonth.split("/")[1] == "yr" ? "yr" : "mo"}`;
          document.querySelector(".section-4 .total").innerHTML = `Total (per ${
            choosedOneNext.moneyMonth.split("/")[1] == "yr" ? "year" : "month"
          })`;
        }

        if (stepNumber + 1 < sections.length) {
          sections[stepNumber].classList.remove("active");
          sections[stepNumber].classList.add("hide");
          if (fullStepNumber >= stepNumber + 1) {
            topStepsDOM[stepNumber].classList.remove("active-step");
          }
          if (sections[stepNumber + 1] != undefined) {
            sections[stepNumber + 1].classList.add("active");
            sections[stepNumber + 1].classList.remove("hide");
          }
          if (stepNumber + 1 <= fullStepNumber) {
            topStepsDOM[stepNumber + 1].classList.add("active-step");
          }
          stepNumber++;
        }
        if (document.querySelector(".section-4").classList.contains("active")) {
          document.querySelector("footer .next").innerHTML = "Confirm";
          document.querySelector("footer button.next").classList.add("confirm");
        } else {
          document.querySelector("footer .next").innerHTML = "Next Step";
          document
            .querySelector("footer button.next")
            .classList.remove("confirm");
        }
      });
    });

    backBtns.forEach((back) => {
      back.addEventListener("click", () => {
        if (stepNumber - 1 >= 0) {
          sections[stepNumber].classList.remove("active");
          sections[stepNumber].classList.add("hide");

          sections[stepNumber - 1].classList.add("active");
          sections[stepNumber - 1].classList.remove("hide");

          topStepsDOM[stepNumber]?.classList.remove("active-step");
          topStepsDOM[stepNumber - 1].classList.add("active-step");
        }
        stepNumber--;
        if (document.querySelector(".section-4").classList.contains("active")) {
          document.querySelector("footer .next").innerHTML = "Confirm";
          document.querySelector("footer button.next").classList.add("confirm");
        } else {
          document.querySelector("footer .next").innerHTML = "Next Step";
          document
            .querySelector("footer button.next")
            .classList.remove("confirm");
        }
      });
    });
  };

  find();

  cards.addEventListener("click", (e) => {
    let cardElements = document.querySelectorAll(".card");
    // e.stopPropagation()
    if (e.target.dataset.idx != undefined) {
      Array.from(cardElements).map((elem) => elem.classList.remove("selected"));
      cardElements[e.target.dataset.idx].classList.toggle("selected");
    }
  });
});

const inputFieldsRequired = () => {
  const nameInput = document.querySelector(".section-1 #name");
  const phoneInput = document.querySelector(".section-1 #phone");
  const emailInput = document.querySelector(".section-1 #email");
  const labels = document.querySelectorAll(".section-1 .label-error-box");
  let inputs = [nameInput, emailInput, phoneInput];

  inputs.forEach((input, idx) =>
    input.value == ""
      ? labels[idx].classList.add("active")
      : labels[idx].classList.remove("active")
  );

  if (
    document.querySelectorAll(".section-1 .label-error-box.active").length > 0
  ) {
    return true;
  } else return false;
};

const saveDetailsSection2 = () => {
  let chkBoxesSec_3 = document.querySelectorAll(".checkbox-card");
  choosedOneNext.moneyMonth = document
    .querySelector(".card.selected .money")
    .innerHTML.trim();
  choosedOneNext.title = document
    .querySelector(".card.selected .titleText")
    .innerHTML.trim();

  // choosedOneNext = {title: "", moneyMonth: "", extra: [["",""]]

  if (choosedOneNext.moneyMonth.split("/")[1] == "yr") {
    chkBoxesSec_3[0].querySelector(".price-period").innerHTML = "+$10/yr";
    chkBoxesSec_3[1].querySelector(".price-period").innerHTML = "+$20/yr";
    chkBoxesSec_3[2].querySelector(".price-period").innerHTML = "+$20/yr";
  } else {
    chkBoxesSec_3[0].querySelector(".price-period").innerHTML = "+$1/mo";
    chkBoxesSec_3[1].querySelector(".price-period").innerHTML = "+$2/mo";
    chkBoxesSec_3[2].querySelector(".price-period").innerHTML = "+$2/mo";
  }
};
const saveDetailsSection3 = () => {
  let inputsWitchChecked = document.querySelectorAll(
    ".section-3 .checkbox-cards input.checked"
  );

  choosedOneNext.extra = [];

  if (inputsWitchChecked.length > 0) {
    inputsWitchChecked.forEach((item) => {
      let t = [];
      t[0] = item.parentElement
        .querySelector(".titleWithMoney .titleText")
        .innerHTML.trim();
      t[1] = item.parentElement.querySelector(".price-period").innerHTML.trim();

      choosedOneNext.extra.push(t);
    });
  }

  putSavedValues();

  // choosedOneNext = {title: "", moneyMonth: "", extra: [["",""]]
};
// KI KELL TOROLNI A BACK UTAN A CHOOSEDONE TARTALMAT!!!
const putSavedValues = () => {
  let duration = () => {
    return choosedOneNext.moneyMonth.split("/")[1] == "yr"
      ? "Yearly"
      : "Monthly";
  };

  let secForTitle = document.querySelector(".section-4 .sec-4-title");
  secForTitle.innerHTML = `${choosedOneNext.title} (${duration()})`;
  let secForMoney = document.querySelector(".section-4 .sec-4-money");
  secForMoney.innerHTML = choosedOneNext.moneyMonth;

  let prices = document.querySelector(".prices");

  prices.innerHTML = "";
  choosedOneNext.extra.forEach((element) => {
    let divElem = `<div class="flex-box-container">
<div>${element[0]}</div>
<div>${element[1]}</div>
</div> `;
    prices.innerHTML += divElem;
  });
};

const moneyFromTextFunc = (text) => {
  const numbers = text.match(/\d+/g).map(Number);
  return numbers[0];
};

// window.addEventListener("resize", () => {

//   });
