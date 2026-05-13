const tipoProjeto = document.getElementById('tipo-projeto');
const camposParede = document.getElementById('campos-parede');
const camposTeto = document.getElementById('campos-teto');
const notaProjeto = document.getElementById('nota-projeto');
const resultado = document.getElementById('resultado-drywall');
const botaoCalcular = document.getElementById('calcular-drywall');

function numero(id) {
  const valor = Number(document.getElementById(id).value);
  return Number.isFinite(valor) ? valor : 0;
}

function texto(id) {
  return document.getElementById(id).value;
}

function inteiroParaCima(valor) {
  return Math.ceil(valor);
}

function formatar(valor, casas = 2) {
  return valor.toLocaleString('pt-BR', {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas
  });
}

function trocarTipoProjeto() {
  if (tipoProjeto.value === 'parede') {
    camposParede.classList.remove('field-hidden');
    camposTeto.classList.add('field-hidden');
    notaProjeto.textContent = 'Para parede, informe comprimento e altura. Se houver porta ou janela, a calculadora desconta a área.';
  } else {
    camposParede.classList.add('field-hidden');
    camposTeto.classList.remove('field-hidden');
    notaProjeto.textContent = 'Para teto, informe largura e comprimento do ambiente. A calculadora estima chapas e estrutura básica de forro com perfil F-530.';
  }

  resultado.innerHTML = 'Preencha os dados do projeto e clique em calcular.';
}

function montarResultado(titulo, linhas, observacao) {
  const itens = linhas.map((linha) => `<li>${linha}</li>`).join('');

  resultado.innerHTML = `
    <strong>${titulo}</strong>
    <ul>${itens}</ul>
    <span>${observacao}</span>
    <small>Estimativa orientativa. A quantidade final pode variar conforme medidas reais, recortes, perdas, tipo de instalação, modulação da estrutura, marca dos produtos e avaliação do profissional responsável. Confirme antes da compra.</small>
  `;
}

function calcularParede() {
  const comprimento = numero('comprimento-parede');
  const altura = numero('altura-parede');
  const faces = Number(texto('faces-parede'));
  const isolamento = texto('isolamento') === 'sim';
  const perda = Number(texto('perda'));

  if (comprimento <= 0 || altura <= 0) {
    resultado.innerHTML = 'Informe comprimento e altura válidos para calcular a parede.';
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

  const areaBruta = comprimento * altura;
  const areaLiquidaUmaFace = Math.max(areaBruta - areaPortas - areaJanelas, 0);
  const areaChapeada = areaLiquidaUmaFace * faces;
  const areaComPerda = areaChapeada * perda;

  const areaChapa = 2.88;
  const chapas = inteiroParaCima(areaComPerda / areaChapa);
  const guias3m = inteiroParaCima((comprimento * 2) / 3);
  const montantes3m = inteiroParaCima((comprimento / 0.60) + 1);
  const parafusos = inteiroParaCima(areaComPerda * 25);
  const massaKg = inteiroParaCima(areaComPerda * 0.45);
  const fitaM = inteiroParaCima(areaComPerda * 1.4);
  const isolamentoM2 = isolamento ? inteiroParaCima(areaLiquidaUmaFace * perda) : 0;

  const linhas = [
    `Área bruta: ${formatar(areaBruta)} m²`,
    `Desconto de portas e janelas: ${formatar(areaPortas + areaJanelas)} m²`,
    `Área líquida de uma face: ${formatar(areaLiquidaUmaFace)} m²`,
    `Área total de chapas: ${formatar(areaComPerda)} m² já com perda`,
    `Chapas de drywall 1,20 m x 2,40 m: ${chapas} unidade(s)`,
    `Guias de 3 m: ${guias3m} peça(s)`,
    `Montantes de 3 m: ${montantes3m} peça(s)`,
    `Parafusos: aproximadamente ${parafusos} unidade(s)`,
    `Massa para drywall: aproximadamente ${massaKg} kg`,
    `Fita para juntas: aproximadamente ${fitaM} m`
  ];

  if (isolamento) {
    linhas.push(`Isolamento: aproximadamente ${isolamentoM2} m²`);
  }

  montarResultado(
    'Estimativa para parede de drywall',
    linhas,
    'Base usada: cálculo por área de parede, chapas de 1,20 m x 2,40 m, montantes a cada 60 cm e consumo médio de acessórios.'
  );
}

function calcularTeto() {
  const largura = numero('largura-teto');
  const comprimento = numero('comprimento-teto');
  const perda = Number(texto('perda'));

  if (largura <= 0 || comprimento <= 0) {
    resultado.innerHTML = 'Informe largura e comprimento válidos para calcular o teto.';
    return;
  }

  const area = largura * comprimento;
  const areaComPerda = area * perda;
  const perimetro = (largura + comprimento) * 2;
  const areaChapa = 2.88;

  const chapas = inteiroParaCima(areaComPerda / areaChapa);
  const perfilF530 = inteiroParaCima((areaComPerda * 2.2) / 3);
  const perfilPerimetral = inteiroParaCima(perimetro / 3);
  const tirantes = inteiroParaCima(areaComPerda * 1.4);
  const suportes = tirantes;
  const parafusos = inteiroParaCima(areaComPerda * 25);
  const massaKg = inteiroParaCima(areaComPerda * 0.45);
  const fitaM = inteiroParaCima(areaComPerda * 1.2);

  montarResultado(
    'Estimativa para teto de drywall',
    [
      `Área do teto: ${formatar(area)} m²`,
      `Área considerada com perda: ${formatar(areaComPerda)} m²`,
      `Chapas de drywall 1,20 m x 2,40 m: ${chapas} unidade(s)`,
      `Perfis F-530 de 3 m: ${perfilF530} peça(s)`,
      `Perfil perimetral/tabica de 3 m: ${perfilPerimetral} peça(s)`,
      `Tirantes: aproximadamente ${tirantes} unidade(s)`,
      `Suportes niveladores: aproximadamente ${suportes} unidade(s)`,
      `Parafusos: aproximadamente ${parafusos} unidade(s)`,
      `Massa para drywall: aproximadamente ${massaKg} kg`,
      `Fita para juntas: aproximadamente ${fitaM} m`
    ],
    'Base usada: cálculo por área de teto, chapas de 1,20 m x 2,40 m, perfil F-530, estrutura metálica básica e consumo médio de acessórios.'
  );
}

function calcular() {
  if (tipoProjeto.value === 'parede') {
    calcularParede();
  } else {
    calcularTeto();
  }
}

tipoProjeto.addEventListener('change', trocarTipoProjeto);
botaoCalcular.addEventListener('click', calcular);
trocarTipoProjeto();
