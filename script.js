const div = document.getElementById("main");

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();

  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.left <
      (window.innerWidth ||
        document.documentElement.clientWidth) /* or $(window).width() */ &&
    rect.top <
      (window.innerHeight ||
        document.documentElement.clientHeight) /* or $(window).height() */
  );
}

const observer = new IntersectionObserver((entries = []) => {
  entries.forEach((entry) => {
    if (isElementInViewport(entry.target)) {
      entry.target.src = entry.target["lazy-src"];
    }
  });
});

fetch("https://jsonplaceholder.typicode.com/photos")
  .then((response) => response.json())
  .then((images) => {
    images.forEach((image) => {
      const img = document.createElement("img");
      img["lazy-src"] = image.url;
      img.height = 600;
      img.width = 600;
      div.appendChild(img);

      observer.observe(img);
    });
  });
