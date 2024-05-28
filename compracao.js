function onlyNumeric(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
}

function formatCurrency(input) {
    // Remove todos os caracteres que não são dígitos
    let value = input.value.replace(/\D/g, '');
    // Se não houver valor, retorne vazio

    if (value === '') {
        input.value = '';
        return;
    }

    // Converte para um número e divide por 100 para considerar as casas decimais
    let formattedValue = (parseInt(value, 10) / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    // Define o valor formatado no campo de entrada
    input.value = formattedValue;
}

// Adicionando evento de input para formatar a moeda
document.getElementById("investmentInput").addEventListener("input", function (event) {
    formatCurrency(this);
});

document.getElementById("compostoInvestmentInput").addEventListener("input", function (event) {
    formatCurrency(this);
});


function simularInvestimento() {
    // Obter os valores dos inputs e converter para números
    var valorAplicacao = parseFloat(document.getElementById("valorAplicacao").value.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    var aportesMensais = parseFloat(document.getElementById("aportesMensais").value.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    var periodoAplicacao = parseInt(document.getElementById("periodoAplicacao").value) || 0;

    // Calcular o total investido
    var totalInvestido = valorAplicacao + (aportesMensais * periodoAplicacao);

    // Exibir o total investido
    document.getElementById("totalInvestido").textContent = totalInvestido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // Calcular o valor líquido de resgate (exemplo)
    var valorResgate = totalInvestido * 1.1; // Exemplo: 10% de lucro sobre o total investido

    // Remover a classe de ocultação dos resultados
    var resultadosContainer = document.getElementById('investimentosContainer');
    resultadosContainer.classList.remove('resultado-oculto');

    // Exibir o valor líquido de resgate
    document.getElementById("valorResgate").textContent = valorResgate.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // Definir os valores dos investimentos com percentuais reais
    var investimentos = {
        'Tesouro IPCA+': totalInvestido * 0.11,
        'Tesouro Prefixado': totalInvestido * 0.10,
        'CDB': totalInvestido * 0.09,
        'LCI e LCA': totalInvestido * 0.08,
        'Fundo DI': totalInvestido * 0.07,
        'Tesouro Selic': totalInvestido * 0.06,
        'Poupança': totalInvestido * 0.045,
        'Correção pelo IPCA': totalInvestido * 0.035
    };

    // Encontrar o maior e o menor valor de investimento
    var maxValor = Math.max(...Object.values(investimentos));
    var minValor = Math.min(...Object.values(investimentos));
    var tamanhoMaximo = 450; // Tamanho máximo dos retângulos (largura em pixels)
    var tamanhoMinimo = 350; // Tamanho mínimo dos retângulos (largura em pixels)
    var tamanhoRange = tamanhoMaximo - tamanhoMinimo;

    // Limpar investimentos anteriores
    var investimentosContainer = document.getElementById('investimentosContainer');
    investimentosContainer.innerHTML = '';

    // Criar elementos para cada investimento
    for (const investimento in investimentos) {
        var tamanho = tamanhoMinimo + (investimentos[investimento] - minValor) / (maxValor - minValor) * tamanhoRange;
        var investimentoElement = document.createElement('div');
        investimentoElement.classList.add('investimento');
        investimentoElement.style.width = tamanho + "px";
        investimentoElement.textContent = investimento + ": " + investimentos[investimento].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        investimentosContainer.appendChild(investimentoElement);
    }

    // Remover a classe de ocultação dos elementos do lado direito
    var ladoDireito = document.querySelector('.right-side');
    ladoDireito.classList.remove('resultado-oculto');
}
