/**
 * Created by martina on 16/11/15.
 */
var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname + '/public/dist'));

app.get('/builds', function(req, res, next){
   res.json([
       {'changeList': '432464', 'owner': 'JTuck', 'build': 'pending', 'unitTest': 'none', 'functionalTest': 'none', Status: 'Pending'},
       {'changeList': '432463', 'owner': 'Dora', 'build': 'running', 'unitTest': 'none', 'functionalTest': 'none', Status: 'Running'},
       {'changeList': '432462', 'owner': 'Samy', 'build': 'pass', 'unitTest': 'pass', 'functionalTest': 'pass', Status: 'Passed'},
       {'changeList': '432461', 'owner': 'JTuck', 'build': 'pass', 'unitTest': 'fail', 'functionalTest': 'none', Status: 'Failed'},
       {'changeList': '432460', 'owner': 'Samy', 'build': 'pass', 'unitTest': 'pass', 'functionalTest': 'pass', Status: 'Passed'},
       {'changeList': '432459', 'owner': 'Dora', 'build': 'fail', 'unitTest': 'fail', 'functionalTest': 'none', Status: 'Failed'}
   ]);
});

app.get('/builds/:status/details/:build', function(req, res, next){
    if(req.params.status == 'Passed'){
        return res.json([
            {'changeList': '432462', build : true,  Status: 'Passed', buildTime : '3.15 am', unitTestCheck : true,unitTestPercentage : '89', unitTests : '250', unitTestPassed: '244', unitTestFailed : '6',buildData : ['250', '234','16'], functionalTestCheck: true, functionalTestPercentage : '99', functionalTests : '340', functionalTestPassed : '333', functionalTestFailed : '7'},
        ])
    }
    if(req.params.status == 'Failed'){
        if(req.params.build == 'pass'){
            return res.json([
                {'changeList': '432462',  Status: 'Failed', buildTime : '3.15 am', unitTestPercentage : '0', unitTests : '0', unitTestPassed: '0', unitTestFailed : '0',unitStatus : 'Cant Run', functionalTestPercentage : '0', functionalTests : '0', functionalTestPassed : '0', functionalTestFailed : '0', functionalStatus : 'Cant Run'}
            ])
        }
        if(req.params.build == 'fail'){
            return res.json([
                {'changeList': '432462',  Status: 'Failed', buildTime : '3.15 am', unitTestPercentage : '0', unitTests : '0', unitTestPassed: '0', unitTestFailed : '0',unitStatus : 'Cant Run', functionalTestPercentage : '0', functionalTests : '0', functionalTestPassed : '0', functionalTestFailed : '0', functionalStatus : 'Cant Run'}
            ])
        }

    }
    if(req.params.status == 'Running'){
        return res.json([
            {'changeList': '432462',  Status: 'Running', buildTime : '3.15 am', unitTestPercentage : '0', unitTests : '0', unitTestPassed: '0', unitTestFailed : '0',unitStatus : 'Waiting', functionalTestPercentage : '0', functionalTests : '0', functionalTestPassed : '0', functionalTestFailed : '0', functionalStatus : 'None'}
        ])
    }
    if(req.params.status == 'Pending'){
        return res.json([
            {'changeList': '432462',  Status: 'Pending', buildTime : '3.15 am', unitTestPercentage : '0', unitTests : '0', unitTestPassed: '0', unitTestFailed : '0',unitStatus : 'Pending', functionalTestPercentage : '0', functionalTests : '0', functionalTestPassed : '0', functionalTestFailed : '0', functionalStatus : 'None'}
        ])
    }
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
