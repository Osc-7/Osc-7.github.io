---
layout: home
author_profile: false
---

<div class="hero" id="about">
  <img class="hero__avatar" src="{{ '/images/avatar.png' | relative_url }}" alt="{{ site.author.name }}" width="112" height="112" />
  <div class="hero__body">
    <h1 class="hero__name">Yuxuan Liu<span class="hero__name-cn">刘宇轩</span></h1>
    <p class="hero__tagline">Hi, I'm Yuxuan Liu, an undergraduate in the John Hopcroft Class at SJTU. I'm currently an undergraduate researcher at <a href="https://sjtu-deng-lab.github.io/">DENG Lab</a>, working with <a href="https://thudzj.github.io/">Prof. Zhijie Deng</a> on efficient generative AI and ML systems.</p>
    <p class="hero__focus">Currently focusing on autoregressive diffusion models and video world models.</p>
    <p class="hero__bio">I also make music — check out <a href="https://music.163.com/#/artist?id=36129592">Osc7's music</a>.</p>
    <nav class="hero__actions" aria-label="Quick links">
      <a href="{{ '/files/CV_Yuxuan_Liu.pdf' | relative_url }}">CV</a>
      <a href="https://github.com/osc-7">GitHub</a>
      <a href="mailto:liuyx2005@sjtu.edu.com">Email</a>
      <a href="https://scholar.google.com/citations?user=jb3aUrMAAAAJ">Scholar</a>
      <a href="https://music.163.com/#/artist?id=36129592">Music</a>
    </nav>
  </div>
</div>

<section class="content-section" id="publications">
  <h2 class="content-section__title">Publications</h2>
  <div class="site-card-list">
    {% for post in site.publications reversed %} {% include archive-single.html %} {% endfor %}
  </div>
</section>

<section class="content-section" id="projects">
  <h2 class="content-section__title">Projects</h2>
  <div class="site-card-list">
    {% assign sorted_portfolio = site.portfolio | sort: "date" | reverse %} {% for post in sorted_portfolio limit:3 %} {% include archive-single.html %} {% endfor %}
  </div>
</section>

<section class="content-section" id="experience">
  <h2 class="content-section__title">Experience</h2>
  <p class="experience-line"><strong>2024 – Present</strong> · Undergraduate, John Hopcroft Class, Zhiyuan College, Shanghai Jiao Tong University</p>
</section>
