function drawtable(e){var t="fUi33kRhHMIFBkbOHEhoNscqj",a="mydata.iadb.org",n=e,o="SELECT * LIMIT 50000",i="https://"+a+"/resource/"+n+".json?$query="+o+"&&$$app_token="+t,r="https://"+a+"/api/views/"+n+".json?admin=true";$.getJSON(encodeURI(r),function(t){$.get(i,function(n){$("#doc").empty().append($("<a>",{target:"_blank",href:"https://"+a+"/d/"+e}).html("See Dataset"));var o=new Set,i=new Set;_.each(t.columns,function(e){"number"==e.dataTypeName&&i.add(e.fieldName),o.add(e.fieldName)}),_.each(n,function(e,t){var a=new Set;_.each(e,function(e,o){i.has(o)&&(n[t][o]=+n[t][o]),a.add(o)}),o.forEach(function(e){a.has(e)||(n[t][e]=0)})});var r=$.extend($.pivotUtilities.renderers,$.pivotUtilities.c3_renderers,$.pivotUtilities.d3_renderers,$.pivotUtilities.export_renderers);$("#output").pivotUI(n,{renderers:r},!0)})})}var a="";$(function(){console.log("hello"),$.get("https://mydata.iadb.org/api/views",function(e){e=_.where(e,{displayType:"table"}),a=e;var t=$("<optgroup>",{label:""});for(var n in e){var o=e[n];o.category!=t.attr("label")&&(t=$("<optgroup>",{label:o.category}).appendTo($("#csv"))),t.append($("<option>",{value:o.id}).text(o.name+" || "+o.downloadCount+" downloads"))}$("#csv").chosen(),$("#csv").bind("change",function(e){$("#output").empty().text("Loading...");var t=$(this).val();drawtable(t)})})});