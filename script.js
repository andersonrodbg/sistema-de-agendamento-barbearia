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
       
        const [hora, minuto] = horario.split(':').map(Number);
        const horarioAgendado = new Date(`${data}T${horario}`);

        const horarioInicio = new Date(`${data}T07:00`);
        const horarioFim = new Date(`${data}T19:30`);

        if (horarioAgendado < horarioInicio || horarioAgendado > horarioFim) {
            alert('Horário deve estar entre 07:00 e 19:30.');
            return false;
        }

        const agendamento = `${data} - ${horario} (${nome})`;
        const agendamentoExistente = this.horarios.find(item => item.startsWith(`${data} - ${horario}`));

        if (agendamentoExistente) {
            alert('Horário já agendado! Escolha outro.');
            return false;
        }

       
        const horarioMinimo = new Date(horarioAgendado.getTime() - 30 * 60000); 
        const horarioMaximo = new Date(horarioAgendado.getTime() + 30 * 60000); 

        const conflito = this.horarios.some(item => {
            const [dataItem, horaItem] = item.split(' - ');
            const [hora] = horaItem.split(' (');
            const horarioItem = new Date(`${dataItem}T${hora}`);
            return (horarioItem >= horarioMinimo && horarioItem <= horarioMaximo);
        });

        if (conflito) {
            alert('Horário não disponível! Escolha outro horário com intervalo de 30 minutos.');
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