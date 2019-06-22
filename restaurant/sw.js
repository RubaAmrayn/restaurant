const cacheName="v2"//ver
const cacheAssetc = [
  // '/css/style.css',
  // '/data/restaurants.json',
  // '/img/1.jpg',
  // '/img/2.jpg',
  // '/img/3.jpg',
  // '/img/4.jpg',
  // '/img/5.jpg',
  // '/img/6.jpg',
  // '/img/7.jpg',
  // '/img/8.jpg',
  // '/img/9.jpg',
  // '/img/10.jpg',
  // '/js/app.js',
  // '/js/dbhelper.js',
  // '/js/main.js',
  // '/js/restaurant_info.js',
  'index.html',
  '/',
  'restaurant.html'
 ]//load files in cache
self.addEventListener('install',e=>{
  //open cache with name assigned to cacheName var then add files to the cache
  e.waitUntil(caches.open(cacheName).then(cache=>{
   cache.addAll(cacheAssetc)
   }).then(()=>self.skipWaiting()))
})

self.addEventListener('activate',e=>{
  // activate event open all caches detect if cache name changed will delete the old cache
  e.waitUntil(
    caches.keys().then(cacheNames=>{
      return Promise.all(
        cacheNames.map(cache=>{
          if(cache!==cacheName){
            return caches.delete(cache)
          }
        })
      )
    })
  )
  
})
self.addEventListener('fetch',e=>{
  e.respondWith(
    //fetch requests from server 
    fetch(e.request).then(res=>{
     // make a clone from response
      const clone = res.clone()
      // open the cache and put the request and clone of response 
      caches.open(cacheName).then(cache=>{
        cache.put(e.request,clone)
      })
      // return response 
      return res
      // in case offline  will check if request is in cache then return it 
    }).catch(err=>caches.match(e.request).then(res=>res))
  )
})