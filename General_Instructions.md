
<!-- modal PROVADOR VIRTUAl Eufloria -->
    <div onclick="document.getElementById('the-size-picker-modal').style.display = 'none'" id="the-size-picker-modal" style="display: none; position: fixed; z-index: 40; left: 0px; top: 0px; width: 100%; height: 100%; overflow: auto; background-color: rgba(0, 0, 0, 0.4);">
        <div id="the-size-picker-modal-content" style="display:flex; flex-direction:row; height: 100%;
        padding: 15px;">
            {% set encodedURL = product.images[0].full|url_encode %}

        <iframe src="http://localhost:3000/{{ encodedURL }}?categoria={{ product.category_name }}" width="100%" height="90%"></iframe>
      </div>
    </div>
<!-- modal PROVADOR VIRTUAl Eufloria -->

<!-- botao PROVADOR VIRTUAl -->
    <div><div style="margin: 10px 100px; align-items: center; max-height: 40px;" onclick="document.getElementById('the-size-picker-modal').style.display='flex'">
        <div style="max-height:40px;display: flex;justify-content: center;align-items: center;background-color: white;border:1px solid black;padding: 5px;">
            <img style="position:relative; height:40px; " src="https://cdn-icons-png.flaticon.com/512/518/518964.png">
            <div style="border:0;margin:0;padding:0;background-color: white;">Provador Virtual</div>
        </div></div></div>
<!-- botao PROVADOR VIRTUAl -->