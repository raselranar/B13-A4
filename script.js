let interviewList = [];
let rejectedList = [];

// element select
const allCardSectionEle = document.getElementById("allCard");
const filteredCardEle = document.getElementById("filtered-card");

// select jobs counter element
const totalCount = document.getElementById("total-count");
const interviewCount = document.getElementById("interview-count");
const rejectedCount = document.getElementById("rejected-count");
const availableJobs = document.getElementById("available-jobs");
let activeTab = "all";

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
      activeTab = "all";
    } else {
      allCardSectionEle.classList.add("hidden");
      filteredCardEle.classList.remove("hidden");

      // render cards
      if (buttonEle.dataset.id === "interview") {
        activeTab = "interview";
        cardRenders(interviewList);
      } else {
        activeTab = "rejected";
        cardRenders(rejectedList);
      }
    }
    jobsCount();
  }
});

// update interviewList and rejectedList by clicking buttons
function cardStateUpdate(e) {
  const targetEle = e.target;
  const cardEle = e.target.parentElement.parentElement;

  if (targetEle.closest(".delete-btn")) {
    removeCard(targetEle.closest(".job-card"));
  }
  // check clicked on button or not
  if (targetEle.tagName !== "BUTTON") {
    return;
  }
  // card info
  const companyName = cardEle
    .querySelector(".job-company-name")
    .textContent.trim();
  const position = cardEle.querySelector(".job-position").textContent.trim();
  const salary = cardEle.querySelector(".job-salary").textContent.trim();
  const location = cardEle.querySelector(".job-location").textContent.trim();
  const type = cardEle.querySelector(".job-type").textContent.trim();
  const statusEle = cardEle.querySelector(".job-status");
  const status = statusEle.textContent.trim();
  const description = cardEle
    .querySelector(".job-description")
    .textContent.trim();

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
  if (
    targetEle.classList.contains("interview-btn") &&
    activeTab !== "interview"
  ) {
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
    rejectedList = rejectedList.filter(
      (item) => item.companyName !== cardInfo.companyName,
    );
    cardRenders(rejectedList);
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
    interviewList = interviewList.filter(
      (item) => item.companyName !== cardInfo.companyName,
    );
    cardRenders(interviewList);
  }
  // update jobs counter
  jobsCount();
}
allCardSectionEle.addEventListener("click", cardStateUpdate);
filteredCardEle.addEventListener("click", cardStateUpdate);

// jobs count
function jobsCount() {
  const allCardLength = allCardSectionEle.children.length;
  totalCount.textContent = allCardLength;
  interviewCount.textContent = interviewList.length;
  rejectedCount.textContent = rejectedList.length;
  availableJobs.textContent =
    activeTab === "interview"
      ? `${interviewList.length} of ${allCardLength} jobs`
      : activeTab === "rejected"
        ? `${rejectedList.length} of ${allCardLength} jobs`
        : allCardSectionEle.children.length + " jobs";
}
jobsCount();

// render cards
function cardRenders(cardList) {
  filteredCardEle.innerHTML = "";
  debugger;
  // if cardList empty show blank ui
  if (cardList.length === 0) {
    emptyRenderer();
    return;
  }

  cardList.forEach((item) => {
    const div = document.createElement("div");
    div.className = "job-card sm:p-6 flex justify-between";
    div.innerHTML = `
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
          <div class="flex justify-end">
            <button class="delete-btn btn btn-circle text-black/60">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
    `;

    filteredCardEle.appendChild(div);
  });
}

// empty renderer
function emptyRenderer() {
  const div = document.createElement("div");
  div.className = "flex justify-center items-center";
  div.innerHTML = `
   <!-- document icon  -->
          <div class="flex flex-col items-center justify-center py-10">
            <img src="./page.png" alt="it's present empty" />
            <p class="font-semibold mt-5 text-2xl/8 text-[#002C5C]">
              No jobs available
            </p>
            <p class="text-black/50">
              Check back soon for new job opportunities
            </p>
          </div>
  `;
  filteredCardEle.appendChild(div);
}

// remove card from a list
function removeCard(cardEle) {
  const companyName = cardEle
    .querySelector(".job-company-name")
    .textContent.trim();
  cardEle.remove();
  //  delete card from list
  if (activeTab === "interview") {
    interviewList = interviewList.filter(
      (item) => item.companyName !== companyName,
    );
    if (interviewList.length === 0) {
      emptyRenderer(interviewList);
    }
  } else if (activeTab === "rejected") {
    rejectedList = rejectedList.filter(
      (item) => item.companyName !== companyName,
    );
    if (rejectedList.length === 0) {
      emptyRenderer(rejectedList);
    }
  }
  jobsCount();
}
