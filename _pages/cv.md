---
layout: archive
title: "CV"
subtitle: "Yuxuan Liu · Undergraduate, SJTU"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

<link rel="stylesheet" href="{{ '/assets/css/cv-style.css' | relative_url }}">

<div class="cv-page cv-container">
  <a class="btn-download" href="/files/CV_Yuxuan_Liu.pdf">Download CV (PDF)</a>

  <section class="cv-section">
    <h2><i class="fas fa-graduation-cap" aria-hidden="true"></i> Education</h2>
    <div class="cv-item">
      <div class="cv-item-header">
        <div class="cv-item-title">Shanghai Jiao Tong University</div>
        <div class="cv-item-date">2024 – Present</div>
      </div>
      <div class="cv-item-subtitle">John Hopcroft Class, Zhiyuan College · B.Eng. (Expected)</div>
    </div>
  </section>

  <section class="cv-section">
    <h2><i class="fas fa-book" aria-hidden="true"></i> Publications</h2>
    {% for post in site.publications reversed %}
      <div class="cv-item">
        <div class="cv-item-title">{{ post.title }}</div>
        {% if post.authors %}<div class="cv-item-summary">{{ post.authors | markdownify }}</div>{% endif %}
        {% if post.status %}<div class="cv-item-subtitle"><em>{{ post.status }}</em></div>{% endif %}
      </div>
    {% endfor %}
  </section>

  <section class="cv-section">
    <h2><i class="fas fa-code" aria-hidden="true"></i> Projects</h2>
    {% for post in site.portfolio %}
      <div class="cv-item">
        <div class="cv-item-header">
          <div class="cv-item-title">{{ post.title }}</div>
          {% if post.date %}<div class="cv-item-date">{{ post.date | date: "%Y" }}</div>{% endif %}
        </div>
        {% if post.excerpt %}<div class="cv-item-summary">{{ post.excerpt }}</div>{% endif %}
        {% if post.link %}<div class="cv-item-subtitle"><a href="{{ post.link }}">GitHub</a></div>{% endif %}
      </div>
    {% endfor %}
  </section>
</div>
