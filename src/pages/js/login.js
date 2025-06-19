// Adiciona Font Awesome se ainda não estiver
const fontAwesomeLink = document.createElement("link");
fontAwesomeLink.rel = "stylesheet";
fontAwesomeLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
document.head.appendChild(fontAwesomeLink);

// Adiciona o CSS do botão vermelho e tooltip
const estilo = document.createElement("style");
estilo.textContent = `
  nav button {
    background-color: #e53935;
    color: #fff;
    border: 2px solid #fff;
    border-radius: 30px;
    padding: 10px 20px;
    margin: 5px;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: background-color 0.3s;
  }

  nav button:hover {
    background-color: #c62828;
  }

  .tooltip {
    position: relative;
  }

  .tooltiptext {
    visibility: hidden;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 8px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.3s;
    font-size: 12px;
    white-space: nowrap;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
`;
document.head.appendChild(estilo);

// Cria botão Login e adiciona à navbar
const nav = document.querySelector("nav");
const botaoLogin = document.createElement("button");
botaoLogin.className = "tooltip";
botaoLogin.innerHTML = `
  <i class="fas fa-sign-in-alt"></i> Login
  <span class="tooltiptext">Acessar conta</span>
`;
botaoLogin.onclick = criarTelaLogin;
nav.appendChild(botaoLogin);

// Função para criar a tela de login interativo
function criarTelaLogin() {
  const main = document.getElementById("conteudo");
  main.innerHTML = ""; // Limpa conteúdo anterior

  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.body.style.boxSizing = "border-box";
  document.body.style.backgroundColor = "#f0f4f8";
  document.body.style.fontFamily = "Arial, sans-serif";

  const container = document.createElement("div");
  container.style.width = "400px";
  container.style.margin = "80px auto";
  container.style.padding = "30px";
  container.style.backgroundColor = "white";
  container.style.borderRadius = "10px";
  container.style.boxShadow = "0px 0px 10px #ccc";
  container.style.textAlign = "center";
  main.appendChild(container);

  const titulo = document.createElement("h1");
  titulo.innerText = "Cadastro / Login";
  titulo.style.color =  "#e53935";
  titulo.style.marginBottom = "20px";
  container.appendChild(titulo);

  const pergunta = document.createElement("div");
  pergunta.id = "pergunta";
  pergunta.innerText = "Qual seu nome completo?";
  pergunta.style.fontSize = "18px";
  pergunta.style.marginBottom = "15px";
  pergunta.style.color = "#333";
  container.appendChild(pergunta);

  const resposta = document.createElement("textarea");
  resposta.id = "resposta";
  resposta.placeholder = "Digite aqui...";
  resposta.style.width = "100%";
  resposta.style.height = "80px";
  resposta.style.padding = "10px";
  resposta.style.border = "1px solid #aaa";
  resposta.style.borderRadius = "5px";
  resposta.style.marginBottom = "15px";
  resposta.style.resize = "none";
  container.appendChild(resposta);

  const btnProximo = document.createElement("button");
  btnProximo.id = "btnProximo";
  btnProximo.innerHTML = '<i class="fas fa-arrow-right"></i> Próximo';
  btnProximo.style.display = "inline-flex";
  btnProximo.style.alignItems = "center";
  btnProximo.style.justifyContent = "center";
  btnProximo.style.gap = "8px";
  btnProximo.style.padding = "10px 20px";
  btnProximo.style.backgroundColor = "#e53935";
  btnProximo.style.color = "#fff";
  btnProximo.style.border = "2px solid #fff";
  btnProximo.style.borderRadius = "30px";
  btnProximo.style.fontWeight = "bold";
  btnProximo.style.fontSize = "14px";
  btnProximo.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
  btnProximo.style.cursor = "pointer";
  btnProximo.style.transition = "background-color 0.3s";
  container.appendChild(btnProximo);

  btnProximo.addEventListener("mouseover", () => {
    btnProximo.style.backgroundColor = "#c62828";
  });
  btnProximo.addEventListener("mouseout", () => {
    btnProximo.style.backgroundColor = "#e53935";
  });

  const perguntas = [
    "Qual seu nome completo?",
    "Digite seu e-mail:",
    "Crie uma senha:",
    "Confirme sua senha:"
  ];

  let indice = 0;

  resposta.focus();

  btnProximo.addEventListener("click", avancarPergunta);
  resposta.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      avancarPergunta();
    }
  });

  function avancarPergunta() {
    const textoResposta = resposta.value.trim();
    if (textoResposta === "") {
      alert("Por favor, preencha o campo.");
      resposta.focus();
      return;
    }

    indice++;
    if (indice < perguntas.length) {
      pergunta.innerText = perguntas[indice];
      resposta.value = "";
      resposta.focus();
    } else {
      pergunta.innerText = "Cadastro concluído!";
      resposta.style.display = "none";
      btnProximo.style.display = "none";
    }
  }
}
