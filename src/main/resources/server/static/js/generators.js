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

$.getJSON( "js/myschema.json", function(data) {
    // create the editor
    options.schema = data;
    var container = document.getElementById('jsoneditor');
    var editor = new JSONEditor(container, options,{});
    require.config({ baseUrl: "js"});
    require(['docson','lib/jquery'],function(docson){
        docson.templateBaseUrl="templates";
        docson.doc("doc", options.schema);
    });
});






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

var menu = {
    refreshMenuRecursive: function (items, treeNode) {
        for (re in items) {
            var item = items[re];
            var iitems = item.menu.items;
            menu.counter++;
            var currentTreeNonde = {
                'text': item.menu.title,
                'id': menu.counter
            };
            menu.map[menu.counter] = item;
            treeNode.push(currentTreeNonde);
            if (typeof (iitems) === 'object') {
                currentTreeNonde.nodes = [];
                menu.refreshMenuRecursive(iitems, currentTreeNonde.nodes);
            }
        }

    },
    refreshMenu: function (data) {
        menu.counter = 0;
        var toTree = {data: []};
        menu.map = {};
        menu.refreshMenuRecursive(menu.all.menu.items,toTree.data);
        toTree.onNodeSelected = function (event, node) {
            menu.current = menu.map[node.id];
        };
        delete menu.counter;
        $('#menu-tree').treeview(toTree);
    },
    current: null,
    all: null
};


$.ajax({
    url: '/groovy/jsonmenu',
    contentType: 'application/json',
    dataType: 'json',
    type: 'GET'
}).done(function (data) {
    menu.all = data;
    menu.refreshMenu();
});

var testAddSubMenu = function () {
    if (typeof(menu.current.menu.items) === 'undefined') {
        menu.current.menu.items = [];
    }
    menu.current.menu.items.push({menu:{title:'testMenu'}});
};

var updateMenu = function () {
    $.ajax({
        url: '/groovy/updatemenu',
        contentType: 'application/json',
        type: 'POST',
        data: JSON.stringify(menu.all)
    }).done(function (data) {
        console.log(data);
    });
};

var doms = {};

var loadCoolButtons = function(id){
    $.ajax({
        url: '/static/panels/testPanel.html',
        type: 'GET'
    }).done(function (data) {
        var dt = $(data);

        doms = dt;

        $('#loadMenu').html(dt.find(id).html());
        dt.remove();
    });
};
var removeCoolButtons = function(){
    $('#loadMenu').html('');
};

$(function(){

    $(window).hashchange( function(){
        var hash = location.hash;

        document.title = 'The hash is ' + ( hash.replace( /^#/, '' ) || 'blank' ) + '.';

        if(hash === '#test1'){
            loadCoolButtons('#tpl-1');
        }else if(hash === '#test2'){
            loadCoolButtons('#tpl-2');
        }else{
            removeCoolButtons();
        }

    });

    //$(window).hashchange();

});