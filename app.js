/* ==========================================================================
   app.js — affichage du portfolio + mode édition
   Ordre : 1. Outils  2. Affichage  3. Mode édition  4. Démarrage
   ========================================================================== */
"use strict";

/* 1. OUTILS ------------------------------------------------------------- */
const EDIT = new URLSearchParams(location.search).has("edit"); // ?edit => mode édition
const KEY = "portfolio-ella";                                  // clé de sauvegarde locale
const $ = (s) => document.querySelector(s);
let state = structuredClone(DEFAULT_CONTENT);                  // le contenu affiché

// Protège le texte avant de l'injecter dans le HTML
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
// Lit / écrit une valeur via un chemin du type "d.0.t.1.c"
const get = (path) => path.split(".").reduce((o, k) => o?.[k], state);
const set = (path, v) => { const k = path.split("."), last = k.pop(); k.reduce((o, i) => o[i], state)[last] = v; };

const readDraft = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
const save = () => {
  try { localStorage.setItem(KEY, JSON.stringify(state)); }
  catch { alert("Mémoire du navigateur pleine : exporte content.json pour ne rien perdre."); }
};

// Niveau texte -> 1 à 4 (pour les petits points)
const level = (r = "") => { r = r.toLowerCase(); return r.startsWith("très") ? 4 : r.startsWith("bien") ? 3 : r.startsWith("assez") ? 2 : r.startsWith("peu") ? 1 : 0; };
const dots = (r) => `<span class="dots" aria-hidden="true">${[1, 2, 3, 4].map((i) => `<i class="${i <= level(r) ? "on" : ""}"></i>`).join("")}</span>`;

// Crée un texte modifiable (en mode édition) lié à un chemin de données
const field = (path, ph, tag = "span", cls = "") =>
  `<${tag} class="${cls}" data-p="${path}" data-ph="${esc(ph)}"${EDIT ? ' contenteditable="plaintext-only"' : ""}>${esc(get(path))}</${tag}>`;
// Bouton d'action (visible seulement en mode édition)
const btn = (action, path, label, cls = "") =>
  EDIT ? `<button type="button" class="mini-btn ${cls}" data-a="${action}" data-p="${path}">${label}</button>` : "";

/* 2. AFFICHAGE ---------------------------------------------------------- */
// Un bloc de justification (zone de texte libre)
function panel(title, hint, path) {
  return `<div class="panel"><h3>${title}</h3>${EDIT ? `<p class="hint">${hint}</p>` : ""}${field(path, "Écris ici…", "p", "zone")}</div>`;
}

// Une carte = une trace (TP, SAÉ, projet…)
function renderTrace(x, j, P) {
  const Q = `${P}.t.${j}`;
  const shot = x.img ? `<img src="${x.img}" alt="Capture : ${esc(x.t)}">` : "capture à ajouter";
  const tools = EDIT
    ? `<div class="tools"><label class="mini-btn">${x.img ? "Changer" : "Ajouter une capture"}<input type="file" accept="image/*" hidden data-i="${Q}"></label>${x.img ? btn("delimg", Q, "Retirer") : ""}</div>`
    : "";
  const bullets = (x.b || []).map((b, k) => `<li>${field(`${Q}.b.${k}`, "en …")}${btn("delb", `${Q}.b.${k}`, "✕")}</li>`).join("");
  return `
  <article class="card">${btn("delc", Q, "Supprimer la trace", "danger")}
    <div class="tete">${field(Q + ".t", "Titre de la trace", "h3", "titre")}
      <div class="badge">${field(Q + ".r", "Niveau", "span", "note")}${dots(x.r)}</div></div>
    <div class="shot">${shot}${tools}</div>
    ${field(Q + ".c", "j’ai … :", "p", "cap")}
    <ul>${bullets}</ul>${btn("addb", Q, "+ Ajouter un point")}
    ${EDIT || x.com ? field(Q + ".com", "Commentaire libre : ce que j’ai appris, ce que je referais autrement…", "p", "zone") : ""}
  </article>`;
}

// Une section = une compétence (bandeau + justifications + traces)
function renderCompetence(c, i) {
  const P = `d.${i}`;
  const showAC = EDIT || c.acJust, showJ = EDIT || c.an;
  return `
  <section id="c${c.n}" aria-labelledby="h${c.n}">
    <div class="band"><div class="txt">
      <p class="mini">MAHIEU Ella – BUT2 – Portfolio</p>
      <h2 id="h${c.n}">Compétence #${c.n}</h2>
      ${field(P + ".nom", "Nom de la compétence", "p", "nom")}
      <p class="pill"><b>AC</b>${field(P + ".ac", "Apprentissage critique")}</p>
      <p class="pill"><b>CE</b>${field(P + ".ce", "Composante essentielle")}</p>
    </div>
    <div class="auto"><p>Auto-évaluation globale :</p>${field(P + ".auto", "Niveau", "strong")}</div></div>
    ${showAC || showJ ? `<div class="panels">
      ${showAC ? panel("Justification de l’AC", "Explique avec tes mots pourquoi tu es à même de faire ce que dit l’AC, en citant tes traces.", P + ".acJust") : ""}
      ${showJ ? panel("Justification de mon auto-évaluation", "Pourquoi ce niveau ? Appuie-toi sur des exemples précis, des réussites et des difficultés.", P + ".an") : ""}
    </div>` : ""}
    <div class="grid">${c.t.map((x, j) => renderTrace(x, j, P)).join("")}</div>
    ${btn("addc", P, "+ Ajouter une trace", "add")}
  </section>`;
}

// Dessine toute la page
function render() {
  $("#intro").innerHTML = field("m.intro", "Ta phrase d’introduction");
  $("#nav").innerHTML = state.d.map((c) => `<a href="#c${c.n}">C${c.n} · ${esc(c.court)}</a>`).join("");
  $("#app").innerHTML =
    (EDIT ? `<p class="help">Clique sur n’importe quel texte pour le modifier. Tes changements restent dans ce navigateur. Quand tu as fini : « Exporter », puis remplace content.json dans ton dépôt GitHub.</p>` : "") +
    (EDIT || state.m.apropos ? `<section class="about"><h2>À propos de moi</h2>${field("m.apropos", "Présente-toi : parcours, projet professionnel, ce que tu aimes faire…", "p", "zone")}</section>` : "") +
    state.d.map(renderCompetence).join("");
  watchSections();
}

// Met en surbrillance dans le menu la compétence affichée à l'écran
let observer;
function watchSections() {
  observer?.disconnect();
  observer = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    document.querySelectorAll("#nav a").forEach((a) =>
      a.hash === "#" + e.target.id ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current"));
  }), { rootMargin: "-30% 0px -60% 0px" });
  document.querySelectorAll("main section[id^=c]").forEach((s) => observer.observe(s));
}

/* 3. MODE ÉDITION ------------------------------------------------------- */
// Chaque frappe est enregistrée dans l'état puis dans le navigateur
document.addEventListener("input", (e) => {
  const p = e.target.dataset?.p;
  if (EDIT && p && e.target.isContentEditable) { set(p, e.target.innerText); save(); }
});
// Quand on quitte un niveau, on redessine pour mettre à jour les points
document.addEventListener("focusout", (e) => { if (EDIT && e.target.dataset?.p?.endsWith(".r")) render(); });
// Entrée = saut de ligne seulement dans les grandes zones de texte
document.addEventListener("keydown", (e) => {
  const t = e.target;
  if (e.key === "Enter" && t.dataset?.p && !t.classList.contains("zone")) e.preventDefault();
});
// Boutons : ajouter / supprimer une trace, un point, une capture
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-a]");
  if (!b) return;
  const a = b.dataset.a, p = b.dataset.p, k = p.split("."), i = +k.pop();
  if (a === "delc" || a === "delb") {
    if (a === "delc" && !confirm("Supprimer cette trace ?")) return;
    get(k.join(".")).splice(i, 1);
  } else if (a === "addb") { const x = get(p); (x.b = x.b || []).push(""); }
  else if (a === "addc") get(p).t.push({ t: "", r: "", c: "", b: [] });
  else if (a === "delimg") get(p).img = "";
  save(); render();
});
// Ajout d'une capture : l'image est réduite (1100 px max) pour rester légère
document.addEventListener("change", async (e) => {
  const f = e.target.files?.[0], p = e.target.dataset.i;
  if (!f || !p) return;
  const bm = await createImageBitmap(f), s = Math.min(1, 1100 / bm.width);
  const c = document.createElement("canvas"), g = c.getContext("2d");
  c.width = bm.width * s; c.height = bm.height * s;
  g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height); g.drawImage(bm, 0, 0, c.width, c.height);
  get(p).img = c.toDataURL("image/jpeg", 0.82);
  save(); render();
});
// Barre du bas : exporter / réinitialiser
function setupEditBar() {
  document.body.classList.add("ed");
  document.body.insertAdjacentHTML("beforeend",
    `<div class="bar"><span>Mode édition</span><button id="ex">Exporter content.json</button><button id="rs">Réinitialiser</button></div>`);
  $("#ex").onclick = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(state, null, 1)], { type: "application/json" }));
    a.download = "content.json"; a.click();
  };
  $("#rs").onclick = () => { if (confirm("Effacer tes modifications locales ?")) { localStorage.removeItem(KEY); location.reload(); } };
}

/* 4. DÉMARRAGE ---------------------------------------------------------- */
if (EDIT) { setupEditBar(); if (readDraft()) state = JSON.parse(readDraft()); }
render();
// Visiteurs (ou édition sans brouillon) : on charge content.json s'il existe à côté de la page
if (!(EDIT && readDraft()))
  fetch("content.json").then((r) => (r.ok ? r.json() : Promise.reject())).then((j) => { state = j; render(); }).catch(() => {});
