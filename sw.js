// JARVIS v2 update-safe cache: always try network for HTML so GitHub edits appear.
const CACHE='jarvis-iphone-local-ai-v2';
const ASSETS=['./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('jarvis-iphone-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 if(event.request.mode==='navigate'){
  event.respondWith(fetch(event.request).then(resp=>{if(resp.ok){const cp=resp.clone();caches.open(CACHE).then(c=>c.put('./index.html',cp))}return resp}).catch(()=>caches.match('./index.html')));
 } else {event.respondWith(caches.match(event.request).then(v=>v||fetch(event.request)))}
});
