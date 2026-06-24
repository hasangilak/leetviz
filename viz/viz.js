/* viz.js — tiny step-through visualization engine (no dependencies, file:// safe).
 *
 * Each visualizer page calls:
 *   Viz.create({ title, subtitle, url, code: [..lines..], build(rec){...} })
 *
 * Inside build(), run your real algorithm and call rec.step(frame) at each
 * interesting moment. A frame is plain data (it gets deep-cloned per step):
 *   { line, note, aux, type, ...rendererFields }
 *     line  : 1-based line in `code` to highlight
 *     note  : caption text for this step
 *     aux   : { label: value, ... } shown as chips
 *     type  : 'array' | 'bars' | 'grid' | 'list' | 'tree'  (+ that type's fields)
 */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';

  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  }
  function svgEl(tag, attrs) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }
  function svgText(x, y, txt, cls) {
    var t = svgEl('text', { x: x, y: y, class: cls || '', 'text-anchor': 'middle' });
    t.textContent = txt;
    return t;
  }
  function arrowDefs() {
    var defs = svgEl('defs', {});
    var m = svgEl('marker', { id: 'vzarrow', viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' });
    m.appendChild(svgEl('path', { d: 'M0,0 L10,5 L0,10 z', class: 'vz-arrowhead' }));
    defs.appendChild(m);
    return defs;
  }
  function groupByIndex(ptrs) {
    var by = {};
    Object.keys(ptrs || {}).forEach(function (name) {
      var i = ptrs[name];
      if (i == null || i < 0) return;
      (by[i] = by[i] || []).push(name);
    });
    return by;
  }

  /* ---------------- renderers ---------------- */
  var R = {};

  R.array = function (v, stage) {
    var wrap = el('div', 'vz-array');
    var vals = v.values || [];
    var by = groupByIndex(v.pointers);
    var hi = new Set(v.hi || []);
    var dim = new Set(v.dim || []);
    var win = v.window;
    vals.forEach(function (val, i) {
      var col = el('div', 'vz-col');
      var pr = el('div', 'vz-ptrs');
      (by[i] || []).forEach(function (n) { pr.appendChild(el('span', 'vz-ptr', n)); });
      col.appendChild(pr);
      var cell = el('div', 'vz-cell', String(val));
      if (hi.has(i)) cell.classList.add('hi');
      if (dim.has(i)) cell.classList.add('dim');
      if (win && i >= win[0] && i <= win[1]) cell.classList.add('inwin');
      col.appendChild(cell);
      col.appendChild(el('div', 'vz-idx', String(i)));
      wrap.appendChild(col);
    });
    stage.appendChild(wrap);
  };

  R.bars = function (v, stage) {
    var wrap = el('div', 'vz-bars');
    var vals = v.values || [];
    var max = Math.max.apply(null, [1].concat(vals.map(function (x) { return Math.abs(x); })));
    var by = groupByIndex(v.pointers);
    var hi = new Set(v.hi || []);
    var fill = v.fill;
    vals.forEach(function (val, i) {
      var col = el('div', 'vz-barcol');
      if (fill && i >= fill[0] && i <= fill[1]) col.classList.add('water');
      var pr = el('div', 'vz-ptrs');
      (by[i] || []).forEach(function (n) { pr.appendChild(el('span', 'vz-ptr', n)); });
      col.appendChild(pr);
      var bar = el('div', 'vz-bar');
      bar.style.height = (10 + (Math.abs(val) / max) * 170) + 'px';
      if (hi.has(i)) bar.classList.add('hi');
      bar.appendChild(el('span', 'vz-barval', String(val)));
      col.appendChild(bar);
      col.appendChild(el('div', 'vz-idx', String(i)));
      wrap.appendChild(col);
    });
    stage.appendChild(wrap);
  };

  R.grid = function (v, stage) {
    var data = v.data || [];
    var table = el('table', 'vz-grid');
    if (v.cLabels) {
      var hr = el('tr');
      hr.appendChild(el('th', 'vz-corner', v.corner || ''));
      v.cLabels.forEach(function (c) { hr.appendChild(el('th', null, String(c))); });
      table.appendChild(hr);
    }
    var hi = new Set((v.hi || []).map(function (p) { return p.r + ',' + p.c; }));
    var cur = v.cur ? v.cur.r + ',' + v.cur.c : null;
    data.forEach(function (row, r) {
      var tr = el('tr');
      if (v.rLabels) tr.appendChild(el('th', null, String(v.rLabels[r])));
      row.forEach(function (cell, c) {
        var td = el('td', null, cell == null ? '' : String(cell));
        var key = r + ',' + c;
        if (cell == null) td.classList.add('empty');
        if (hi.has(key)) td.classList.add('hi');
        if (cur === key) td.classList.add('cur');
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });
    stage.appendChild(table);
  };

  R.list = function (v, stage) {
    var nodes = v.nodes || [];
    var gap = 96, w = 56, h = 42, top = 76, pad = 26;
    var width = pad * 2 + Math.max(1, nodes.length) * gap;
    var svg = svgEl('svg', { class: 'vz-svg', width: width, height: 180, viewBox: '0 0 ' + width + ' 180' });
    svg.appendChild(arrowDefs());
    var pos = {};
    nodes.forEach(function (n, i) { pos[n.id] = pad + i * gap; });
    var mid = top + h / 2;
    (v.arrows || []).forEach(function (a) {
      if (pos[a.from] == null) return;
      var fromX = pos[a.from];
      if (a.to == null || pos[a.to] == null) {
        var sx = fromX + w, ex = sx + 18;
        svg.appendChild(svgEl('path', { d: 'M ' + sx + ' ' + mid + ' L ' + ex + ' ' + mid, class: 'vz-edge', 'marker-end': 'url(#vzarrow)' }));
        svg.appendChild(svgText(ex + 10, mid + 4, '∅', 'vz-null'));
        return;
      }
      var toX = pos[a.to];
      var d;
      if (toX < fromX) { // reversed pointer: curve above
        var s = fromX, e = toX + w;
        d = 'M ' + s + ' ' + mid + ' C ' + (s - 28) + ' ' + (top - 26) + ', ' + (e + 28) + ' ' + (top - 26) + ', ' + e + ' ' + mid;
      } else {
        d = 'M ' + (fromX + w) + ' ' + mid + ' L ' + (toX - 3) + ' ' + mid;
      }
      svg.appendChild(svgEl('path', { d: d, class: 'vz-edge', 'marker-end': 'url(#vzarrow)' }));
    });
    var by = {};
    Object.keys(v.pointers || {}).forEach(function (n) {
      var id = v.pointers[n];
      if (id == null) return;
      (by[id] = by[id] || []).push(n);
    });
    var hiSet = new Set(v.hi || []);
    nodes.forEach(function (n) {
      var x = pos[n.id];
      svg.appendChild(svgEl('rect', { x: x, y: top, width: w, height: h, rx: 9, class: 'vz-node' + (hiSet.has(n.id) ? ' hi' : '') }));
      svg.appendChild(svgText(x + w / 2, mid + 5, String(n.val), 'vz-nodeval'));
      (by[n.id] || []).forEach(function (name, k) {
        svg.appendChild(svgText(x + w / 2, top - 14 - k * 16, name, 'vz-ptrlabel'));
      });
    });
    stage.appendChild(svg);
  };

  R.tree = function (v, stage) {
    var root = v.root;
    if (!root) return;
    var leaf = 0, maxD = 0;
    (function assign(n, d) {
      n._d = d; if (d > maxD) maxD = d;
      var ch = (n.children || []).filter(Boolean);
      if (!ch.length) { n._x = leaf++; return; }
      ch.forEach(function (c) { assign(c, d + 1); });
      n._x = (ch[0]._x + ch[ch.length - 1]._x) / 2;
    })(root, 0);
    var hgap = 72, vgap = 80, padX = 34, padY = 34, r = 21;
    var width = padX * 2 + Math.max(1, leaf) * hgap;
    var height = padY * 2 + maxD * vgap + r * 2;
    var svg = svgEl('svg', { class: 'vz-svg', width: width, height: height, viewBox: '0 0 ' + width + ' ' + height });
    var X = function (n) { return padX + n._x * hgap + r; };
    var Y = function (n) { return padY + n._d * vgap + r; };
    (function edges(n) {
      (n.children || []).filter(Boolean).forEach(function (c) {
        svg.appendChild(svgEl('line', { x1: X(n), y1: Y(n), x2: X(c), y2: Y(c), class: 'vz-tedge' }));
        edges(c);
      });
    })(root);
    (function draw(n) {
      svg.appendChild(svgEl('circle', { cx: X(n), cy: Y(n), r: r, class: 'vz-tnode' + (n.state ? ' ' + n.state : '') }));
      svg.appendChild(svgText(X(n), Y(n) + 5, String(n.label), 'vz-tlabel'));
      (n.children || []).filter(Boolean).forEach(draw);
    })(root);
    stage.appendChild(svg);
  };

  /* ---------------- recorder + player ---------------- */
  function Recorder() { this.frames = []; }
  Recorder.prototype.step = function (f) {
    this.frames.push(JSON.parse(JSON.stringify(f)));
  };

  function Player(cfg) {
    var rec = new Recorder();
    try { cfg.build(rec); } catch (e) { console.error('build() threw:', e); }
    var frames = rec.frames;

    var app = el('div', 'vz-app');
    var back = el('a', 'vz-back', '← all visualizers');
    back.href = cfg.indexHref || '../../index.html';
    app.appendChild(back);

    var head = el('div', 'vz-head');
    head.appendChild(el('h1', 'vz-title', cfg.title || 'Visualizer'));
    if (cfg.subtitle) head.appendChild(el('div', 'vz-sub', cfg.subtitle));
    if (cfg.url) {
      var a = el('a', 'vz-link', 'Open on LeetCode ↗');
      a.href = cfg.url; a.target = '_blank';
      head.appendChild(a);
    }
    app.appendChild(head);

    var main = el('div', 'vz-main');
    var sw = el('div', 'vz-stagewrap');
    var stage = el('div', 'vz-stage');
    var aux = el('div', 'vz-aux');
    var caption = el('div', 'vz-caption');
    sw.appendChild(stage); sw.appendChild(aux); sw.appendChild(caption);
    main.appendChild(sw);

    var codeBox = el('div', 'vz-code');
    var lineEls = (cfg.code || []).map(function (ln, i) {
      var d = el('div', 'vz-line');
      d.appendChild(el('span', 'vz-ln', String(i + 1)));
      d.appendChild(el('span', 'vz-code-txt', ln === '' ? ' ' : ln));
      codeBox.appendChild(d);
      return d;
    });
    main.appendChild(codeBox);
    app.appendChild(main);

    var ctl = el('div', 'vz-ctl');
    var bReset = el('button', 'vz-btn', '⏮ Reset');
    var bPrev = el('button', 'vz-btn', '◀ Prev');
    var bPlay = el('button', 'vz-btn vz-play', '▶ Play');
    var bNext = el('button', 'vz-btn', 'Next ▶');
    var counter = el('span', 'vz-counter', '');
    var spWrap = el('div', 'vz-speedwrap');
    spWrap.appendChild(el('span', 'vz-speedlabel', 'slow'));
    var speed = el('input', 'vz-speed');
    speed.type = 'range'; speed.min = '200'; speed.max = '1600'; speed.value = '850';
    spWrap.appendChild(speed);
    spWrap.appendChild(el('span', 'vz-speedlabel', 'fast'));
    [bReset, bPrev, bPlay, bNext, counter, spWrap].forEach(function (e) { ctl.appendChild(e); });
    app.appendChild(ctl);

    (cfg.mount || document.body).appendChild(app);

    var cur = 0, timer = null;
    function render(i) {
      cur = Math.max(0, Math.min(frames.length - 1, i));
      var f = frames[cur] || {};
      stage.innerHTML = '';
      (R[f.type] || R.array)(f, stage);
      aux.innerHTML = '';
      if (f.aux) {
        Object.keys(f.aux).forEach(function (k) {
          var chip = el('span', 'vz-chip');
          chip.appendChild(el('span', 'vz-chipk', k));
          chip.appendChild(el('span', 'vz-chipv', String(f.aux[k])));
          aux.appendChild(chip);
        });
      }
      caption.textContent = f.note || '';
      lineEls.forEach(function (d, idx) { d.classList.toggle('active', f.line === idx + 1); });
      counter.textContent = (cur + 1) + ' / ' + frames.length;
      bPrev.disabled = cur === 0;
      bNext.disabled = cur === frames.length - 1;
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } bPlay.textContent = '▶ Play'; }
    function play() {
      if (timer) { stop(); return; }
      if (cur >= frames.length - 1) render(0);
      bPlay.textContent = '⏸ Pause';
      timer = setInterval(function () {
        if (cur >= frames.length - 1) { stop(); return; }
        render(cur + 1);
      }, 1800 - Number(speed.value));
    }
    bReset.onclick = function () { stop(); render(0); };
    bPrev.onclick = function () { stop(); render(cur - 1); };
    bNext.onclick = function () { stop(); render(cur + 1); };
    bPlay.onclick = play;
    speed.oninput = function () { if (timer) { stop(); play(); } };
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { stop(); render(cur + 1); }
      else if (e.key === 'ArrowLeft') { stop(); render(cur - 1); }
      else if (e.key === ' ') { e.preventDefault(); play(); }
    });

    if (frames.length) render(0);
    else caption.textContent = 'No steps were recorded.';
  }

  window.Viz = { create: function (cfg) { new Player(cfg); } };
})();
