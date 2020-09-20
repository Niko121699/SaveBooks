// DEFINICION DE LAS CLASES
class Libro{
    constructor(titulo,autor,libro){
        this.titulo = titulo;
        this.autor = autor;
        this.libro = libro;
    }
}
class UI{
    static mostrarLibros(){
        const libros = Datos.traerLibros();
        libros.forEach((libro)=> UI.agregarLibroLista(libro));
    }
    static agregarLibroLista(libro){
        const lista = document.querySelector('#libro-list');

        const fila = document.createElement('tr');
        fila.innerHTML = `
        <td> ${libro.titulo} </td>
        <td> ${libro.autor} </td>
        <td> ${libro.libro} </td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</td>
        `;
        lista.appendChild(fila);
    }
    static eliminarLibro(el){
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();            
        }
    }
    static mostrarAlerta(mensaje, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(mensaje));

        const container = document.querySelector('.container');
        const form = document.querySelector('#libro-form');
        container.insertBefore(div,form);

        setTimeout(() => document.querySelector('.alert').remove(),3000)
    }
    static limpiarCampos(){
        document.querySelector('#titulo').value = '';
        document.querySelector('#autor').value = '';
        document.querySelector('#isbn').value = '';
    }
}
class Datos{
    static traerLibros(){
        let libros;
        if(localStorage.getItem('libros') === null){
            libros = [];
        }else{
            libros = JSON.parse(localStorage.getItem('libros'));
        }
        return libros;
    }
    static agregarLibro(libro){
        const libros = Datos.traerLibros();
        libros.push(libro);
        localStorage.setItem('libros', JSON.stringify(libros));
    }

    static removerLibro(isbn){
        const libros = Datos.traerLibros();
        libros.forEach((libro,index) => {
            if ( parseInt(libro.libro) == parseInt(isbn)){
                libros.splice(index,1);
            }
        });
        localStorage.setItem('libros', JSON.stringify(libros));
    }
}
//CARGAR LA PAGINA 
document.addEventListener('DOMContentLoaded', UI.mostrarLibros());

//CONTROLAR EL EVENTO SUBMIT
document.querySelector('#libro-form').addEventListener('submit', (e) =>{
    e.preventDefault();
    //OBTENER VALORES CAMPOS
    titulo = document.querySelector('#titulo').value;
    autor = document.querySelector('#autor').value;
    isbn = document.querySelector('#isbn').value;
     if(titulo == '' || autor == '' || isbn == ''){
         UI.mostrarAlerta('IMPORTANTE: Por favor rellenar todos los campos', 'danger');
     }else{
         const libro = new Libro(titulo,autor,isbn);
         Datos.agregarLibro(libro);
         UI.agregarLibroLista(libro);
         UI.mostrarAlerta('Libro agregado con exito', 'success');
         UI.limpiarCampos();
     }
});
document.querySelector('#libro-list').addEventListener('click', (e)=>{
    UI.eliminarLibro(e.target);
    Datos.removerLibro(e.target.parentElement.previousElementSibling.textContent);
    console.log(e.target.parentElement.previousElementSibling.textContent);
    UI.mostrarAlerta('Libro eliminado exitosamente', 'success');
});
