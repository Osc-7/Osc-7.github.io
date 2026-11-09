(function () {
  var figure = document.querySelector(".music-wave");
  var plot = figure && figure.querySelector(".music-wave__plot");
  var releases = Array.prototype.slice.call(document.querySelectorAll(".release[data-date]"));
  if (!plot || releases.length === 0) return;

  var SVG_NS = "http://www.w3.org/2000/svg";
  var DAY = 86400000;
  var IDLE = 0.05;
  var SIGMA = 18 * DAY;
  var SIGMA_PX = 5.5;
  var STEP = 0.5;
  var sigma = SIGMA;
  var period = 5;

  var start = Date.parse(figure.dataset.start);
  var end = Date.parse(figure.dataset.end);

  var items = releases.map(function (node) {
    var songs = parseInt(node.dataset.songs, 10) || 1;
    return {
      node: node,
      slug: node.id,
      title: node.dataset.title,
      time: Date.parse(node.dataset.date),
      gain: Math.min(1, 0.5 + 0.13 * songs)
    };
  });

  var label = document.createElement("span");
  label.className = "music-wave__label";

  var axis = document.createElement("div");
  axis.className = "music-wave__axis";
  axis.setAttribute("aria-hidden", "true");
  var firstYear = new Date(start).getUTCFullYear();
  var lastYear = new Date(end).getUTCFullYear();
  for (var year = firstYear; year <= lastYear; year++) {
    var tick = document.createElement("span");
    tick.className = "music-wave__year";
    tick.textContent = year;
    tick.style.left = ((Date.UTC(year, 0, 1) - start) / (end - start)) * 100 + "%";
    axis.appendChild(tick);
  }
  plot.insertAdjacentElement("afterend", axis);

  function envelope(t) {
    var sum = IDLE;
    for (var i = 0; i < items.length; i++) {
      var d = (t - items[i].time) / sigma;
      sum += items[i].gain * Math.exp(-0.5 * d * d);
    }
    return Math.min(1, sum);
  }

  function svgNode(name, attrs) {
    var node = document.createElementNS(SVG_NS, name);
    for (var key in attrs) node.setAttribute(key, attrs[key]);
    return node;
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  var current = null;
  var playing = null;

  function activate(item) {
    if (!item) item = playing;
    if (current === item) return;
    if (current) {
      if (current.burst) current.burst.classList.remove("is-active");
      current.node.classList.remove("is-active");
    }
    current = item;
    if (!item) {
      label.classList.remove("is-visible");
      return;
    }
    if (item.burst) item.burst.classList.add("is-active");
    item.node.classList.add("is-active");
    label.textContent = item.title;
    label.style.left = Math.min(92, Math.max(8, item.ratio * 100)) + "%";
    label.classList.add("is-visible");
  }

  function render(animate) {
    var width = plot.clientWidth;
    var height = plot.clientHeight;
    if (!width || !height) return;

    var mid = height / 2;
    var amp = height / 2 - 4;
    var span = end - start;
    sigma = Math.max(SIGMA, (SIGMA_PX / width) * span);
    period = Math.max(2.5, Math.min(5, width / 130));

    function timeAt(x) {
      return start + (x / width) * span;
    }

    function y(x) {
      return mid - amp * envelope(timeAt(x)) * Math.sin((2 * Math.PI * x) / period);
    }

    function trace(x0, x1) {
      var from = Math.max(0, x0);
      var to = Math.min(width, x1);
      var d = "M" + from.toFixed(1) + " " + y(from).toFixed(2);
      for (var x = from + STEP; x <= to; x += STEP) {
        d += "L" + x.toFixed(1) + " " + y(x).toFixed(2);
      }
      return d;
    }

    var svg = svgNode("svg", {
      width: width,
      height: height,
      viewBox: "0 0 " + width + " " + height,
      focusable: "false"
    });

    var carrier = svgNode("path", { class: "music-wave__carrier", d: trace(0, width) });
    svg.appendChild(carrier);

    var reach = (3 * sigma / span) * width;

    items.forEach(function (item) {
      item.ratio = (item.time - start) / span;
      var cx = item.ratio * width;
      item.burst = svgNode("path", { class: "music-wave__burst", d: trace(cx - reach, cx + reach) });
      svg.appendChild(item.burst);
    });

    items.forEach(function (item) {
      var cx = item.ratio * width;
      var hit = svgNode("rect", {
        class: "music-wave__hit",
        x: (cx - reach * 0.7).toFixed(1),
        y: 0,
        width: (reach * 1.4).toFixed(1),
        height: height
      });
      hit.addEventListener("mouseenter", function () { activate(item); });
      hit.addEventListener("mouseleave", function () { activate(null); });
      hit.addEventListener("click", function () {
        item.node.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "center" });
        history.replaceState(null, "", "#" + item.slug);
      });
      svg.appendChild(hit);
    });

    plot.textContent = "";
    plot.appendChild(svg);
    plot.appendChild(label);
    current = null;
    activate(playing);

    if (animate && !prefersReducedMotion()) {
      var length = carrier.getTotalLength();
      carrier.style.strokeDasharray = length;
      carrier.style.setProperty("--music-wave-length", length);
      figure.classList.add("is-drawing");
      carrier.addEventListener("animationend", function () {
        carrier.style.strokeDasharray = "";
        figure.classList.remove("is-drawing");
      });
    }
  }

  items.forEach(function (item) {
    item.node.addEventListener("mouseenter", function () { activate(item); });
    item.node.addEventListener("mouseleave", function () { activate(null); });
    item.node.addEventListener("focusin", function () { activate(item); });
    item.node.addEventListener("focusout", function () { activate(null); });
  });

  document.addEventListener("music:state", function (event) {
    var node = event.detail.playing ? event.detail.release : null;
    var next = null;
    items.forEach(function (item) {
      if (item.node === node) next = item;
    });
    playing = next;
    figure.classList.toggle("is-playing", !!playing);
    activate(playing);
  });

  render(true);

  var lastWidth = plot.clientWidth;
  var pending = null;
  window.addEventListener("resize", function () {
    if (pending) cancelAnimationFrame(pending);
    pending = requestAnimationFrame(function () {
      if (plot.clientWidth !== lastWidth) {
        lastWidth = plot.clientWidth;
        render(false);
      }
    });
  });
})();
