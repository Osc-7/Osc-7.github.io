---
layout: home
author_profile: true
---

Hi, I'm Yuxuan Liu. I'm an undergraduate at SJTU. Welcome to my personal page!
I also make music:)

---
## Publications

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}

## Projects

{% for post in site.portfolio limit:3 %}
  {% include archive-single.html %}
{% endfor %}

## Experience
**2024 - Present** | Undergraduate, John Hopcroft Class, Zhiyuan College, Shanghai Jiao Tong University
