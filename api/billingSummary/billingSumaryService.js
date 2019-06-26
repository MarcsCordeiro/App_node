const _ = require('lodash')
const BillingCycle = require('../billingCycle/billingCycle')

//Mais uma função de middleware
function getSummary(req, res) {
    //Aggregate do mongoose trás um conjunto de objetos
    BillingCycle.aggregate({

        //Trás a soma dos campos de credit e debt
        $project: { credit: { $sum: "$credits.value" }, debt: { $sum: "$debts.value" } }
    }, {
            //Trás um grupo com cada valor com a soma dos campos efetuada
            $group: { _id: null, credit: { $sum: "$credit" }, debt: { $sum: "$debt" } }
        }, {
            //Valida a liberação dos campos, se vai ser mostrado ou não 
            $project: { _id: 0, credit: 1, debt: 1 }
        }, function (error, result) {
            if (error) {
                res.status(500).json({ errors: [error] })
            } else {
                //Valor default colocado se não ouver campos para serem puxados
                res.json(_.defaults(result[0], { credit: 0, debt: 0 }))
            }

        })
}

module.exports = { getSummary }