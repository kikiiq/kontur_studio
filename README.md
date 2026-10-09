# kontur_studio
Fictional website made with Claude AI.

# Kontur Studio

Wielostronicowa strona demonstracyjna fikcyjnej pracowni architektury i wnętrz z Bydgoszczy. Projekt stworzony jako przykład dla potencjalnych klientów: pokazuje strukturę wielu podstron, typografię w stylu brutalistyczno-edytorskim, animacje i formularz z walidacją.

> Wszystkie dane (nazwa studia, adres, telefon, osoby, realizacje) są zmyślone. Formularz kontaktowy niczego nie wysyła.

## Podstrony

| Plik | Zawartość |
| --- | --- |
| `index.html` | Strona główna: hero z animowanym rzutem, pas brył, wybrane realizacje |
| `realizacje.html` | Wszystkie realizacje z animowanym filtrem (mieszkania, domy, biura) |
| `projekt.html` | Szablon pojedynczej realizacji, treść zależy od adresu (`?id=...`) |
| `o-studiu.html` | Zespół i proces pracy w czterech krokach |
| `kontakt.html` | Formularz z walidacją, dane pracowni, uproszczona mapa |

## Technologie

Czysty HTML, CSS i JavaScript. Bez frameworków i bez bibliotek. Jedyny zasób zewnętrzny to czcionka Archivo z Google Fonts, dlatego do poprawnego wyglądu potrzebny jest internet.

## Struktura plików

```
kontur-studio/
  index.html
  realizacje.html
  projekt.html
  o-studiu.html
  kontakt.html
  style.css       wspólne style dla wszystkich stron
  script.js       wspólna logika (menu, karty, filtr, formularz)
  projects.js     dane realizacji
  README.md
```

## Jak uruchomić

Pobierz cały folder i otwórz `index.html` w przeglądarce. Nie potrzeba serwera ani instalacji. Aby opublikować stronę za darmo, wgraj folder do repozytorium na GitHubie i włącz GitHub Pages.

## Jak dodać nową realizację

Otwórz `projects.js` i dopisz obiekt do tablicy `PROJECTS`:

```js
{ id: 'moj-projekt', name: 'Mój projekt', type: 'dom', place: 'Bydgoszcz',
  year: 2025, area: 150, shape: 'arch', tone: 'a' }
```

Następnie dopisz jego opis w obiekcie `DESCRIPTIONS` pod tym samym `id`. Projekt pojawi się na liście, w filtrze i na własnej podstronie. Pole `featured: true` dodaje go do strony głównej.

- `type`: `dom`, `mieszkanie` lub `biuro`
- `shape`: `arch`, `stairs`, `quarter`, `roof` lub `half`
- `tone`: `a` (beton), `b` (pomarańcz), `c` (czerń z betonem), `d` (czerń z pomarańczem)
- `id`: małe litery, cyfry i myślniki, bez polskich znaków

## Najważniejsze decyzje projektowe

- **Styl:** kolory betonu, czerni i jednego akcentu (`--signal`), gruba linia konstrukcyjna (`--wall`), wielka typografia. Wszystkie kolory i odstępy są zmiennymi CSS w bloku `:root`.
- **Zamiast zdjęć:** animowany rzut SVG w hero oraz kształty architektoniczne jako okładki projektów.
- **Dane osobno od wyglądu:** jedna tablica `PROJECTS` zasila stronę główną, listę, filtr i podstronę projektu.
- **Jedno wyraziste wejście:** po wczytaniu strony rysuje się rzut, a nagłówek wysuwa się spod linii. Reszta jest spokojna.
- **Dostępność:** widoczny fokus z klawiatury, atrybuty `aria-*` w menu, filtrze i formularzu, obsługa ustawienia „ogranicz ruch" w systemie.
- **Responsywność:** siatki układają się same (`auto-fill`), rozmiary czcionek rosną razem z oknem (`clamp`), na telefonie jest menu rozwijane przyciskiem.

## Możliwe rozszerzenia

- Prawdziwe zdjęcia realizacji i galeria na podstronie projektu
- Płynne przejścia między podstronami
- Biblioteka GSAP z ScrollTrigger do bardziej złożonych animacji przy przewijaniu
- Prawdziwa obsługa formularza (usługa pocztowa lub własny serwer)
- Wersja angielska strony
