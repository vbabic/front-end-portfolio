var klausimynas = [
    {
      title: 'Swedbank paskolos', // cia bus h1
      klausimas: 'Sis klausimynas skritas surinkti informacija apie jusu galimybes gauti paskola', // cia bus <p>
      buttons: [{tekstas: 'pirmyn', enabled: true}]
    },
    {
      title: 'Swedbank paskolos',
      klausimas: 'Pagrindinė informacija:', 
      tipas: 'input',
      atsakymai: [{pavadinimas: 'Vardas',kitas_klausimas: 2}, {pavadinimas: 'Pavardė', kitas_klausimas: 2}, {pavadinimas: 'Miestas kuriame šiuo metu gyvenate', kitas_klausimas: 2}, {pavadinimas: 'Gatvė/Namas', kitas_klausimas: 2}],
      buttons: [{tekstas: 'pirmyn',enabled: false}]
    },
    {
      title: 'Swedbank paskolos',
      klausimas: 'Ar norite pasiimti paskolą?', //
      tipas: 'radio',
      atsakymai: [{pavadinimas: 'taip', kitas_klausimas: 3},{pavadinimas: 'ne',kitas_klausimas: 5},{pavadinimas: 'nežinau, gal ir paimčiau vieną',kitas_klausimas: 3},{pavadinimas: 'niekada nenorėjau',kitas_klausimas: 5},],
      buttons: [{tekstas: 'atgal',enabled: true}, {tekstas: 'pirmyn',enabled: false}]
    },
    {
        title: 'Swedbank paskolos',
        klausimas: 'Kokio tipo paskolą norėtumete pasiimti?', //
        tipas: 'checkbox',
        atsakymai:[{pavadinimas: 'Vartojimo', kitas_klausimas: 4}, {pavadinimas: 'Lizingas - pirkimas išsimokėtinai', kitas_klausimas: 4}, {pavadinimas: 'Automobilio paskolą',kitas_klausimas: 4},{pavadinimas: 'Būsto kreditas', kitas_klausimas: 4}],
        buttons: [{tekstas: 'atgal',enabled: true},{tekstas: 'pirmyn',enabled: false}]
    },
    {
        title: 'Swedbank paskolos',
        klausimas: 'Pasirinkite jums tinkamiausią konsultacijos centrą', //
        tipas: 'select',
        atsakymai: [{pavadinimas: 'Konstitucijos pr.',kitas_klausimas: 5},{pavadinimas: 'Justiniškių g.', kitas_klausimas: 5},{pavadinimas: 'Ozo g.',kitas_klausimas: 5},{pavadinimas: 'Gedimino pr.', kitas_klausimas: 5}, {pavadinimas: 'Pilies g.',
        kitas_klausimas: 5}],
        buttons:[{tekstas: 'atgal',enabled: true},{tekstas: 'pirmyn',enabled: false}]
    },
    {
        title: 'Swedbank paskolos',
        klausimas: 'Palikite mums jūsų pageidaujamus kontaktinius duomenis:', //
        tipas: 'textarea',
        atsakymai: [{pavadinimas: 'kontaktai',kitas_klausimas: 6}],
        buttons: [{tekstas: 'atgal', enabled: true}, {tekstas: 'pateikti', enabled: false}, {tekstas:'spausdinti', enabled:true}]
    },
    { //tai nebus klausimas
          title: 'Swedbank paskolos',
          klausimas: 'Ačiū už jūsų laiką. Forma sėkmingai užpildyta, įvesta inforamacija yra išsaugota - galite uždaryti šį langą.', //
      buttons: [{tekstas: 'pabaiga',enabled: true}]
    }
  ] // end of data array 
  