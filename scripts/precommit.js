var listChangedFiles = require('child_process').exec('git status --porcelain | sed s/^...//')
var cp = require('child_process')
var path = require('path')

listChangedFiles.stdout.on('data', (data) => {
    var reg = /.+/g
    var temp
    var arr = []
    while (temp = reg.exec(data)) {
        arr.push(temp[0])
    }

    if (arr.includes('scripts/gxb_contract_api.json') || arr.includes('scripts/gxb_contract_api_example.js') || arr.includes('templates/api_template.ejs')) {
        cp.exec(`babel-node ${path.join(__dirname, './generateApiDoc.js')}`, function (err, stdout, stderr) {
            if (err) {
                throw stderr
            }

            console.log(stdout)

            // git add generated doc
            cp.exec('git add gxb_contract_api_EN.md && git add gxb_contract_api.md')
        })
    }
})

listChangedFiles.stderr.on('data', (data) => {
    throw new Error(data)
})