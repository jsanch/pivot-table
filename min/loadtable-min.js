function drawtable(e){var t="mydata.iadb.org",a=e,n="SELECT * LIMIT 50000",o="http://"+t+"/resource/"+a+".json?$query="+n,r="http://"+t+"/api/views/"+a+".json?admin=true";$.getJSON(encodeURI(r),function(a){$.get(o,function(n){$("#doc").empty().append($("<a>",{target:"_blank",href:"http://"+t+"/d/"+e+"/about?enable_dataset_landing_page=true"}).html("See Dataset"));var o=new Set,r=new Set;_.each(a.columns,function(e){"number"==e.dataTypeName&&r.add(e.fieldName),o.add(e.fieldName)}),_.each(n,function(e,t){var a=new Set;_.each(e,function(e,o){r.has(o)&&(n[t][o]=+n[t][o]),a.add(o)}),o.forEach(function(e){a.has(e)||(n[t][e]=0)})});var i=$.extend($.pivotUtilities.renderers,$.pivotUtilities.c3_renderers,$.pivotUtilities.d3_renderers,$.pivotUtilities.export_renderers);$("#output").pivotUI(n,{renderers:i},!0)})})}var a="";$(function(){console.log("hello"),$.get("http://mydata.iadb.org/api/views",function(e){e=_.where(e,{displayType:"table"}),a=e;var t=$("<optgroup>",{label:""});for(var n in e){var o=e[n];o.category!=t.attr("label")&&(t=$("<optgroup>",{label:o.category}).appendTo($("#csv"))),t.append($("<option>",{value:o.id}).text(o.name+" || "+o.downloadCount+" downloads"))}$("#csv").chosen(),$("#csv").bind("change",function(e){$("#output").empty().text("Loading...");var t=$(this).val();drawtable(t)})})});