/* =========================================
   AURORA.JS v7 — Sin base de datos · Infinity Free
   ========================================= */

const CONFIG = {
  NOMBRE:      "aurora",
  APODO:       "aury",
  ADMIN:       "miguel",
  ANIVERSARIO: "2024-06-10T00:00:00-06:00",
  SONG_TITLE:  "Just the Way You Are 🎵",
  SONG_ARTIST: "♪ Milky — Para Aurora ♪",
};

// Configuración de carpetas por álbum
// Para agregar fotos a un álbum: mete los archivos en la carpeta y actualiza fotos.json
const ALBUM_FOLDERS = {
  "album1": { carpeta: "img/chapultepec", json: "img/chapultepec/fotos.json" },
  "album2": { carpeta: "img/acuario",     json: "img/acuario/fotos.json"     },
};

// Álbumes base — sección recuerdos
const BASE_ALBUMS = [
  {
    id:"album1", seccion:"recuerdos", nombre:"Chapultepec",
    portada:"https://http2.mlstatic.com/D_NQ_NP_750647-MLM77923940754_082024-O.webp",
    fotos:[] // se llenan desde img/chapultepec/fotos.json al abrir el álbum
  },
  {
    id:"album2", seccion:"recuerdos", nombre:"Acuario Michin",
    portada:"img/acuario/_portada.jpg",
    fotos:[] // se llenan desde img/acuario/fotos.json al abrir el álbum
  },
  {
    id:"album3", seccion:"recuerdos", nombre:"Aventuras",    portada:"", fotos:[]
  },
  {
    id:"album4", seccion:"recuerdos", nombre:"Más recuerdos", portada:"", fotos:[]
  },
  {
    id:"album5", seccion:"recuerdos", nombre:"Nuestros favoritos", portada:"", fotos:[]
  },
];

// Cache de fotos cargadas desde JSON para no hacer fetch cada vez
const fotosCache = {};

async function loadAlbumFotosFromFolder(albumId) {
  if (fotosCache[albumId]) return; // ya cargadas
  const folder = ALBUM_FOLDERS[albumId];
  if (!folder) return;
  try {
    // Usar versión fija para aprovechar cache del servidor (evita solicitudes excesivas en InfinityFree)
    const CACHE_KEY = "aurora_fotos_" + albumId;
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const fotos = JSON.parse(cached);
        const album = BASE_ALBUMS.find(a => a.id === albumId);
        if (album) album.fotos = fotos;
        fotosCache[albumId] = true;
        return;
      } catch(e) { sessionStorage.removeItem(CACHE_KEY); }
    }
    const res = await fetch(folder.json + "?v=2025061201");
    if (!res.ok) return;
    const fotos = await res.json();
    // Guardar en sessionStorage para evitar re-fetches en la misma sesión
    try { sessionStorage.setItem("aurora_fotos_" + albumId, JSON.stringify(fotos)); } catch(e) {}
    // Guardar en el álbum base correspondiente
    const album = BASE_ALBUMS.find(a => a.id === albumId);
    if (album) album.fotos = fotos;
    fotosCache[albumId] = true;
  } catch(e) {
    console.warn("No se pudo cargar fotos.json para", albumId, e);
  }
}

// Juegos base hardcoded
const BASE_JUEGOS = [
  { id:"jg1",  seccion:"juegos", nombre:"Dead Rising 2",          portada:"https://image.api.playstation.com/cdn/UP0102/CUSA04313_00/f9xb6pK2tKdq8KEr4E70pKLdkgKyxqnq.png",                                                                                                                              fotos:[] },
  { id:"jg2",  seccion:"juegos", nombre:"Minecraft",              portada:"https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/store/software/switch/70010000000964/a28a81253e919298beab2295e39a56b7a5140ef15abdb56135655e5c221b2a3a",                                   fotos:[] },
  { id:"jg3",  seccion:"juegos", nombre:"Minecraft Dungeons",     portada:"https://cdn.cloudflare.steamstatic.com/steam/apps/1672970/header.jpg",                                                                                                                                                           fotos:[] },
  { id:"jg4",  seccion:"juegos", nombre:"Borderlands 1",          portada:"https://cdn.mos.cms.futurecdn.net/VpPKhhwe5kHVGJHVakMRT7.jpg",                                                                                                                                                                  fotos:[] },
  { id:"jg5",  seccion:"juegos", nombre:"Borderlands 2",          portada:"https://cdn1.epicgames.com/f4a7772a4da24870a3ea6dfb8aeac662/offer/EGS_Borderlands2_GearboxSoftware_S1-2560x1440-e4f153cd792f973e00583178d8408128.jpg",                                                                          fotos:[] },
  { id:"jg6",  seccion:"juegos", nombre:"Borderlands 3",          portada:"https://cdn2.unrealengine.com/bl3wide-2560x1440-2560x1440-462318f36bee20de4412e111ef72dc62-2560x1440-9c1f12a55f2b.jpg?resize=1&w=480&h=270&quality=medium",                                                                     fotos:[] },
  { id:"jg7",  seccion:"juegos", nombre:"Borderlands Pre-Sequel", portada:"https://cdn1.epicgames.com/6110c92696a54f108c8e9002713ea5f9/offer/EGS_BorderlandsThePreSequel_Wide-2560x1440-0e1682595bdaab7a226149a5154c426e.jpg",                                                                              fotos:[] },
  { id:"jg8",  seccion:"juegos", nombre:"Left 4 Dead",            portada:"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/500/capsule_616x353.jpg?t=1745368560",                                                                                                                        fotos:[] },
  { id:"jg9",  seccion:"juegos", nombre:"Left 4 Dead 2",          portada:"https://cdn.cloudflare.steamstatic.com/steam/apps/550/header.jpg",                                                                                                                                                               fotos:[] },
  { id:"jg10", seccion:"juegos", nombre:"Castle Crashers",        portada:"https://cdn.cloudflare.steamstatic.com/steam/apps/204360/header.jpg",                                                                                                                                                            fotos:[] },
  { id:"jg11", seccion:"juegos", nombre:"The Forest",             portada:"https://media.vandal.net/i/960x720/4-2018/201841318231_1.jpg",                                                                                                                                                                   fotos:[] },
  { id:"jg12", seccion:"juegos", nombre:"Terraria",               portada:"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/105600/capsule_616x353.jpg?t=1769844435",                                                                                                                     fotos:[] },
  { id:"jg13", seccion:"juegos", nombre:"Zombie Army 4",          portada:"https://image.api.playstation.com/vulcan/img/cfn/113078WW5dc2q094F9WZfTVTLY1jjR7PsFwhOqi9g7pxLCN4of8pxlq-X7gKL2NJDEy-CFXUMeboQL1zE0CHoSArZTM8vlmQ.png",                                                                      fotos:[] },
];

const BASE_JUEGOS_IDS = new Set(BASE_JUEGOS.map(j => j.id));
const BASE_ALBUMS_IDS = new Set(BASE_ALBUMS.map(a => a.id));

function isBaseItem(id) {
  return BASE_JUEGOS_IDS.has(id) || BASE_ALBUMS_IDS.has(id);
}

// ============================================================
// ESTADO
// ============================================================
let isAdmin         = false;
let currentAlbumId  = null;
let currentPhoto    = null;
let editingPhotoKey = null;
let isSaving        = false;

let dbData = { fotos:{}, albums:{}, nuevos:[], deletedBase:[] };

// ============================================================
// HELPERS
// ============================================================
function getAlbums(seccion) {
  const base    = seccion === "juegos" ? BASE_JUEGOS : BASE_ALBUMS;
  const deleted = dbData.deletedBase || [];
  const visibles = base.filter(a => !deleted.includes(a.id));
  const extras   = (dbData.nuevos || []).filter(a => a.seccion === seccion);
  return [...visibles, ...extras];
}

function getAlbumById(id) {
  return BASE_ALBUMS.find(a => a.id === id) ||
         BASE_JUEGOS.find(a => a.id === id) ||
         (dbData.nuevos || []).find(a => a.id === id) || null;
}

function getAlbumNombre(id) {
  return dbData.albums[id]?.nombre ?? getAlbumById(id)?.nombre ?? id;
}

function getAlbumPortada(id) {
  // Ítems base: portada siempre desde el código, nunca sobreescribible
  if (BASE_ALBUMS_IDS.has(id) || BASE_JUEGOS_IDS.has(id)) {
    return getAlbumById(id)?.portada ?? "";
  }
  return dbData.albums[id]?.portada ?? getAlbumById(id)?.portada ?? "";
}

function getAlbumFotos(id) {
  const base       = getAlbumById(id)?.fotos || [];
  const deletedIdx = dbData.albums[id]?.deleted_base || [];
  const baseVisible = base.filter((_, i) => !deletedIdx.includes(i));
  const extras     = dbData.albums[id]?.fotos_extra || [];
  return [...baseVisible, ...extras];
}

function getPhotoData(albumId, fi) {
  const fotos = getAlbumFotos(albumId);
  const base  = fotos[fi] || {};
  const key   = `${albumId}-f${fi}`;
  return dbData.fotos[key] ? { ...base, ...dbData.fotos[key] } : { ...base };
}

// ============================================================
// PERSISTENCIA — 100% localStorage
// ============================================================
const LS_KEY = "aurora_dbdata_v3";

function saveLocal() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(dbData));
  } catch(e) {
    console.warn("Error guardando en localStorage:", e);
  }
}

function loadLocal() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return false;
    const d = JSON.parse(raw);
    if (d && typeof d === "object") {
      dbData             = d;
      dbData.fotos       = dbData.fotos       || {};
      dbData.albums      = dbData.albums      || {};
      dbData.nuevos      = dbData.nuevos      || [];
      dbData.deletedBase = dbData.deletedBase || [];
      return true;
    }
  } catch(e) {}
  return false;
}

function showSaveStatus(msg, color) {
  const badge = document.getElementById("admin-badge");
  if (!badge) return;
  const span = badge.querySelector("span");
  if (!span) return;
  const orig = span.textContent;
  span.textContent = msg;
  span.style.color = color || "var(--gold)";
  setTimeout(() => { span.textContent = orig; span.style.color = ""; }, 2000);
}

async function loadData() {
  loadLocal();
}

async function saveData() {
  if (isSaving) return;
  isSaving = true;
  saveLocal();
  showSaveStatus("✅ Guardado", "#6fcf97");
  isSaving = false;
}

function exportarDatos() {
  const json     = JSON.stringify(dbData, null, 2);
  const blob     = new Blob([json], { type: "application/json" });
  const url      = URL.createObjectURL(blob);
  const a        = document.createElement("a");
  a.href         = url;
  a.download     = "aurora_datos.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importarDatos() {
  const input    = document.createElement("input");
  input.type     = "file";
  input.accept   = ".json";
  input.onchange = e => {
    const file   = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const d = JSON.parse(ev.target.result);
        if (!d || typeof d !== "object") throw new Error("Formato inválido");
        dbData             = d;
        dbData.fotos       = dbData.fotos       || {};
        dbData.albums      = dbData.albums      || {};
        dbData.nuevos      = dbData.nuevos      || [];
        dbData.deletedBase = dbData.deletedBase || [];
        saveLocal();
        renderAlbums("juegos");
        renderAlbums("recuerdos");
        if (currentAlbumId) renderAlbumGrid(currentAlbumId);
        showSaveStatus("✅ Importado", "#6fcf97");
        alert("✅ Datos importados correctamente. La página se actualizó.");
      } catch(err) {
        alert("❌ Error al importar: " + err.message);
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

// ============================================================
// INIT
// ============================================================
document.addEventListener("DOMContentLoaded", async () => {
  localStorage.removeItem("aurora_dbdata");
  localStorage.removeItem("aurora_dbdata_v2");
  await loadData();
  initParticles();
  initLogin();
  initCounter();
  initYouTube();
});

// ---- PARTÍCULAS ----
function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W, H, particles;
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  function create() {
    particles = Array.from({length:55}, () => ({
      x:Math.random()*W, y:Math.random()*H, r:Math.random()*2.5+0.5,
      dx:(Math.random()-0.5)*0.3, dy:-Math.random()*0.4-0.1,
      alpha:Math.random()*0.5+0.15, color:Math.random()>0.5?"232,132,154":"212,168,90"
    }));
  }
  function draw() {
    ctx.clearRect(0,0,W,H);
    particles.forEach(p => {
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${p.color},${p.alpha})`; ctx.fill();
      p.x+=p.dx; p.y+=p.dy;
      if(p.y<-10){p.y=H+10;p.x=Math.random()*W;}
      if(p.x<-10||p.x>W+10) p.dx*=-1;
    });
    requestAnimationFrame(draw);
  }
  window.addEventListener("resize",()=>{resize();create();});
  resize(); create(); draw();
}

// ---- LOGIN ----
function initLogin() {
  const loginPage=document.getElementById("login-page"), mainPage=document.getElementById("main-page");
  const step1=document.getElementById("step-1"), step2=document.getElementById("step-2");
  const inputNombre=document.getElementById("input-nombre"), inputApodo=document.getElementById("input-apodo");
  const err1=document.getElementById("err1"), err2=document.getElementById("err2");

  document.getElementById("btn-step1").addEventListener("click", checkStep1);
  inputNombre.addEventListener("keydown", e => { if(e.key==="Enter") checkStep1(); });
  document.getElementById("btn-step2").addEventListener("click", checkStep2);
  inputApodo.addEventListener("keydown",  e => { if(e.key==="Enter") checkStep2(); });

  function checkStep1() {
    const val = inputNombre.value.trim().toLowerCase();
    if (val === CONFIG.ADMIN.toLowerCase()) { isAdmin=true; err1.classList.remove("show"); doEnterMain(); return; }
    if (val === CONFIG.NOMBRE.toLowerCase()) {
      err1.classList.remove("show");
      step1.style.cssText="opacity:0;transform:translateX(-20px)";
      setTimeout(()=>{
        step1.classList.add("hidden"); step2.classList.remove("hidden");
        step2.style.cssText="opacity:0;transform:translateX(20px)";
        requestAnimationFrame(()=>{
          step2.style.transition="opacity .4s,transform .4s";
          step2.style.cssText="opacity:1;transform:translateX(0)"; inputApodo.focus();
        });
      }, 350);
    } else { err1.textContent="Ese nombre no coincide... ¿quién eres? 🤔"; err1.classList.add("show"); }
  }

  function checkStep2() {
    const val = inputApodo.value.trim().toLowerCase();
    if (val === CONFIG.APODO.toLowerCase()) { isAdmin=false; err2.classList.remove("show"); doEnterMain(); }
    else { err2.textContent="Hmm... eso no es lo que te dice él 💭"; err2.classList.add("show"); }
  }

  function doEnterMain() {
    loginPage.style.cssText="transition:opacity .6s;opacity:0";
    setTimeout(()=>{
      loginPage.style.display="none";
      mainPage.style.cssText="display:block;opacity:0;transition:opacity .8s";
      requestAnimationFrame(()=>{
        mainPage.style.opacity="1";
        // Renderizar álbumes — las fotos se cargan solo cuando se abre el álbum
        // (evita solicitudes automáticas que InfinityFree detecta como abuso)
        renderAlbums("juegos");
        renderAlbums("recuerdos");
        showMusicPrompt(); autoplayWhenReady();
        if (isAdmin) {
          document.getElementById("admin-badge").style.display="inline-flex";
          document.getElementById("albums-add-btn-wrap").style.display="block";
          document.getElementById("juegos-add-btn-wrap").style.display="flex";
        } else {
          document.getElementById("admin-badge").style.display="none";
        }
      });
    }, 600);
  }
}

// ---- CONTADOR ----
function initCounter() {
  const inicio = new Date(CONFIG.ANIVERSARIO);
  function nowCDMX() {
    const fmt=new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false});
    const p=Object.fromEntries(fmt.formatToParts(new Date()).map(x=>[x.type,x.value]));
    return new Date(`${p.year}-${p.month}-${p.day}T${p.hour==="24"?"00":p.hour}:${p.minute}:${p.second}`);
  }
  function update() {
    const now=nowCDMX(), diff=now-inicio; if(diff<0)return;
    let y=now.getFullYear()-inicio.getFullYear(), mo=now.getMonth()-inicio.getMonth(), d=now.getDate()-inicio.getDate();
    if(d<0){mo--;d+=new Date(now.getFullYear(),now.getMonth(),0).getDate();}
    if(mo<0){y--;mo+=12;}
    const ts=Math.floor(diff/1000);
    document.getElementById("cnt-years").textContent =y;
    document.getElementById("cnt-months").textContent=mo;
    document.getElementById("cnt-days").textContent  =d;
    document.getElementById("cnt-hours").textContent =String(Math.floor((ts%86400)/3600)).padStart(2,"0");
    document.getElementById("cnt-mins").textContent  =String(Math.floor((ts%3600)/60)).padStart(2,"0");
    document.getElementById("cnt-secs").textContent  =String(ts%60).padStart(2,"0");
  }
  update(); setInterval(update,1000);
}

// ============================================================
// RENDER
// ============================================================
function renderAlbums(seccion) {
  const grid = document.getElementById(seccion==="juegos" ? "juegos-grid" : "albums-grid");
  if (!grid) return;
  grid.innerHTML = "";

  getAlbums(seccion).forEach(album => {
    const nombre  = getAlbumNombre(album.id);
    const portada = getAlbumPortada(album.id);
    const nFotos  = getAlbumFotos(album.id).length;
    const icono   = seccion === "juegos" ? "🎮" : "📷";

    const ph = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200'><rect width='300' height='200' fill='%231a1a2e'/><text x='150' y='115' text-anchor='middle' font-size='52'>${seccion==="juegos"?"🎮":"📷"}</text></svg>`)}`;

    const card = document.createElement("div");
    card.className = "album-card";
    card.innerHTML = `
      <div class="album-cover">
        <img src="${portada || ph}" alt="${nombre}" onerror="this.src='${ph}'">
        <div class="album-cover-overlay">
          <span class="album-open-hint">${seccion==="juegos"?"Ver fotos →":"Abrir álbum →"}</span>
        </div>
        <div class="album-photo-count">${nFotos} fotos</div>
      </div>
      <div class="album-info"><h4 class="album-name">${icono} ${nombre}</h4></div>`;
    card.addEventListener("click", () => openAlbum(album.id));
    grid.appendChild(card);
  });
}

function renderAlbumGrid(id) {
  const grid = document.getElementById("album-photos-grid");
  if (!grid) return;
  grid.innerHTML = "";
  const fotos = getAlbumFotos(id);
  if (!fotos.length) {
    grid.innerHTML = `<p style="color:rgba(255,255,255,.4);text-align:center;padding:40px;grid-column:1/-1">Aún no hay fotos aquí 📷</p>`;
    return;
  }
  fotos.forEach((_, fi) => {
    const data = getPhotoData(id, fi);
    const src  = data.src || "";
    const esVideo = /\.(mp4|webm|ogg|mov)$/i.test(src);
    const card = document.createElement("div");
    card.className = "album-photo-thumb";
    card.innerHTML = esVideo
      ? `<div class="video-thumb-wrap">
           <video src="${src}#t=0.5" muted playsinline preload="metadata"
                  style="width:100%;height:100%;object-fit:cover;border-radius:inherit"
                  onloadeddata="this.currentTime=0.5"></video>
           <div class="video-play-icon">▶</div>
         </div>
         <div class="thumb-overlay"><span>Ver →</span></div>`
      : `<img src="${src}" alt="${data.titulo||''}" loading="lazy"
              onerror="this.parentElement.classList.add('thumb-error')">
         <div class="thumb-overlay"><span>Ver →</span></div>`;
    card.addEventListener("click", () => openPhoto(id, fi));
    grid.appendChild(card);
  });
}

// ============================================================
// ÁLBUM OVERLAY
// ============================================================
async function openAlbum(id) {
  currentAlbumId = id;
  document.getElementById("album-overlay-title").textContent = getAlbumNombre(id);
  document.getElementById("album-edit-name-btn").style.display = isAdmin ? "flex" : "none";
  const delAlbumBtn = document.getElementById("album-delete-btn");
  if (delAlbumBtn) delAlbumBtn.style.display = isAdmin ? "flex" : "none";
  document.getElementById("add-foto-btn-wrap").style.display   = isAdmin ? "block" : "none";
  document.getElementById("album-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
  // Cargar fotos desde carpeta si aplica
  await loadAlbumFotosFromFolder(id);
  renderAlbumGrid(id);
  // Actualizar contador en la card del grid
  renderAlbums("recuerdos");
}

function closeAlbum() {
  document.getElementById("album-overlay").classList.remove("open");
  document.body.style.overflow = "";
  currentAlbumId = null; currentPhoto = null;
}

// ============================================================
// FOTO MODAL
// ============================================================
function openPhoto(albumId, fi) {
  currentAlbumId = albumId; currentPhoto = fi;
  refreshPhotoModal();
  document.getElementById("photo-overlay").classList.add("open");
}

function refreshPhotoModal() {
  const d = getPhotoData(currentAlbumId, currentPhoto);
  const src = d.src || "";
  const esVideo = /\.(mp4|webm|ogg|mov)$/i.test(src);

  const imgEl = document.getElementById("photo-modal-img");
  let vidEl   = document.getElementById("photo-modal-video");

  if (esVideo) {
    imgEl.style.display = "none";
    if (!vidEl) {
      vidEl = document.createElement("video");
      vidEl.id = "photo-modal-video";
      vidEl.controls = true;
      vidEl.style.cssText = "width:100%;max-height:72vh;display:block;background:#000;border-radius:0";
      imgEl.parentNode.insertBefore(vidEl, imgEl.nextSibling);
    }
    vidEl.src = src;
    vidEl.style.display = "block";
  } else {
    imgEl.src = src;
    imgEl.style.display = "block";
    if (vidEl) { vidEl.style.display = "none"; vidEl.src = ""; }
  }

  document.getElementById("photo-modal-title").textContent = d.titulo || "";
  document.getElementById("photo-modal-date").textContent  = d.fecha  || "";
  document.getElementById("photo-modal-desc").textContent  = d.descripcion || "Sin descripción aún.";
  document.getElementById("photo-edit-btn").style.display  = isAdmin ? "flex" : "none";
}

function closePhoto() {
  document.getElementById("photo-overlay").classList.remove("open");
  currentPhoto = null;
}

function photoNav(dir) {
  if (!currentAlbumId || currentPhoto === null) return;
  const total = getAlbumFotos(currentAlbumId).length;
  currentPhoto = (currentPhoto + dir + total) % total;
  openPhoto(currentAlbumId, currentPhoto);
}

// ============================================================
// EDITAR FOTO
// ============================================================
function startEdit() {
  if (!isAdmin) return;
  const d = getPhotoData(currentAlbumId, currentPhoto);
  editingPhotoKey = `${currentAlbumId}-f${currentPhoto}`;
  document.getElementById("edit-src-input").value    = d.src   || "";
  document.getElementById("edit-titulo-input").value = d.titulo || "";
  document.getElementById("edit-fecha-input").value  = d.fecha  || "";
  document.getElementById("edit-desc-input").value   = d.descripcion || "";

  const prevImg = document.getElementById("edit-img-preview");
  const prevPh  = document.getElementById("edit-img-preview-placeholder");
  if (d.src) {
    prevImg.src = d.src;
    prevImg.style.display = "block";
    if (prevPh) prevPh.style.display = "none";
  } else {
    prevImg.style.display = "none";
    if (prevPh) prevPh.style.display = "flex";
  }

  const fotos     = getAlbumFotos(currentAlbumId);
  const baseCount = (getAlbumById(currentAlbumId)?.fotos || []).length;
  const isExtra   = currentPhoto >= baseCount;
  const isBaseJuego = BASE_JUEGOS_IDS.has(currentAlbumId);

  const juegoUrlRow = document.getElementById("edit-juego-portada-row");
  if (juegoUrlRow) {
    if (isBaseJuego) {
      juegoUrlRow.style.display = "block";
      const currentPortada = getAlbumPortada(currentAlbumId);
      document.getElementById("edit-juego-portada-input").value = currentPortada;
      const prev = document.getElementById("edit-juego-portada-preview");
      if (prev) { prev.src = currentPortada; prev.style.display = currentPortada ? "block" : "none"; }
    } else {
      juegoUrlRow.style.display = "none";
    }
  }

  const deleteBtn = document.getElementById("edit-delete-foto-btn");
  if (deleteBtn) deleteBtn.style.display = isAdmin ? "flex" : "none";

  document.getElementById("edit-overlay").classList.add("open");
}

async function saveEdit() {
  const titulo = document.getElementById("edit-titulo-input").value.trim();
  const fecha  = document.getElementById("edit-fecha-input").value.trim();
  const desc   = document.getElementById("edit-desc-input").value.trim();
  const newSrc = document.getElementById("edit-src-input").value.trim();
  if (!editingPhotoKey) return;

  const override = { titulo, fecha, descripcion: desc };
  if (newSrc) override.src = newSrc;
  dbData.fotos[editingPhotoKey] = override;
  closeEditOverlay();
  refreshPhotoModal();
  renderAlbumGrid(currentAlbumId);
  await saveData();
}

async function deleteFoto() {
  if (!isAdmin || currentPhoto === null) return;
  if (!confirm("¿Eliminar esta foto? Esta acción no se puede deshacer.")) return;

  const allBase    = getAlbumById(currentAlbumId)?.fotos || [];
  const deletedIdx = dbData.albums[currentAlbumId]?.deleted_base || [];
  let visualIdx = 0;
  let resolvedType = null;
  let resolvedOriginalIdx = -1;
  let resolvedExtraIdx    = -1;

  for (let i = 0; i < allBase.length; i++) {
    if (deletedIdx.includes(i)) continue;
    if (visualIdx === currentPhoto) {
      resolvedType = "base";
      resolvedOriginalIdx = i;
      break;
    }
    visualIdx++;
  }

  if (!resolvedType) {
    const extras = dbData.albums[currentAlbumId]?.fotos_extra || [];
    const extraVisualIdx = currentPhoto - visualIdx;
    if (extraVisualIdx >= 0 && extraVisualIdx < extras.length) {
      resolvedType     = "extra";
      resolvedExtraIdx = extraVisualIdx;
    }
  }

  if (!resolvedType) { alert("No se pudo identificar la foto."); return; }

  if (!dbData.albums[currentAlbumId]) dbData.albums[currentAlbumId] = {};

  if (resolvedType === "base") {
    if (!dbData.albums[currentAlbumId].deleted_base) dbData.albums[currentAlbumId].deleted_base = [];
    if (!dbData.albums[currentAlbumId].deleted_base.includes(resolvedOriginalIdx))
      dbData.albums[currentAlbumId].deleted_base.push(resolvedOriginalIdx);
  } else {
    const extras = dbData.albums[currentAlbumId].fotos_extra || [];
    extras.splice(resolvedExtraIdx, 1);
    dbData.albums[currentAlbumId].fotos_extra = extras;
  }

  const keys = Object.keys(dbData.fotos).filter(k => k.startsWith(currentAlbumId + "-f"));
  keys.forEach(k => delete dbData.fotos[k]);

  closeEditOverlay();
  closePhoto();
  renderAlbumGrid(currentAlbumId);
  await saveData();
}

async function deleteAlbum() {
  if (!isAdmin || !currentAlbumId) return;
  const nombre = getAlbumNombre(currentAlbumId);
  if (!confirm(`¿Eliminar "${nombre}" y todas sus fotos? Esta acción no se puede deshacer.`)) return;

  if (isBaseItem(currentAlbumId)) {
    if (!dbData.deletedBase) dbData.deletedBase = [];
    if (!dbData.deletedBase.includes(currentAlbumId)) dbData.deletedBase.push(currentAlbumId);
  } else {
    dbData.nuevos = (dbData.nuevos || []).filter(a => a.id !== currentAlbumId);
  }

  delete dbData.albums[currentAlbumId];
  const keys = Object.keys(dbData.fotos).filter(k => k.startsWith(currentAlbumId + "-f"));
  keys.forEach(k => delete dbData.fotos[k]);

  closeAlbum();
  renderAlbums("recuerdos");
  renderAlbums("juegos");
  await saveData();
}

async function resetJuegoPortada() {
  if (!currentAlbumId) return;
  if (!dbData.albums[currentAlbumId]) dbData.albums[currentAlbumId] = {};
  delete dbData.albums[currentAlbumId].portada;
  const defaultUrl = getAlbumById(currentAlbumId)?.portada || "";
  const input = document.getElementById("edit-juego-portada-input");
  if (input) input.value = defaultUrl;
  const prev = document.getElementById("edit-juego-portada-preview");
  if (prev) { prev.src = defaultUrl; prev.style.display = "block"; }
  renderAlbums("juegos");
  await saveData();
}

async function resetAllJuegosPortadas() {
  if (!confirm("¿Restablecer todas las portadas de juegos a las URLs de Steam?")) return;
  BASE_JUEGOS.forEach(j => {
    if (dbData.albums[j.id]) delete dbData.albums[j.id].portada;
  });
  renderAlbums("juegos");
  await saveData();
  alert("✅ Portadas restablecidas.");
}

async function saveJuegoPortada() {
  const url = document.getElementById("edit-juego-portada-input")?.value.trim();
  if (!url) return;
  if (!dbData.albums[currentAlbumId]) dbData.albums[currentAlbumId] = {};
  dbData.albums[currentAlbumId].portada = url;
  closeEditOverlay();
  renderAlbums("juegos");
  await saveData();
}

function previewEditImg() {
  const url = document.getElementById("edit-src-input").value.trim();
  const img = document.getElementById("edit-img-preview");
  const ph  = document.getElementById("edit-img-preview-placeholder");
  if (!url) return;
  img.src = url;
  img.style.display = "block";
  img.onerror = () => {
    img.style.display = "none";
    if (ph) { ph.textContent = "⚠️ No se pudo cargar"; ph.style.display = "flex"; }
  };
  img.onload = () => { if (ph) ph.style.display = "none"; };
}

function closeEditOverlay() {
  document.getElementById("edit-overlay").classList.remove("open");
  editingPhotoKey = null;
}

// ============================================================
// EDITAR / CREAR ÁLBUM
// ============================================================
function openEditAlbumName() {
  document.getElementById("album-modal-title").textContent = "✏️ Editar";
  document.getElementById("album-modal-nombre").value      = getAlbumNombre(currentAlbumId);
  document.getElementById("album-modal-id").value          = currentAlbumId;
  document.getElementById("album-modal-seccion").value     = getAlbumById(currentAlbumId)?.seccion || "recuerdos";
  // Ocultar campo portada para ítems base — portada solo editable desde el código
  const isBase = BASE_ALBUMS_IDS.has(currentAlbumId) || BASE_JUEGOS_IDS.has(currentAlbumId);
  const portadaRow = document.getElementById("album-modal-portada-row");
  if (portadaRow) portadaRow.style.display = isBase ? "none" : "block";
  document.getElementById("album-modal-portada").value = isBase ? "" : getAlbumPortada(currentAlbumId);
  document.getElementById("album-modal-overlay").classList.add("open");
}

function openNewAlbumModal(seccion) {
  document.getElementById("album-modal-title").textContent = seccion === "juegos" ? "＋ Nuevo juego" : "＋ Nuevo álbum";
  document.getElementById("album-modal-nombre").value  = "";
  document.getElementById("album-modal-portada").value = "";
  document.getElementById("album-modal-id").value      = "";
  document.getElementById("album-modal-seccion").value = seccion;
  document.getElementById("album-modal-overlay").classList.add("open");
}

async function saveAlbumModal() {
  const nombre  = document.getElementById("album-modal-nombre").value.trim();
  const portada = document.getElementById("album-modal-portada").value.trim();
  const existId = document.getElementById("album-modal-id").value;
  const seccion = document.getElementById("album-modal-seccion").value;
  if (!nombre) { alert("Escribe un nombre"); return; }

  if (existId) {
    if (!dbData.albums[existId]) dbData.albums[existId] = {};
    dbData.albums[existId].nombre = nombre;
    // Portada solo editable en álbumes dinámicos, nunca en base
    if (portada && !BASE_ALBUMS_IDS.has(existId) && !BASE_JUEGOS_IDS.has(existId)) {
      dbData.albums[existId].portada = portada;
    }
    if (currentAlbumId === existId)
      document.getElementById("album-overlay-title").textContent = nombre;
  } else {
    if (!dbData.nuevos) dbData.nuevos = [];
    dbData.nuevos.push({ id:"dyn_"+Date.now(), seccion, nombre, portada, fotos:[] });
  }

  closeAlbumModal();
  renderAlbums("recuerdos");
  renderAlbums("juegos");
  await saveData();
}

function closeAlbumModal() {
  document.getElementById("album-modal-overlay").classList.remove("open");
}

// ============================================================
// AGREGAR FOTO
// ============================================================
function openNewFotoModal() {
  document.getElementById("foto-modal-src").value    = "";
  document.getElementById("foto-modal-titulo").value = "";
  document.getElementById("foto-modal-fecha").value  = "";
  document.getElementById("foto-modal-desc").value   = "";
  document.getElementById("foto-modal-overlay").classList.add("open");
}

async function saveFotoModal() {
  const src    = document.getElementById("foto-modal-src").value.trim();
  const titulo = document.getElementById("foto-modal-titulo").value.trim();
  const fecha  = document.getElementById("foto-modal-fecha").value.trim();
  const desc   = document.getElementById("foto-modal-desc").value.trim();
  if (!src) { alert("Ingresa la URL o ruta de la imagen"); return; }

  if (!dbData.albums[currentAlbumId])             dbData.albums[currentAlbumId] = {};
  if (!dbData.albums[currentAlbumId].fotos_extra) dbData.albums[currentAlbumId].fotos_extra = [];
  dbData.albums[currentAlbumId].fotos_extra.push({ src, titulo, fecha, descripcion:desc });

  closeFotoModal();
  renderAlbumGrid(currentAlbumId);
  await saveData();
}

function closeFotoModal() {
  document.getElementById("foto-modal-overlay").classList.remove("open");
}

// ---- ESC ----
document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;
  for (const id of ["edit-overlay","foto-modal-overlay","album-modal-overlay","photo-overlay","album-overlay"]) {
    const el = document.getElementById(id);
    if (el?.classList.contains("open")) {
      el.classList.remove("open");
      if (id === "album-overlay") { document.body.style.overflow=""; currentAlbumId=null; currentPhoto=null; }
      if (id === "photo-overlay") currentPhoto=null;
      break;
    }
  }
});

// ============================================================
// MÚSICA — reproductor local MP3
// ============================================================
let audioPlayer = null;
let isPlaying   = false;

function initYouTube() {
  // Inicializar reproductor de audio local
  audioPlayer = new Audio("img/cancion.mp3");
  audioPlayer.loop   = true;
  audioPlayer.volume = 0.7;
}

function autoplayWhenReady() {
  if (!audioPlayer) return;
  audioPlayer.play().then(() => {
    isPlaying = true;
    const btn = document.getElementById("music-play-btn");
    if (btn) btn.textContent = "⏸";
  }).catch(() => {
    // Autoplay bloqueado por el navegador — el usuario deberá dar click al botón
  });
}

function showMusicPrompt() {
  const el = document.getElementById("music-song-title");
  if (el) el.textContent = CONFIG.SONG_TITLE;
}

function toggleMusic() {
  const btn = document.getElementById("music-play-btn");
  if (!audioPlayer) return;
  if (isPlaying) {
    audioPlayer.pause();
    if (btn) btn.textContent = "▶";
    isPlaying = false;
  } else {
    audioPlayer.play();
    if (btn) btn.textContent = "⏸";
    isPlaying = true;
  }
}
