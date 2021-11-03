import{formatter} from './tratamento.js';
// import createDivImoveis from './buscaApi.js'


const input = document.querySelector('#inputStats')

input.addEventListener("focusout",function(e){
    let search = input.value.replaceAll(" ","-")
    const estados = () =>{
        if(search == "sao-paulo"){
            return "sp"
        }else{
            return "rj"
        }
    }

    const options = {
        methods: 'GET',
        mode: 'cors',
        cache: 'default'
    }

    fetch(`https://private-9e061d-piweb.apiary-mock.com/venda?state=${estados()}&city=${search}`,options)
        .then((response)=>{response.json()
            .then(data=>data.search.result.listings.forEach(element => {
                

                const srcImg = element.medias[0].url
                const rua = element.link.data.street
                const apto = element.link.name
                const suites = element.listing.suites //UL
                const preco = element.listing.pricingInfos[0].price //alterar preço
                const condominio = element.listing.pricingInfos[0].monthlyCondoFee //alterar preço
                const city = element.listing.address.city
                const aaa = [element.listing.suites, element.listing.bathrooms,element.listing.totalAreas,element.listing.bedrooms]
                const cityAvenda = `<h1>${data.search.totalCount} Imóveis à venda em ${city}</h1>`
                console.log(cityAvenda)
                
   
                createDivImoveis(srcImg, rua, apto, suites, preco, condominio, city, cityAvenda)
           }))
        })
        .catch(e=>console.log('Deu erro: '+e,message))
})


formatter




function createDivImoveis(srcImg, rua, apto, suites, preco, condominio, city, cityAvenda){
    
    const cidade = document.querySelector('#estadoDigitado')
    const avenda = document.querySelector('#apartamentos')
    const divImovel = document.querySelector('#imoveisAVenda')
    
    const ul = document.createElement('ul')
    const pRua = document.createElement('p')
    const pApto = document.createElement('p')
    const pSuites = document.createElement('p')
    const pPreco = document.createElement('p')
    const pCondominio = document.createElement('p')
    const div = document.createElement('div')
    const li = document.createElement('li')
    const img = document.createElement('img')

    avenda.innerHTML = cityAvenda
    cidade.innerHTML = city
    img.src = srcImg
    pRua.textContent = rua
    pApto.textContent = apto
    pSuites.textContent = suites
    pPreco.textContent = formatter.format(preco)
    pCondominio.textContent = formatter.format(condominio)

    divImovel.appendChild(li)
    li.appendChild(img)
    li.appendChild(div)
    div.appendChild(pRua)
    div.appendChild(pApto)
    div.appendChild(pSuites)
    div.appendChild(pPreco)
    div.appendChild(pCondominio)
    div.appendChild(ul)

    pRua.classList.add('pRua')
    pApto.classList.add('pApto')
    img.classList.add('img')

}
