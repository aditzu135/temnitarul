# Crawler Temniță - Documentație Joc

## Despre Joc

**Crawler Temniță** este un joc RPG text-based inspirat din BitLife, cu decizii conduse de poveste. Jucătorul coboară prin 5 etaje ale unei temnițe antice, luptă cu monștri, colectează pradă și înfruntă boss-ul final. Jocul include elemente de gestionare a inventarului, echipament, cumpărături și leveling.

Jocul este scris în HTML, CSS și JavaScript pur, fără server, folosind localStorage pentru salvare.

## Caracteristici Principale

### Sistem de Conturi
- **Înregistrare/Conectare**: Jucătorii își creează conturi cu nume utilizator și parolă (hash-uită pentru securitate).
- **Salvare Persistentă**: Progresul este salvat per utilizator în localStorage.
- **Hub Principal**: După conectare, jucătorul ajunge într-un hub unde poate intra în temniță, se odihni, cumpăra obiecte sau se deconecta.

### Mecanici de Joc
- **5 Etaje**: Fiecare etaj are povestea sa unică și monștri specifici.
- **Luptă Turn-Based**: Atac, folosire obiecte sau fugă.
- **Leveling**: Câștigă XP, avansează niveluri, crește statistici (HP, ATK, DEF).
- **Inventar Limitat**: Maximum 5 obiecte.
- **Echipament**: Arme și armuri echipabile pentru bonusuri.
- **Obiecte Consumabile**: Poțiuni de sănătate și orbe magice pentru luptă.
- **Magazine**: Disponibile pe etajele 2 și 4, și în hub.
- **Farming**: Ieși din temniță păstrând statisticile, reîncepe de la etaj 1 pentru a acumula aur și obiecte.

### Sistem de Salvare
- **localStorage**: Salvează progresul jucătorului și conturile utilizatorilor.
- **Chei de Stocare**:
  - `dungeonCrawlerUsers`: Obiect cu utilizatori (nume: {password: hash}).
  - `dungeonCrawlerSave_${username}`: Datele jucătorului (HP, nivel, inventar, etc.).

## Structura Fișierelor

- `main.html`: Structura HTML a jocului, ecrane și UI.
- `code.js`: Logica jocului, funcții, evenimente.
- `style.css`: Stiluri CSS pentru interfață.
- `data.json`: (Opțional) Date statice, dar majoritatea sunt în cod.

## Cum Funcționează Sistemul

### Fluxul Jocului
1. **Conectare**: Utilizatorul se conectează sau înregistrează.
2. **Hub**: Ecran cu opțiuni: Intră în temniță, Odihnește-te, Magazin, Deconectare.
3. **Intrare în Temniță**: Încarcă statistici salvate, resetează etajul la 1.
4. **Poveste**: Afișează povestea etajului curent.
5. **Eveniment**: Afișează status, opțiuni: Luptă, Magazin, Odihnă, Echipează, Ieși.
6. **Luptă**: Combate turn-based cu monștri.
7. **Rezolvarea Luptei**: Victorie = XP, aur, pradă; Înfrângere = Game Over.
8. **Level Up**: Dacă XP suficiente, avansează nivel.
9. **Victorie**: După etaj 5, ecran final.

### Sistem de Statistici
- **HP (Health Points)**: Viață, restaurează la odihnă sau poțiuni.
- **ATK (Attack)**: Daune la atac, bonus de la arme.
- **DEF (Defense)**: Reducere daune, bonus de la armuri.
- **XP (Experience)**: Pentru leveling.
- **Aur**: Pentru cumpărături.

### Inventar și Echipament
- **Inventar**: Listă de obiecte (max 5).
- **Echipare**: Arme și armuri echipate dau bonusuri, înlocuiesc vechiul echipament în inventar.
- **Consumabile**: Folosite în luptă pentru efecte speciale.

### Luptă Detaliată
- **Inițiere**: Apare monstrul, log de luptă.
- **Acțiuni Jucător**:
  - Atac: Daune = ATK - DEF inamic.
  - Folosește Obiect: Poțiune (HP +20) sau Orb Magic (daune fixe 15).
  - Fugi: 50% șansă de succes.
- **Contraatac Inamic**: Daune = ATK inamic - DEF jucător.
- **Rezultat**: Victorie = recompense; Înfrângere = Game Over.

### Leveling
- XP necesară = 30 + 30 * (nivel - 1).
- La avansare: HP max +5, ATK +2, DEF +1, HP la maxim.

### Magazine
- **Etaj 2/4**: Arme, armuri, consumabile.
- **Hub**: Același ca etaj 2.
- Cumpărare: Verifică aur și spațiu inventar.

### Salvare și Încărcare
- Salvare automată la evenimente majore.
- Încărcare la intrarea în temniță.

## Tehnologii Folosite

- **HTML**: Structură ecrane (login, hub, story, event, combat, etc.).
- **CSS**: Tema dark, layout responsive.
- **JavaScript**: 
  - Manipulare DOM pentru UI.
  - Logică joc (funcții pentru luptă, salvare, etc.).
  - localStorage pentru persistență.
  - Event listeners pentru interacțiuni.

## Funcții Principale în Cod

- `login/signup`: Autentificare.
- `joinDungeon`: Intră în temniță.
- `showStoryScreen/showEventScreen`: Navigare ecrane.
- `startCombat/completeCombat`: Sistem luptă.
- `handleLevelUp`: Avansează nivel.
- `buyItem/equipItem`: Gestionare inventar.
- `saveGame/getSavedGame`: Persistență.

## Extensii Posibile

- Adăugare mai multe etaje sau monștri.
- Sistem de quest-uri.
- Multiplayer (ar necesita server).
- Grafică îmbunătățită sau animații.

## Instrucțiuni de Rulare

1. Deschide `main.html` în browser.
2. Înregistrează-te sau conectează-te.
3. Joacă în hub: intră în temniță, farm aur, echipamente.
4. Bucură-te de joc!

</content>
<parameter name="filePath">d:\atestat\README.md