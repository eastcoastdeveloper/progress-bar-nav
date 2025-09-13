let progress = document.getElementById('progress'),
  navBar = document.getElementById('links'),
  timeOutFunctionId,
  isMobile = null,
  data = null,
  currentPage = 1, // start on the first link
  linkCount = []; // array to store the <li> elements

// Animate the progress bar
function animateProgressBar(num, liElement) {
  // Remove 'active' from all
  const allLiElements = Array.from(document.querySelectorAll('li'));
  allLiElements.forEach((li) => li.classList.remove('active'));
  liElement.classList.add('active');
  currentPage = num;

  // Set new width and activate clicked
  progress.removeAttribute('style');
  if (!isMobile) {
    progress.style.width = (navBar.offsetWidth / data.length) * num + 'px';
  }

  if (isMobile) {
    progress.style.height = (navBar.offsetHeight / data.length) * num + 'px';
  }

  console.log(isMobile);
}

// Build navigation links
function buildLinks() {
  for (let i = 0; i < data.length; i++) {
    const liElement = document.createElement('li');
    liElement.innerHTML = `<a href="#">${data[i].page}</a>`;

    // Add click listener
    liElement.addEventListener('click', function () {
      animateProgressBar(i + 1, liElement);
    });

    navBar.appendChild(liElement);
    linkCount.push(liElement); // Store the element
  }
}

// Reposition progress bar on resize
function postResizeEvent() {
  animateProgressBar(currentPage, linkCount[currentPage - 1]);
}

// Debounce resize
window.addEventListener('resize', function () {
  clearTimeout(timeOutFunctionId);
  timeOutFunctionId = setTimeout(postResizeEvent, 200);
  getWindowWidth();
});

function getWindowWidth() {
  window.innerWidth > 500 ? (isMobile = false) : (isMobile = true);
}

fetch('./data.json')
  .then((response) => response.json())
  .then((d) => {
    data = d.links;
        // Initialize progress bar position
        setTimeout(() => {
          data ? animateProgressBar(currentPage, linkCount[currentPage - 1]) : null;
        }, 0);
    getWindowWidth();
    buildLinks();
  })
  .catch((error) => console.error('Error:', error));
