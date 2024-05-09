import { 
    getAllClients, 
    getClientsEmploy 
} from "../module/client.js";
import {
    getAllEmployNotClients,
    getAllEmployeesWithBossAndCodeSeven,
    getBossFullNameAndEmail,
    getAllEmployeesNotSalesReps 
} from "../module/employees.js";
import {
    getAllOficceAndCodeCity,
    getAllOficceCityAndMovil 
} from "../module/offices.js";

export class Mycard extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = /*html*/`
            <link rel="stylesheet" href="../css/myCard.css">  
        `
    }
    //Ejercicio N.1
    async getAllOficceAndCodeCityDesign(){
        let data = await getAllOficceAndCodeCity();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div>${val.city}</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Codigo de oficina: </b>${val.code_office}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    //Ejercicio N.2
    async getAllOficceCityAndMovilDesign(){
        let data = await getAllOficceCityAndMovil();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div>${val.city}</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Telefono: </b>${val.movil}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    //Ejercicio N.3
    async getAllEmployeesWithBossAndCodeSevenDesign(){
        let data = await getAllEmployeesWithBossAndCodeSeven();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div>${val.nombre} ${val.apellidos}</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Correo Electronico: </b>${val.email}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    //Ejercicio N.4
    async getBossFullNameAndEmailDesign(){
        let data = await getBossFullNameAndEmail();
        this.shadowRoot.innerHTML += /*html*/`
            <div class="report__card">
                <div class="card__title">
                    <div>${data.nombre} ${data.apellidos}</div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Correo Electronico: </b>${data.email}</p>
                        <p><b>Puesto: </b>${data.puesto}</p>
                    </div>
                </div>
            </div>
        `;
    };
    
    //Ejercicio N.5
    async getAllEmployeesNotSalesRepsDesign(){
        let data = await getAllEmployeesNotSalesReps();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div>${val.nombre} ${val.apellidos}</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Puesto: </b>${val.puesto}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    async getClientsEmployDesign(){
        let data = await getClientsEmploy();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div>${val.client_name}</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Nombre del empleado: </b>${val.name_employee}</p>
                            <p><b>Ciudad: </b>${val.city}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    async getAllClientsDesign(){
        let data = await getAllClients();
        data.forEach(val => {
            let money = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val.limit_credit);
            this.shadowRoot.innerHTML += /*html*/`
            
                <div class="report__card">
                    <div class="card__title">
                        <div>${val.client_name} # ${val.client_code}</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Id: </b> ${val.id}</p>
                            <p><b>Codigo del empleado: </b>${val.code_employee_sales_manager}</p>
                            <p><b>Contacto: </b>${val.phone} - ${val.fax}</p>
                            <p><b>Nombre del representante: </b>${val.contact_name} ${val.contact_lastname}</p>
                            <p><b>Dirrecion: </b>${val.address1} ${(val.address2) ? val.address2 : ""}</p>
                            <p><b>Ubicacion: </b>${val.country} ${val.region} ${val.city} ${val.postal_code}</p>
                            <p><b>Total a prestar: </b>${money}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    async getAllEmployNotClientsDesign(){
        let data = await getAllEmployNotClients();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
            
                <div class="report__card">
                    <div class="card__title">
                        <div>${val.name} ${val.lastname1} ${val.lastname2} # ${val.employee_code}</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Id: </b> ${val.id}</p>
                            <p><b>Cargo: </b>${val.position}</p>
                            <p><b>Oficina: </b>${val.code_office}</p>
                            <p><b>Jefe encargado: </b>${val.name_boss}</p>
                            <p><b>Numero de extencion: </b>${val.extension}</p>
                            <p><b>Correo electronico: </b>${val.email}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    static get observedAttributes() {
        return ["logic"];
    }
    attributeChangedCallback(name, old, now) {
        if(name=="logic" && now=="offices_1") this.getAllOficceAndCodeCityDesign()
        if(name=="logic" && now=="offices_2") this.getAllOficceCityAndMovilDesign()
        if(name=="logic" && now=="employ_3") this.getAllEmployeesWithBossAndCodeSevenDesign()
        if(name=="logic" && now=="employ_4") this.getBossFullNameAndEmailDesign()
        if(name=="logic" && now=="employ_5") this.getAllEmployeesNotSalesRepsDesign()     
        if(name=="logic" && now=="client_6") this.getClientsEmployDesign()
        if(name=="logic" && now=="client_16") this.getAllClientsDesign()
        if(name=="logic" && now=="employ_12") this.getAllEmployNotClientsDesign()
    }
}