let interviewList = [];
let rejectedList = [];

// element select
const allCardSectionEle = document.getElementById("allCard");
const filteredCardEle = document.getElementById("filtered-card");

// select jobs counter element
const totalCount = document.getElementById("total-count");
const interviewCount = document.getElementById("interview-count");
const rejectedCount = document.getElementById("rejected-count");

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
    if (buttonEle.dataset.id === "all") {
      filteredCardEle.classList.add("hidden");
      allCardSectionEle.classList.remove("hidden");
    } else {
      allCardSectionEle.classList.add("hidden");
      filteredCardEle.classList.remove("hidden");

      // render cards
      buttonEle.dataset.id === "interview"
        ? cardRenders(interviewList)
        : cardRenders(rejectedList);
    }
  }
});

// update interviewList and rejectedList by clicking buttons
function cardStateUpdate(e) {
  const targetEle = e.target;
  const cardEle = e.target.parentElement.parentElement;

  // card info
  const companyName = cardEle.querySelector(".job-company-name").textContent;
  const position = cardEle.querySelector(".job-position").textContent;
  const salary = cardEle.querySelector(".job-salary").textContent;
  const location = cardEle.querySelector(".job-location").textContent;
  const type = cardEle.querySelector(".job-type").textContent;
  const statusEle = cardEle.querySelector(".job-status");
  const status = statusEle.textContent;
  const description = cardEle.querySelector(".job-description").textContent;

  const cardInfo = {
    companyName,
    position,
    salary,
    location,
    type,
    status,
    description,
  };
  // add card data to interviewList
  if (targetEle.classList.contains("interview-btn")) {
    const jobExist = interviewList.find(
      (item) => item.companyName === cardInfo.companyName,
    );

    if (!jobExist) {
      statusEle.classList.remove("badge-error");
      statusEle.classList.add("badge-success");
      statusEle.textContent = "interview";
      cardInfo.status = "interview";
      interviewList.push(cardInfo);
    }
    // remove interview status card info
    rejectedList = rejectedList.filter((item) => {
      item.companyName !== cardInfo.companyName;
    });
  }
  // add card data to rejectedList
  else if (targetEle.classList.contains("rejected-btn")) {
    const jobExist = rejectedList.find(
      (item) => item.companyName === cardInfo.companyName,
    );

    if (!jobExist) {
      statusEle.classList.remove("badge-success");
      statusEle.classList.add("badge-error");
      statusEle.textContent = "Rejected";
      cardInfo.status = "Rejected";
      rejectedList.push(cardInfo);
    }
    // rejected card info
    interviewList = interviewList.filter((item) => {
      item.companyName !== cardInfo.companyName;
    });
  }
  // update jobs counter
  jobsCount();
}
allCardSectionEle.addEventListener("click", cardStateUpdate);
filteredCardEle.addEventListener("click", cardStateUpdate);

// jobs count
function jobsCount() {
  totalCount.textContent = allCardSectionEle.children.length;
  interviewCount.textContent = interviewList.length;
  rejectedCount.textContent = rejectedList.length;
}
jobsCount();

// render cards
function cardRenders(cardList) {
  filteredCardEle.innerHTML = "";
  cardList.forEach((item) => {
    const div = document.createElement("div");
    div.className = "mt-4 space-y-4";
    div.innerHTML = `
     <div class="sm:p-6 flex justify-between">
          <!-- left side -->
          <div class="job-card-content space-y-1.5">
            <h3
              class="job-company-name text-[#002C5C] font-semibold text-lg leading-6.5"
            >
              ${item.companyName}
            </h3>
            <p class="job-position text-black/40 text-[14px] -mt-2">
            ${item.position}
            </p>
            <p class="job-details text-black/40 text-[14px]">
              <span class="job-location">${item.location}</span> •
              <span class="job-type">${item.type}</span> •
              <span class="job-salary">${item.salary}</span>
            </p>
            <div class="job-status badge ${item.status.toLowerCase().includes("interview") ? "badge-success" : "badge-error"} font-medium uppercase">
              ${item.status}
            </div>
            <p
              class="job-description text-[14px]/5 text-[#323B49] text-justify"
            >
              ${item.description}
            </p>
            <!-- buttons -->
            <div class="flex gap-3 mt-3">
              <button
                class="interview-btn btn btn-outline btn-success uppercase"
              >
                interview
              </button>
              <button class="rejected-btn btn btn-outline btn-error uppercase">
                Rejected
              </button>
            </div>
          </div>

          <!-- right side -->
          <div class="flex shrink-0 justify-end">
            <span class="btn btn-circle text-black/60">
              <i class="fa-regular fa-trash-can"></i>
            </span>
          </div>
        </div>
    `;

    filteredCardEle.appendChild(div);
  });
}
