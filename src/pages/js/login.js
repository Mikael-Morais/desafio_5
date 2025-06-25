function criarTelaLogin() {
  const main = document.getElementById("conteudo");
  main.innerHTML = "";

  document.body.style.backgroundColor = "#f0f4f8";
  document.body.style.fontFamily = "Arial, sans-serif";

  const container = document.createElement("div");
  container.style.width = "400px";
  container.style.margin = "80px auto";
  container.style.padding = "32px 28px";
  container.style.backgroundColor = "#fff";
  container.style.borderRadius = "18px";
  container.style.boxShadow = "0 4px 32px #0001";
  container.style.textAlign = "center";
  container.style.position = "relative";
  main.appendChild(container);

  // Logo ou ícone
  const logo = document.createElement("div");
  logo.innerHTML = '<i class="fas fa-user-md"></i>';
  logo.style.fontSize = "2.5rem";
  logo.style.color = "#e53935";
  logo.style.marginBottom = "10px";
  container.appendChild(logo);

  // Título
  const titulo = document.createElement("h2");
  titulo.innerText = "Saúde Conectada MA";
  titulo.style.color = "#e53935";
  titulo.style.marginBottom = "8px";
  titulo.style.letterSpacing = "1px";
  container.appendChild(titulo);

  // Subtítulo
  const subtitulo = document.createElement("div");
  subtitulo.innerText = "Acesse sua conta ou cadastre-se";
  subtitulo.style.color = "#888";
  subtitulo.style.fontSize = "1rem";
  subtitulo.style.marginBottom = "18px";
  container.appendChild(subtitulo);

  // Botões de alternância
  const btnsContainer = document.createElement("div");
  btnsContainer.style.marginBottom = "18px";
  btnsContainer.style.display = "flex";
  btnsContainer.style.justifyContent = "center";
  btnsContainer.style.gap = "10px";

  const btnCadastro = document.createElement("button");
  btnCadastro.textContent = "Cadastro";
  const btnLogin = document.createElement("button");
  btnLogin.textContent = "Login";
  [btnCadastro, btnLogin].forEach(btn => {
    btn.style.padding = "10px 28px";
    btn.style.borderRadius = "30px";
    btn.style.border = "none";
    btn.style.backgroundColor = "#eee";
    btn.style.color = "#e53935";
    btn.style.fontWeight = "bold";
    btn.style.fontSize = "1rem";
    btn.style.cursor = "pointer";
    btn.style.transition = "background 0.2s, color 0.2s";
  });
  btnCadastro.style.backgroundColor = "#e53935";
  btnCadastro.style.color = "#fff";
  btnsContainer.appendChild(btnCadastro);
  btnsContainer.appendChild(btnLogin);
  container.appendChild(btnsContainer);

  // Formulário
  const form = document.createElement("form");
  form.style.display = "flex";
  form.style.flexDirection = "column";
  form.style.gap = "12px";
  form.style.marginBottom = "10px";
  container.appendChild(form);

  // Mensagem de erro/sucesso
  const msg = document.createElement("div");
  msg.style.fontSize = "0.98rem";
  msg.style.margin = "6px 0 0 0";
  msg.style.minHeight = "22px";
  container.appendChild(msg);

  // Campos para cadastro e login
  const camposCadastro = [
    { campo: "nome", label: "Nome completo", tipo: "text", placeholder: "Seu nome" },
    { campo: "email", label: "E-mail", tipo: "email", placeholder: "Seu e-mail" },
    { campo: "usuario", label: "Usuário", tipo: "text", placeholder: "Nome de usuário" },
    { campo: "cpf", label: "CPF", tipo: "text", placeholder: "Seu CPF" },
    { campo: "senha", label: "Senha", tipo: "password", placeholder: "Crie uma senha" },
    { campo: "confirma", label: "Confirme a senha", tipo: "password", placeholder: "Confirme a senha" },
    { campo: "nascimento", label: "Data de nascimento", tipo: "date", placeholder: "" }
  ];
  const camposLogin = [
    { campo: "usuario", label: "Usuário", tipo: "text", placeholder: "Nome de usuário" },
    { campo: "senha", label: "Senha", tipo: "password", placeholder: "Senha" }
  ];

  let modo = "cadastro";
  let camposAtuais = camposCadastro;
  let valores = {};

  function renderizarCampos() {
    form.innerHTML = "";
    valores = {};
    camposAtuais.forEach(c => {
      const group = document.createElement("div");
      group.style.display = "flex";
      group.style.flexDirection = "column";
      group.style.alignItems = "flex-start";
      group.style.gap = "3px";
      const label = document.createElement("label");
      label.innerText = c.label;
      label.style.fontWeight = "bold";
      label.style.fontSize = "1rem";
      label.style.color = "#444";
      group.appendChild(label);
      const input = document.createElement("input");
      input.type = c.tipo;
      input.placeholder = c.placeholder;
      input.style.width = "100%";
      input.style.padding = "10px";
      input.style.border = "1px solid #bbb";
      input.style.borderRadius = "6px";
      input.style.fontSize = "1rem";
      input.style.marginBottom = "2px";
      input.required = true;
      input.autocomplete = "off";
      input.oninput = e => { valores[c.campo] = e.target.value; };
      group.appendChild(input);
      form.appendChild(group);
    });
  }

  function setModo(novoModo) {
    modo = novoModo;
    if (modo === "cadastro") {
      camposAtuais = camposCadastro;
      btnCadastro.style.backgroundColor = "#e53935";
      btnCadastro.style.color = "#fff";
      btnLogin.style.backgroundColor = "#eee";
      btnLogin.style.color = "#e53935";
    } else {
      camposAtuais = camposLogin;
      btnLogin.style.backgroundColor = "#e53935";
      btnLogin.style.color = "#fff";
      btnCadastro.style.backgroundColor = "#eee";
      btnCadastro.style.color = "#e53935";
    }
    renderizarCampos();
    msg.innerText = "";
  }

  btnCadastro.onclick = () => setModo("cadastro");
  btnLogin.onclick = () => setModo("login");

  // Botão de enviar
  const btnEnviar = document.createElement("button");
  btnEnviar.type = "submit";
  btnEnviar.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar';
  btnEnviar.style.padding = "10px 0";
  btnEnviar.style.backgroundColor = "#e53935";
  btnEnviar.style.color = "#fff";
  btnEnviar.style.border = "none";
  btnEnviar.style.borderRadius = "30px";
  btnEnviar.style.fontWeight = "bold";
  btnEnviar.style.fontSize = "1.1rem";
  btnEnviar.style.marginTop = "10px";
  btnEnviar.style.cursor = "pointer";
  btnEnviar.style.boxShadow = "0 2px 8px #e5393533";
  form.appendChild(btnEnviar);

  // Evento de submit
  form.onsubmit = async function(e) {
    e.preventDefault();
    msg.style.color = "#e53935";
    msg.style.background = "#fff0f0";
    msg.style.borderRadius = "6px";
    msg.style.padding = "4px 0";
    msg.innerText = "";
    if (modo === "cadastro") {
      // Validação simples
      if (!valores.nome || !valores.email || !valores.usuario || !valores.cpf || !valores.senha || !valores.confirma || !valores.nascimento) {
        msg.innerText = "Preencha todos os campos.";
        return;
      }
      if (valores.senha !== valores.confirma) {
        msg.innerText = "As senhas não coincidem.";
        return;
      }
      // Envia para o backend
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: valores.nome,
            email: valores.email,
            username: valores.usuario,
            cpf: valores.cpf,
            password: valores.senha,
            nascimento: valores.nascimento
          })
        });
        const data = await response.json();
        if (response.ok && data.success) {
          msg.style.color = "#388e3c";
          msg.style.background = "#e8f5e9";
          msg.innerText = "Cadastro realizado com sucesso! Faça login.";
          setModo("login");
        } else {
          msg.innerText = data.message || "Erro ao cadastrar usuário.";
        }
      } catch (err) {
        msg.innerText = "Erro de comunicação com o servidor.";
      }
    } else {
      // Login real
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: valores.usuario,
            password: valores.senha
          })
        });
        const data = await response.json();
        if (response.ok && data.auth) {
          msg.style.color = "#388e3c";
          msg.style.background = "#e8f5e9";
          msg.innerText = "Login realizado! Redirecionando...";
          localStorage.setItem('token', data.token);
          setTimeout(() => navegar('home'), 1500);
        } else {
          msg.innerText = data.message || "Usuário ou senha inválidos.";
        }
      } catch (err) {
        msg.innerText = "Erro de comunicação com o servidor.";
      }
    }
  };

  // Acessibilidade: Enter no último campo envia
  form.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      const inputs = Array.from(form.querySelectorAll('input'));
      if (document.activeElement === inputs[inputs.length - 1]) {
        e.preventDefault();
        btnEnviar.click();
      }
    }
  });

  // Inicializa em modo cadastro
  setModo("cadastro");
}
