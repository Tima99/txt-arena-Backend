function ReadMore(ele) {
  ele.parentElement.classList.toggle("shrink");

  ele.innerText = "Less Show";
}

const mainTxtBox = document.querySelector(".box-txt");

function CreatePost(sender, title, time, date, text, likes, id) {
  let postHTML = `
    <div class="head">
                <div class="sender">
                    <span> ${sender} </span>
                    <span class="day">
                        <span class="time"> ${time} </span>
                        <span class="date"> ${date} </span>
                    </span>
                </div>
                <div class="title"> ${title} </div>
            </div>
            <div class="txt">
                ${text}
                <span class="read-more dp-none" onclick="ReadMore(this)">... Read More</span>
            </div>

            <div class="fav">
                <div class="likes" onclick="Like(this)">
                    <i class="fa-thumbs-up far"></i>
                </div>

                <span class="countvote"> ${likes} </span>

                <div class="likes unlike" onclick="UnLike(this)">
                    <i class="fa-thumbs-up turn far"></i>
                </div>
            </div>

    `;

  let txtContainer = document.createElement("div");
  txtContainer.classList.add("txt-container");
  txtContainer.setAttribute("id", id);
  txtContainer.innerHTML = postHTML;

  mainTxtBox.appendChild(txtContainer);
}

function FetchTxt() {
  fetch("/browse/txt")
    .then((response) => response.text())
    .then((data) => {
      data = JSON.parse(data);
      for (let indx in data) {
        let { sender, title, date, txt, likes, _id } = data[indx];
        //// console.log(_id , sender , title , date , txt , likes)
        date = date.split(",");
        date[1] = date[1].split(":");
        let unit = date[1][2].split(" ")[1];
        let time = date[1][0] + ":" + date[1][1] + " " + unit;

        CreatePost(sender, title, time, date[0], txt, likes, _id);
      }
    })
    .catch((err) => console.log(err));
}

FetchTxt();

function Like(ele) {
  if (ele.firstElementChild.className == "fa-thumbs-up far") {
    ele.firstElementChild.classList.toggle("far");
    ele.firstElementChild.classList.toggle("fas");

    const main = ele.parentElement.parentElement;
    Vote(1, main.id, main);
  }
  const unlike = ele.parentElement.querySelector(".unlike");
  if (unlike.firstElementChild.className == "fa-thumbs-up turn fas") {
    unlike.firstElementChild.classList.toggle("far");
    unlike.firstElementChild.classList.toggle("fas");
  }
}

function UnLike(ele) {
  if (ele.firstElementChild.className == "fa-thumbs-up turn far") {
    ele.firstElementChild.classList.toggle("far");
    ele.firstElementChild.classList.toggle("fas");

    const main = ele.parentElement.parentElement;
    Vote(-1, main.id, main);
  }

  const like = ele.parentElement.querySelector(".likes");
  if (like.firstElementChild.className == "fa-thumbs-up fas") {
    like.firstElementChild.classList.toggle("far");
    like.firstElementChild.classList.toggle("fas");
  }
}

function Vote (up_down, id, prtEle) {
  fetch("/vote", {
    method: "POST",
    body: JSON.stringify({
      change: up_down,
      id: id,
    }),
    headers: { "Content-type": "application/json" },
  })
    .then((res) => res.text())
    .then((data) => {
      data = JSON.parse(data);
      if (data.status) {
        prtEle.querySelector(".countvote").innerHTML = data.status;
      }
    })
    .catch((err) => console.log(err));
};
