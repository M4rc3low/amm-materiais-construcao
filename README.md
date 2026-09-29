# AMM Materiais de Construção

<!-- portfolio-cover:start -->
<div align="center">
  <img src="https://raw.githubusercontent.com/M4rc3low/M4rc3low.github.io/main/assets/projects/amm-materiais.svg" alt="Capa conceitual ilustrativa do projeto amm-materiais-construcao" width="920">
</div>

> **Capa visual ilustrativa:** representa o conceito do projeto; não é uma captura da aplicação em execução. Veja a [galeria visual completa](https://m4rc3low.github.io/projetos.html).
<!-- portfolio-cover:end -->

![HTML5](https://img.shields.io/badge/HTML5-static_site-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-responsive-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?logo=javascript&logoColor=111)
![Docker](https://img.shields.io/badge/Docker-Nginx-2496ED?logo=docker&logoColor=white)
![CI](https://img.shields.io/badge/GitHub_Actions-CI-2088FF?logo=githubactions&logoColor=white)

Site da **AMM Materiais de Construção**, desenvolvido para fortalecer a presença digital da loja e transformar necessidades reais do negócio em soluções web simples, úteis e fáceis de manter.

## O que o projeto entrega

- Página institucional e apresentação da loja
- Seções de produtos, serviços e contato
- Integração de atendimento via WhatsApp
- Layout responsivo para desktop e dispositivos móveis
- Calculadora de materiais para drywall
- Calculadora de tijolos
- Domínio personalizado via `CNAME`
- Empacotamento em container com Nginx
- Validação automática da estrutura por smoke test
- CI com GitHub Actions para validar o projeto e o build Docker

## Stack técnica

| Camada | Tecnologia |
| --- | --- |
| Interface | HTML5 |
| Estilização | CSS3 |
| Interações e calculadoras | JavaScript |
| Validação | Node.js + smoke test |
| Container | Docker |
| Servidor web no container | Nginx Alpine |
| Integração contínua | GitHub Actions |

> Este projeto é uma aplicação web estática. Ele **não utiliza React, Vite ou Tailwind CSS** na versão atual.

## Estrutura principal

```text
.
├── index.html
├── calculadora-drywall.html
├── calculadora-tijolos.html
├── css/
├── js/
├── img/
├── scripts/
│   └── smoke-test.mjs
├── .github/workflows/
│   └── ci.yml
├── Dockerfile
├── CNAME
└── package.json
```

## Como executar localmente

```bash
git clone https://github.com/M4rc3low/amm-materiais-construcao.git
cd amm-materiais-construcao
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

### Executar com Docker

```bash
docker build -t amm-materiais-construcao .
docker run --rm -p 8080:80 amm-materiais-construcao
```

Depois acesse `http://localhost:8080`.

## Validação

O repositório possui um smoke test que verifica arquivos essenciais e conteúdo mínimo esperado da página:

```bash
npm test
```

No GitHub Actions, cada push ou pull request para `main` executa o teste e valida também a construção da imagem Docker.

## Roadmap

- [ ] Evoluir o catálogo de produtos
- [ ] Adicionar busca e filtros de produtos
- [ ] Integrar estoque e disponibilidade
- [ ] Criar painel administrativo
- [ ] Ampliar as calculadoras de materiais
- [ ] Adicionar testes de interface
- [ ] Melhorar métricas de desempenho e acessibilidade

## Valor profissional

Além de desenvolvimento web, este projeto demonstra aplicação de tecnologia em um **negócio real**: transformar necessidades operacionais e comerciais em recursos digitais, versionar a solução, validá-la automaticamente e prepará-la para execução reproduzível com Docker.

## Autor

Desenvolvido por Marcelo Gomes.
