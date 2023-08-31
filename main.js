const form = document.querySelector('.formulario');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const cidade = document.querySelector('#inputCidade').value;

    climaTempo(cidade);
})

async function climaTempo(cidade) {
    const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&APPID=92ed7ea1a311d43e789192f2ef5b5389`);
    const dados = await resposta.json();

    const divDados = document.querySelector('.dados');
    const imagem = document.querySelector('.imagem');

    let temperaturaK = dados.main.temp;
    let tempC = parseInt(temperaturaK - 273.15);
    
    let climaIngles = dados.weather[0].main;
    let clima = '';
    let img = '';

    if(climaIngles == 'Clear') {
        clima = 'Limpo';
        img = 'img/ensolarado.png';
    } else if (climaIngles == 'Clouds') {
        clima = 'Nublado';
        img = 'img/nublado.png';
    } else if (climaIngles == 'Rain') {
        clima = 'Chuva';
        img = 'img/trovoada.png'
    }

    divDados.innerHTML = `
        <h3 class="cidade">${dados.name}</h3>
        <h2 class="temp">${tempC}°</h2>
        <h4 class="chance-chuva">Clima: ${clima}</h4>
    `

    imagem.innerHTML = `
        <img src="${img}" alt="imagem do tempo" class="imagem">
    `
}
