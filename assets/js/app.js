function rng(s) {
  return function () {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const G = {
  bands(x, r, p, W, H) {
    x.fillStyle = p[4];
    x.globalAlpha = 0.9;
    x.beginPath();
    x.arc(W * 0.62, H * 0.22, W * 0.09, 0, 7);
    x.fill();
    x.globalAlpha = 1;
    let y = H * 0.28;
    for (let i = 1; y < H; i++) {
      const bh = H * (0.06 + r() * 0.14);
      x.globalAlpha = 0.75 + r() * 0.25;
      x.fillStyle = p[1 + (i % 4)];
      x.fillRect(0, y, W, bh + 1);
      y += bh;
    }
    x.globalAlpha = 1;
  },
  circles(x, r, p, W, H) {
    for (let i = 0; i < 9; i++) {
      x.globalAlpha = 0.72;
      x.fillStyle = p[1 + (i % 4)];
      x.beginPath();
      x.arc(
        W * (0.15 + r() * 0.7),
        H * (0.15 + r() * 0.7),
        W * (0.1 + r() * 0.2),
        0,
        7,
      );
      x.fill();
    }
    x.globalAlpha = 1;
  },
  lines(x, r, p, W, H) {
    x.lineCap = "round";
    for (let i = 0; i < 46; i++) {
      const X = (W * (i + 0.5)) / 46,
        a = H * (0.1 + r() * 0.3),
        b = H * (0.6 + r() * 0.35),
        c = (r() - 0.5) * W * 0.12;
      x.strokeStyle = p[1 + (i % 4)];
      x.lineWidth = ((1 + r() * 5) * W) / 300;
      x.beginPath();
      x.moveTo(X, a);
      x.quadraticCurveTo(X + c, (a + b) / 2, X, b);
      x.stroke();
    }
  },
  grid(x, r, p, W, H) {
    const c = 3,
      n = 4,
      cw = W / c,
      ch = H / n,
      m = W / 60;
    for (let i = 0; i < c; i++)
      for (let j = 0; j < n; j++) {
        const X = i * cw,
          Y = j * ch;
        x.fillStyle = p[1 + Math.floor(r() * 4)];
        if (r() > 0.5) x.fillRect(X + m, Y + m, cw - 2 * m, ch - 2 * m);
        else {
          x.beginPath();
          x.moveTo(X + m, Y + ch - m);
          x.arc(X + cw / 2, Y + ch - m, cw / 2 - m, Math.PI, 0);
          x.closePath();
          x.fill();
        }
      }
  },
  arches(x, r, p, W, H) {
    for (let i = 0; i < 5; i++) {
      const m = i * W * 0.075,
        ww = W - 2 * m,
        top = H * 0.12 + i * H * 0.1;
      x.globalAlpha = 0.8 + r() * 0.2;
      x.fillStyle = p[1 + (i % 4)];
      x.beginPath();
      x.moveTo(m, H);
      x.lineTo(m, top + ww / 2);
      x.arc(m + ww / 2, top + ww / 2, ww / 2, Math.PI, 0);
      x.lineTo(m + ww, H);
      x.closePath();
      x.fill();
    }
    x.globalAlpha = 1;
  },
};
const WORKS = [
  {
    t: "Horses in the Mist",
    a: "Shreya Diwakar",
    y: "",
    d: "Graphite",
    s: "16.5 × 11.7 in",
    pr: "₹10,000",
    image: "artworks/defaults/artwork-01.jpg",
    g: "bands",
    w: 4,
    h: 3,
    seed: 3,
    p: ["#e8dcc8", "#7d9aa5", "#3f5f73", "#b8c4c0", "#e0a060"],
  },
  {
    t: "Among the Flowers",
    a: "Shreya Diwakar",
    y: "",
    d: "Acrylic",
    s: "11.7 × 16.5 in",
    pr: "₹8,000",
    image: "artworks/defaults/artwork-03.jpg",
    g: "lines",
    w: 3,
    h: 4,
    seed: 5,
    p: ["#efe9df", "#1f2a5c", "#2c3fa3", "#9aa6d8", "#171d1b"],
  },
  {
    t: "Quiet Cat",
    a: "Shreya Diwakar",
    y: "",
    d: "White pencil on black paper",
    s: "8.3 × 8.3 in",
    pr: "₹7,000",
    image: "artworks/defaults/artwork-02.jpg",
    g: "circles",
    w: 1,
    h: 1,
    seed: 8,
    p: ["#2f3a2a", "#c9d17a", "#e8a33d", "#7aa37f", "#d86a4a"],
  },
  {
    t: "Two Kittens",
    a: "Shreya Diwakar",
    y: "",
    d: "Acrylic",
    s: "11.8 × 11.8 in",
    pr: "₹8,000",
    image: "artworks/defaults/artwork-04.jpg",
    g: "bands",
    w: 15,
    h: 7,
    seed: 11,
    p: ["#f0ece4", "#c7c3b8", "#8f9a99", "#d9d2c2", "#b86a52"],
  },
  {
    t: "A Gentle Look",
    a: "Shreya Diwakar",
    y: "",
    d: "Graphite",
    s: "8.3 × 11.7 in",
    pr: "₹9,000",
    image: "artworks/defaults/artwork-05.jpg",
    g: "grid",
    w: 3,
    h: 4,
    seed: 2,
    p: ["#f3efe6", "#d8553a", "#2c3fa3", "#e9b949", "#25302e"],
  },
  {
    t: "Madhubani: The Melody of Vrindavan",
    a: "Shreya Diwakar",
    y: "",
    d: "Acrylic",
    s: "16.5 × 11.7 in",
    pr: "₹12,000",
    image: "artworks/defaults/artwork-07.jpg",
    g: "circles",
    w: 1,
    h: 1,
    seed: 21,
    p: ["#e9ece4", "#2c3fa3", "#7bb6a8", "#f0a6b8", "#e6c94d"],
  },
  {
    t: "The Gomez Gaze",
    a: "Shreya Diwakar",
    y: "",
    d: "Graphite",
    s: "11.7 × 16.5 in",
    pr: "₹4,000",
    image: "artworks/defaults/artwork-06.jpg",
    g: "arches",
    w: 3,
    h: 4,
    seed: 7,
    p: ["#1d1b22", "#6a2d36", "#b5533c", "#e08a4d", "#f0c27a"],
  },
  {
    t: "Riverside Village",
    a: "Shreya Diwakar",
    y: "",
    d: "Pencil Colour",
    s: "11.7 × 16.5 in",
    pr: "₹3,000",
    image: "artworks/defaults/artwork-08.jpg",
    g: "arches",
    w: 5,
    h: 4,
    seed: 14,
    p: ["#3c4a47", "#58706b", "#7f9a93", "#a9bdb5", "#e8e4d4"],
  },
];
WORKS.forEach((w) => {
  w.n = "An original artwork by Shreya Diwakar.";
});
let viewI = -1;
const canvas = document.getElementById("c");
function isArtworkElement(target) {
  return target instanceof Element && target.closest("#c, #view img");
}
document.addEventListener("contextmenu", (event) => {
  if (isArtworkElement(event.target)) event.preventDefault();
});
document.addEventListener("dragstart", (event) => {
  if (isArtworkElement(event.target)) event.preventDefault();
});
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x12141c);
scene.fog = new THREE.Fog(0x12141c, 18, 36);
const cam = new THREE.PerspectiveCamera(65, 1, 0.1, 60);
cam.rotation.order = "YXZ";
const HX = 14,
  HZ = 6,
  HY = 4.6;
const mat = (c, r = 0.9, m = 0) =>
  new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m });
// floor
const fc = document.createElement("canvas");
fc.width = fc.height = 512;
const fx = fc.getContext("2d"),
  fr = rng(4);
for (let i = 0; i < 8; i++) {
  const l = 48 + fr() * 10;
  fx.fillStyle = `hsl(28,38%,${l}%)`;
  fx.fillRect(i * 64, 0, 63, 512);
  for (let j = 0; j < 60; j++) {
    fx.fillStyle = `rgba(60,30,10,${fr() * 0.08})`;
    fx.fillRect(i * 64 + fr() * 60, fr() * 512, 1, 30 + fr() * 80);
  }
}
const ft = new THREE.CanvasTexture(fc);
ft.wrapS = ft.wrapT = THREE.RepeatWrapping;
ft.repeat.set(7, 2.2);
ft.anisotropy = 8;
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(HX * 2, HZ * 2),
  new THREE.MeshStandardMaterial({ map: ft, roughness: 0.55 }),
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);
const ceil = new THREE.Mesh(
  new THREE.PlaneGeometry(HX * 2, HZ * 2),
  mat(0xeeeef2),
);
ceil.rotation.x = Math.PI / 2;
ceil.position.y = HY;
scene.add(ceil);
const wm = mat(0xdedee3, 0.95);
function wall(w, x, z, ry) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, HY), wm);
  m.position.set(x, HY / 2, z);
  m.rotation.y = ry;
  scene.add(m);
  const b = new THREE.Mesh(new THREE.BoxGeometry(w, 0.18, 0.04), mat(0xf5f5f7));
  b.position.set(x, 0.09, z);
  b.rotation.y = ry;
  b.translateZ(0.02);
  scene.add(b);
}
wall(HX * 2, 0, -HZ, 0);
wall(HX * 2, 0, HZ, Math.PI);
wall(HZ * 2, -HX, 0, Math.PI / 2);
wall(HZ * 2, HX, 0, -Math.PI / 2);
// ceiling light strips
function track(z) {
  const r = new THREE.Mesh(
    new THREE.BoxGeometry(HX * 1.9, 0.05, 0.07),
    mat(0x15191a, 0.5),
  );
  r.position.set(0, HY - 0.025, z);
  scene.add(r);
}
function fixture(x, z, tx, ty, tz) {
  const g = new THREE.Group();
  g.position.set(x, HY - 0.06, z);
  scene.add(g);
  const st = new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 0.2, 0.04),
    mat(0x15191a),
  );
  st.position.y = -0.06;
  g.add(st);
  const b = new THREE.Group();
  b.position.y = -0.17;
  g.add(b);
  b.add(
    new THREE.Mesh(
      new THREE.CylinderGeometry(0.085, 0.085, 0.38, 20).rotateX(Math.PI / 2),
      mat(0xf6f6f2, 0.35),
    ),
  );
  const lens = new THREE.Mesh(
    new THREE.CircleGeometry(0.075, 20),
    new THREE.MeshBasicMaterial({ color: 0xfff4d8 }),
  );
  lens.position.z = 0.191;
  b.add(lens);
  b.lookAt(tx, ty, tz);
}
[-3.8, 3.8].forEach((z) => track(z));
[-7.6, -2.53, 2.53, 7.6].forEach((x) => {
  [-0.7, 0.7].forEach((offset) => {
    fixture(x + offset, -3.8, x, 2.1, -HZ);
    fixture(x + offset, 3.8, x, 2.1, HZ);
  });
});
scene.add(new THREE.HemisphereLight(0xfff6e8, 0x6b5a48, 0.75));
function fit(w) {
  const a = w.w / w.h;
  let H = 2.2,
    W = H * a;
  if (W > 3.4) {
    W = 3.4;
    H = W / a;
  }
  if (W < 1.1) {
    W = 1.1;
    H = W / a;
  }
  w.fr.scale.set(W + 0.34, H + 0.34, 1);
  w.mt.scale.set(W + 0.16, H + 0.16, 1);
  w.pl.scale.set(W, H, 1);
}
// paintings
const spots = [],
  groups = [];
WORKS.forEach((w, i) => {
  const c = document.createElement("canvas"),
    k = 110;
  c.width = w.w * k;
  c.height = w.h * k;
  const x = c.getContext("2d");
  x.fillStyle = w.p[0];
  x.fillRect(0, 0, c.width, c.height);
  G[w.g](x, rng(w.seed * 97 + i), w.p, c.width, c.height);
  w.cv = c;
  const t = new THREE.CanvasTexture(c);
  t.minFilter = THREE.LinearFilter;
  t.anisotropy = 8;

  const g = new THREE.Group();
  const north = i < 4,
    wallX = [-7.6, -2.53, 2.53, 7.6][i % 4],
    wallZ = north ? -HZ + 0.06 : HZ - 0.06,
    wallRotation = north ? 0 : Math.PI,
    targetX = wallX,
    targetZ = north ? -HZ + 2.7 : HZ - 2.7,
    targetYaw = north ? 0 : Math.PI;
  const fr = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 0.1),
    mat(0x2a2420, 0.6),
  );
  fr.position.z = 0.0;
  g.add(fr);
  const mt = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat(0xf5f5f7));
  mt.position.z = 0.052;
  g.add(mt);
  const pl = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshStandardMaterial({ map: t, roughness: 0.8 }),
  );
  pl.position.z = 0.056;
  g.add(pl);
  w.fr = fr;
  w.mt = mt;
  w.pl = pl;
  fit(w);
  g.userData.i = i;
  groups.push(g);
  g.position.set(wallX, 2.1, wallZ);
  g.rotation.y = wallRotation;
  scene.add(g);
  const sp = new THREE.SpotLight(0xfff1dc, 1.1, 12, 0.55, 0.7, 1.2);
  const inward = north ? 1 : -1;
  sp.position.set(wallX, HY - 0.2, wallZ + inward * 2.2);
  sp.target.position.set(wallX, 2, wallZ);
  scene.add(sp, sp.target);
  w.px = targetX;
  w.pz = targetZ;
  w.lookYaw = targetYaw;
  w.pos = new THREE.Vector3(wallX, 2.1, wallZ);
});
// central sculpture
const ped = new THREE.Mesh(
  new THREE.CylinderGeometry(0.8, 0.9, 1, 40),
  mat(0xeeeef2, 0.7),
);
ped.position.y = 0.5;
scene.add(ped);
const knot = new THREE.Group();
knot.position.y = 1;
scene.add(knot);
(function () {
  const P = (a) => a.map(([x, y]) => [(x - 110) / 90, -(y - 190) / 90]);
  const S = 300,
    X0 = -1.4,
    Y1 = 1.95,
    W = 930,
    H = 1140;
  const mi = new Image();
  mi.onload = () => {
    const cv = document.createElement("canvas");
    cv.width = W;
    cv.height = H;
    const g = cv.getContext("2d");
    g.fillStyle = "#fff";
    /* silhouette cut from the photo */
    g.imageSmoothingEnabled = true;
    g.imageSmoothingQuality = "high";
    g.drawImage(
      mi,
      ((0 - 110) / 90 - X0) * S,
      (Y1 - 190 / 90) * S,
      (259 * S) / 90,
      (367 * S) / 90,
    );
    const A = g.getImageData(0, 0, W, H).data,
      NP = W * H;
    const Mb = new Uint8Array(NP);
    for (let i = 0; i < NP; i++) Mb[i] = A[i * 4 + 3] > 127 ? 1 : 0;
    /* running-sum box blur and exact distance transform (used for morphological opening) */
    const box = (a, w, h, r) => {
      const T = new Float32Array(w * h),
        O = new Float32Array(w * h),
        n = 2 * r + 1;
      for (let y = 0; y < h; y++) {
        const o = y * w;
        let s = 0;
        for (let x = 0; x <= r && x < w; x++) s += a[o + x];
        for (let x = 0; x < w; x++) {
          T[o + x] = s / n;
          const ad = x + r + 1,
            sb = x - r;
          if (ad < w) s += a[o + ad];
          if (sb >= 0) s -= a[o + sb];
        }
      }
      for (let x = 0; x < w; x++) {
        let s = 0;
        for (let y = 0; y <= r && y < h; y++) s += T[y * w + x];
        for (let y = 0; y < h; y++) {
          O[y * w + x] = s / n;
          const ad = y + r + 1,
            sb = y - r;
          if (ad < h) s += T[ad * w + x];
          if (sb >= 0) s -= T[sb * w + x];
        }
      }
      return O;
    };
    /* the silhouette is already a clean curve: only soften the edge a little so its 0.5 contour is smooth */
    let Af = Float32Array.from(Mb);
    for (let p = 0; p < 3; p++) Af = box(Af, W, H, 3);

    /* ---- pillow height field -> closed mesh ---- */
    const st = 2,
      nx = Math.floor((W - 1) / st) + 1,
      ny = Math.floor((H - 1) / st) + 1,
      N = nx * ny;
    const inside = new Uint8Array(N),
      sd = new Float32Array(N),
      nX = new Float32Array(N),
      nY = new Float32Array(N);
    for (let j = 0; j < ny; j++)
      for (let i = 0; i < nx; i++) {
        const v = j * nx + i,
          px = Math.min(i * st, W - 1),
          py = Math.min(j * st, H - 1),
          k =
            Math.min(Math.max(py, 1), H - 2) * W +
            Math.min(Math.max(px, 1), W - 2),
          gx = (Af[k + 1] - Af[k - 1]) / 2,
          gy = (Af[k + W] - Af[k - W]) / 2,
          g = Math.max(Math.hypot(gx, gy), 1e-3);
        inside[v] = Af[k] > 0.5 ? 1 : 0;
        sd[v] = Math.max(-0.014, Math.min(0.014, (Af[k] - 0.5) / g / S));
        nX[v] = gx / g;
        nY[v] = gy / g;
      }
    const filt = (src, r, mx) => {
      let a = src;
      for (let ax = 0; ax < 2; ax++) {
        const o = new Float32Array(N);
        for (let j = 0; j < ny; j++)
          for (let i = 0; i < nx; i++) {
            let m = 0,
              s = 0,
              c = 0;
            for (let k = -r; k <= r; k++) {
              const ii = ax ? i : i + k,
                jj = ax ? j + k : j;
              if (ii < 0 || jj < 0 || ii >= nx || jj >= ny) continue;
              const v = a[jj * nx + ii];
              if (v > m) m = v;
              s += v;
              c++;
            }
            o[j * nx + i] = mx ? m : s / c;
          }
        a = o;
      }
      return a;
    };
    /* smooth inflation: solve laplace(phi)=-2 inside the silhouette (phi=0 on the true contour), coarse to fine, so there are no medial-axis creases */
    let phi = null,
      pnx = 0,
      pny = 0;
    for (const [sg, its] of [
      [8, 600],
      [4, 300],
      [2, 150],
      [1, 200],
    ]) {
      const cx = Math.floor((nx - 1) / sg) + 1,
        cy = Math.floor((ny - 1) / sg) + 1,
        h2 = ((sg * st) / S) * ((sg * st) / S),
        m = new Uint8Array(cx * cy),
        p = new Float32Array(cx * cy);
      for (let j = 0; j < cy; j++)
        for (let i = 0; i < cx; i++)
          m[j * cx + i] =
            inside[Math.min(j * sg, ny - 1) * nx + Math.min(i * sg, nx - 1)];
      if (phi)
        for (let j = 0; j < cy; j++)
          for (let i = 0; i < cx; i++) {
            if (!m[j * cx + i]) continue;
            const fi = i / 2,
              fj = j / 2,
              i0 = Math.min(Math.floor(fi), pnx - 1),
              j0 = Math.min(Math.floor(fj), pny - 1),
              i1 = Math.min(i0 + 1, pnx - 1),
              j1 = Math.min(j0 + 1, pny - 1),
              ax = fi - i0,
              ay = fj - j0;
            p[j * cx + i] = Math.max(
              0,
              (phi[j0 * pnx + i0] * (1 - ax) + phi[j0 * pnx + i1] * ax) *
                (1 - ay) +
                (phi[j1 * pnx + i0] * (1 - ax) + phi[j1 * pnx + i1] * ax) * ay,
            );
          }
      if (sg > 1) {
        for (let it = 0; it < its; it++)
          for (let j = 1; j < cy - 1; j++)
            for (let i = 1; i < cx - 1; i++) {
              const k = j * cx + i;
              if (!m[k]) continue;
              p[k] +=
                1.7 *
                ((p[k - 1] + p[k + 1] + p[k - cx] + p[k + cx] + 2 * h2) / 4 -
                  p[k]);
            }
      } else {
        /* finest level: boundary sits at its true distance (Shortley-Weller), not at the nearest grid point */
        const dist = (v, w) =>
          inside[w] ? 1 : Math.min(1, Math.max(0.03, sd[v] / (sd[v] - sd[w])));
        const aL = new Float32Array(N),
          aR = new Float32Array(N),
          aU = new Float32Array(N),
          aD = new Float32Array(N);
        for (let j = 1; j < ny - 1; j++)
          for (let i = 1; i < nx - 1; i++) {
            const v = j * nx + i;
            if (!inside[v]) continue;
            aL[v] = dist(v, v - 1);
            aR[v] = dist(v, v + 1);
            aU[v] = dist(v, v - nx);
            aD[v] = dist(v, v + nx);
          }
        for (let it = 0; it < its; it++)
          for (let j = 1; j < ny - 1; j++)
            for (let i = 1; i < nx - 1; i++) {
              const v = j * nx + i;
              if (!inside[v]) continue;
              const l = aL[v],
                r = aR[v],
                u = aU[v],
                d = aD[v],
                uL = inside[v - 1] ? p[v - 1] : 0,
                uR = inside[v + 1] ? p[v + 1] : 0,
                uU = inside[v - nx] ? p[v - nx] : 0,
                uD = inside[v + nx] ? p[v + nx] : 0,
                den = 1 / (l * r) + 1 / (u * d),
                num =
                  h2 +
                  uL / (l * (l + r)) +
                  uR / (r * (l + r)) +
                  uU / (u * (u + d)) +
                  uD / (d * (u + d));
              p[v] += 1.7 * (num / den - p[v]);
            }
      }
      phi = p;
      pnx = cx;
      pny = cy;
    }
    const pos = new Float32Array(N * 6),
      uv = new Float32Array(N * 4),
      hh = new Float32Array(N);
    for (let j = 0; j < ny; j++)
      for (let i = 0; i < nx; i++) {
        const v = j * nx + i,
          px = Math.min(i * st, W - 1),
          py = Math.min(j * st, H - 1),
          h = inside[v]
            ? Math.max(0.95 * Math.sqrt(Math.max(phi[v], 0)), 1e-5)
            : 0;
        hh[v] = h;
        let x = X0 + px / S,
          y = Y1 - py / S;
        if (!inside[v]) {
          let near = 0;
          for (let dj = -1; dj <= 1 && !near; dj++)
            for (let di = -1; di <= 1; di++) {
              const ii = i + di,
                jj = j + dj;
              if (
                ii >= 0 &&
                jj >= 0 &&
                ii < nx &&
                jj < ny &&
                inside[jj * nx + ii]
              ) {
                near = 1;
                break;
              }
            }
          if (near) {
            x -= sd[v] * nX[v];
            y += sd[v] * nY[v];
          }
        } /* outline vertices land exactly on the smooth contour */
        pos.set([x, y, h], v * 3);
        pos.set([x, y, -h], (N + v) * 3);
        {
          const U = (110 + 90 * x) / 259,
            V = 1 - (190 - 90 * y) / 367;
          uv.set([U, V], v * 2);
          uv.set([U, V], (N + v) * 2);
        }
      }
    {
      /* even out the thickness: smooth the inflation field itself (not the height), so the pillow stays round and bump-free */
      const R = 12,
        pi = new Float32Array(N);
      for (let v = 0; v < N; v++) pi[v] = inside[v] ? phi[v] : 0;
      const ps = box(box(pi, nx, ny, R), nx, ny, R);
      for (let v = 0; v < N; v++) {
        if (hh[v] > 0) {
          const h = Math.max(0.95 * Math.sqrt(Math.max(ps[v], 0)), 1e-5);
          hh[v] = h;
          pos[v * 3 + 2] = h;
          pos[(N + v) * 3 + 2] = -h;
        }
      }
    }
    const idx = [];
    for (let j = 0; j < ny - 1; j++)
      for (let i = 0; i < nx - 1; i++) {
        const a = j * nx + i,
          b = a + 1,
          c = a + nx,
          d = c + 1;
        if (hh[a] > 0 || hh[b] > 0 || hh[c] > 0 || hh[d] > 0) {
          idx.push(a, c, b, b, c, d, N + a, N + b, N + c, N + b, N + d, N + c);
        }
      }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    {
      const nA = geo.attributes.normal,
        nr = nA.array,
        ok = (v) => Math.hypot(nr[v * 3], nr[v * 3 + 1], nr[v * 3 + 2]) > 0.1;
      const rim = () => {
        for (let v = 0; v < N; v++)
          if (hh[v] < 1e-5 && ok(v) && ok(N + v)) {
            const x = nr[v * 3] + nr[(N + v) * 3],
              y = nr[v * 3 + 1] + nr[(N + v) * 3 + 1],
              z = nr[v * 3 + 2] + nr[(N + v) * 3 + 2],
              l = Math.hypot(x, y, z) || 1;
            for (const w of [v, N + v]) {
              nr[w * 3] = x / l;
              nr[w * 3 + 1] = y / l;
              nr[w * 3 + 2] = z / l;
            }
          }
      };
      for (let p = 0; p < 12; p++) {
        rim();
        const c = nr.slice();
        for (let s = 0; s < 2; s++)
          for (let j = 1; j < ny - 1; j++)
            for (let i = 1; i < nx - 1; i++) {
              const v = s * N + j * nx + i;
              if (!ok(v)) continue;
              let x = c[v * 3] * 2,
                y = c[v * 3 + 1] * 2,
                z = c[v * 3 + 2] * 2;
              for (const d of [-1, 1, -nx, nx]) {
                const w = v + d;
                if (Math.hypot(c[w * 3], c[w * 3 + 1], c[w * 3 + 2]) > 0.1) {
                  x += c[w * 3];
                  y += c[w * 3 + 1];
                  z += c[w * 3 + 2];
                }
              }
              const l = Math.hypot(x, y, z) || 1;
              nr[v * 3] = x / l;
              nr[v * 3 + 1] = y / l;
              nr[v * 3 + 2] = z / l;
            }
      }
      rim();
      nA.needsUpdate = true;
    }

    const mat = new THREE.MeshStandardMaterial({
      color: 0xf3f1ec,
      roughness: 0.62,
      metalness: 0,
      envMapIntensity: 0.18,
    });
    /* studio reflections for the glaze */
    const envS = new THREE.Scene();
    envS.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(12, 32, 16),
        new THREE.MeshBasicMaterial({ color: 0x6e5d4b, side: THREE.BackSide }),
      ),
    );
    [
      [-6, 5, 6, 7, 5, 5],
      [7, 3, -4, 2.5, 7, 3],
      [0, 10, 0, 8, 8, 2.5],
      [6, 2, 6, 3, 6, 2],
    ].forEach(([x, y, z, w, h, i]) => {
      const p = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(1, 0.98, 0.94).multiplyScalar(i),
          side: THREE.DoubleSide,
        }),
      );
      p.position.set(x, y, z);
      p.lookAt(0, 0, 0);
      envS.add(p);
    });
    const envTex = new THREE.PMREMGenerator(renderer).fromScene(
      envS,
      0.03,
    ).texture;

    mat.envMap = envTex;
    const swan = new THREE.Mesh(geo, mat),
      sc = 0.38;
    geo.computeBoundingBox();
    const bb = geo.boundingBox;
    swan.scale.setScalar(sc);
    swan.position.set(
      (-(bb.min.x + bb.max.x) / 2) * sc,
      0.04 - bb.min.y * sc,
      0,
    );
    const slab = new THREE.Mesh(
      new THREE.CylinderGeometry(0.82, 0.82, 0.04, 64),
      new THREE.MeshStandardMaterial({
        color: 0x23282c,
        roughness: 0.25,
        metalness: 0.3,
      }),
    );
    slab.position.y = 0.02;
    knot.add(slab, swan);
  };
  mi.src = "assets/sculpture.png";
})();
const sl = new THREE.SpotLight(0xffffff, 1.3, 10, 0.6, 0.6, 1.2);
sl.position.set(0, HY - 0.2, 0);
sl.target = knot;
scene.add(sl);
// controls
let px = -13.3,
  pz = 0,
  yaw = -Math.PI / 2,
  pitch = 0,
  tween = null;
const keys = {},
  hold = { fw: 0, bk: 0, lf: 0, rt: 0 };
addEventListener("keydown", (e) => {
  if (!e.key) return;
  if (document.getElementById("enqm").classList.contains("on")) {
    if (e.key === "Escape") closeEnq();
    return;
  }
  if (viewI >= 0) {
    if (e.key === "Escape") closeV();
    if (e.key === "ArrowRight") stepV(1);
    if (e.key === "ArrowLeft") stepV(-1);
    return;
  }
  keys[e.key.toLowerCase()] = 1;
  if (e.key.startsWith("Arrow")) e.preventDefault();
});
addEventListener("keyup", (e) => {
  if (e.key) keys[e.key.toLowerCase()] = 0;
});
let drag = null,
  down = null;
const ray = new THREE.Raycaster(),
  mv = new THREE.Vector2();
function pick(e) {
  const r = canvas.getBoundingClientRect();
  mv.set(
    ((e.clientX - r.left) / r.width) * 2 - 1,
    -(((e.clientY - r.top) / r.height) * 2 - 1),
  );
  ray.setFromCamera(mv, cam);
  const h = ray.intersectObjects(groups, true)[0];
  if (!h) return -1;
  let o = h.object;
  while (o && o.userData.i === undefined) o = o.parent;
  return o ? o.userData.i : -1;
}
canvas.addEventListener("pointerdown", (e) => {
  down = { x: e.clientX, y: e.clientY };
  drag = { x: e.clientX, y: e.clientY };
  canvas.setPointerCapture(e.pointerId);
  canvas.style.cursor = "grabbing";
});
canvas.addEventListener("pointermove", (e) => {
  if (!drag) {
    canvas.style.cursor = pick(e) >= 0 ? "pointer" : "grab";
    return;
  }
  yaw += (e.clientX - drag.x) * 0.005;
  pitch = Math.max(-1.1, Math.min(1.1, pitch + (e.clientY - drag.y) * 0.004));
  drag = { x: e.clientX, y: e.clientY };
  tween = null;
});
canvas.addEventListener("pointerup", (e) => {
  const moved = down && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6;
  drag = null;
  canvas.style.cursor = "grab";
  if (down && !moved) {
    const i = pick(e);
    if (i >= 0) openV(i);
  }
  down = null;
});
canvas.addEventListener("pointercancel", () => {
  drag = null;
  down = null;
  canvas.style.cursor = "grab";
});
["fw", "bk", "lf", "rt"].forEach((id) => {
  const b = document.getElementById(id);
  b.addEventListener("pointerdown", (e) => {
    hold[id] = 1;
    b.setPointerCapture(e.pointerId);
  });
  ["pointerup", "pointercancel"].forEach((n) =>
    b.addEventListener(n, () => (hold[id] = 0)),
  );
});
const list = document.getElementById("list"),
  mb = document.getElementById("menuBtn");
WORKS.forEach((w, i) => {
  const b = document.createElement("button");
  b.setAttribute("role", "menuitem");
  b.innerHTML = `<b>${w.t}</b><span>${w.a}</span>`;
  b.onclick = () => {
    goTo(i);
    toggle(false);
  };
  list.appendChild(b);
});
function toggle(v) {
  list.classList.toggle("on", v);
  mb.setAttribute("aria-expanded", v);
}
mb.onclick = () => toggle(!list.classList.contains("on"));
document.getElementById("enter").onclick = () => {
  document.getElementById("intro").classList.add("off");
  canvas.focus();
};
function goTo(i) {
  const w = WORKS[i];
  tween = {
    t: 0,
    fx: px,
    fz: pz,
    fy: yaw,
    tx: w.px,
    tz: w.pz,
    ty: w.lookYaw,
    fp: pitch,
  };
}
const ang = (a, b) => {
  let d = (b - a) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return d;
};
const cap = document.getElementById("cap"),
  ct = document.getElementById("ct"),
  ca = document.getElementById("ca"),
  cm = document.getElementById("cm");
let shown = -1;
const V = document.getElementById("view"),
  enq = document.getElementById("enq");
function openV(i) {
  const w = WORKS[i];
  viewI = i;
  tween = null;
  hold.fw = hold.bk = 0;
  const im = V.querySelector("img");
  im.src = w.cv.toDataURL("image/jpeg", 0.9);
  im.alt = w.t + ", " + w.d.toLowerCase();
  document.getElementById("vt").textContent = w.t;
  document.getElementById("va").textContent = w.a;
  document.getElementById("vd").innerHTML =
    `<dt>Medium</dt><dd>${w.d}</dd><dt>Size</dt><dd>${w.s}</dd><dt>Price</dt><dd>${w.sold ? "Reserved" : w.pr}</dd>`;
  document.getElementById("vn").textContent = w.n;
  enq.disabled = !!w.sold;
  enq.textContent = w.sold ? "Reserved" : "Enquire about this work";
  toggle(false);
  cap.classList.remove("on");
  shown = -1;
  V.classList.add("on");
  document.getElementById("vclose").focus();
}
function closeV() {
  EM.classList.remove("on");
  viewI = -1;
  V.classList.remove("on");
  canvas.focus();
}
function stepV(d) {
  openV((viewI + d + WORKS.length) % WORKS.length);
}
const ENQUIRY_KEY =
  "6b33d859-fcfd-456a-bc28-65d089862cca"; /* paste your free Web3Forms access key here (get it at web3forms.com by entering your email) */
const ENQUIRY_ENDPOINT =
  "https://api.web3forms.com/submit"; /* leave as is. Enquiries are emailed to you; visitors never see your address */
const EM = document.getElementById("enqm"),
  eqn = document.getElementById("eqn"),
  eqc = document.getElementById("eqc"),
  eqm = document.getElementById("eqm"),
  eqs = document.getElementById("eqs"),
  eqg = document.getElementById("eqg");
function openEnq() {
  const w = WORKS[viewI];
  if (!w || w.sold) return;
  document.getElementById("eqw").textContent =
    w.t + " \u00b7 " + w.a + (w.y ? ", " + w.y : "");
  eqm.value =
    "Hello, I would like to enquire about this work. Is it still available?";
  eqs.textContent = "";
  eqg.disabled = false;
  eqg.textContent = "Send enquiry";
  EM.classList.add("on");
  eqn.focus();
}
function closeEnq() {
  EM.classList.remove("on");
  enq.focus();
}
eqg.onclick = async () => {
  const w = WORKS[viewI];
  if (!w) return;
  if (
    !ENQUIRY_ENDPOINT ||
    (ENQUIRY_ENDPOINT.includes("web3forms") && !ENQUIRY_KEY)
  ) {
    eqs.textContent = "Enquiries are not set up yet.";
    return;
  }
  const n = eqn.value.trim(),
    c = eqc.value.trim(),
    m = eqm.value.trim();
  if (!n || !c || !m) {
    eqs.textContent = "Please fill in your name, contact and message.";
    return;
  }
  if (document.getElementById("eqh").value) return;
  eqg.disabled = true;
  eqs.textContent = "Sending...";
  const data = {
    subject: "Enquiry: " + w.t + " by " + w.a,
    name: n,
    contact: c,
    message: m,
    work: w.t,
    artist: w.a,
    year: w.y,
    medium: w.d,
    size: w.s,
    price: w.pr,
  };
  if (c.includes("@")) data.email = c;
  if (ENQUIRY_KEY) data.access_key = ENQUIRY_KEY;
  try {
    const r = await fetch(ENQUIRY_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || j.success === false) throw new Error("send failed");
    eqs.textContent =
      "Thank you. Your enquiry has been sent and we will reply soon.";
    eqg.textContent = "Sent";
    eqm.value = "";
    eqn.value = "";
    eqc.value = "";
  } catch (e) {
    eqg.disabled = false;
    eqs.textContent = "Could not send. Please try again in a moment.";
  }
};
document.getElementById("eqx").onclick = closeEnq;
EM.addEventListener("click", (e) => {
  if (e.target === EM) closeEnq();
});
enq.onclick = openEnq;
document.getElementById("vclose").onclick = closeV;
document.getElementById("vprev").onclick = () => stepV(-1);
document.getElementById("vnext").onclick = () => stepV(1);
V.addEventListener("click", (e) => {
  if (e.target === V) closeV();
});
const file = document.getElementById("file");
let fileTarget = -1;
function setImage(i, url) {
  const im = new Image();
  const temporaryUrl = url.startsWith("blob:");
  im.onload = () => {
  const w = WORKS[i],
    s = Math.min(1, 1100 / Math.max(im.width, im.height)),
    c = document.createElement("canvas");
  c.width = Math.round(im.width * s);
  c.height = Math.round(im.height * s);
  c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
  w.cv = c;
  w.w = c.width;
  w.h = c.height;
  const t = new THREE.CanvasTexture(c);
  t.minFilter = THREE.LinearFilter;
  t.anisotropy = 8;
  w.pl.material.map.dispose();
  w.pl.material.map = t;
  w.pl.material.needsUpdate = true;
  fit(w);
  if (temporaryUrl) URL.revokeObjectURL(url);
  if (viewI === i) openV(i);
  };
  im.onerror = () => {
    if (temporaryUrl) URL.revokeObjectURL(url);
  };
  im.src = url;
}
file.onchange = () => {
  [...file.files].forEach((f, k) => {
    const idx = fileTarget >= 0 ? fileTarget : k;
    if (idx >= WORKS.length || (fileTarget >= 0 && k > 0)) return;
    setImage(idx, URL.createObjectURL(f));
  });
  file.value = "";
};
document.getElementById("addBtn").onclick = () => {
  fileTarget = -1;
  file.click();
};
document.getElementById("repl").onclick = () => {
  fileTarget = viewI;
  file.click();
};
WORKS.forEach((w, i) => {
  setImage(i, w.image);
});
function resize() {
  const w = innerWidth,
    h = innerHeight;
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(w, h, false);
  cam.aspect = w / h;
  const horizontalFov = 120;
  cam.fov =
    (2 *
      Math.atan(Math.tan((horizontalFov * Math.PI) / 360) / (w / h)) *
      180) /
    Math.PI;
  cam.updateProjectionMatrix();
}
addEventListener("resize", resize);
addEventListener("orientationchange", () => setTimeout(resize, 200));
resize();
let last = performance.now();
function loop(now) {
  requestAnimationFrame(loop);
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;
  if (tween) {
    tween.t = Math.min(1, tween.t + dt / 1.6);
    const e =
      tween.t < 0.5
        ? 2 * tween.t * tween.t
        : 1 - Math.pow(-2 * tween.t + 2, 2) / 2;
    px = tween.fx + (tween.tx - tween.fx) * e;
    pz = tween.fz + (tween.tz - tween.fz) * e;
    yaw = tween.fy + ang(tween.fy, tween.ty) * e;
    pitch = tween.fp * (1 - e);
    if (tween.t >= 1) tween = null;
  }
  const f =
      (keys.w || keys.arrowup || hold.fw ? 1 : 0) -
      (keys.s || keys.arrowdown || hold.bk ? 1 : 0),
    sd = (keys.d || hold.rt ? 1 : 0) - (keys.a || hold.lf ? 1 : 0),
    tr = (keys.arrowleft ? 1 : 0) - (keys.arrowright ? 1 : 0);
  if (f || sd || tr) tween = null;
  yaw += tr * 1.8 * dt;
  const sp = 3.4 * dt;
  px += (-Math.sin(yaw) * f + Math.cos(yaw) * sd) * sp;
  pz += (-Math.cos(yaw) * f - Math.sin(yaw) * sd) * sp;
  px = Math.max(-HX + 0.6, Math.min(HX - 0.6, px));
  pz = Math.max(-HZ + 0.9, Math.min(HZ - 0.9, pz));
  const d = Math.hypot(px, pz);
  if (d < 1.5) {
    px = (px / d) * 1.5;
    pz = (pz / d) * 1.5;
  }
  cam.position.set(px, 1.65, pz);
  cam.rotation.set(pitch, yaw, 0);
  knot.rotation.y += dt * 0.45;
  let best = -1,
    bd = 4.6;
  const fwd = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw));
  WORKS.forEach((w, i) => {
    const v = new THREE.Vector3(w.pos.x - px, 0, w.pos.z - pz),
      dist = v.length();
    if (dist < bd && v.normalize().dot(fwd) > 0.55) {
      bd = dist;
      best = i;
    }
  });
  if (best !== shown) {
    shown = best;
    if (best >= 0) {
      const w = WORKS[best];
      ct.textContent = w.t;
      ca.textContent = w.a;
      cm.textContent = "Click the work to see more.";
    }
    cap.classList.toggle("on", best >= 0);
  }
  renderer.render(scene, cam);
}
requestAnimationFrame(loop);


