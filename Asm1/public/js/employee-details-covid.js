$(document).ready(function() {

    var numInjections = $('#injectionsContainerList').children().length;

    $('#injectionsContainer').on('click', 'button', function(event){
        let name = $(`<span class="input-group-text">Injection ${numInjections + 1}</span>`);
        let inputDate = $('<input type="date" aria-label="First name" placeholder="Date" class="form-control" name="injections[date]">');
        let inputNote = $('<input type="text" aria-label="Last name" placeholder="Note" class="form-control" name="injections[note]">');
        let inputGroup = $('<div class="input-group"></div>').append(name, inputDate, inputNote);

        $('#injectionsContainerList').append(inputGroup)       

    })

    var numInjections = $('#infectionsContainerList').children().length;

    $('#infectionsContainer').on('click', 'button', function(event){
        let name = $(`<span class="input-group-text">Infection ${numInjections + 1}</span>`);
        let inputFromDate = $('<input type="date" aria-label="First name" placeholder="Date" class="form-control" name="infections[fromDate]">');
        let inputToDate = $('<input type="date" aria-label="First name" placeholder="Date" class="form-control" name="infections[toDate]">');
        let inputNote = $('<input type="text" aria-label="Last name" placeholder="Note" class="form-control" name="infections[note]">');
        let inputGroup = $('<div class="input-group"></div>').append(name,  inputFromDate, inputToDate, inputNote);

        $('#infectionsContainerList').append(inputGroup)       

    })
});