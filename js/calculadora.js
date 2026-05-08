const materialSelect = document.getElementById("material");
const areaInput = document.getElementById("area");
const espessuraGroup = document.getElementById("espessura-group");
const espessuraInput = document.getElementById("espessura");
const calcularBtn = document.getElementById("calcular");
const resultadoBox = document.getElementById("resultado-calculo");

function atualizarCampos() {
  const material = materialSelect.value;

  if (material === "areia") {
    espessuraGroup.style.display = "block";
  } else {
    espessuraGroup.style.display = "none";
  }

  resultadoBox.innerHTML = "Selecione o material, informe a medida e clique em calcular.";
}

function arredondar(valor) {
  return Math.ceil(valor);
}

function calcularMaterial() {
  const material = materialSelect.value;
  const area = Number(areaInput.value);
  const espessura = Number(espessuraInput.value);

  if (!material) {
    resultadoBox.innerHTML = "Escolha primeiro o tipo de material.";
    return;
  }

  if (!area || area <= 0) {
    resultadoBox.innerHTML = "Digite uma medida válida em metros quadrados.";
    return;
  }

  let quantidade = 0;
  let texto = "";
  let observacao = "";

  if (material === "cimento") {
    quantidade = arredondar(area / 1.8);
    texto = `Para aproximadamente ${area} m², a estimativa é de ${quantidade} saco(s) de cimento de 25 kg.`;
    observacao = "Base usada: estimativa simples para pequenos serviços. O consumo real muda conforme o tipo de aplicação, traço da massa, espessura e perda na obra.";
  }

  if (material === "areia") {
    if (!espessura || espessura <= 0) {
      resultadoBox.innerHTML = "Para areia, informe também a espessura aproximada em centímetros.";
      return;
    }

    const volumeM3 = area * (espessura / 100);
    const sacos20kg = arredondar(volumeM3 / 0.012);
    quantidade = sacos20kg;
    texto = `Para ${area} m² com ${espessura} cm de espessura, a estimativa é de ${quantidade} saco(s) de areia de 20 kg.`;
    observacao = "Base usada: cálculo aproximado por volume. Pode variar conforme compactação, umidade da areia e perda no transporte/aplicação.";
  }

  if (material === "argamassa") {
    quantidade = arredondar(area / 4);
    texto = `Para aproximadamente ${area} m², a estimativa é de ${quantidade} saco(s) de argamassa.`;
    observacao = "Base usada: rendimento médio aproximado de 4 m² por saco. O consumo muda conforme tamanho da peça, desempenadeira, nivelamento da base e tipo de argamassa.";
  }

  if (material === "drywall") {
    const chapas = arredondar(area / 2.88);
    texto = `Para aproximadamente ${area} m², a estimativa inicial é de ${chapas} chapa(s) de drywall.`;
    observacao = "Base usada: chapa padrão aproximada de 1,20 m x 2,40 m. Pode ser necessário considerar estrutura metálica, parafusos, massa, fita e recortes.";
  }

  resultadoBox.innerHTML = `
    <strong>${texto}</strong>
    <span>${observacao}</span>
    <small>Estimativa para orientação inicial. Para compra final, confirme as medidas e o tipo de serviço com a AMM.</small>
  `;
}

materialSelect.addEventListener("change", atualizarCampos);
calcularBtn.addEventListener("click", calcularMaterial);
