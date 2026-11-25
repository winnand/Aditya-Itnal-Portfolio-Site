# Aditya Itnal: Portfolio Site

Personal portfolio for Aditya Itnal, a Purdue engineering student focusing on aerospace and computational fluid dynamics (CFD).

## Pages
- `index.html`: home page (intro, about/skills, project gallery with popups, contact)
- `winnandTKL.html`: build journal for the Winnand TKL custom mechanical keyboard

## Structure
```
css/      vendor.css (third-party) + styles.css (theme)
js/       plugins.js (Masonry, imagesLoaded, basicLightbox, MoveTo) + main.js (site behaviour)
images/   project images, logo, icons
videos/   CFD simulation videos
```

## Running locally
It's a static site with no build step. Open `index.html` in a browser, or serve the folder:
```
python -m http.server 8000
```

## Credits
Based on the free **Mueller** template by [StyleShout](https://www.styleshout.com/).
The template license requires the attribution link in the site footer. Please keep it.

Fonts: Inter, Manrope (Google Fonts). Icons: Boxicons, SVG Repo.
