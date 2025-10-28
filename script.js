document.getElementById("form-agendamento").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nomeCliente = document.getElementById("nomeCliente").value;
  const servico = document.getElementById("servico").value;
  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;

  const agendamento = { nomeCliente, servico, data, hora };

  try {
    const response = await fetch("http://localhost:8080/agendamentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(agendamento)
    });

    if (response.ok) {
      document.getElementById("mensagem").textContent = "✅ Agendamento realizado com sucesso!";
      document.getElementById("form-agendamento").reset();
    } else {
      document.getElementById("mensagem").textContent = "❌ Erro ao agendar. Tente novamente.";
    }
  } catch (error) {
    document.getElementById("mensagem").textContent = "⚠️ Erro de conexão com o servidor.";
    console.error(error);
  }
});
