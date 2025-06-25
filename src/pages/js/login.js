function criarTelaLogin() {
  const main = document.getElementById("conteudo");
  main.innerHTML = "";

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
  titulo.style.color = "#e53935";
  titulo.style.marginBottom = "20px";
  container.appendChild(titulo);

  // Botões
  const btnCadastro = document.createElement("button");
  btnCadastro.textContent = "Cadastro";
  const btnLogin = document.createElement("button");
  btnLogin.textContent = "Login";
  [btnCadastro, btnLogin].forEach(btn => {
    btn.style.margin = "0 10px 15px";
    btn.style.padding = "10px 20px";
    btn.style.borderRadius = "30px";
    btn.style.border = "none";
    btn.style.backgroundColor = "#e53935";
    btn.style.color = "#fff";
    btn.style.fontWeight = "bold";
    btn.style.cursor = "pointer";
  });

  container.appendChild(btnCadastro);
  container.appendChild(btnLogin);

  const pergunta = document.createElement("div");
  pergunta.style.fontSize = "18px";
  pergunta.style.marginTop = "20px";
  pergunta.style.marginBottom = "15px";
  pergunta.style.color = "#333";
  container.appendChild(pergunta);

  const resposta = document.createElement("input");
  resposta.style.width = "100%";
  resposta.style.padding = "10px";
  resposta.style.border = "1px solid #aaa";
  resposta.style.borderRadius = "5px";
  resposta.style.marginBottom = "15px";
  container.appendChild(resposta);

  const btnProximo = document.createElement("button");
  btnProximo.innerHTML = "Próximo";
  btnProximo.style.padding = "10px 20px";
  btnProximo.style.borderRadius = "30px";
  btnProximo.style.border = "none";
  btnProximo.style.backgroundColor = "#e53935";
  btnProximo.style.color = "#fff";
  btnProximo.style.fontWeight = "bold";
  btnProximo.style.cursor = "pointer";
  container.appendChild(btnProximo);

  let modo = "cadastro";
  let indice = 0;
  let respostas = {};
  const perguntasCadastro = [
    { campo: "email", pergunta: "Digite seu e-mail", tipo: "email" },
    { campo: "usuario", pergunta: "Crie um nome de usuário", tipo: "text" },
    { campo: "cpf", pergunta: "Digite seu CPF", tipo: "text" },
    { campo: "senha", pergunta: "Crie uma senha", tipo: "password" },
    { campo: "nascimento", pergunta: "Digite sua data de nascimento", tipo: "date" }
  ];

  const perguntasLogin = [
    { campo: "usuario", pergunta: "Nome de usuário", tipo: "text" },
    { campo: "senha", pergunta: "Senha", tipo: "password" }
  ];

  let perguntas = perguntasCadastro;

  function mostrarPergunta() {
    const atual = perguntas[indice];
    pergunta.innerText = atual.pergunta;
    resposta.type = atual.tipo;
    resposta.value = "";
    resposta.focus();
  }

  function avancarPergunta() {
    const valor = resposta.value.trim();
    if (valor === "") {
      alert("Preencha o campo.");
      return;
    }

    async function fazerLogin({ usuario, senha }) {
      try {
        const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: usuario,
          password: senha
        })
        });

        const data = await response.json();

        if (data.auth) {
          localStorage.setItem('token', data.token);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Erro no login:', error);
        return false;
      }
    }

    respostas[perguntas[indice].campo] = valor;
    indice++;

    if (indice < perguntas.length) {
      mostrarPergunta();
    } else {
      if (modo === "cadastro") {
        salvarCadastro(respostas);
        pergunta.innerText = "Cadastro concluído!";
      } else {
        fazerLogin(respostas).then(sucesso => {
          if (sucesso) {
            pergunta.innerText = "Login realizado!";
            
            // Aguarda 2 segundo para o usuário ver a mensagem e depois redireciona
            setTimeout(() => {
                navegar('home'); // Chama a função de navegação do main.js 
            }, 2000); // Atraso de 2 segundos
          } else {
            pergunta.innerText = "Usuário ou senha incorretos!";
          }

          resposta.style.display = "none";
          btnProximo.style.display = "none";
        });
      }

      resposta.style.display = "none";
      btnProximo.style.display = "none";
    }
  }

  function salvarCadastro(dados) {
    localStorage.setItem("usuario_" + dados.usuario, JSON.stringify(dados));
  }

  function verificarLogin(loginData) {
    const armazenado = localStorage.getItem("usuario_" + loginData.usuario);
    if (!armazenado) return false;

    const dados = JSON.parse(armazenado);
    return dados.senha === loginData.senha;
  }

  btnCadastro.onclick = () => {
    modo = "cadastro";
    perguntas = perguntasCadastro;
    indice = 0;
    respostas = {};
    resposta.style.display = "block";
    btnProximo.style.display = "inline-block";
    mostrarPergunta();
  };

  btnLogin.onclick = () => {
    modo = "login";
    perguntas = perguntasLogin;
    indice = 0;
    respostas = {};
    resposta.style.display = "block";
    btnProximo.style.display = "inline-block";
    mostrarPergunta();
  };

  btnProximo.onclick = avancarPergunta;

  resposta.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      avancarPergunta();
    }
  });

  btnCadastro.click();
}
