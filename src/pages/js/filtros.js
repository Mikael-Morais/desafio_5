let markers = [];
let unidades = [];

function initMap() {
  const mapDiv = document.getElementById("map");
  if (!mapDiv) return;

  map = new google.maps.Map(mapDiv, {
    center: { lat: -2.529722, lng: -44.3028 },
    zoom: 12
  });

  carregarDados(); // já está no seu filtros.js
}

// Torna acessível globalmente (se necessário)
window.initMap = initMap;


function carregarDados() {
  fetch('js/unidades_convertido_normalizado.json')
    .then(response => response.json())
    .then(data => {
      unidades = data;
      preencherFiltros(data);
      configurarEventos();
    })
    .catch(error => console.error('Erro ao carregar JSON:', error));
}

function preencherFiltros(data) {
  const filtroUnidade = document.getElementById('filtro-unidade');
  const filtroServico = document.getElementById('filtro-servico');

  if (!filtroUnidade || !filtroServico) return;

  const servicosUnicos = new Set();
  const unidadesUnicas = new Set();

  filtroUnidade.innerHTML = '<option value="">-- Selecione --</option>';
  filtroServico.innerHTML = '<option value="">-- Selecione --</option>';

  data.forEach(unidade => {
    if (unidade.Unidade && !unidadesUnicas.has(unidade.Unidade)) {
      unidadesUnicas.add(unidade.Unidade);
      const option = document.createElement('option');
      option.value = unidade.Unidade;
      option.textContent = unidade.Unidade;
      filtroUnidade.appendChild(option);
    }

    unidade.Servicos?.forEach(servico => {
      servico.split(/\n|•|;|,/).forEach(parte => {
        const texto = parte.trim();
        if (texto) servicosUnicos.add(texto);
      });
    });
  });

  servicosUnicos.forEach(servico => {
    const option = document.createElement('option');
    option.value = servico;
    option.textContent = servico;
    filtroServico.appendChild(option);
  });
}

function configurarEventos() {
  const filtroUnidade = document.getElementById('filtro-unidade');
  const filtroServico = document.getElementById('filtro-servico');

  if (filtroUnidade) {
    filtroUnidade.addEventListener('change', () => {
      const nomeUnidade = filtroUnidade.value;
      if (!nomeUnidade) return;

      const unidade = unidades.find(u => u.Unidade === nomeUnidade);
      if (unidade) {
        adicionarMarcadorPorCoordenadas(unidade.Latitude, unidade.Longitude, unidade.Unidade, unidade.Endereco);
      }
    });
  }

  if (filtroServico) {
    filtroServico.addEventListener('change', () => {
      const servicoSelecionado = filtroServico.value;
      const resultado = document.getElementById('resultado');
      limparMarcadores();
      if (resultado) resultado.innerHTML = '';

      if (!servicoSelecionado) return;

      const unidadesFiltradas = unidades.filter(u =>
        u.Servicos?.some(servico =>
          servico.toLowerCase().includes(servicoSelecionado.toLowerCase())
        )
      );

      unidadesFiltradas.forEach(u => {
        const card = document.createElement('div');
        card.classList.add('resultado-item');

        card.innerHTML = `
          <strong>${u.Unidade}</strong>
          <span><i class="fas fa-map-marker-alt" style="color:var(--primary-color);margin-right:5px"></i>${u.Endereco}</span>
          <span><i class="fas fa-phone-alt" style="color:var(--primary-color);margin-right:5px"></i>${u.Telefone}</span>
        `;

        card.addEventListener('click', () => {
          adicionarMarcadorPorCoordenadas(u.Latitude, u.Longitude, u.Unidade, u.Endereco, u.Telefone);
        });

        if (resultado) resultado.appendChild(card);
      });
    });
  }


function limparMarcadores() {
  markers.forEach(marker => marker.setMap(null));
  markers = [];
}

function adicionarMarcadorPorCoordenadas(lat, lng, nome, endereco, telefone) {
  if (!map) {
    console.error("Mapa ainda não foi carregado.");
    return;
  }

  const location = { lat: parseFloat(lat), lng: parseFloat(lng) };

  // 🧼 Limpa marcadores anteriores
  limparMarcadores();

  // 👇 Sai do Street View caso esteja ativado
  map.getStreetView().setVisible(false);

  const marker = new google.maps.Marker({
    map: map,
    position: location,
    title: nome,
  });

  markers.push(marker);

  // 👁️ Move o mapa até a nova unidade
  map.panTo(location);
  map.setZoom(18);

  // 🧾 Atualiza a exibição de dados no painel
  const resultado = document.getElementById('resultado');
  if (resultado) {
    resultado.innerHTML = `
      <div class="resultado-detalhado">
        <h3 style="margin-bottom: 0.3rem;">${nome}</h3>
        <p style="margin: 0.2rem 0;"><i class="fas fa-map-marker-alt" style="margin-right:5px;color:var(--primary-color)"></i>${endereco}</p>
        <p style="margin: 0.2rem 0;"><i class="fas fa-phone-alt" style="margin-right:5px;color:var(--primary-color)"></i>${telefone || 'Telefone não informado'}</p>
      </div>
    `;
  }
}}