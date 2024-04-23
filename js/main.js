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

console.log(await getAllPaymentsFromPaypalEachYear());
