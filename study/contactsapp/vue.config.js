module.exports = {
    devServer : {
        droxy : {
            'api' : {
                target: 'http://sample.bmaster.kro.kr',
                changeOrign: true,
                pathRewrite: {
                    '^/api' : ''
                }
            }
        }
    }
}