self.addEventListener('install', event => {
  event.waitUntil(
    //do something when website is installed
  );
});

self.addEventListener('fetch', event => {
  //do something when website is fetched
});
