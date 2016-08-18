var a = '';
function drawtable(four_by_four) {
    var appToken = "fUi33kRhHMIFBkbOHEhoNscqj";
    var socrataDomain = "data.cdc.gov"
    var socrataDatasetId = four_by_four
    var socrataDatasetQuery = "SELECT * LIMIT 50000"
    var socrataQueryURL = "https://" + socrataDomain + "/resource/" + socrataDatasetId + ".json?$query=" + socrataDatasetQuery + "&&$$app_token=" + appToken;
    var socrataMetaQueryURL = "https://" + socrataDomain + "/api/views/" + socrataDatasetId + ".json?admin=true"
    $.getJSON(encodeURI(socrataMetaQueryURL), function(metadata) {
        $.get(socrataQueryURL, function(results) {
            $("#doc").empty().append(
                $("<a>", {
                    target: "_blank",
                    href: "https://" + socrataDomain + "/d/" + four_by_four
                }).html("See Dataset")
            );
            // Get number columns
            var allColumns = new Set();
            var numberTypeList = new Set();
            _.each(metadata.columns, function(col) {
                if (col.dataTypeName == 'number') {
                    numberTypeList.add(col.fieldName)
                }
                allColumns.add(col.fieldName);
            });
            // Cast number columns from string to int/number.
            _.each(results, function(row, i) {
                var tempRowCols = new Set();
                // Go through columns, checking if they are numbers, if so, then cast em.
                _.each(row, function(val, key) {
                    if (numberTypeList.has(key)) {
                        results[i][key] = +results[i][key];
                    }
                    tempRowCols.add(key);
                });
                // Check if all columns exist in each row.
                // Add missing columns with a zero val.
                allColumns.forEach(function(e) {
                    if (!tempRowCols.has(e)) {
                        results[i][e] = 0;
                    }
                });
            });
            var renderers = $.extend(
                $.pivotUtilities.renderers,
                $.pivotUtilities.c3_renderers,
                $.pivotUtilities.d3_renderers,
                $.pivotUtilities.export_renderers
            );
            $("#output").pivotUI(results, {
                renderers: renderers
            }, true);
        });
    });
}
$(function() {
    console.log("hello");
    $.get("https://mydata.iadb.org/api/views", function(dsetlist) {
        dsetlist = _.where(dsetlist,{displayType:"table"})
        a = dsetlist;

        var pkg = $("<optgroup>", {
            label: ""
        });
        for (var i in dsetlist) {
            var dataset = dsetlist[i];
            if (dataset.category != pkg.attr("label")) {
                pkg = $("<optgroup>", {
                    label: dataset.category
                }).appendTo($("#csv"));
            }
            pkg.append($("<option>", {
                value: dataset.id
            }).text(dataset.name + " || " + dataset.downloadCount + " downloads"));
        }
        $("#csv").chosen();
        $("#csv").bind("change", function(event) {
            $("#output").empty().text("Loading...")
            var four_by_four = $(this).val();
            drawtable(four_by_four);        });
    });
});
