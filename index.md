---
layout: single
author_profile: true
---

 Hi, I'm Yuxuan Liu. I'm an undergraduate at SJTU. Welcome to my personal page!

---
## Projects

{% if site.portfolio %}
  <div class="portfolio-grid">
    {% for post in site.portfolio %}
      {% include archive-single.html type="grid" %}
    {% endfor %}
  </div>
{% else %}
  <p>No portfolio items found.</p>
{% endif %}

---

## Experience
