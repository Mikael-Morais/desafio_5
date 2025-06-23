function criarTelaLogin() {
  const main = document.getElementById("conteudo");
  main.innerHTML = "";

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

  // Título
  const titulo = document.createElement("h1");
  titulo.innerText = "Login";
  titulo.style.color =  "#e53935";
  titulo.style.marginBottom = "20px";
  container.appendChild(titulo);

  // Campo de e-mail
  const inputEmail = document.createElement("input");
  inputEmail.type = "email";
  inputEmail.placeholder = "Digite seu e-mail";
  inputEmail.style.width = "100%";
  inputEmail.style.padding = "10px";
  inputEmail.style.marginBottom = "15px";
  inputEmail.style.border = "1px solid #aaa";
  inputEmail.style.borderRadius = "5px";
  inputEmail.style.fontSize = "16px";
  container.appendChild(inputEmail);

  // Campo de senha
  const inputSenha = document.createElement("input");
  inputSenha.type = "password";
  inputSenha.placeholder = "Digite sua senha";
  inputSenha.style.width = "100%";
  inputSenha.style.padding = "10px";
  inputSenha.style.marginBottom = "15px";
  inputSenha.style.border = "1px solid #aaa";
  inputSenha.style.borderRadius = "5px";
  inputSenha.style.fontSize = "16px";
  container.appendChild(inputSenha);

  // Botão de login
  const btnLogin = document.createElement("button");
  btnLogin.innerHTML = '<i class="fas fa-sign-in-alt"></i> Entrar';
  btnLogin.style.display = "inline-flex";
  btnLogin.style.alignItems = "center";
  btnLogin.style.justifyContent = "center";
  btnLogin.style.gap = "8px";
  btnLogin.style.padding = "10px 20px";
  btnLogin.style.backgroundColor = "#e53935";
  btnLogin.style.color = "#fff";
  btnLogin.style.border = "2px solid #fff";
  btnLogin.style.borderRadius = "30px";
  btnLogin.style.fontWeight = "bold";
  btnLogin.style.fontSize = "14px";
  btnLogin.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
  btnLogin.style.cursor = "pointer";
  btnLogin.style.transition = "background-color 0.3s";
  container.appendChild(btnLogin);

  // Mensagem para cadastro
  const msgCadastro = document.createElement("div");
  msgCadastro.innerHTML = 'Não tem conta? <span id="linkCadastro" style="color:#e53935;cursor:pointer;text-decoration:underline;">Cadastre-se</span>';
  msgCadastro.style.marginTop = "20px";
  msgCadastro.style.fontSize = "15px";
  container.appendChild(msgCadastro);

  // Mensagem de erro
  const msgErro = document.createElement("div");
  msgErro.id = "msgErroLogin";
  msgErro.style.color = "red";
  msgErro.style.marginTop = "10px";
  msgErro.style.fontSize = "14px";
  container.appendChild(msgErro);

  // Evento de login (exemplo, sem backend)
  btnLogin.onclick = function() {
    const email = inputEmail.value.trim();
    const senha = inputSenha.value.trim();
    if (!email || !senha) {
      msgErro.innerText = "Preencha todos os campos.";
      return;
    }
    // Aqui você faria o fetch para o backend
    msgErro.innerText = "(Exemplo) Login enviado para o backend.";
  };

  // Evento para ir para tela de cadastro
  document.getElementById("linkCadastro").onclick = criarTelaCadastro;
}

// Função para criar a tela de cadastro (igual à sua tela anterior)
function criarTelaCadastro() {
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

  // Título
  const titulo = document.createElement("h1");
  titulo.innerText = "Cadastro";
  titulo.style.color =  "#e53935";
  titulo.style.marginBottom = "20px";
  container.appendChild(titulo);

  // Campos de cadastro
  const inputNome = document.createElement("input");
  inputNome.type = "text";
  inputNome.placeholder = "Nome completo";
  inputNome.style.width = "100%";
  inputNome.style.padding = "10px";
  inputNome.style.marginBottom = "15px";
  inputNome.style.border = "1px solid #aaa";
  inputNome.style.borderRadius = "5px";
  inputNome.style.fontSize = "16px";
  container.appendChild(inputNome);

  const inputEmail = document.createElement("input");
  inputEmail.type = "email";
  inputEmail.placeholder = "E-mail";
  inputEmail.style.width = "100%";
  inputEmail.style.padding = "10px";
  inputEmail.style.marginBottom = "15px";
  inputEmail.style.border = "1px solid #aaa";
  inputEmail.style.borderRadius = "5px";
  inputEmail.style.fontSize = "16px";
  container.appendChild(inputEmail);

  const inputSenha = document.createElement("input");
  inputSenha.type = "password";
  inputSenha.placeholder = "Senha";
  inputSenha.style.width = "100%";
  inputSenha.style.padding = "10px";
  inputSenha.style.marginBottom = "15px";
  inputSenha.style.border = "1px solid #aaa";
  inputSenha.style.borderRadius = "5px";
  inputSenha.style.fontSize = "16px";
  container.appendChild(inputSenha);

  const inputConfirma = document.createElement("input");
  inputConfirma.type = "password";
  inputConfirma.placeholder = "Confirme a senha";
  inputConfirma.style.width = "100%";
  inputConfirma.style.padding = "10px";
  inputConfirma.style.marginBottom = "15px";
  inputConfirma.style.border = "1px solid #aaa";
  inputConfirma.style.borderRadius = "5px";
  inputConfirma.style.fontSize = "16px";
  container.appendChild(inputConfirma);

  // Botão de cadastro
  const btnCadastrar = document.createElement("button");
  btnCadastrar.innerHTML = '<i class="fas fa-user-plus"></i> Cadastrar';
  btnCadastrar.style.display = "inline-flex";
  btnCadastrar.style.alignItems = "center";
  btnCadastrar.style.justifyContent = "center";
  btnCadastrar.style.gap = "8px";
  btnCadastrar.style.padding = "10px 20px";
  btnCadastrar.style.backgroundColor = "#e53935";
  btnCadastrar.style.color = "#fff";
  btnCadastrar.style.border = "2px solid #fff";
  btnCadastrar.style.borderRadius = "30px";
  btnCadastrar.style.fontWeight = "bold";
  btnCadastrar.style.fontSize = "14px";
  btnCadastrar.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
  btnCadastrar.style.cursor = "pointer";
  btnCadastrar.style.transition = "background-color 0.3s";
  container.appendChild(btnCadastrar);

  // Mensagem para login
  const msgLogin = document.createElement("div");
  msgLogin.innerHTML = 'Já tem conta? <span id="linkLogin" style="color:#e53935;cursor:pointer;text-decoration:underline;">Entrar</span>';
  msgLogin.style.marginTop = "20px";
  msgLogin.style.fontSize = "15px";
  container.appendChild(msgLogin);

  // Mensagem de erro
  const msgErro = document.createElement("div");
  msgErro.id = "msgErroCadastro";
  msgErro.style.color = "red";
  msgErro.style.marginTop = "10px";
  msgErro.style.fontSize = "14px";
  container.appendChild(msgErro);

  btnCadastrar.onclick = function() {
    const nome = inputNome.value.trim();
    const email = inputEmail.value.trim();
    const senha = inputSenha.value.trim();
    const confirma = inputConfirma.value.trim();
    if (!nome || !email || !senha || !confirma) {
      msgErro.innerText = "Preencha todos os campos.";
      return;
    }
    if (senha !== confirma) {
      msgErro.innerText = "As senhas não coincidem.";
      return;
    }
    // Aqui você faria o fetch para o backend
    msgErro.innerText = "(Exemplo) Cadastro enviado para o backend.";
  };

  document.getElementById("linkLogin").onclick = criarTelaLogin;
}
