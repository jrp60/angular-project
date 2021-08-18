export class FileItem{
    public archivo:File;
    public nombreArchivo:string;
    public url:string = '';
    public estaSubiendo:boolean = false;
    public progreso:number = 0;
    public user:string;

    constructor(archivo:File, user:string){
        this.archivo = archivo;
        this.nombreArchivo = archivo.name;
        this.user = user;
    }
}