const form = document.getElementById('form-atividade')
const imgAprovado = '<img src=./imagens/aprovado.png alt="Emoji celebrando" />'
const imgReprovado = '<img src=./imagens/reprovado.png alt="Emoji decepcionado" />'
const atividades = []
const notas = []
const spanAprovado = '<span class="result approved">Aprovado</span>'
const spanReprovado = '<span class="result disapproved">Reprovado</span>'
const notaMinima = parseFloat(prompt("Informe a nota mínima para aprovação"))
const inputNomeAtividade = document.getElementById('nome-atividade')
const inputNotaAtividade = document.getElementById('nota-atividade')

let linhas = ''

function verificaForm () {
    if (atividades.includes(inputNomeAtividade.value)) {
        inputNomeAtividade.style.borderBottom = '2px solid #d31616'
        inputNomeAtividade.style.outlineColor = '#d31616'
    } else {
        inputNomeAtividade.style.border = ''
        inputNomeAtividade.style.outline = ''
    }

    if (inputNotaAtividade.value > 10 || inputNotaAtividade.value < 0)
    {
        inputNotaAtividade.style.borderBottom = '2px solid #d31616'
        inputNotaAtividade.style.outlineColor = '#d31616'
    } else {
        inputNotaAtividade.style.border = ''
        inputNotaAtividade.style.outlineColor = ''
    }
}

function adicionaLinha () {
    notaValue = parseFloat(inputNotaAtividade.value).toFixed(2)

    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade ${inputNomeAtividade.value} já foi inserida`)
    } else {
        let linha = '<tr>'
        linha += `<td>${inputNomeAtividade.value}</td>`
        linha += `<td>${notaValue}</td>`
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`
        linha += '</tr>'
    
        linhas += linha
    
        atividades.push(inputNomeAtividade.value)
        notas.push(parseFloat(inputNotaAtividade.value))

        inputNomeAtividade.value = ''
        inputNotaAtividade.value = ''
    }
}

function atualizaTabela () {
    const corpoTabela = document.querySelector('tbody')
    corpoTabela.innerHTML = linhas
}

function calculaMediaFinal () {
    let somaNotas = 0

    for (let i = 0; i < notas.length; i++) {
        somaNotas += notas[i]
    }

    let mediaFinal = somaNotas / notas.length
    return mediaFinal.toFixed(2)
}

function atualizaMediaFinal () {
    const mediaFinal = calculaMediaFinal()

    document.getElementById('media-final-valor').innerHTML = mediaFinal
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado
}

form.addEventListener('submit', function(e) {
    e.preventDefault()

    adicionaLinha()
    atualizaTabela()
    calculaMediaFinal()
    atualizaMediaFinal()
})

form.addEventListener('keyup', function(e){
    verificaForm()
})

