(function () {
  var bar = document.querySelector(".player");
  if (!bar) return;

  var audio = bar.querySelector(".player__audio");
  var toggle = bar.querySelector(".player__toggle");
  var cover = bar.querySelector(".player__cover");
  var trackName = bar.querySelector(".player__track");
  var releaseName = bar.querySelector(".player__release");
  var seek = bar.querySelector(".player__seek");
  var elapsed = bar.querySelector(".player__elapsed");
  var duration = bar.querySelector(".player__duration");
  var error = bar.querySelector(".player__error");
  var pattern = bar.dataset.srcPattern;

  var rows = Array.prototype.slice.call(document.querySelectorAll(".track[data-track]"));
  var covers = Array.prototype.slice.call(document.querySelectorAll(".release__cover[data-track]"));
  var current = null;
  var seeking = false;

  function format(seconds) {
    if (!isFinite(seconds) || seconds < 0) seconds = 0;
    var s = Math.floor(seconds);
    return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2);
  }

  function setSeek(value) {
    seek.value = value;
    seek.style.setProperty("--progress", value / 10 + "%");
  }

  function rowFor(id) {
    for (var i = 0; i < rows.length; i++) {
      if (rows[i].dataset.track === id) return rows[i];
    }
    return null;
  }

  function setState() {
    var playing = current && !audio.paused;
    bar.classList.toggle("is-playing", !!playing);
    toggle.setAttribute("aria-label", playing ? "Pause" : "Play");

    rows.forEach(function (row) {
      var on = current === row;
      row.classList.toggle("is-current", on);
      row.classList.toggle("is-playing", on && !!playing);
      row.setAttribute("aria-pressed", on && playing ? "true" : "false");
    });
    covers.forEach(function (button) {
      var release = button.closest(".release");
      var on = !!current && current.closest(".release") === release;
      button.classList.toggle("is-playing", on && !!playing);
    });

    document.dispatchEvent(new CustomEvent("music:state", {
      detail: { release: current ? current.closest(".release") : null, playing: !!playing }
    }));
  }

  function load(row) {
    current = row;
    error.hidden = true;
    bar.classList.remove("has-error");
    audio.src = pattern.replace("{id}", row.dataset.track);
    trackName.textContent = row.dataset.title;
    releaseName.textContent = row.dataset.title === row.dataset.release ? "" : row.dataset.release;
    cover.src = row.dataset.cover;
    setSeek(0);
    elapsed.textContent = "0:00";
    duration.textContent = row.querySelector(".track__length").textContent;
    bar.hidden = false;
    document.body.classList.add("has-player");
  }

  function play(row) {
    if (current !== row) load(row);
    var attempt = audio.play();
    if (attempt && attempt.catch) attempt.catch(function () { setState(); });
  }

  function toggleRow(row) {
    if (current === row && !audio.paused) {
      audio.pause();
    } else {
      play(row);
    }
  }

  rows.forEach(function (row) {
    row.addEventListener("click", function () { toggleRow(row); });
  });

  covers.forEach(function (button) {
    button.addEventListener("click", function () {
      var release = button.closest(".release");
      if (current && current.closest(".release") === release) {
        toggleRow(current);
      } else {
        play(rowFor(button.dataset.track));
      }
    });
  });

  toggle.addEventListener("click", function () {
    if (current) toggleRow(current);
  });

  audio.addEventListener("play", setState);
  audio.addEventListener("pause", setState);

  audio.addEventListener("timeupdate", function () {
    if (seeking || !audio.duration) return;
    setSeek(Math.round((audio.currentTime / audio.duration) * 1000));
    elapsed.textContent = format(audio.currentTime);
  });

  audio.addEventListener("ended", function () {
    var next = rows[rows.indexOf(current) + 1];
    if (next) {
      play(next);
    } else {
      setState();
    }
  });

  audio.addEventListener("error", function () {
    if (!current) return;
    error.hidden = false;
    bar.classList.add("has-error");
    setState();
  });

  seek.addEventListener("input", function () {
    seeking = true;
    seek.style.setProperty("--progress", seek.value / 10 + "%");
    if (audio.duration) elapsed.textContent = format((seek.value / 1000) * audio.duration);
  });

  seek.addEventListener("change", function () {
    if (audio.duration) audio.currentTime = (seek.value / 1000) * audio.duration;
    seeking = false;
  });
})();
