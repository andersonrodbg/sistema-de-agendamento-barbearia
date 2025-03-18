class BarbeariaAgenda {
    constructor() {
        this.verificarResetDiario();
        this.horarios = JSON.parse(localStorage.getItem('agendamentos')) || [];
    }

    verificarResetDiario() {
        const hoje = new Date().toISOString().split('T')[0];
        const ultimaData = localStorage.getItem('ultimaData');

        if (ultimaData !== hoje) {
            localStorage.removeItem('agendamentos');
            localStorage.setItem('ultimaData', hoje);
        }
    }

    agendar(nome, data, horario) {
        // Verifica se já existe um agendamento para a mesma data e horário
        const agendamento = `${data} - ${horario} (${nome})`;
        const agendamentoExistente = this.horarios.find(item => item.startsWith(`${data} - ${horario}`));

        if (agendamentoExistente) {
            alert('Horário já agendado! Escolha outro.');
            return false;
        }

        this.horarios.push(agendamento);
        localStorage.setItem('agendamentos', JSON.stringify(this.horarios));
        this.atualizarLista();
        return true;
    }

    listarAgendamentos() {
        return this.horarios;
    }

    atualizarLista() {
        const lista = document.getElementById('lista-agendamentos');
        lista.innerHTML = '';
        this.horarios.forEach(agendamento => {
            const li = document.createElement('li');
            li.textContent = agendamento;
            lista.appendChild(li);
        });
    }
}

const agenda = new BarbeariaAgenda();
window.onload = () => agenda.atualizarLista();

document.getElementById('form-agendamento').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const data = document.getElementById('data').value;
    const horario = document.getElementById('horario').value;
    if (nome && data && horario) {
        agenda.agendar(nome, data, horario);
    }
});