let progress = document.getElementById('progress'),
  navBar = document.getElementById('links'),
  timeOutFunctionId,
  isMobile = null,
   data = null,
  // windowWidth = null,
  currentPage = 1, // start on the first link
  linkCount = []; // array to store the <li> elements

// Initialize progress bar position
setTimeout(() => {
  animateProgressBar(currentPage, linkCount[currentPage - 1]);
}, 0);

// Get the size of each link button
// function getLinkWidth() {
//   return navBar.offsetWidth / 5;
// }

// Animate the progress bar
function animateProgressBar(pos, link) {
  // Remove 'active' from all
  linkCount.forEach((li) => li.classList.remove('active'));
  link.classList.add('active');
  currentPage = pos;
  console.log(isMobile);

  // Set new width and activate clicked
  progress.removeAttribute('style');
  if (!isMobile) {
    progress.style.width = (navBar.offsetWidth / 5) * pos + 'px';
  }

  if (isMobile) {
    progress.style.height = (navBar.offsetHeight / 5) * pos + 'px';
  }
}

// Build navigation links
function buildLinks() {
  for (let i = 0; i < 5; i++) {
    const liElement = document.createElement('li');
    liElement.innerHTML = `<a href="#">Link ${i + 1}</a>`;

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

(async () => {
  const { default: json } = await import('data.json', {
    assert: { type: 'json' },
  });
  data = json.products;
  console.log(data)

})();

getWindowWidth();
buildLinks();
