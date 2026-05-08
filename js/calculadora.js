const tipoServico = document.getElementById("tipo-servico");
const comprimentoInput = document.getElementById("comprimento");
const larguraInput = document.getElementById("largura");
const espessuraArea = document.getElementById("espessura-area");
const espessuraInput = document.getElementById("espessura");
const argamassaArea = document.getElementById("argamassa-area");
const tipoArgamassa = document.getElementById("tipo-argamassa");
const perdaSelect = document.getElementById("perda");
const calcularBtn = document.getElementById("calcular");
const resultadoBox = document.getElementById("resultado-calculo");

function arredondar(valor) {
  return Math.ceil(valor);
}

function formatarNumero(valor, casas = 2) {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas
  });
}

function atualizarCampos() {
  const servico = tipoServico.value;

  if (servico === "argamassa" || servico === "drywall") {
    espessuraArea.classList.add("field-hidden");
  } else {
    espessuraArea.classList.remove("field-hidden");
  }

  if (servico === "argamassa") {
    argamassaArea.classList.remove("field-hidden");
  } else {
    argamassaArea.classList.add("field-hidden");
  }

  resultadoBox.innerHTML = "Informe as medidas e clique em calcular para ver a estimativa.";
}

function validarMedidas(comprimento, largura, espessura, servico) {
  if (!comprimento || comprimento <= 0 || !largura || largura <= 0) {
    resultadoBox.innerHTML = "Digite comprimento e largura válidos para calcular a área.";
    return false;
  }

  if ((servico === "contrapiso" || servico === "areia") && (!espessura || espessura <= 0)) {
    resultadoBox.innerHTML = "Digite uma espessura válida em centímetros.";
    return false;
  }

  return true;
}

function montarResultado(titulo, linhas, observacao) {
  const lista = linhas.map((linha) => `<li>${linha}</li>`).join("");

  resultadoBox.innerHTML = `
    <strong>${titulo}</strong>
    <ul class="resultado-lista">${lista}</ul>
    <span>${observacao}</span>
    <small>Este cálculo é uma estimativa para orçamento inicial. Para compra final, confirme medidas, tipo de aplicação e rendimento do produto com a AMM.</small>
  `;
}

function calcularMaterial() {
  const servico = tipoServico.value;
  const comprimento = Number(comprimentoInput.value);
  const largura = Number(larguraInput.value);
  const espessuraCm = Number(espessuraInput.value);
  const fatorPerda = Number(perdaSelect.value);
  const area = comprimento * largura;

  if (!validarMedidas(comprimento, largura, espessuraCm, servico)) {
    return;
  }

  if (servico === "contrapiso") {
    const espessuraM = espessuraCm / 100;
    const volume = area * espessuraM;
    const volumeComPerda = volume * fatorPerda;

    const sacosCimento25 = arredondar(volumeComPerda * 7);
    const sacosAreia20 = arredondar(volumeComPerda / 0.012);

    montarResultado(
      "Estimativa para contrapiso",
      [
        `Área calculada: ${formatarNumero(area)} m²`,
        `Volume aproximado: ${formatarNumero(volumeComPerda)} m³ já com perda`,
        `Cimento 25 kg: ${sacosCimento25} saco(s)`,
        `Areia 20 kg: ${sacosAreia20} saco(s)`
      ],
      "Base prática: cálculo por volume com traço simples para estimativa inicial. A quantidade real muda conforme espessura final, nivelamento, umidade da areia, traço usado e perdas na obra."
    );
  }

  if (servico === "areia") {
    const espessuraM = espessuraCm / 100;
    const volume = area * espessuraM;
    const volumeComPerda = volume * fatorPerda;
    const sacosAreia20 = arredondar(volumeComPerda / 0.012);

    montarResultado(
      "Estimativa para areia ensacada",
      [
        `Área calculada: ${formatarNumero(area)} m²`,
        `Volume aproximado: ${formatarNumero(volumeComPerda)} m³ já com perda`,
        `Areia 20 kg: ${sacosAreia20} saco(s)`
      ],
      "Base prática: cálculo por volume. A quantidade pode mudar conforme compactação, umidade da areia e espessura real aplicada."
    );
  }

  if (servico === "argamassa") {
    const consumoKgM2 = tipoArgamassa.value === "dupla" ? 8 : 5;
    const pesoSaco = 20;
    const consumoTotal = area * consumoKgM2 * fatorPerda;
    const sacosArgamassa = arredondar(consumoTotal / pesoSaco);

    montarResultado(
      "Estimativa para argamassa",
      [
        `Área calculada: ${formatarNumero(area)} m²`,
        `Consumo usado: ${consumoKgM2} kg por m²`,
        `Consumo total aproximado: ${formatarNumero(consumoTotal)} kg`,
        `Argamassa 20 kg: ${sacosArgamassa} saco(s)`
      ],
      "Base prática: consumo médio por m². O rendimento muda conforme tamanho da peça, tipo de desempenadeira, base, dupla camada e recomendação do fabricante."
    );
  }

  if (servico === "drywall") {
    const areaComPerda = area * fatorPerda;
    const areaChapa = 2.88;
    const chapas = arredondar(areaComPerda / areaChapa);
    const montantes = arredondar(comprimento / 0.60) + 1;
    const guias = arredondar((comprimento * 2) / 3);

    montarResultado(
      "Estimativa para drywall",
      [
        `Área calculada: ${formatarNumero(area)} m²`,
        `Área com perda: ${formatarNumero(areaComPerda)} m²`,
        `Chapas de drywall 1,20 m x 2,40 m: ${chapas} unidade(s)`,
        `Montantes aproximados: ${montantes} peça(s)`,
        `Guias aproximadas de 3 m: ${guias} peça(s)`
      ],
      "Base prática: cálculo inicial por área de chapa. Projetos de drywall também precisam considerar estrutura, parafusos, fita, massa, recortes, portas, vãos e tipo de parede ou forro."
    );
  }
}

tipoServico.addEventListener("change", atualizarCampos);
calcularBtn.addEventListener("click", calcularMaterial);
atualizarCampos();
