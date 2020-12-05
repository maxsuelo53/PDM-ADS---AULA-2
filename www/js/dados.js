// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDFojLTO-UyT5Jpzh8lFI_GFlMwOSbeZYE",
    authDomain: "teste-b13da.firebaseapp.com",
    projectId: "teste-b13da",
    storageBucket: "teste-b13da.appspot.com",
    messagingSenderId: "379745143554",
    appId: "1:379745143554:web:638f92c999a700ab8bd01b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var tarefasDB = firebase.database().ref("tarefas");


var tarefas = [];


function add(){
    
    if ($("#tarefa").val() != ""){
        var tarefa = {"nome": $("#tarefa").val(), "feito":false};
        tarefasDB.push(tarefa);
        $("#tarefa").val("");
        list();
    }
}

function list(){

    tarefasDB.once("value",function(tarefas){


        var html = "";

        tarefas.forEach(function(tarefa,index){
            html += createHTML(tarefa.key,tarefa.val());
        });

        $("#tarefas").html(html);
    });
}

function createHTML(id,tarefa){

    var html ="";

    if(tarefa.feito){
        html += ("<li class='collection-item feito'>"+ "<div onclick='changeStatus(\"" + id + "\",this);'>" + tarefa.nome +"<i class='material-icons iconFeito'>done_outline</i> " + "<a class='secondary-content' onclick='del(event,\''+id+'\');return false;'><i class='material-icons excluir'>delete</i></a></div></li> " );
    }else{
        html += ("<li class='collection-item'>" + "<div onclick='changeStatus(\"" + id + "\",this);'>" + tarefa.nome + "<a class='secondary-content' onclick='del(event,\"" +id+ "\");return false;'><i class='material-icons excluir'>delete</i></a></div></li> " );    
    }

    return html;
}

function changeStatus(id, obj) {

    var feito = $(obj).parent("li").hasClass("feito");
    
    tarefasDB.child(id).update({
        "feito": !feito
    })
    
	//tarefas.forEach(function(tarefa, index) {
	//	if (tarefa.id == id) tarefa.feito = !tarefa.feito;
	//});
	
	
	list();
	
}


function del(id) {
    
    evt.stopPropagation();
	tarefasDB.child(id).remove();
	
	
	list();
	
}