// service workers are suppported

if ("serviceWorker" in navigator) {
  console.log("Service worker is present");
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("../sw_cached_pages.js")
      .then((reg) => console.log("Service worker registered:"))
      .catch((error) => console.log(`${error} : An Unexpected error occured.`));
  });
}
