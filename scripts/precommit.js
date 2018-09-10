var listChangedFiles = require('child_process').exec('git status --porcelain | sed s/^...//')
var cp = require('child_process')

listChangedFiles.stdout.on('data', (data) => {
    var reg = /.+/g
    var temp
    var arr = []
    while (temp = reg.exec(data)) {
        arr.push(temp[0])
    }

    if(arr.includes('gxb_contract_api.json') || arr.includes('gxb_contract_api_example.js') || arr.includes('api_template.ejs')){
        cp.exec('babel-node generateApiDoc.js',function(err, stdout, stderr){
            if(err){
                throw stderr
            }

            console.log(stdout)

            // git add generated doc
            cp.exec('git add test.md')
        })
    }
})

listChangedFiles.stderr.on('data', (data) => {
    throw new Error(data)
})