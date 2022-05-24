---
layout: default
title: "Blog"
---
<head> <link rel="shortcut icon" type="image/png" href="favicon-32x32.png"> </head>
{% if site.show_excerpts %}
  {% include home.html %}
{% else %}
  {% include archive.html title="Posts" %}
{% endif %}
