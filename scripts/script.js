const botao = document.getElementById('botao-tema');
const body = document.body;

// Persistência do tema
const temaSalvo = localStorage.getItem('tema');
temaEscuro(temaSalvo === 'escuro');

// Função para alternar entre tema claro e escuro
function temaEscuro(tipo) {
  if (tipo == true) {
    body.classList.add('escuro');
    botao.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    body.classList.remove('escuro');
    botao.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
}

botao.addEventListener('click', () => {
  const isescuro = body.classList.toggle('escuro');
  temaEscuro(isescuro);
  localStorage.setItem('tema', isescuro ? 'escuro' : 'claro');
});

// Scroll suave para links de navegação
const navLinks = document.querySelectorAll('#menu ul a.link');

navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');

    // Só aplica scroll se for âncora (#)
    if (href.startsWith("#")) {
      e.preventDefault();

      const target = document.querySelector(href);

      if (target) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});
const selectBox = document.querySelector(".custom-select");
const selected = document.querySelector(".selected");
const checkboxes = document.querySelectorAll(".options input");
const cursos = document.querySelectorAll(".curso");

// abrir/fechar dropdown
if (selected && selectBox) {
  selected.addEventListener("click", () => {
    selectBox.classList.toggle("active");
  });
}

// filtro
checkboxes.forEach(cb => {
  cb.addEventListener("change", () => {
    const selecionados = [];

    checkboxes.forEach(c => {
      if (c.checked) {
        selecionados.push(c.value);
      }
    });

    // atualiza texto do select
    if (selecionados.length === 0) {
      selected.textContent = "Todos";
    } else {
      selected.textContent = selecionados.join(", ");
    }

    // filtrar cursos
    cursos.forEach(curso => {
      if (selecionados.length === 0) {
        curso.classList.remove("oculto");
        return;
      }

      const mostrar = selecionados.some(valor =>
        curso.classList.contains(valor)
      );

      curso.classList.toggle("oculto", !mostrar);
    });
  });
});