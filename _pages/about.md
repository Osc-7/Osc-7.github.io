---
layout: single
permalink: /about/
title: "About"
subtitle: "Undergraduate at Shanghai Jiao Tong University"
author_profile: true
redirect_from:
  - /about.html
---

<div class="page-intro">
  <p>Hi, I'm <strong>Yuxuan Liu</strong>, an undergraduate in the John Hopcroft Class at SJTU. I work on efficient generative AI and ML systems, and I also make music.</p>
</div>

<div class="about-grid">
  <div class="about-block">
    <h2>Education</h2>
    <p><strong>2024 – Present</strong><br>
    John Hopcroft Class, Zhiyuan College<br>
    Shanghai Jiao Tong University</p>
  </div>

  <div class="about-block">
    <h2>Contact</h2>
    <ul>
      <li>Email: <a href="mailto:liuyx2005@sjtu.edu.com">liuyx2005@sjtu.edu.com</a></li>
      <li>GitHub: <a href="https://github.com/osc-7">osc-7</a></li>
    </ul>
  </div>
</div>

<section class="content-section">
  <h2 class="content-section__title">Projects</h2>
  <div class="site-card-list">
    {% for post in site.portfolio %}
      {% include archive-single.html %}
    {% endfor %}
  </div>
</section>
