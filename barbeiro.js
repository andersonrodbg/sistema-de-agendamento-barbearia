const lista = document.getElementById("listaAgendamentos");
const filtroData = document.getElementById("filtroData");
const btnFiltrar = document.getElementById("btnFiltrar");
const btnTodos = document.getElementById("btnTodos");

async function carregarAgendamentos(dataFiltro = null) {
  lista.innerHTML = "<p>Carregando agendamentos...</p>";

  try {
    const response = await fetch("http://localhost:8080/agendamentos");
    const agendamentos = await response.json();

    let agendamentosFiltrados = agendamentos;

    if (dataFiltro) {
      agendamentosFiltrados = agendamentos.filter(a => a.data === dataFiltro);
    }

    if (agendamentosFiltrados.length === 0) {
      lista.innerHTML = "<p>Nenhum agendamento encontrado.</p>";
      return;
    }

    lista.innerHTML = agendamentosFiltrados.map(a => `
      <div class="agendamento">
        <p><strong>Cliente:</strong> ${a.nomeCliente}</p>
        <p><strong>Serviço:</strong> ${a.servico}</p>
        <p><strong>Data:</strong> ${a.data}</p>
        <p><strong>Hora:</strong> ${a.hora}</p>
      </div>
    `).join("");

  } catch (error) {
    console.error(error);
    lista.innerHTML = "<p>❌ Erro ao carregar os agendamentos.</p>";
  }
}

btnFiltrar.addEventListener("click", () => {
  const data = filtroData.value;
  carregarAgendamentos(data);
});

btnTodos.addEventListener("click", () => {
  filtroData.value = "";
  carregarAgendamentos();
});

// Carregar ao abrir a página
carregarAgendamentos();
