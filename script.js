// Verifica se o DOM foi carregado
$(document).ready(function() {
    // Adiciona evento ao formulário para adicionar tarefas
    $('#form-add-task').submit(function(event) {
        event.preventDefault(); // Impede o comportamento padrão do formulário

        // Obtém o valor da tarefa
        const taskName = $('#task-name').val();

        if (taskName.trim() !== '') {
            // Adiciona a tarefa à lista com animação
            $('#task-list').append(`<li class='task-item'>${taskName}</li>`).children(':last').hide().fadeIn(500);

            // Limpa o campo de texto
            $('#task-name').val('');
        } else {
            alert('Por favor, insira uma tarefa válida!');
        }
    });

    // Adiciona evento de clique aos itens da lista
    $(document).on('click', '.task-item', function() {
        $(this).toggleClass('completed');
    });

    // Adiciona um botão para limpar a lista
    $('#clear-tasks').click(function() {
        $('#task-list').fadeOut(500, function() {
            $(this).empty().show();
        });
    });
});
