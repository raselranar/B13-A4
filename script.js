const interviewList = [];
const rejectedList = [];

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

//
