$(document).ready(function () {
    var tableElement = $('#employeeList');
    tableElement.DataTable({
        scrollY: "400px",
        scrollX: true,
        scrollCollapse: true,
        paging: true,
        fixedColumns: {
            left: 1,
            right: 1
        },
        filter: false
    });

    let doFilterTable = function (inputValue) {
        var table, tr, td, i, txtValue;

        inputValue = inputValue.toLowerCase();

        table = document.getElementById("employeeList");
        tr = table.getElementsByTagName("tr");

        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td");
            let display = false;
            for (let j = 0; j < td.length - 1; j++) {
                if (td[j]) {
                    txtValue = td[j].textContent || td[j].innerText;
                }
                if (txtValue.toLowerCase().indexOf(inputValue) > -1) {
                    display = display || true;
                } else {
                    display = display || false;
                }
            }
            tr[i].style.display = display ? "" : "none";
        }
    }

    var updateTableInfo = function () {
        // $('#employeeList_info').innerText = `Showing 1 to ${27 }`
    }

    $('#input-search-employee').on('input', function (e) {
        doFilterTable(e.target.value);
        updateTableInfo();
    })

    $('.view-details-employee').on('click', function (e) {
        let parent = e.currentTarget.parentElement;
        let employeeId = parent.attributes['eid'] ? parent.attributes['eid'].value : "";
        if (employeeId) {
            location.href = "/admin/employee/details/" + employeeId;
        }
    })

    $('.edit-details-employee').on('click', function (e) {
        let parent = e.currentTarget.parentElement;
        let employeeId = parent.attributes['eid'] ? parent.attributes['eid'].value : "";
        if (employeeId) {
            location.href = "/admin/employee/edit/" + employeeId;
        }
    })

    $('.checkin-employee').on('click', function (e) {
        let parent = e.currentTarget.parentElement;
        let employeeId = parent.attributes['eid'] ? parent.attributes['eid'].value : "";

        if (employeeId) {
            // get last checkin checkout
            $.get('/api/admin/employee/lastRollUp/' + employeeId, (data, status, err) => {
                if (status == 'success') {
                    if (data) {
                        if (data.endTime) {
                            location.href = "/admin/employee/checkin/" + employeeId;
                        } else {
                            $('#dialog-message-text').html('You need to check out first!');
                            setTimeout(function(){
                                $("#dialog-message").dialog({
                                    modal: true,
                                    title: 'Warning!',
                                    buttons: {
                                        Ok: function () {
                                            $('#dialog-message-text').html('');
                                            $(this).dialog("close");
                                        }
                                    }
                                });
                            }, 100)
                        }
                    }
                } else if(status == 'nocontent'){
                    location.href = "/admin/employee/checkin/" + employeeId
                }
            }).catch(ex => {
                debugger
            })

        }
    })

    $('.checkout-employee').on('click', function (e) {
        let parent = e.currentTarget.parentElement;
        let employeeId = parent.attributes['eid'] ? parent.attributes['eid'].value : "";

        if (employeeId) {
            // get last checkin checkout
            $.get('/api/admin/employee/lastRollUp/' + employeeId, (data, status, err) => {
                if (status == 'success') {
                    if (data) {
                        if (!data.endTime) {
                            location.href = "/admin/employee/checkout/" + employeeId;
                        } else {
                            $('#dialog-message-text').html('You have not check in!');
                            setTimeout(function(){
                                $("#dialog-message").dialog({
                                    modal: true,
                                    title: 'Warning!',
                                    buttons: {
                                        Ok: function () {
                                            $('#dialog-message-text').html('');
                                            $(this).dialog("close");
                                        }
                                    }
                                });
                            }, 100)
                        }
                    }
                } else {
                    //show message
                }
            })

        }
    })
});