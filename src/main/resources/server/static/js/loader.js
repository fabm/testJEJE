var jsonSchema;

require.config({
    baseUrl: "js"
});
require([
    'docson'
], function (docson) {
    
    $.getJSON("js/myschema.json", function (data) {
        jsonSchema = data;
        var container = document.getElementById('jsoneditor');
        var editor = new JSONEditor(container, options, {});
        docson.templateBaseUrl = "templates";
        docson.doc("doc", options.schema);
        require([
            'lib/bootstrap.min',
            'lib/bootstrap-treeview',
            'lib/jquery.ba-hashchange.min',
            'lib/generators'
        ], onHashChangeLoad);
    });


});