const investimentos = {
    "Bradesco": [
        { nome: "<strong>CDI/Selic</strong> - Simples Renda Fixa - <span style='color:#544CB1;'>11,06%</span>", juros: 11.06 },
        { nome: "<strong>Prefixado</strong> - Plus Renda Fixa - <span style='color:#544CB1;'>10,42%</span>", juros: 10.42 },
        { nome: "<strong>Multimercado</strong> - Macro Multimercado - <span style='color:#544CB1;'>9,34%</span>", juros: 9.34 }
    ],
    "Itaú": [
        { nome: "<strong>Diferenciado Crédito Privado</strong> - Renda Fixa - <span style='color:#544CB1;'>14,24%</span>", juros: 14.24 },
        { nome: "<strong>Itaú Global Dinamico</strong> - Renda Fixa Longo Prazo - <span style='color:#544CB1;'>10,72%</span>", juros: 10.72 },
        { nome: "<strong>Itaú IPCA Action</strong> - Renda Fixa - <span style='color:#544CB1;'>8,43%</span>", juros: 8.43 }
    ],
    "Banco do Brasil": [
        { nome: "<strong>Renda Fixa Simples</strong> - <span style='color:#544CB1;'>10,97%</span>", juros: 10.97 },
        { nome: "<strong>Multimercado</strong> - Macro Multimercado Absolute Vertex - <span style='color:#544CB1;'>15,77%</span>", juros: 15.77 },
        { nome: "<strong>Renda Fixa LP Prefixado</strong> - <span style='color:#544CB1;'>13,11%</span>", juros: 13.11 }
    ]
};


// Função para selecionar o Banco de Investimento

function updateInvestmentOptions() {
    var bankSelect = document.getElementById("bankSelect");
    var investmentOptions = document.getElementById("investmentOptions");
    var selectedBank = bankSelect.value;

    investmentOptions.innerHTML = "";

    if (selectedBank === "") {
        investmentOptions.innerHTML = "";
        return;
    }

    var options = investimentos[selectedBank];

    options.forEach(function (option, index) {
        var radioHtml = `<div>
            <input type="radio" id="investment${index}" name="investmentOption" value="${option.juros}" />
            <label for="investment${index}">${option.nome}</label>
        </div>`;
        investmentOptions.insertAdjacentHTML('beforeend', radioHtml);
    });
}


//Função para calcular e mostrar os resultados no lado direito

function calculateInvestment() {
    var investmentInput = parseFloat(document.getElementById("investmentInput").value.replace(/[^\d,-]/g, '').replace(',', '.')) || 0;
    var periodInput = parseInt(document.getElementById("periodInput").value) || 0;
    var selectedOption = document.querySelector('input[name="investmentOption"]:checked');

    if (!selectedOption || investmentInput <= 0 || periodInput <= 0) {
        alert("Por favor, preencha todos os campos corretamente e selecione uma opção de investimento.");
        return;
    }

    var interestRate = parseFloat(selectedOption.value);
    var principal = investmentInput;
    var totalInvestment = principal * (1 + (interestRate / 100) * (periodInput / 12));
    var rendimentoBruto = totalInvestment - principal;

    document.getElementById("periodResult").textContent = periodInput + " meses";
    document.getElementById("investmentResult").innerHTML = `
        <span style="margin-top: 30px; font-size: 50px; font-weight: bold; color: #544CB1;">
            R$ ${totalInvestment.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span><br><span style="font-size: 20px;">Valor total bruto</span>
    `;
    document.getElementById("returnResult").innerHTML = `
        <p style="margin-top: 80px;">Total investido: <span style="font-weight: bold;">R$ ${principal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
        <p>Rendimento bruto:<span style="color: #26B923;"> <strong>R$</strong> ${rendimentoBruto.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
        `;

    document.getElementById("resultBox").style.display = "block";
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

function updateCompostoInvestmentOptions() {
    var bankSelect = document.getElementById("compostoBankSelect");
    var investmentOptions = document.getElementById("compostoInvestmentOptions");
    var selectedBank = bankSelect.value; investmentOptions.innerHTML = "";

    if (selectedBank === "") {
        investmentOptions.innerHTML = "";
        return;
    }

    var options = investimentos[selectedBank];

    options.forEach(function (option, index) {
        var radioHtml = `<div class="investment-option">
            <input type="radio" id="compostoInvestment${index}" name="compostoInvestmentOption" value="${option.juros}" />
            <label for="compostoInvestment${index}">${option.nome}</label>
        </div>`;
        investmentOptions.insertAdjacentHTML('beforeend', radioHtml);
    });
}

function generateCompostoMonthlyInputs() {
    var periodInput = document.getElementById("compostoPeriodInput");
    var period = parseInt(periodInput.value);
    var monthlyInputsContainer = document.getElementById("compostoMonthlyInputsContainer");
    monthlyInputsContainer.innerHTML = "";
    if (!isNaN(period) && period > 0) {
        for (let i = 1; i <= period; i++) {
            var inputDiv = document.createElement('div');
            inputDiv.innerHTML = `<label for="compostoMonthlyInput${i}">Valor da aplicação mensal (Mês ${i})</label><input type="text" id="compostoMonthlyInput${i}" class="compostoMonthlyInput" placeholder="R$">`;

            // Adicionando manipulador de eventos para aceitar apenas números e formatar a moeda
            var inputElement = inputDiv.querySelector(`#compostoMonthlyInput${i}`);
            inputElement.addEventListener("input", function (event) {
                this.value = this.value.replace(/\D/g, ''); // Remove todos os caracteres exceto números
                formatCurrency(this);
            });

            monthlyInputsContainer.appendChild(inputDiv);
        }
    }
}


function calculateCompostoInvestment() {
    var periodInput = document.getElementById("compostoPeriodInput");
    var period = parseInt(periodInput.value);
    var bankSelect = document.getElementById("compostoBankSelect");
    var selectedBank = bankSelect.value;
    var selectedOption = document.querySelector('input[name="compostoInvestmentOption"]:checked');
    var principalInput = document.getElementById("compostoInvestmentInput").value.replace(/[^\d,-]/g, '').replace(',', '.');

    if (!selectedOption || !principalInput || !period) {
        alert("Por favor, preencha todos os campos e selecione uma opção de investimento.");
        return;
    }

    var interestRate = parseFloat(selectedOption.value);
    var principal = parseFloat(principalInput);
    var monthlyInputs = document.querySelectorAll('.compostoMonthlyInput');
    var totalInvested = principal;
    var totalAmount = principal * Math.pow((1 + interestRate / 100 / 12), period);

    monthlyInputs.forEach((input, index) => {
        var amount = parseFloat(input.value.replace(/[^\d,-]/g, '').replace(',', '.'));
        if (!isNaN(amount)) {
            totalInvested += amount;
            totalAmount += amount * Math.pow((1 + interestRate / 100 / 12), (period - index));
        }
    });

    document.getElementById("compostoPeriodResult").textContent = period + " meses";
    document.getElementById("compostoInvestmentResult").innerHTML = `<span style="margin-top: 30px; font-size: 50px; font-weight: bold; color: #544CB1;">R$ ${totalAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span><br><span style="font-size: 20px;">Valor total bruto</span>`;
    document.getElementById("compostoTotalInvested").innerHTML = `<p style="margin-top: 80px;">Total investido: <span style="font-weight: bold;">R$ ${totalInvested.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span></p>`;
    document.getElementById("compostoGrossReturn").innerHTML = `Rendimento bruto:<span style="color: #26B923;"> <strong>R$</strong> ${(totalAmount - totalInvested).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>`;

    // Mostrar resultados
    document.getElementById("compostoResultBox").style.display = "block";
}

// Adicionando manipulador de eventos para aceitar apenas números e formatar a moeda nos inputs de valor da aplicação
document.getElementById("investmentInput").addEventListener("input", function (event) {
    this.value = this.value.replace(/\D/g, ''); // Remove todos os caracteres exceto números
    formatCurrency(this);
});

document.getElementById("compostoInvestmentInput").addEventListener("input", function (event) {
    this.value = this.value.replace(/\D/g, ''); // Remove todos os caracteres exceto números
    formatCurrency(this);
});

document.getElementById("periodInput").addEventListener("input", function (event) {
    this.value = this.value.replace(/[^\d]/g, ''); // Remove todos os caracteres exceto números
});

document.getElementById("compostoPeriodInput").addEventListener("input", function (event) {
    this.value = this.value.replace(/[^\d]/g, ''); // Remove todos os caracteres exceto números
});


