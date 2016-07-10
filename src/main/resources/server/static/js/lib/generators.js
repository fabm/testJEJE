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
    //var toTree = {core: {data: []}};
    //var map = {};
    //var counter = 0;

    /*
     var itemsRecursive = function (items, treeNode) {
     for (re in items) {
     var item = items[re];
     var iitems = item.menu.items;
     counter++;
     var currentTreeNonde = {
     'text': item.menu.title,
     'id': counter
     };
     map[counter] = item;
     treeNode.push(currentTreeNonde);
     if (typeof (iitems) === 'object') {
     currentTreeNonde.nodes = [];
     itemsRecursive(iitems, currentTreeNonde.nodes);
     }
     }
     };

     itemsRecursive(menu.all.menu.items, toTree.core.data);
    toTree.core.onNodeSelected = function (event, node) {
        menu.current = map[node.id];
    };
    $('#menu-tree').treeview(toTree.core);
     */
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
}
