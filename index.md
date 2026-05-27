---
layout: home
author_profile: true
---

Hi, I'm Yuxuan Liu. I'm an undergraduate at SJTU. Welcome to my personal page!
I also make music:)

---
## Publications

<div class="site-card-list">
{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}
</div>

## Projects

<div class="site-card-list">
{% assign sorted_portfolio = site.portfolio | sort: "date" | reverse %}
{% for post in sorted_portfolio limit:3 %}
  {% include archive-single.html %}
{% endfor %}
</div>

## Experience
**2024 - Present** | Undergraduate, John Hopcroft Class, Zhiyuan College, Shanghai Jiao Tong University
