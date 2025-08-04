---
permalink: /
title: "About me"
excerpt: "About me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

👋 Hi, I'm Yuxuan Liu. I'm an undergraduate at SJTU. Welcome to my personal page!

---

## Projects

{% for post in site.portfolio %}
  {% include archive-single.html %}
{% endfor %}

---

## Publications

{% for post in site.publications limit:5 %}
  {% include archive-single.html %}
{% endfor %}

---

## Experience
