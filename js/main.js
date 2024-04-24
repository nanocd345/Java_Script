import { 
    getAllOficceAndCodeCity, 
    getAllOficceCityAndMovil 
} from "./module/offices.js";
import { 
    getAllFullNameAndEmailsAndBoss,
    getBossFullNameAndEmail 
} from "./module/employees.js";
import { 
    getAllPaymentsFromPaypalEachYear 
} from "./module/payments.js";
import { 
    getAllClientsFromCityAndCode,
    getAllClientsManagersWithTheirOfficeCity,
    getAllClientsAndManagersName 
} from "./module/clients.js";

console.log(await getAll());
