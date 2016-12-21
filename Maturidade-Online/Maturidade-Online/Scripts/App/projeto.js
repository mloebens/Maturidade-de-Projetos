
﻿/* Ao iniciar a página, carregar o 'select2' */
$(function () {
  $("#opcoes").select2();
});

let $divGrafico = $('#grafico');
let $botaoGrafico = $("#botao-grafico");
let $listagemSubtopicos = $('#container-subtopicos-dados');
let $opcoes = $('#opcoes');



/* Função para trazer lista de subtópicos quando há alteração na seleção das Características */
$opcoes.change(function () {
    let idsCaracteristicas = $(this).select2('data').map(c => parseInt(c.id));
    const urlGet = '/Subtopico/PesquisarSubtopicos';
    jQuery.ajaxSettings.traditional = true;
    $.get(urlGet, { idsCaracteristicas })
        .done(response => {
            $listagemSubtopicos.html(response);
        }).fail(function (resposta) {
            console.log(resposta)
        });
})

/* Função para criar o gráfico quando clicado no botão */
$botaoGrafico.click(function (event) {
    event.preventDefault();

    /* Verificar as checkbox's marcadas - SUBTOPICOS*/
    let dados = $('input:checked').map(function () {
        return $(this).val();
    }).get();

    /* Verificar as características selecionadas - CARACTERISTICAS */
    let idsCaracteristicas = $("#opcoes").select2('data').map(c => parseInt(c.id));

    /* Início do Ajax */
    jQuery.ajaxSettings.traditional = true;
    const urlGet = '/Projeto/ArrayParaGrafico';
    $.get(urlGet, { dados, idsCaracteristicas})
        .done(response => {

            /* Criar dois Arrays, um para guardar os TITULOS dos pilares e outro para guardar a PORCENTAGEM e depois pegar os valores */
            let labels = [];
            let dados = [];
            for (let i = 0; i < response[0].Pilares.length; i++) {
                labels.push(response[0].Pilares[i].Titulo);
                (response[0].Pilares[i].Percentual === null) ? dados.push(0) : dados.push(response[0].Pilares[i].Percentual);
            }

            /* Montar os dados da tabela do gráfico */
            var dadosTabela = {
                labels: labels,
                datasets: [
                    {
                        label: "Projeto",
                        backgroundColor: "rgba(179,181,198,0.2)",
                        borderColor: "rgba(179,181,198,1)",
                        pointBackgroundColor: "rgba(179,181,198,1)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(179,181,198,1)",
                        data: dados
                    }]
            };

            /* Criação do Gráfico em si */
            var ctx = document.getElementById("myChart");
            var myChart = new Chart(ctx, {
                type: 'radar',
                data: dadosTabela
            });
        }).fail(function (resposta) {
            console.log(resposta)
        });
})
