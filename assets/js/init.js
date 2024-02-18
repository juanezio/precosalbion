let array = [];
let arrayLocais = [];
// Preenche select option itens
$.getJSON("./assets/res/items.json", function (data) {
    data.map(function (item) {
        try {
            let local = new Object();
            let delim = "@"
            let name = item.UniqueName
            let tier = name.split(delim).slice(1).join(delim) 
            local.name = "." + tier+ " " + item.LocalizedNames.enus;
            local.value = item.UniqueName;
            array.push(local);
        } catch (error) {
            console.log('Error: ' + error);
        }
    });
    $.each(array, function (i, item) {
        $('#items').append($('<option>', {
            value: item.value,
            text: item.name
        }));
    });
});

// Preenche select option lugares
$.getJSON("./assets/res/world.json", function (data) {
    data.map(function (item) {
        try {
            let local = new Object();
            if (!(item.UniqueName.includes('ISLAND'))) {
                local.name = item.UniqueName;
                local.value = item.UniqueName;
                arrayLocais.push(local);
            }
        } catch (error) {
            console.log('Error: ' + error);
        }
    });
    $.each(arrayLocais, function (i, item) {
        $('#locais').append($('<option>', {
            value: item.value,
            text: item.name
        }));
    });
});

$('#locais').select2();
$('#items').select2();

function pesquisa() {
    $('#encontrados').html('') ;


    let item = $("#items").children("option:selected").val();
    let qualidade = $("#qualidade").children("option:selected").val();
    let locais = "";
    $.each($("#locais option:selected"), function(){
        locais += $(this).val() + ',';
    });
    let URL = "https://www.albion-online-data.com/api/v2/stats/prices/"+item+'?locations='+locais+'&qualities='+qualidade;
    $.ajax({url: URL, success: function(result){
        
        console.log(result)

        result.map(function (r) {
            let componente = '<li class="list-group-item d-flex justify-content-between lh-condensed">'
            +'<div class="row"><div class="col-md-12"><h6 class="my-0"><strong>'+r.city+</strong></h6></div>'
            +'<div class="col-md-12">'
              
              +'<small id="sellMin" class="text-muted">Preço de Venda mínimo: '+r.sell_price_min+' || Data: '+r.sell_price_min_date+' UTC</small><br>'
              +'<small id="sellMax" class="text-muted">Preço de Venda máximo: '+r.sell_price_max+' || Data: '+r.sell_price_max_date+' UTC</small><br>'
              +'<small id="buyMin" class="text-muted">Preço de Compra mínimo: '+r.buy_price_min+' || Data: '+r.buy_price_min_date+'  UTC</small><br>'
              +'<small id="buyMax" class="text-muted">Preço de Compra máximo: '+r.buy_price_max+' || Data: '+r.buy_price_max_date+'  UTC</small>'
            +'</div></div>'
          +'</li>';

            $('#encontrados').append(componente);

        });
        
      }});   
}
