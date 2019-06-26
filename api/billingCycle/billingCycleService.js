const BillingCycle = require('./billingCycle')

// Implementa os métodos HTTP com a api node-restful 
BillingCycle.methods(['get', 'post', 'put', 'delete'])
BillingCycle.updateOptions({ new: true, runValidators: true })

BillingCycle.route('count', function (req, res, next) {
    BillingCycle.count(function (error, value) {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json({ value })
        }
    })
})

module.exports = BillingCycle