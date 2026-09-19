# Milano 2026 ⛪

En installérbar **PWA** med det officielle spørgeskema for fællesturen til
Milano, september 2026. Mørkt, kort-baseret, mobile-first look & feel — en
søster-app til [My Piemonte](https://github.com/drovik/MyPiemonte) og
[La Coppa del Mondo](https://github.com/drovik/LaCoppaDelMondo), her stemt i
midnatsblå med Duomo-guld.

**Arrangører:** Dag, Torben & Kuno (fuldstændig inhabile).
**Panelet:** Anne, Charlotte & Tina.

## Konceptet

De medrejsende skal evaluere rejsen og dens oplevelser — rooftop på Duomo,
kanaltur, sporvogne, shoppingtur m.m. — men undersøgelsen har én metodisk
finesse: **der findes ingen negative svarmuligheder.**

- Skalaen går fra **5 til 5 stjerner** (slideren kan justeres omhyggeligt).
- Svarmulighederne er: *Fantastisk!* · *Kunne ikke ha' gjort det bedre selv* ·
  *Godt* · *Der var ikke en finger at sætte* · *Min favorit*.
- Neutrale svar som "Helt okay" vises, men er permanent deaktiveret af
  arrangørerne. 🔒
- Fritekst-kommentarer skal igennem **Arrangørernes Positivitetsudvalg** —
  negative gloser afvises automatisk med venlig hilsen.
- Resultatsiden viser svarfordeling, favorit-kåringer og garanterer et
  gennemsnit på 5,0.

## Emner

8 oplevelser (Duomo-rooftop, hop on hop off, Maio, Leonardo da Vinci-museet,
kanaltur, sporvogne, El Brellin, shopping) og 6 generelle emner (morgenmad,
hotel, Piba Bar, transport, fly, frokoster). Alt ligger i
`src/data/topics.ts` — redigér dér for at tilføje emner.

## Kør den

```bash
npm install
npm run dev        # lokal dev-server
# eller
npm run build && npm run preview   # produktions-build + serve (installérbar PWA)
```

Åbn URL'en på telefonen og brug *"Føj til hjemmeskærm"* for at installere.

## Billeder

Emnesiderne viser et foto, hvis der ligger et i `public/images/<emne-id>.jpg`
(se `public/images/README.md` for filnavnene) — ellers falder de pænt tilbage
til emnets emoji.

## Data

Svar gemmes i `localStorage` pr. enhed — der sendes intet nogen steder hen.
Vælg hvem du er på forsiden; hver deltager har sine egne svar på enheden.

## Ikoner

`public/icons/*.png` genereres med `npm run icons`
(`scripts/make-icons.mjs` — en dependency-fri PNG-renderer) og committes, så
builds ikke afhænger af scriptet. `public/favicon.svg` er vektor-originalen.

## Stack

Vite · React · TypeScript · React Router (hash-router, host-path-agnostisk) ·
`vite-plugin-pwa`. Relativ base (`./`), så appen kan serveres fra enhver
sub-path (Static Web Apps, GitHub Pages, en NAS, …).
