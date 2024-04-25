import { 
    getAllOficceAndCodeCity, 
    getAllOficceCityAndMovil

} from "./module/offices.js";
import { 
    getAllFullNameAndEmailsAndBoss,
    getBossPositionNamesAndEmail,
    getAllNotSalesRepresentEmployee
} from "./module/employees.js";
import { 
    getAllClientsUniques,
    getAllPaymentsIn2008WithPaypal,
    getAllPaymentsWays,
    getAllCompletedPayments,
    getAllClientsWithNotPaymentsWithManagersSales,
    
} from "./module/payments.js";
import { 
    getAllSpanishClients,
    getAllClients,
    getAllClientsAndManagersWithTheOfficeCity,
    getAllClientsWithSalesManagerName,
    getAllClientsWithPaymensAndSalesManagmentInfo,
    getAllClientsNotPayment,
    getAllAdressOfficesFunlabrada
} from "./module/clients.js";
import {
    getAllOrnamentalsAndStockProducts
} from "./module/product.js";
import {
    getAllPossibleStatus,
    getAllRejectedDeliver,
    getAllRejectedDeliverTwoDays,
    getAllRejectedDeliverInYears,
    getAllClientsWhoHadDeliveredLate
} from "./module/requests.js";

console.log(await getAllClientsWhoHadDeliveredLate());