/**
 * scripts.js -
 * Contiene:
 * - scroll suave (con offset por navbar)
 * - navbar scrolled class
 * - animaciones fade-in (IntersectionObserver)
 * - ver más / ver menos (para top20 y fans) mostrando 3 por defecto
 * - overlay de canciones en la sección "Discos" (solo #Discos .card)
 *
 */

document.addEventListener("DOMContentLoaded", () => {
  /* --------------------------
     Scroll suave con offset
     -------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      const target = document.querySelector(href);
      if (!target) return;
      const offset = 70; 
      const topPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: topPos, behavior: "smooth" });
    });
  });

  /* --------------------------
     Navbar cambia de estilo al hacer scroll
     -------------------------- */
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");
    });
  }

  /* --------------------------
     Fade-in con IntersectionObserver
     -------------------------- */
  const faders = document.querySelectorAll(".fade-in");
  if (faders.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: "0px 0px -50px 0px" });

    faders.forEach(f => observer.observe(f));
  }

  /* --------------------------
     Botón "ver más" del bloque historia (texto + foto)
     -------------------------- */
  const texto = document.getElementById("texto");
  const foto  = document.getElementById("foto");
  const btnHistoria = document.getElementById("verMasBtn");
  if (btnHistoria) {
    btnHistoria.addEventListener("click", () => {
      texto.classList.toggle("expandido");
      foto.classList.toggle("expandido");
      btnHistoria.textContent = texto.classList.contains("expandido") ? "Ver menos" : "Ver más";
    });
  }

  /* --------------------------
     OVERLAY: canciones por álbum (solo para la sección DISCOS)
     - solo los .card dentro de #Discos abren este modal
     -------------------------- */
  const albums = {

    "demo_rca": { title: "Demo RCA (1982)", tracks: ["01) Mariposa Pontiac", "02) Superlógico", "03) Un tal Brigitte Bardot","04) Nene nena","05) Pura suerte"] },
    "gulp": { title: "Gulp (1985)", tracks: ["01) Barbazul versus el amor letal","02) La Bestia Pop","03) Roto y mal parado","04) Pierre, el vitricida","05) Unos pocos peligros sensatos","06) Yo no me cai del cielo","07) Te voy a atornillar","08) Superlógico","09) Ñam fi frufi fali fru","10) El infierno está encantador esta noche","11) Criminal mambo","12) Pianito / Jam"] },
    "oktubre": { title: "Oktubre (1986)", tracks: ["01) Fuegos de octubre","02) Preso en mi ciudad","03) Música para pastillas","04) Semen-up","05) Divina TV Führer","06) Motor psico","07) Jijiji","08) Canción para naufragios","09) Ya nadie va a escuchar tu remera"] },
    "baion": { title: "Un baión para el ojo idiota (1988)", tracks: ["01) Masacre en el puticlub","02) Noticias de ayer","03) Aquella solitaria vaca cubana","04) Todo preso es político","05) Vencedores vencidos","06) Vamos las bandas","07) Ella debe estar tan linda","08) Todo un palo"] },
    "bang_bang": { title: "Bang! Bang!!… estás liquidado (1989)", tracks: ["01) Héroe del whisky","02) Rock para los dientes","03) La Parabellum del buen psicópata","04) Un Pacman en el Savoy","05) Nadie es perfecto","06) Esa estrella era mi lujo","07) Maldición, va a ser un día hermoso","08) Ropa sucia","09) Nuestro amo juega al esclavo"] },
    "mosca_sopa": { title: "La mosca y la sopa (1991)", tracks: ["01) Toxi – Taxi","02) Fusilados por la Cruz Roja","03) Un poco de amor francés","04) Mi perro dinamita","05) Blues de la artillería","06) Tarea fina","07) El pibe de los astilleros","08) Nueva Roma","09) Salando las heridas","10) Queso ruso"] },
    "en_directo": { title: "En directo (1992)", tracks: ["01) Nuestro amo juega al esclavo","02) Barbazul versus el amor letal","03) Yo no me caí del cielo","04) Héroe del whisky","05) La parabellum del buen psicópata","06) Maldición, va a ser un día hermoso","07) Blues del noticiero","08) Todo un palo","09) Unos pocos peligros sensatos","10) Criminal mambo","11) Rock para los dientes","12) Vamos las bandas"] },
    "lobo1": { title: "Lobo suelto – Cordero atado, vol. 1 (1993)", tracks: ["01) Invocación","02) Rock para el Negro Atila","03) Sorpresa de Shangai","04) Shopping-Disco-Zen","05) Un ángel para tu soledad","06) Buenas noticias","07) Susanita","08) Capricho Magyar","09) Espejismo","10) Gran Lady","11) La hija del fletero","12) El lobo caído","13) Sushi"] },
    "lobo2": { title: "Lobo suelto – Cordero atado, vol. 2 (1993)", tracks: ["01) Yo caníbal","02) Ladrón de mi cerebro","03) ¡Es hora de levantarse, querido!","04) Perdiendo el tiempo","05) Caña seca y un membrillo","06) Soga de Caín","07) Lavi – Rap","08) El arte del buen comer","09) ¡Lobo? ¿estás?","10) Botija rapado","11) San Telmo","12) Etiqueta negra"] },
    "luzbelito": { title: "Luzbelito (1996)", tracks: ["01) Luzbelito y las sirenas","02) Cruz diablo!","03) Ella baila con todos","04) Fanfarria del cabrío","05) Nuotatori professionisti","06) Blues de la libertad","07) La dicha no es una cosa alegre","08) Me matan, Limón!","09) Rock Yugular","10) Mariposa Pontiac - rock del país","11) Juguetes perdidos"] },
    "ultimo_bondi": { title: "Último bondi a Finisterre (1998)", tracks: ["01) Las increíbles andanzas del Capitán Buscapina en Cybersiberia","02) Estás frito angelito","03) El árbol del gran bonete","04) Gualicho","05) Pogo","06) Alien Duce","07) La pequeña novia del carioca","08) Drogocop","09) Scaramanzia","10) ¡Esto es to-to-todo amigos!"] },
    "momo_sampler": { title: "Momo Sampler (2000)", tracks: ["01) Templo de Momo","02) Morta punto com","03) La murga de los renegados","04) Dr. Saturno","05) La murga de la virgencita","06) Pool, averna y papusa","07) Murga purga","08) Sheriff","09) Pensando como una acelga","10) Una piba con la remera de Greenpeace","11) Rato molhado"] }
  };

  // Elements overlay modal
  const songsOverlay = document.getElementById("songsOverlay");
  const closeBtn = songsOverlay?.querySelector(".close") || songsOverlay?.querySelector(".close") || null;
  const albumTitle = document.getElementById("album-title");
  const albumTracks = document.getElementById("album-tracks");

  // Attach click listener only to the cards in the DISCOS section
  const discoCards = document.querySelectorAll("#Discos .card");
  discoCards.forEach(card => {
    card.addEventListener("click", () => {
      let bg = card.style.backgroundImage || getComputedStyle(card).backgroundImage || "";
      // matchea algo como /demo_rca.webp o demo_rca.jpg
      const m = bg.match(/\/([^\/?#]+)\.(jpg|jpeg|png|webp)/i);
      if (!m) return;
      const key = m[1].toLowerCase();

      const album = albums[key];
      if (album && songsOverlay && albumTitle && albumTracks) {
        albumTitle.textContent = album.title;
        albumTracks.innerHTML = album.tracks.map(t => `<li>${t}</li>`).join("");
        songsOverlay.style.display = "flex";
        songsOverlay.classList.add("open");
      }
    });
  });

  // Close overlay
  if (songsOverlay && closeBtn) {
    closeBtn.addEventListener("click", () => { songsOverlay.style.display = "none"; songsOverlay.classList.remove("open"); });
    songsOverlay.addEventListener("click", e => { if (e.target === songsOverlay) { songsOverlay.style.display = "none"; songsOverlay.classList.remove("open"); }});
  }

  /* --------------------------
     Ver más / Ver menos (Top20 y Fans)
     - Busca botones .verMasBtn con data-target apuntando al id del contenedor
     - Muestra 3 por defecto; al hacer click muestra todo; vuelve a contraer al volver a hacer click
     -------------------------- */
  document.querySelectorAll(".verMasBtn").forEach(btn => {
  const targetId = btn.dataset.target;
  const lista = document.getElementById(targetId);
  if (!lista) return;

  const cards = Array.from(lista.querySelectorAll(".card-song, .card"));

  // Inicial: mostrar solo 3
  cards.forEach((c, i) => {
    if (i >= 3) c.classList.add("oculto");
  });

  btn.addEventListener("click", () => {
    const expanded = lista.classList.toggle("expandido");
    cards.forEach((c, i) => {
      if (i >= 3) c.classList.toggle("oculto", !expanded);
    });
    btn.textContent = expanded ? "Ver menos" : "Ver más";

    if (!expanded) {
      btn.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
});

});

// NOTICIAS
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("noticias-container");

  fetch("data/noticias.json")
    .then(response => {
      if (!response.ok) throw new Error("Error en la respuesta del servidor");
      return response.json();
    })
    .then(noticias => {
      noticias.forEach(noticia => {
        const card = document.createElement("div");
        card.classList.add("noticia-card");

        card.innerHTML = `
          <img src="${noticia.imagen}" alt="${noticia.titulo}">
          <div class="noticia-info">
            <span class="categoria">${noticia.categoria}</span>
            <h3>${noticia.titulo}</h3>
            <p>${noticia.descripcion}</p>
            <a href="${noticia.link}" class="btn-noticia">Leer más</a>
          </div>
        `;

        contenedor.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error al cargar las noticias:", error);
      contenedor.innerHTML = "<p>No se pudieron cargar las noticias.</p>";
    });
});

// NAVBAR RESPONSIVA
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  } else {
    console.warn("⚠️ No se encontró el menú o el botón de hamburguesa.");
  }
});
