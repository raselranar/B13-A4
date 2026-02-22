const interviewList = [];
const rejectedList = [];
// element select
const allCardSectionEle = document.getElementById("allCard");
const filteredCardEle = document.getElementById("filtered-card");

// toggle functionality
document.getElementById("toggle-buttons").addEventListener("click", (e) => {
  const buttonEle = e.target;
  const parentEle = e.currentTarget;
  if (buttonEle.tagName === "BUTTON") {
    Array.from(parentEle.children).forEach((ele) => {
      if (buttonEle === ele) {
        ele.classList.add("button-active");
      } else {
        ele.classList.remove("button-active");
      }
    });
  }
});

// update interviewList and rejectedList by clicking buttons
allCardSectionEle.addEventListener("click", (e) => {
  const targetEle = e.target;
  const cardEle = e.target.parentElement.parentElement;

  // card info
  const companyName = cardEle.querySelector(".job-company-name").textContent;
  const position = cardEle.querySelector(".job-position").textContent;
  const details = cardEle.querySelector(".job-details").textContent;
  const location = cardEle.querySelector(".job-location").textContent;
  const type = cardEle.querySelector(".job-type").textContent;
  const status = cardEle.querySelector(".job-status").textContent;
  const description = cardEle.querySelector(".job-description").textContent;

  // add card data to interviewList
  if (targetEle.classList.contains("interview-btn")) {
    const cardInfo = {
      companyName,
      position,
      details,
      location,
      type,
      status,
      description,
    };

    const jobExist = interviewList.find(
      (item) => item.companyName === cardInfo.companyName,
    );

    if (!jobExist) {
      interviewList.push(cardInfo);
    }
  } else if (targetEle.classList.contains("rejected-btn")) {
    const cardInfo = {
      companyName,
      position,
      details,
      location,
      type,
      status,
      description,
    };

    const jobExist = rejectedList.find(
      (item) => item.companyName === cardInfo.companyName,
    );

    if (!jobExist) {
      rejectedList.push(cardInfo);
    }
  }
});

// render cards
function cardRenders(cardList) {
  cardList.forEach((item) => {
    const div = document.createElement("div");
    div.className = "mt-4 space-y-4";
  });
}
