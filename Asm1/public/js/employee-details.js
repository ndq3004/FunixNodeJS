$(document).ready(function() {
    var state = $('#formMode').val();
    var form = $('#formDetails');
    if(state == 'view'){
        let controls = form.find('.form-control');
        for(let ct of controls){
            ct.disabled = true
        }
    }

    $('#formDetails').submit(function(e){
        debugger
    })
} );