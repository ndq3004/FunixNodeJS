$(document).ready(function() {
    var table = $('#example').DataTable( {
        scrollY:        "300px",
        scrollX:        true,
        scrollCollapse: true,
        paging:         false,
        fixedColumns:   {
            left: 1,
            right: 1
        },
        filter: false
    } );

    // $('#')

    $('#input-search-employee').on('input', function(e) {
        debugger
    })
} );