var json = {
    actions: [
        {
            dbridge: {
                database: 'INSTRUCTION',
                name: ''
            }
        },
        {
            screen: {
                windowTitle: ''
            }
        }
    ]
};

var options = {
    mode: 'tree',
    modes: ['code', 'form', 'text', 'tree', 'view'], // allowed modes
    onError: function (err) {
        alert(err.toString());
    },
    onModeChange: function (newMode, oldMode) {
        console.log('Mode switched from', oldMode, 'to', newMode);
    }
};

// create the editor
var container = document.getElementById('jsoneditor');
var editor = new JSONEditor(container, options, json);

$('#applyButton').click(function () {
    $('#modalConfirm').modal('show');

    $('#modalCancelButton').click(function () {
        $('#modalConfirmButton').unbind('click');
    });

    $('#modalConfirmButton').click(function () {
        $('#modalConfirmButton').unbind('click');
        $.ajax({
            url: '/groovy/recieve',
            contentType: 'application/json',
            dataType: 'json',
            type: 'POST',
            data: JSON.stringify(editor.get())
        }).done(function (data) {
            console.log(data);
        });
    });

});

$('#reloadDbridge').click(function () {
    console.log('reload dbridge');
});

$('#addDbridgeAction').click(function () {
    var temp = editor.get();
    if (typeof (temp.actions) === 'undefined') {
        temp = {actions: []}
    }
    temp.actions.push(
        {
            dbridge: {
                database: 'INSTRUCTION',
                name: ''
            }
        }
    );
    editor.set(temp);
});