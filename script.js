var KEY_BD = ''

let jan = []
let fev = []
var mar = []
var abr = []
var mai = []
var jun = []
var jul = []
var ago = []
var set = []
var out = []
var nov = []
var dez = []

var botaoCad = document.getElementById('btnCadastro')
var botaoEdit = document.getElementById('btnEditar')

var meses = {jan,fev,mar,abr,mai,jun,jul,ago,set,out,nov,dez}

var campoTotalMes = document.getElementById('totalMes')
var id = Number(000)
var ultimoId = 0
// var novo = {nomeMes:'jan',id:id++,nome:'produto',  tipo: 'fixa', valor:'25' , data: '21',parcela:'',totalParcela:''}
// jan.push(novo)
// var novo = {nomeMes:'jan',id:id++,nome:'produto2',  tipo: 'fixa', valor:'25' , data: '21',parcela:'',totalParcela:''}
// jan.push(novo)
// var novo = {nomeMes:'fev',id:id++,nome:'produto2',  tipo: 'fixa', valor:'25' , data: '21',parcela:'',totalParcela:''}
// fev.push(novo)
// gravarBD()

function gravarBD(){
    localStorage.setItem(KEY_BD, JSON.stringify(meses) )
}

function lerBD(){
    const dados = localStorage.getItem(KEY_BD)
    if(dados){
        meses = JSON.parse(dados)
    }
    pegaUltimoId()
}


function escolheMes() {
    var escolha = document.getElementById('mes')
    desenhaTela(meses[escolha.value])
}



function filtraFixa(conta){

    return conta.tipo == 'fixa';
}

function filtraExtras(conta){

    return conta.tipo == 'extras';
}

function filtraParcelado(conta){

    return conta.tipo == 'parcelado';
}

function filtraLanches(conta){

    return conta.tipo == 'lanches';
}


function desenhaTela(meses) {
    lerBD()
    var fixas = meses.filter(filtraFixa);
    var extras = meses.filter(filtraExtras);
    var parcelado = meses.filter(filtraParcelado);
    var lanches = meses.filter(filtraLanches);
    var res = document.getElementById('mostraFixas');
    var elemento ='';
    var total = Number(0)
    var totalMes = Number(0)
   
    campoTotalMes.innerHTML = '<p>Total do mês: <br></p>'
    //document.getElementById('rodape').style.position='absolute'
    for (var i = 0; i < fixas.length; i++) {
        elemento += "<tr><td>" + fixas[i].data + " </td>";
        elemento += "<td>" + fixas[i].nome + "</td>";
        elemento += "<td>R$" + fixas[i].valor + "</td>";
        total += Number(fixas[i].valor)
        elemento += `<td>  <button title='EDITAR' class='verde' onclick='editar("${fixas[i].id}","${fixas[i].nomeMes}")'>📝</button>`+
        `<button title='REMOVER' class='vermelho' onclick='remove("${fixas[i].id}","${fixas[i].nomeMes}")'>❌</button></td></tr>`

    }
    res.innerHTML = elemento;
    res.innerHTML += `<td>TOTAL=</td><td></td><td><strong>R$${total}</strong></td></tr>` 
    totalMes += total


    var res = document.getElementById('mostraExtras');
    var elemento ='';
    var total = Number(0)
    for (var i = 0; i < extras.length; i++) {
        elemento += "<tr><td>" + extras[i].data + " </td>";
        elemento += "<td>" + extras[i].nome + "</td>";
        elemento += "<td>R$" + extras[i].valor + "</td>";
        total += Number(extras[i].valor)
        elemento += `<td> <button title='EDITAR'  class='verde' onclick='editar("${extras[i].id}","${extras[i].nomeMes}")'>📝</button>`+
        `<button title='REMOVER' class='vermelho' onclick='remove("${extras[i].id}","${extras[i].nomeMes}")'>❌</button></td></tr>`
        
    }
    res.innerHTML = elemento;
    res.innerHTML += `<td>TOTAL=</td><td></td><td><strong>R$${total}</strong></td></tr>` 
    totalMes += total
    

    var res = document.getElementById('mostraLanches');
    var elemento ='';
    var total = Number(0)
    for (var i = 0; i < lanches.length; i++) {
        elemento += "<tr><td>" + lanches[i].data + " </td>";
        elemento += "<td>" + lanches[i].nome + "</td>";
        elemento += "<td>R$" + lanches[i].valor + "</td>";
        total += Number(lanches[i].valor)
        elemento += `<td> <button title='EDITAR'  class='verde' onclick='editar("${lanches[i].id}","${lanches[i].nomeMes}")'>📝</button>`+
        `<button title='REMOVER' class='vermelho' onclick='remove("${lanches[i].id}","${lanches[i].nomeMes}")'>❌</button></td></tr>`

    }
    res.innerHTML = elemento;
    res.innerHTML += `<td>TOTAL=</td><td></td><td><strong>R$${total}</strong></td></tr>` 
    totalMes += total

    var res = document.getElementById('mostraParcelado');
    var elemento ='';
    var total = Number(0)
    let parcela = document.getElementById('parcela').value
    let totalParcelas = document.getElementById('totalParcelas').value

    for (var i = 0; i < parcelado.length; i++) {
        elemento += "<tr><td>" + parcelado[i].data + " </td>";
        //elemento += "<td> (" + parcelado[i].parcela + " de " + parcelado[i].totalParcela+") " + parcelado[i].nome + "</td>";
        elemento += "<td>" + parcelado[i].nome + " (" + parcelado[i].parcela +"/"+ parcelado[i].totalParcela+")</td>";
        elemento += "<td>R$" + parcelado[i].valor + "</td>";
        total += parcelado[i].valor
        elemento += `<td> <button title='EDITAR'  class='verde' onclick='editar("${parcelado[i].id}","${parcelado[i].nomeMes}")'>📝</button>`+
        `<button title='REMOVER' class='vermelho' onclick='remove("${parcelado[i].id}","${parcelado[i].nomeMes}")'>❌</button></td></tr>`
        
    }
    res.innerHTML = elemento;
    res.innerHTML += `<td>TOTAL=</td><td></td><td><strong>R$${total}</strong></td></tr>`
    totalMes += total
    campoTotalMes.style.display='block'
    campoTotalMes.innerText += `R$ ${totalMes}`
}

function mostraGerenciar() {
    document.getElementById('bv').style.display='none'
    document.getElementById('gerenciamento').style.display='flex'
    document.getElementById('visualizar').style.display='none'
    document.getElementById('cadastrar').style.display='none'
    campoTotalMes.style.display='none'
    document.getElementById('btn-home').style.display='none'
    gerenciar()
    
}

function mostraSecao(secao,desligar) {
    
    var ver = document.getElementById(secao)
    var apagar = document.getElementById(desligar)
    document.getElementById('gerenciamento').style.display='none'
    if(secao == 'cadastrar'){
        botaoCad.disabled = false
        botaoEdit.disabled = true
        resetaTabelas()
        //document.getElementById('rodape').style.position='relative'
        campoTotalMes.style.display='none'
    }
    ver.style.display ='block'
    apagar.style.display ='none'
    document.getElementById('bv').style.display='none'
    resetaCadastro()
    document.getElementById('btn-home').style.display='none'
    }

function resetaTabelas() {
    var tableFixas = document.getElementById('mostraFixas')
    var tableLanches = document.getElementById('mostraLanches')
    var tableExtras = document.getElementById('mostraExtras')
    var tableParc = document.getElementById('mostraParcelado')

    tableFixas.innerHTML =''
    tableLanches.innerHTML =''
    tableExtras.innerHTML =''
    tableParc.innerHTML =''
}

$(document).ready(function(){
	//Data
	$("#data").mask("99/99");

	//Dinheiro
	$('#valor').mask('000.000.000.000.000,00' , { reverse : true});
});

var objetoVazio = {};
var objetoContemValor = {
  "key": "valor"
};

function isEmptyObject(obj) {
  var name;
  for (name in obj) {
    return false;
  }
  return true;
}


function ligaParcelas() {
    var tipo = document.getElementById('tipo')
    if (tipo.value == 'parcelado')
    {
    document.getElementById('parcelas').style.display='flex'
    }else{
        document.getElementById('parcelas').style.display='none'
    }
    
}

function cadastrar() {
pegaUltimoId()
    
let mesSel = document.getElementById('mesCad').value
let tipoCad = document.getElementById('tipo').value
let data = document.getElementById('data').value
let produto =document.getElementById('produto').value
let valor = document.getElementById('valor').value
let parcela = document.getElementById('parcela').value
let totalParcelas = document.getElementById('totalParcelas').value


if(data =='' || produto =='' || valor =='' || mesSel ==''){
    alert('Você deve preencher todos os campos!')
}else{
    if (tipoCad =='fixa'){
        for (const mes in meses){
        let novo = {nomeMes:mes,id:ultimoId++, nome:produto,tipo:tipoCad,valor:parseInt(valor),data:data,parcela:'',totalParcela:''}
        meses[mes].push(novo)
    }
    alert('Cadastro realizado com sucesso!')
    mostraSecao('visualizar','cadastrar')
    }
    else if(tipoCad == 'parcelado'){        
        
        for (let index = 0 ; index < totalParcelas; index++ ) {
            let novo = {nomeMes:mesSel,id:ultimoId++, nome:produto,tipo:tipoCad,valor:parseInt(valor),data:data,parcela:parcela++,totalParcela:totalParcelas}
            meses[mesSel].push(novo)
            
            if(mesSel =='jan'){
                mesSel = 'fev'
            }
            else if(mesSel =='fev'){
                mesSel = 'mar'
            }
            else if(mesSel =='mar'){
                mesSel = 'abr'
            }
            else if(mesSel =='abr'){
                mesSel = 'mai'
            }
            else if(mesSel =='mai'){
                mesSel = 'jun'
            }
            else if(mesSel =='jun'){
                mesSel = 'jul'
            }
            else if(mesSel =='jul'){
                mesSel = 'ago'
            }
            else if(mesSel =='ago'){
                mesSel = 'set'
            }
            else if(mesSel =='set'){
                mesSel = 'out'
            }
            else if(mesSel =='out'){
                mesSel = 'nov'
            }
            else if(mesSel =='nov'){
                mesSel = 'dez'
            }
            else if(mesSel =='dez'){
                mesSel = 'jan'
            }
            
        }
            alert('Cadastro realizado com sucesso!')
            mostraSecao('visualizar','cadastrar')
        
    }        
     else {
        let novo = {id:ultimoId++, nome:produto,tipo:tipoCad,valor:parseInt(valor),data:data,   parcela:'',totalParcela:''}
            novo.nomeMes = mesSel
            meses[mesSel].push(novo)
            alert('Cadastro realizado com sucesso!')
            mostraSecao('visualizar','cadastrar')
         
        }      
}

gravarBD()
desenhaTela(meses[mesSel])
}



function resetaCadastro(){
    let mesSel = document.getElementById('mesCad')
    let tipo = document.getElementById('tipo')
    let data = document.getElementById('data')
    let produto =document.getElementById('produto')
    let valor = document.getElementById('valor')
    let parcela = document.getElementById('parcela')
    let totalParcelas = document.getElementById('totalParcelas')
    mesSel.value=''
    tipo.value=''
    data.value=''
    produto.value=''
    valor.value=''
    parcela.value=''
    totalParcelas.value=''
}


function remove(id,nomeMes) {
    var indexToRemove = meses[nomeMes].findIndex(item => item.id ==id)
    if(confirm('Quer deletar o registro de id '+id)){
        meses[nomeMes].splice(indexToRemove,1)
        gravarBD()
        alert("Item de id: "+id+" removido") 
        resetaTabelas()
    }
    
    gerenciar()
}


function gerenciar(){
    var resultado = document.getElementById("mostraGer");
    var elemento ='';
    lerBD()
    pegaUltimoId()
    //console.log(ultimoId)
    for (const mes in meses){
        for (var i = 0; i < meses[mes].length; i++){
            elemento += "<tr><td>" +meses[mes][i].id + " </td>";
            elemento += "<td>" + meses[mes][i].nomeMes + " </td>";
            elemento += "<td>" + meses[mes][i].data + " </td>";
            elemento += "<td>" + meses[mes][i].nome + "</td>";
            elemento += "<td>R$" + meses[mes][i].valor + "</td>";
            elemento += "<td>" + meses[mes][i].tipo + "</td>";
            elemento += "<td>" + meses[mes][i].parcela +" de " +meses[mes][i].totalParcela +"</td>";
            elemento += `<td> <button title='EDITAR' class='verde' onclick='editar("${meses[mes][i].id}","${meses[mes][i].nomeMes}")'>📝</button>`+
            `<button title='REMOVER' class='vermelho' onclick='remove("${meses[mes][i].id}","${meses[mes][i].nomeMes}")'>❌</button></td></tr>`
        }
    }
    resultado.innerHTML = elemento

}

function editar(id, nomeMes){
    
    let item = meses[nomeMes].find( item => item.id == id ) 
    let campoId= document.getElementById('id')
    let mesSel = document.getElementById('mesCad')
    let tipoCad = document.getElementById('tipo')
    let data = document.getElementById('data')
    let produto =document.getElementById('produto')
    let valor = document.getElementById('valor')
    let parcela = document.getElementById('parcela')
    let totalParcelas = document.getElementById('totalParcelas')
    
    mostraSecao('cadastrar','visualizar')

    campoId.value = item.id
    mesSel.value = item.nomeMes;
    data.value = item.data
    produto.value = item.nome
    valor.value = parseInt(item.valor)
    tipoCad.value = item.tipo
    parcela.value = item.parcela
    totalParcelas.value = item.totalParcela

    
    botaoCad.disabled = true
    botaoEdit.disabled = false
    
    }

    function enviar() {
        
        let id = document.getElementById('id').value
        let mesSel = document.getElementById('mesCad')
        let tipoCad = document.getElementById('tipo')
        let data = document.getElementById('data')
        let produto =document.getElementById('produto')
        let valor = document.getElementById('valor')
        let parcela = document.getElementById('parcela')
        let totalParcelas = document.getElementById('totalParcelas')
        
        let editado = meses[mesSel.value].find( editado => editado.id == id ) 
                
        editado.nomeMes = mesSel.value 
        editado.data =   data.value
        editado.nome =  produto.value
        editado.valor  =  parseInt(valor.value)
        editado.tipo  =    tipoCad.value
        editado.parcela =   parcela.value 
        editado.totalParcela = totalParcelas.value
        gravarBD()
        alert('Cadastro editado com sucesso!')
        mostraSecao('visualizar','cadastrar')
        document.getElementById('mes').value = editado.nomeMes
        desenhaTela(meses[editado.nomeMes])
    }

function limpar(){
    if(confirm('Quer LIMPAR toda a lista de registros?')){
        meses={jan,fev,mar,abr,mai,jun,jul,ago,set,out,nov,dez}
        gravarBD()
        alert("Lista Zerada!") 
        resetaTabelas()
        gerenciar()
}
}


function pegaUltimoId() {
    var novaId=[]
    for (mes in meses){
    for (var i = 0; i < meses[mes].length; i++){
    novaId.push(meses[mes][i].id)
        }
    }
    var ordenadoId = novaId.sort((a,b) => a - b)
    if (ordenadoId.length != 0){
    ultimoId = ordenadoId.at(-1) + 1
    console.log(`lista preenchida ultimo id= ${ultimoId}`)
    }   else{
            
            ultimoId= 0
            console.log(`lista vazia id= ${ultimoId}`)
            }
}


    window.addEventListener("load", lerBD)


    function ordenar(ordem) {
    var nova=[]
    
    for (mes in meses){
    for (var i = 0; i < meses[mes].length; i++){
    var lancar = {nomeMes:'',id:'',nome:'',  tipo: '', valor:'' , data: '',parcela:'',totalParcela:''}
    lancar.id=meses[mes][i].id
    lancar.nomeMes=meses[mes][i].nomeMes
    lancar.nome=meses[mes][i].nome
    lancar.tipo=meses[mes][i].tipo
    lancar.valor=meses[mes][i].valor
    lancar.data=meses[mes][i].data
    lancar.parcela=meses[mes][i].parcela
    lancar.totalParcela=meses[mes][i].totalParcela
    nova.push(lancar)
        }
        
    }
    switch (ordem) {
        case 'id':
            var ordenado = nova.sort((a,b) => a.id - b.id)
            break;
        case 'mes':
            var ordenado = nova.sort((a,b) => a.nomeMes - b.nomeMes)
            break;
        case 'data':
            var ordenado = nova.sort((a,b) => a.data - b.data)
            break;
        case 'nome':
            var ordenado = nova.sort((a,b) => a.nome.localeCompare(b.nome))
            break;
        case 'valor':
            var ordenado = nova.sort((a,b) => a.valor - b.valor)
            break;
        case 'tipo':
            var ordenado = nova.sort((a,b) => a.tipo.localeCompare(b.tipo))
            break;
        case 'parcelas':
            var ordenado = nova.sort((a,b) => a.parcela.localeCompare(b.parcela))
            break;           
        
    }
    var resultado = document.getElementById("mostraGer");
    var elemento ='';
        for (var i = 0; i < ordenado.length; i++){
            elemento += "<tr><td>" +ordenado[i].id + " </td>";
            elemento += "<td>" + ordenado[i].nomeMes + " </td>";
            elemento += "<td>" + ordenado[i].data + " </td>";
            elemento += "<td>" + ordenado[i].nome + "</td>";
            elemento += "<td>R$" + ordenado[i].valor + "</td>";
            elemento += "<td>" + ordenado[i].tipo + "</td>";
            elemento += "<td>" + ordenado[i].parcela +" de " +ordenado[i].totalParcela +"</td>";
            elemento += `<td> <button title='EDITAR' class='verde' onclick='editar("${ordenado[i].id}","${ordenado[i].nomeMes}")'>📝</button>`+
            `<button title='REMOVER' class='vermelho' onclick='remove("${ordenado[i].id}","${ordenado[i].nomeMes}")'>❌</button></td></tr>`
        }
    
    resultado.innerHTML = elemento    
    }


    function contato() {
        document.getElementById('modal').style.display='block'
        
    }

    function fechar() {
        document.getElementById('modal').style.display='none'
    }