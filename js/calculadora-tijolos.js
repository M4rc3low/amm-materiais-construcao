const tipoTijolo = document.getElementById('tipo-tijolo');
const botaoCalcular = document.getElementById('calcular-tijolos');
const resultado = document.getElementById('resultado-tijolos');

function numero(id) {
  const valor = Number(document.getElementById(id).value);
  return Number.isFinite(valor) ? valor : 0;
}

function texto(id) {
  return document.getElementById(id).value;
}

function arredondar(valor) {
  return Math.ceil(valor);
}

function formatar(valor, casas = 2) {
  return valor.toLocaleString('pt-BR', {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas
  });
}

function montarResultado(titulo, linhas, observacao) {
  const itens = linhas.map((linha) => `<li>${linha}</li>`).join('');

  resultado.innerHTML = `
    <strong>${titulo}</strong>
    <ul>${itens}</ul>
    <span>${observacao}</span>
    <small>Estimativa orientativa. A quantidade final pode variar conforme medidas reais, recortes, vãos, espessura das juntas, forma de assentamento, perdas, paginação da parede e avaliação do profissional responsável. Confirme antes da compra.</small>
  `;
}

function calcularTijolos() {
  const tipo = texto('tipo-tijolo');
  const larguraParede = numero('largura-parede');
  const alturaParede = numero('altura-parede');
  const perda = Number(texto('perda'));

  if (larguraParede <= 0 || alturaParede <= 0) {
    resultado.innerHTML = 'Informe largura e altura válidas para calcular a parede.';
    return;
  }

  const qtdPortas = numero('qtd-portas');
  const larguraPorta = numero('largura-porta');
  const alturaPorta = numero('altura-porta');
  const areaPortas = qtdPortas * larguraPorta * alturaPorta;

  const qtdJanelas = numero('qtd-janelas');
  const larguraJanela = numero('largura-janela');
  const alturaJanela = numero('altura-janela');
  const areaJanelas = qtdJanelas * larguraJanela * alturaJanela;

  const areaBruta = larguraParede * alturaParede;
  const descontos = areaPortas + areaJanelas;
  const areaLiquida = Math.max(areaBruta - descontos, 0);
  const areaComPerda = areaLiquida * perda;

  const dados = {
    baiano: {
      nome: 'Tijolo baiano 11,5 x 14 x 24 cm',
      consumo: 25,
      medida: '11,5 x 14 x 24 cm'
    },
    comum: {
      nome: 'Tijolinho comum 9 x 18 x 4 cm',
      consumo: 70,
      medida: '9 x 18 x 4 cm'
    }
  };

  const item = dados[tipo];
  const quantidadePecas = arredondar(areaComPerda * item.consumo);
  const pacotes10 = arredondar(quantidadePecas / 10);
  const totalPecasPacote = pacotes10 * 10;

  montarResultado(
    `Estimativa para ${item.nome}`,
    [
      `Área bruta da parede: ${formatar(areaBruta)} m²`,
      `Desconto de portas e janelas: ${formatar(descontos)} m²`,
      `Área líquida considerada: ${formatar(areaLiquida)} m²`,
      `Área com margem de perda: ${formatar(areaComPerda)} m²`,
      `Medida do tijolo: ${item.medida}`,
      `Consumo usado: aproximadamente ${item.consumo} peça(s) por m²`,
      `Quantidade estimada: ${quantidadePecas} peça(s)`,
      `Pacotes com 10 unidades: ${pacotes10} pacote(s)`,
      `Total comprado em pacotes: ${totalPecasPacote} peça(s)`
    ],
    'Base usada: estimativa média por metro quadrado. O consumo pode mudar conforme junta, paginação, recortes, perdas e forma de assentamento.'
  );
}

botaoCalcular.addEventListener('click', calcularTijolos);
tipoTijolo.addEventListener('change', () => {
  resultado.innerHTML = 'Preencha os dados da parede e clique em calcular.';
});
