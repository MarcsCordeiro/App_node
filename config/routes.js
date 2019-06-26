const express = require('express')


module.exports = function (server) {

    // API routes, '/api' url padrão da api
    const router = express.Router()
    server.use('/api', router)

    // rotas da API
    const billingCycleService = require('../api/billingCycle/billingCycleService')
    billingCycleService.register(router, '/billingCycles')
}