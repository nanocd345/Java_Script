import { 
    getAllOficceAndCodeCity, 
    getAllOficceCityAndMovil
} from "./modules/offices.js";
import { 
    getAllFullNameAndEmailsAndBoss,
    getBossPositionNamesAndEmail,
    getAllNotSalesRepresentEmployee,
    getAllEmployeesAndBoss
} from "./modules/employees.js";
import { 
    getAllClientsUniques,
    getAllPaymentsIn2008WithPaypal,
    getAllPaymentsWays,
    getAllCompletedPayments,
    getAllClientsWithNotPaymentsWithManagersSales,
    getAllClientsWithNotPayments
} from "./modules/payments.js";
import { 
    getAllSpanishClients,
    getAllClients,
    getAllClientsAndManagersWithTheOfficeCity,
    getAllClientsWithSalesManagerName,
    getAllClientsWithPaymensAndSalesManagmentInfo,
    getAllClientsNotPayment,
    getAllAdressOfficesFunlabrada
} from "./modules/client.js";
import {
    getAllOrnamentalsAndStockProducts
} from "./modules/products.js";
import {
    getAllPossibleStatus,
    getAllRejectedDeliver,
    getAllRejectedDeliverTwoDays,
    getAllRejectedDeliverInYears,
    getAllDeliveredPaymentsJanuary
} from "./modules/requests.js";

console.log(await getAllSpanishClients());