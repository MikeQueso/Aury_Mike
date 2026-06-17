/* =========================================
   AURORA.JS v7 — Sin base de datos · Infinity Free
   ========================================= */

const CONFIG = {
  NOMBRE:      "aurora",
  APODO:       "aury",
  ADMIN:       "miguel",
  ANIVERSARIO: "2024-06-10T00:00:00-06:00",
  ANIVERSARIO_DIA:   10,
  ANIVERSARIO_MES:   6,
  ANIVERSARIO_ANIO:  2024,
  SONG_TITLE:  "Just the Way You Are 🎵",
  SONG_ARTIST: "♪ Milky — Para Aurora ♪",
};

// Configuración para guardar corazones/comentarios usando GitHub Issues como base de datos
// Token de acceso limitado SOLO a Issues de este repositorio (no puede tocar código ni borrar nada)
const GITHUB_CONFIG = {
  OWNER: "MikeQueso",
  REPO:  "Aury_Mike",
  TOKEN: "PENDIENTE_TOKEN",
};

// Configuración de carpetas por álbum
// Para agregar fotos a un álbum: mete los archivos en la carpeta y actualiza fotos.json
const ALBUM_FOLDERS = {
  "album1": { carpeta: "img/chapultepec", json: "img/chapultepec/fotos.json" },
  "album2": { carpeta: "img/acuario",     json: "img/acuario/fotos.json"     },
};

// Configuración de carpetas por juego
const JUEGO_FOLDERS = {
  "jg2":  { carpeta: "img/minecraft",          json: "img/minecraft/fotos.json"          },
  "jg3":  { carpeta: "img/minecraft_dungeons", json: "img/minecraft_dungeons/fotos.json" },
  "jg10": { carpeta: "img/castle_crashers",    json: "img/castle_crashers/fotos.json"    },
  "jg12": { carpeta: "img/terraria",           json: "img/terraria/fotos.json"           },
  "jg14": { carpeta: "img/roblox",             json: "img/roblox/fotos.json"             },
  "jg15": { carpeta: "img/pvzbfn",             json: "img/pvzbfn/fotos.json"             },
  "jg16": { carpeta: "img/repo",               json: "img/repo/fotos.json"               },
  "jg17": { carpeta: "img/soul_prequel",       json: "img/soul_prequel/fotos.json"       },
  "jg26": { carpeta: "img/brawl_stars",        json: "img/brawl_stars/fotos.json"        },
  "jg27": { carpeta: "img/cod_mobile",         json: "img/cod_mobile/fotos.json"         },
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
    portada:"https://yt3.googleusercontent.com/n9h4AGm4YdogtQ-73U2o_CZAoB6tPnKb6eg9qyysos4coWzNTyuBT1dhI8mrXWy3Gez5GvJz=s900-c-k-c0x00ffffff-no-rj",
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
  const folder = ALBUM_FOLDERS[albumId] || JUEGO_FOLDERS[albumId];
  if (!folder) return;
  try {
    // Usar versión fija para aprovechar cache del servidor (evita solicitudes excesivas en InfinityFree)
    const CACHE_KEY = "aurora_fotos_" + albumId;
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const fotos = JSON.parse(cached);
        const album = BASE_ALBUMS.find(a => a.id === albumId) || BASE_JUEGOS.find(j => j.id === albumId);
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
    const album = BASE_ALBUMS.find(a => a.id === albumId) || BASE_JUEGOS.find(j => j.id === albumId);
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
  { id:"jg14", seccion:"juegos", nombre:"Roblox",                 portada:"https://images.rbxcdn.com/5348266ea6c5e67b19d6a814cbbb70f6.jpg",                                                                                                fotos:[] },
  { id:"jg15", seccion:"juegos", nombre:"La batalla de Neighborville", portada:"https://image.api.playstation.com/vulcan/img/rnd/202008/3107/m04V1Wbq0ag6IAp3UozdjSCh.png",                                                                                                                                                    fotos:[] },
  { id:"jg16", seccion:"juegos", nombre:"R.E.P.O",               portada:"https://cdn2.fptshop.com.vn/unsafe/repo_3_c364ecbc02.jpg",                                                                                                                                         fotos:[] },
  { id:"jg17", seccion:"juegos", nombre:"Soul Knight Prequel",    portada:"https://cdn-bgp.bluestacks.com/BGP/latam/gametiles_com.chillyroom.soulknightprequel.jpg",                                                                                                                 fotos:[] },
  { id:"jg18", seccion:"juegos", nombre:"Cuphead",                portada:"https://cdn.cloudflare.steamstatic.com/steam/apps/268910/header.jpg",                                                                                                                                                           fotos:[] },
  { id:"jg19", seccion:"juegos", nombre:"Garry's Mod",            portada:"https://cdn.cloudflare.steamstatic.com/steam/apps/4000/header.jpg",                                                                                                                                                             fotos:[] },
  { id:"jg20", seccion:"juegos", nombre:"Halo Infinite",          portada:"https://cdn.cloudflare.steamstatic.com/steam/apps/1240440/header.jpg",                                                                                                                                                          fotos:[] },
  { id:"jg21", seccion:"juegos", nombre:"Just Shapes & Beats",    portada:"https://cdn.cloudflare.steamstatic.com/steam/apps/531510/header.jpg",                                                                                                                                                           fotos:[] },
  { id:"jg22", seccion:"juegos", nombre:"Marvel Rivals",          portada:"https://i.ytimg.com/vi/RvJ3YMMVZ4A/maxresdefault.jpg",                                                                                                                                                          fotos:[] },
  { id:"jg23", seccion:"juegos", nombre:"Move or Die",            portada:"https://cdn.cloudflare.steamstatic.com/steam/apps/323850/header.jpg",                                                                                                                                                           fotos:[] },
  { id:"jg24", seccion:"juegos", nombre:"Peak",                   portada:"https://peak.wiki.gg/images/PEAK_KeyArt_1080p.jpg?8284f8",                                                                                                                                        fotos:[] },
  { id:"jg25", seccion:"juegos", nombre:"Skullgirls",             portada:"https://cdn.cloudflare.steamstatic.com/steam/apps/245170/header.jpg",                                                                                                                                                           fotos:[] },
  { id:"jg26", seccion:"juegos", nombre:"Brawl Stars", portada:"https://i.scdn.co/image/ab6761610000e5ebf7b952107c126c561c52171e", fotos:[] },
  { id:"jg27", seccion:"juegos", nombre:"COD Mobile",  portada:"https://preview.redd.it/cod-call-of-duty-mobile-is-officially-5-years-old-today-how-v0-zlg7bbp362sd1.jpeg?auto=webp&s=784be6f2cfb293d6356d961321d72777529f4064",  fotos:[] },
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
    particles = Array.from({length:45}, () => ({
      x:Math.random()*W, y:Math.random()*H, s:Math.random()*0.6+0.5,
      rot:Math.random()*Math.PI*2, drot:(Math.random()-0.5)*0.01,
      dx:(Math.random()-0.5)*0.3, dy:-Math.random()*0.4-0.1,
      alpha:Math.random()*0.45+0.15, color:Math.random()>0.5?"232,132,154":"212,168,90"
    }));
  }
  function drawPawPrint(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.scale(p.s, p.s);
    ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
    // almohadilla central (forma ovalada)
    ctx.beginPath();
    ctx.ellipse(0, 3, 4.2, 3.4, 0, 0, Math.PI*2);
    ctx.fill();
    // 4 dedos alrededor
    const toes = [
      [-4.6, -4.2, 1.7], [-1.6, -6.2, 1.8],
      [1.6, -6.2, 1.8],  [4.6, -4.2, 1.7]
    ];
    toes.forEach(([tx,ty,tr]) => {
      ctx.beginPath();
      ctx.arc(tx, ty, tr, 0, Math.PI*2);
      ctx.fill();
    });
    ctx.restore();
  }
  function draw() {
    ctx.clearRect(0,0,W,H);
    particles.forEach(p => {
      drawPawPrint(p);
      p.x+=p.dx; p.y+=p.dy; p.rot+=p.drot;
      if(p.y<-15){p.y=H+15;p.x=Math.random()*W;}
      if(p.x<-15||p.x>W+15) p.dx*=-1;
    });
    requestAnimationFrame(draw);
  }
  window.addEventListener("resize",()=>{resize();create();});
  resize(); create(); draw();
}

// ---- LOGIN ----
let visitorName = null;

function initLogin() {
  const loginPage=document.getElementById("login-page"), mainPage=document.getElementById("main-page");
  const step1=document.getElementById("step-1"), step2=document.getElementById("step-2");
  const inputNombre=document.getElementById("input-nombre"), inputApodo=document.getElementById("input-apodo");
  const err1=document.getElementById("err1"), err2=document.getElementById("err2");

  document.getElementById("btn-step1").addEventListener("click", checkStep1);
  inputNombre.addEventListener("keydown", e => { if(e.key==="Enter") checkStep1(); });
  document.getElementById("btn-step2").addEventListener("click", checkStep2);
  inputApodo.addEventListener("keydown",  e => { if(e.key==="Enter") checkStep2(); });

  // ---- Flujo visitante ----
  const stepV1 = document.getElementById("step-visitante");
  const stepV2 = document.getElementById("step-visitante-2");
  const inputVNombre = document.getElementById("input-visitante-nombre");
  const inputVFecha  = document.getElementById("input-aniversario");
  const errV1 = document.getElementById("err-visitante");
  const errV2 = document.getElementById("err-visitante-2");
  const linkVisitante = document.getElementById("link-soy-visitante");

  linkVisitante.addEventListener("click", e => {
    e.preventDefault();
    step1.style.cssText="opacity:0;transform:translateX(-20px)";
    setTimeout(()=>{
      step1.classList.add("hidden");
      stepV1.classList.remove("hidden");
      stepV1.style.cssText="opacity:0;transform:translateX(20px)";
      requestAnimationFrame(()=>{
        stepV1.style.transition="opacity .4s,transform .4s";
        stepV1.style.cssText="opacity:1;transform:translateX(0)";
        // Si ya nos visitó antes en este dispositivo, recordamos su nombre
        let nombrePrevio = null;
        try { nombrePrevio = localStorage.getItem("aurora_visitor_name"); } catch(err){}
        const bienvenida = document.getElementById("bienvenida-vuelta");
        if (nombrePrevio) {
          inputVNombre.value = nombrePrevio;
          bienvenida.textContent = `¡Hola de nuevo, ${nombrePrevio}! 👋 Si no eres tú, borra el nombre y escribe el tuyo.`;
          bienvenida.classList.remove("hidden");
        } else {
          bienvenida.classList.add("hidden");
        }
        inputVNombre.focus();
      });
    }, 350);
  });

  document.getElementById("btn-step-visitante").addEventListener("click", checkVisitanteStep1);
  inputVNombre.addEventListener("keydown", e => { if(e.key==="Enter") checkVisitanteStep1(); });
  document.getElementById("btn-step-visitante-2").addEventListener("click", checkVisitanteStep2);
  inputVFecha.addEventListener("keydown", e => { if(e.key==="Enter") checkVisitanteStep2(); });

  function checkVisitanteStep1() {
    const val = inputVNombre.value.trim();
    if (!val) { errV1.textContent="Escribe tu nombre"; errV1.classList.add("show"); return; }
    visitorName = val;
    errV1.classList.remove("show");
    stepV1.style.cssText="opacity:0;transform:translateX(-20px)";
    setTimeout(()=>{
      stepV1.classList.add("hidden"); stepV2.classList.remove("hidden");
      stepV2.style.cssText="opacity:0;transform:translateX(20px)";
      requestAnimationFrame(()=>{
        stepV2.style.transition="opacity .4s,transform .4s";
        stepV2.style.cssText="opacity:1;transform:translateX(0)"; inputVFecha.focus();
      });
    }, 350);
  }

  function checkVisitanteStep2() {
    const val = inputVFecha.value.trim();
    const m = val.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    if (!m) { errV2.textContent="Usa el formato dd/mm/aaaa"; errV2.classList.add("show"); return; }
    const dia = parseInt(m[1],10), mes = parseInt(m[2],10), anio = parseInt(m[3],10);
    if (dia === CONFIG.ANIVERSARIO_DIA && mes === CONFIG.ANIVERSARIO_MES && anio === CONFIG.ANIVERSARIO_ANIO) {
      errV2.classList.remove("show");
      isAdmin = false;
      try { localStorage.setItem("aurora_visitor_name", visitorName); } catch(e){}
      doEnterMain();
    } else {
      errV2.textContent="Esa fecha no es correcta... ¿en verdad nos conoces? 💭";
      errV2.classList.add("show");
    }
  }

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
    if (val === CONFIG.APODO.toLowerCase()) {
      isAdmin = false;
      visitorName = "Aury";
      err2.classList.remove("show");
      doEnterMain();
    }
    else { err2.textContent="Hmm... eso no es lo que te dice él 💭"; err2.classList.add("show"); }
  }

  function doEnterMain() {
    if (!visitorName) {
      try { visitorName = localStorage.getItem("aurora_visitor_name"); } catch(e){}
    }
    registrarVisita(isAdmin ? "Miguel (admin)" : (visitorName || "Anónimo"));
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
        // Pre-cargar fotos.json de los álbumes con carpeta para mostrar el contador correcto desde el inicio
        (async () => {
          for (const id of Object.keys(ALBUM_FOLDERS)) {
            await loadAlbumFotosFromFolder(id);
          }
          for (const id of Object.keys(JUEGO_FOLDERS)) {
            await loadAlbumFotosFromFolder(id);
          }
          renderAlbums("recuerdos");
          renderAlbums("juegos");
        })();
        showMusicPrompt(); autoplayWhenReady();
        initMapaLugares();
        if (isAdmin) {
          document.getElementById("admin-badge").style.display="inline-flex";
          document.getElementById("albums-add-btn-wrap").style.display="block";
          document.getElementById("juegos-add-btn-wrap").style.display="flex";
          document.getElementById("btn-ver-visitas").style.display="flex";
        } else {
          document.getElementById("admin-badge").style.display="none";
          document.getElementById("btn-ver-visitas").style.display="none";
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
        <div class="album-photo-count">${nFotos} elemento${nFotos !== 1 ? 's' : ''}</div>
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

  const fechaRealEl = document.getElementById("photo-modal-fecha-real");
  if (d.fecha_real) {
    fechaRealEl.textContent = "📅 Tomada el " + formatFechaReal(d.fecha_real);
    fechaRealEl.style.display = "block";
  } else {
    fechaRealEl.style.display = "none";
  }

  loadReacciones(currentAlbumId, currentPhoto);
}

function formatFechaReal(fechaISO) {
  // fechaISO formato YYYY-MM-DD
  const meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
  const [y, m, d] = fechaISO.split("-").map(Number);
  if (!y || !m || !d) return fechaISO;
  return `${d} de ${meses[m-1]} de ${y}`;
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

// ============================================================
// MAPA DE LUGARES VISITADOS
// ============================================================
const LUGARES = [
  { nombre: "Bosque de Chapultepec", lat: 19.41963325882592, lng: -99.18948799065775, color: "#e8849a", emoji: "🌳", desc: "Una tarde explorando el castillo y el bosque" },
  { nombre: "Acuario Michin",        lat: 19.478205044738917, lng: -99.10010156182065, color: "#5aa9d4", emoji: "🐠", desc: "Día rodeados de peces y criaturas marinas" },
];

function initMapaLugares() {
  const el = document.getElementById("mapa-lugares");
  if (!el || typeof L === "undefined") return;
  if (el._mapaInit) return;
  el._mapaInit = true;

  const map = L.map(el, { scrollWheelZoom: false }).setView([19.45, -99.14], 11);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    maxZoom: 19
  }).addTo(map);

  const bounds = [];
  LUGARES.forEach(lugar => {
    const icon = L.divIcon({
      className: "mapa-pin",
      html: `<div style="width:16px;height:16px;border-radius:50%;background:${lugar.color};border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.4)"></div>`,
      iconSize: [22, 22],
      iconAnchor: [11, 11]
    });
    const marker = L.marker([lugar.lat, lugar.lng], { icon }).addTo(map);
    marker.bindPopup(
      `<div style="font-family:inherit;min-width:160px">
        <strong>${lugar.emoji} ${lugar.nombre}</strong>
        <p style="margin:4px 0 0;font-size:13px;opacity:.85;color:#333">${lugar.desc}</p>
      </div>`
    );
    bounds.push([lugar.lat, lugar.lng]);
  });

  if (bounds.length > 1) map.fitBounds(bounds, { padding: [50, 50] });

  renderMapaLeyenda();
}

function renderMapaLeyenda() {
  const el = document.getElementById("mapa-leyenda");
  if (!el) return;
  el.innerHTML = LUGARES.map(l => `
    <div class="leyenda-item">
      <span class="leyenda-color" style="background:${l.color}"></span>
      <span class="leyenda-nombre">${l.emoji} ${l.nombre}</span>
    </div>
  `).join("");
}

// ============================================================
// CORAZONES, COMENTARIOS Y VISITAS — guardados en Supabase
// (así se ven en todos los dispositivos, en tiempo real)
// ============================================================
const SUPABASE_CONFIG = {
  url: "https://igeaunvbwunjkapzkmdb.supabase.co",
  // Clave pública (publishable) — segura para usar en el navegador
  key: "sb_publishable_SpjNeGcOLwExgWVjOLoCQw_xwBzObOP",
};

function sbHeaders(extra) {
  return Object.assign({
    "apikey": SUPABASE_CONFIG.key,
    "Authorization": `Bearer ${SUPABASE_CONFIG.key}`,
    "Content-Type": "application/json",
  }, extra || {});
}

function sbUrl(path) {
  return `${SUPABASE_CONFIG.url}/rest/v1/${path}`;
}

const reaccionesCache = {};

function getFotoKey(albumId, fi) {
  const d = getPhotoData(albumId, fi);
  // clave estable basada en la ruta del archivo, no en el índice (por si cambia el orden)
  return (d.src || `${albumId}-${fi}`).replace(/[^a-zA-Z0-9]/g, "_");
}

function getCurrentVisitorName() {
  if (isAdmin) return CONFIG.ADMIN_DISPLAY || "Miguel";
  try {
    const saved = localStorage.getItem("aurora_visitor_name");
    if (saved) return saved;
  } catch(e) {}
  return visitorName || (CONFIG.APODO || "Aury");
}

async function sbFetchReacciones(fotoKey) {
  const res = await fetch(sbUrl(`reacciones?foto_key=eq.${encodeURIComponent(fotoKey)}&select=nombre`), {
    headers: sbHeaders()
  });
  if (!res.ok) return null;
  return await res.json();
}

async function sbFetchComentarios(fotoKey) {
  const res = await fetch(sbUrl(`comentarios?foto_key=eq.${encodeURIComponent(fotoKey)}&select=nombre,texto,created_at&order=created_at.asc`), {
    headers: sbHeaders()
  });
  if (!res.ok) return null;
  return await res.json();
}

async function loadReacciones(albumId, fi) {
  const fotoKey = getFotoKey(albumId, fi);
  const corazonBtn   = document.getElementById("btn-corazon");
  const corazonCount = document.getElementById("corazon-count");
  const corazonIcon   = document.getElementById("corazon-icon");
  const lista         = document.getElementById("comentarios-lista");

  corazonBtn.disabled = true;
  lista.innerHTML = '<p style="opacity:.5;font-size:13px">Cargando...</p>';

  const [corazones, comentarios] = await Promise.all([
    sbFetchReacciones(fotoKey),
    sbFetchComentarios(fotoKey)
  ]);

  if (corazones === null || comentarios === null) {
    lista.innerHTML = '<p style="opacity:.6;font-size:13px">💤 Los corazones y comentarios no se pudieron cargar. Intenta de nuevo más tarde.</p>';
    corazonIcon.textContent = "🤍";
    corazonCount.textContent = "—";
    corazonBtn.disabled = true;
    return;
  }

  reaccionesCache[fotoKey] = { corazones, comentarios };

  const yo = getCurrentVisitorName();
  const yaDioCorazon = corazones.some(c => c.nombre === yo);
  corazonIcon.textContent = yaDioCorazon ? "❤️" : "🤍";
  corazonCount.textContent = corazones.length;
  corazonBtn.classList.toggle("activo", yaDioCorazon);
  corazonBtn.title = corazones.length
    ? "❤️ " + corazones.map(c => c.nombre).join(", ")
    : "";
  corazonBtn.disabled = false;

  renderComentarios(comentarios);
}

function renderComentarios(comentarios) {
  const lista = document.getElementById("comentarios-lista");
  if (!comentarios.length) {
    lista.innerHTML = '<p style="opacity:.5;font-size:13px">Aún no hay comentarios. ¡Sé el primero!</p>';
    return;
  }
  lista.innerHTML = comentarios.map(c => `
    <div class="comentario-item">
      <span class="comentario-autor">${escapeHtml(c.nombre)}</span>
      <span class="comentario-texto">${escapeHtml(c.texto)}</span>
    </div>
  `).join("");
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

async function toggleCorazon() {
  const fotoKey = getFotoKey(currentAlbumId, currentPhoto);
  const cache = reaccionesCache[fotoKey];
  if (!cache) return;

  const yo = getCurrentVisitorName();
  const idx = cache.corazones.findIndex(c => c.nombre === yo);
  const corazonBtn = document.getElementById("btn-corazon");

  if (idx === -1) {
    // Agregar corazón (optimista)
    cache.corazones.push({ nombre: yo });
    document.getElementById("corazon-count").textContent = cache.corazones.length;
    document.getElementById("corazon-icon").textContent = "❤️";
    corazonBtn.classList.add("activo");

    const res = await fetch(sbUrl("reacciones"), {
      method: "POST",
      headers: sbHeaders({ "Prefer": "resolution=ignore-duplicates" }),
      body: JSON.stringify({ foto_key: fotoKey, nombre: yo })
    });
    if (!res.ok) {
      // revertir si falla
      cache.corazones.pop();
      document.getElementById("corazon-count").textContent = cache.corazones.length;
      document.getElementById("corazon-icon").textContent = "🤍";
      corazonBtn.classList.remove("activo");
    }
  } else {
    // Quitar corazón (optimista)
    cache.corazones.splice(idx, 1);
    document.getElementById("corazon-count").textContent = cache.corazones.length;
    document.getElementById("corazon-icon").textContent = "🤍";
    corazonBtn.classList.remove("activo");

    await fetch(sbUrl(`reacciones?foto_key=eq.${encodeURIComponent(fotoKey)}&nombre=eq.${encodeURIComponent(yo)}`), {
      method: "DELETE",
      headers: sbHeaders()
    });
  }

  corazonBtn.title = cache.corazones.length
    ? "❤️ " + cache.corazones.map(c => c.nombre).join(", ")
    : "";
}

async function enviarComentario() {
  const input = document.getElementById("comentario-input");
  const texto = input.value.trim();
  if (!texto) return;

  const fotoKey = getFotoKey(currentAlbumId, currentPhoto);
  const cache = reaccionesCache[fotoKey];
  if (!cache) return;

  const btn = document.getElementById("btn-enviar-comentario");
  btn.disabled = true;

  const nombre = getCurrentVisitorName();
  const comentario = { foto_key: fotoKey, nombre, texto };

  const res = await fetch(sbUrl("comentarios"), {
    method: "POST",
    headers: sbHeaders({ "Prefer": "return=representation" }),
    body: JSON.stringify(comentario)
  });

  if (res.ok) {
    cache.comentarios.push({ nombre, texto, created_at: new Date().toISOString() });
    renderComentarios(cache.comentarios);
    input.value = "";
  }
  btn.disabled = false;
}

// ============================================================
// REGISTRO DE VISITAS (compartido entre todos los dispositivos)
// ============================================================
async function registrarVisita(nombre) {
  try {
    await fetch(sbUrl("visitas"), {
      method: "POST",
      headers: sbHeaders(),
      body: JSON.stringify({ nombre })
    });
  } catch(e) {}
}

async function abrirPanelVisitas() {
  const overlay = document.getElementById("visitas-overlay");
  const lista = document.getElementById("visitas-lista");
  lista.innerHTML = '<p style="opacity:.5;font-size:13px">Cargando...</p>';
  overlay.classList.add("open");

  let visitas = [];
  try {
    const res = await fetch(sbUrl("visitas?select=nombre,created_at&order=created_at.desc&limit=200"), {
      headers: sbHeaders()
    });
    if (res.ok) visitas = await res.json();
  } catch(e) {}

  if (!visitas.length) {
    lista.innerHTML = '<p style="opacity:.6;font-size:13px">Aún no hay visitas registradas.</p>';
    return;
  }

  lista.innerHTML = visitas.map(v => {
    const d = new Date(v.created_at);
    const fechaStr = d.toLocaleDateString("es-MX", { day:"numeric", month:"long", year:"numeric" });
    const horaStr  = d.toLocaleTimeString("es-MX", { hour:"2-digit", minute:"2-digit" });
    return `<div class="visita-item">
      <span class="visita-nombre">${escapeHtml(v.nombre)}</span>
      <span class="visita-fecha">${fechaStr}, ${horaStr}</span>
    </div>`;
  }).join("");
}

function cerrarPanelVisitas() {
  document.getElementById("visitas-overlay").classList.remove("open");
}

async function borrarRegistroVisitas() {
  if (!confirm("¿Seguro que quieres borrar todo el registro de visitas? Esta acción no se puede deshacer.")) return;

  const lista = document.getElementById("visitas-lista");
  lista.innerHTML = '<p style="opacity:.5;font-size:13px">Borrando...</p>';

  try {
    // Supabase requiere un filtro para DELETE masivo; id > 0 cubre todos los registros
    const res = await fetch(sbUrl("visitas?id=gt.0"), {
      method: "DELETE",
      headers: sbHeaders()
    });
    if (res.ok) {
      lista.innerHTML = '<p style="opacity:.6;font-size:13px">Registro borrado. Aún no hay visitas registradas.</p>';
    } else {
      lista.innerHTML = '<p style="opacity:.6;font-size:13px">No se pudo borrar el registro. Intenta de nuevo.</p>';
    }
  } catch(e) {
    lista.innerHTML = '<p style="opacity:.6;font-size:13px">No se pudo borrar el registro. Intenta de nuevo.</p>';
  }
}
