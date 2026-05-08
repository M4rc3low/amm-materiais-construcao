const materialCalculo = document.getElementById("material-calculo");
const larguraParedeInput = document.getElementById("largura-parede");
const alturaParedeInput = document.getElementById("altura-parede");
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

function montarResultado(titulo, linhas, observacao) {
  const lista = linhas.map((linha) => `<li>${linha}</li>`).join("");

  resultadoBox.innerHTML = `
    <strong>${titulo}</strong>
    <ul class="resultado-lista">${lista}</ul>
    <span>${observacao}</span>
    <small>Este cálculo é uma estimativa para orçamento inicial. Para compra final, confirme as medidas, recortes e tipo de aplicação com a AMM.</small>
  `;
}

function calcularMaterial() {
  const material = materialCalculo.value;
  const largura = Number(larguraParedeInput.value);
  const altura = Number(alturaParedeInput.value);
  const fatorPerda = Number(perdaSelect.value);

  if (!largura || largura <= 0 || !altura || altura <= 0) {
    resultadoBox.innerHTML = "Digite largura e altura válidas para calcular a parede.";
    return;
  }

  const area = largura * altura;
  const areaComPerda = area * fatorPerda;

  if (material === "drywall") {
    const areaChapa = 2.88;
    const chapas = arredondar(areaComPerda / areaChapa);
    const montantes = arredondar(largura / 0.60) + 1;
    const guias = arredondar((largura * 2) / 3);

    montarResultado(
      "Estimativa para drywall",
      [
        `Área da parede: ${formatarNumero(area)} m²`,
        `Área considerada com perda: ${formatarNumero(areaComPerda)} m²`,
        `Chapas de drywall 1,20 m x 2,40 m: ${chapas} unidade(s)`,
        `Montantes aproximados: ${montantes} peça(s)`,
        `Guias aproximadas de 3 m: ${guias} peça(s)`
      ],
      "Base usada: chapa padrão de 1,20 m x 2,40 m e montantes espaçados aproximadamente a cada 60 cm. Pode variar conforme vãos, portas, recortes, tipo de parede e projeto."
    );
  }

  if (material === "baiano") {
    const tijolosPorM2 = 25;
    const tijolos = arredondar(areaComPerda * tijolosPorM2);

    montarResultado(
      "Estimativa para tijolo baiano",
      [
        `Área da parede: ${formatarNumero(area)} m²`,
        `Área considerada com perda: ${formatarNumero(areaComPerda)} m²`,
        `Medida do tijolo: 11,5 x 14 x 24 cm`,
        `Consumo usado: aproximadamente ${tijolosPorM2} peças por m²`,
        `Quantidade estimada: ${tijolos} tijolo(s)`
      ],
      "Base usada: estimativa média por metro quadrado. A quantidade real muda conforme posição do tijolo, junta de argamassa, recortes, pilares, vãos de portas e janelas."
    );
  }

  if (material === "comum") {
    const tijolosPorM2 = 70;
    const tijolos = arredondar(areaComPerda * tijolosPorM2);

    montarResultado(
      "Estimativa para tijolinho comum",
      [
        `Área da parede: ${formatarNumero(area)} m²`,
        `Área considerada com perda: ${formatarNumero(areaComPerda)} m²`,
        `Medida do tijolinho: 9 x 18 x 4 cm`,
        `Consumo usado: aproximadamente ${tijolosPorM2} peças por m²`,
        `Quantidade estimada: ${tijolos} tijolinho(s)`
      ],
      "Base usada: estimativa média por metro quadrado. O consumo pode mudar conforme paginação, espessura da junta, recortes, perdas e forma de assentamento."
    );
  }
}

calcularBtn.addEventListener("click", calcularMaterial);
materialCalculo.addEventListener("change", () => {
  resultadoBox.innerHTML = "Informe as medidas e clique em calcular para ver a estimativa.";
});
