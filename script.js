var imgAll = [];

$(document).ready(function(){
	$("#inicia").click( function(){
		var imagens = ['img/facebook.png','img/android.png','img/chrome.png','img/firefox.png','img/html5.png',
		'img/googleplus.png','img/twitter.png','img/windows.png'];
		$("#jogo").empty();
		var t = new Date();
		var horas = t.getHours(), minutos = t.getMinutes(), segundos = t.getSeconds();
		inicio = horas+":"+minutos+":"+segundos;
		alert("Tempo inicial - "+inicio);

		for(i=0;i<=imagens.length * 2; i++){
			for (var p = imagens.length; p;) {
				var n = Math.random() * p-- | 0;
				var tmp = imagens[n];
				imagens[n] = imagens[p];
				imagens[p] = tmp;
				var img = $('<img id="img'+i+'" class="imagens" src='+tmp+' onclick="trocaImagem(this, \''+imgAll.length+'\')">');
				imgAll.push(tmp);
				img.fadeIn(2000).slideDown(2000);
				$("#jogo").append(img);
				img.slideUp(500).fadeOut(500, function(){
					$(".imagens").attr("src", imgFundo);
					$(".imagens").fadeIn(500).slideDown(2000);
				});
				i++;
			}
		}
	});

	$("#tempo").click(function(){
		$("#ranking").animate({
			height: 'toggle'
		});
		$("#ranking").empty();
		tempos.sort();
		$("#ranking").append(tempos.join("<br/>"));
	});
});
var selecionados = [], ids = [], compImg = [], contadorImagens = 0, imgFundo = 'img/cross.png', inicio, erros = 0, tempos = [];

function trocaImagem(img, indArr){
	if(selecionados.length < 2){
		$("#"+img.id).attr("src", imgAll[indArr]);

		if(selecionados.length == 0){
			selecionados.push(indArr);
			ids.push(img.id);
			compImg.push(imgAll[indArr]);
		} else if(selecionados.length == 1){
			selecionados.push(indArr);
			ids.push(img.id);
			compImg.push(imgAll[indArr]);
			if(compImg[0] == compImg[1]){
				contadorImagens += 2;
				selecionados = [];
				ids = [];
				compImg = [];

				if(contadorImagens == imgAll.length){
					var t2 = new Date(), horas = t2.getHours(), minutos = t2.getMinutes(), segundos = t2.getSeconds();
					fim = horas+":"+minutos+":"+segundos;
					localStorage.setItem("calculaTempo", calculaTempo(inicio, fim));
					tempos.push(localStorage.getItem("calculaTempo"));
					alert("Parabéns, você concluiu o jogo!!!\nTempo do jogo - "+calculaTempo(inicio, fim)+"\nQuantidade de erros - "+erros);
					$("#jogo").empty();
					erros = 0;
				}
			} else {
				$("#"+ids[0]).attr("src", imgFundo);
				$("#"+ids[1]).attr("src", imgFundo);
				erros++;
				selecionados = [];
				ids = [];
				compImg = [];
			}
		}
	}
}

function calculaTempo(inicio, fim){
	horaInicio = inicio.split(":");
	horaFim = fim.split(":");
	horaTotal = parseInt(horaFim[0], 10) - parseInt(horaInicio[0], 10);
	minutoTotal = parseInt(horaFim[1], 10) - parseInt(horaInicio[1], 10);
	segundoTotal = parseInt(horaFim[2], 10) - parseInt(horaInicio[2], 10);

	if(segundoTotal < 0)
	{ 
		segundoTotal += 60; 
		minutoTotal -= 1; 
	} else if(segundoTotal >= 60){ 
		segundoTotal -= 60;
		minutoTotal += 1; 
	}
	if(minutoTotal < 0)
	{ 
		minutoTotal += 60; 
		horaTotal -= 1; 
	} else if(minutoTotal >= 60){ 
		minutoTotal -= 60;
		horaTotal += 1; 
	}
	horaFinal = horaTotal+":"+minutoTotal+":"+segundoTotal;

	return horaFinal;
}