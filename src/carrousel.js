const items = document.querySelector(".carrouselRotate");
let intervalId;
let timeoutId;
let carrouselWidth = 0;

items
    .addEventListener("wheel", event => event.deltaY > 0 ?
        event.target.scrollBy(300, 0) : event.target.scrollBy(-300, 0)
    );

window
    .addEventListener("load", (event) => {
        intervalId = carrouselRun()
    });


const carrouselRun = () => setInterval(() => {
    if (carrouselWidth === 2900) {
        items.scrollBy(-carrouselWidth, 0)
        carrouselWidth = 0
    }
    items.scrollBy(580, 0)
    carrouselWidth += 580
}, 3000);

const goToItem = (self, itemPosition) => {
    clearInterval(intervalId);
    clearTimeout(timeoutId);
    document.querySelectorAll(".jobs-toggle").forEach(node => {
        node.classList.remove("jobs-toggle")
    })
    self.setAttribute("class", "jobs-untoggle jobs-toggle")
    self.children[0].children[1].setAttribute("class", "arrow-untoggle jobs-toggle")

    if (carrouselWidth < itemPosition) {
        timeoutId = setTimeout(() => {
            intervalId = carrouselRun()
            self.classList.remove("jobs-toggle")
            self.children[0].children[1].classList.remove("jobs-toggle")
        }, 8000);

        return items.scrollTo(sumCarrouselWidth(itemPosition), 0);
    };
    if (carrouselWidth > itemPosition) {
        timeoutId = setTimeout(() => {
            intervalId = carrouselRun()
            self.classList.remove("jobs-toggle")
        }, 8000);

        return items.scrollTo(decreaseCarrouselWidth(itemPosition), 0);
    };
};


const sumCarrouselWidth = itemPosition => {
    if (carrouselWidth === itemPosition) {
        return carrouselWidth
    };
    if (carrouselWidth < itemPosition) {
        carrouselWidth += 580
        return sumCarrouselWidth(itemPosition);
    };
    if (carrouselWidth > itemPosition) {
        return decreaseCarrouselWidth(itemPosition);
    };
};

const decreaseCarrouselWidth = itemPosition => {
    if (carrouselWidth === itemPosition) {
        return carrouselWidth
    };
    if (carrouselWidth > itemPosition) {
        carrouselWidth -= 580;

        return decreaseCarrouselWidth(itemPosition);
    };
    if (carrouselWidth < itemPosition) {
        return sumCarrouselWidth(itemPosition);
    };
};