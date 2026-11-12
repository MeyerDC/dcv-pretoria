# Fonts

`playfair-display-lining.woff2` is Playfair Display (Latin subset, weights
400–900, from Google Fonts, SIL Open Font License 1.1) with one change: the
lining numerals are the default instead of the old-style ones.

The site itself asks for lining numerals in CSS. Pictures drawn on a canvas
(`src/utils/shareCard.js`) cannot do that, so they use this file, under the
name "DCV Display".
