const bodyParser = require('body-parser');
const path = require(`path`);
const express = require('express');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

//this is for the submit page, used for testing
app.post('/submit', (req, res) => {
    console.log({
        name: req.body.name,
        message: req.body.message
    });
    res.send('Thanks for your message!');
});

//generic code that came with the app
app.get('/', (req, res) => {
    res.send('Hello from App Engine!');
});

//testing login page that connected to html
app.get('/loginPage', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/form.html'));
});

// post part of the testing login page
app.post('/loginPage', (req, res) => {
    console.log(req.body.name);
    console.log(req.body.username);
    console.log(req.body.password);
});

// used for testing, retrieve html file
app.get('/createbill', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/createBill.html'));
});
// used for testing, first test of using a webpage to get info from sandbox
app.post('/createbill', (req, res) => {
    console.log(req.body.name);

    var request = require('request');
    var options = {
        'method': 'POST',
        'url': 'https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365217166250/query',
        'headers': {
            'User-Agent': '{{UserAgent}}',
            'Accept': 'application/json',
            'Content-Type': 'application/text',
            'Authorization': 'Bearer eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..-iG26Arov9V7ITMHef6nhg.wLsU7Kiajgv96h8PbVq8d4iiDqb08sqKpK8dIsyiDkvZ8ln13LEzie1rfxw_JpwDACe3qwwshPOOhXHJCw99WxnW_dCu-V7VEBiFRiSAI0lbjF7it-N22A8BsifTDZftv1oOLDNGVHwE53TmX-DJcDlgUSxZZuIK165I97PpujsrJWippMRQT0S6CSiV8-Iu9SZRIyIhRr-OsPSZ36SQwoR440bCpOXLNIQRiur0VWZToxmPuhdyYbSJx_qG749qUS-Va0W0mCKpz3dW3PifVLe1hLrthyP9tfeAzfAnUDa4X3Jf80dTpyLOpbF3BLs3ofFMyJnE4AaB01g43bmwNKaVmlSzq9pe7rUfRI2jWsbZnymOaKcfRWBMPYa8iS5UyEoMEPno4nX3tHSE6SEERCfE4SInZTSJBAnl3CmrFmho6Bsdp9gCnzW3MRtcUd3qbbzJpB6-Scsdwx59c5dxE_g5nCVAAtwKzCD6SsdAS55JAJHpvKFbHi49xFJvl5gB4LShYRltlnMgteZ3dC_om06jDRVakWMBw8QiJA_u1ZmWU5QuFFs1eNOb6xCSaXqnmTkyGfyqJ0I3gqeTEyZW7Q3VQNRVj5RFqhmPyD8THxIv3-56naTu8MOkp0c1tkR9MHVI9a76WfaWelTwdCe2d_k55mmy4UnfpnmjdXyWvRXBdScLFodV-CWxiit2sAifT8-ZL8oFiFpfjXi7SFX69c-G6CPsrVOu9Ojq1XuZuvrxyc9qFIwlTDM165X8MVyx.SG3aCIPL3348c16EQHW7_g'
        },

        body: 'select * from vendor where DisplayName = \'' + req.body.name + '\''

    };

    //parse vendor info
    request(options, function(error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        var object = JSON.parse(response.body);
        console.log(object.QueryResponse.Vendor[0].Id);
        res.send(response.body);
    });

});

//one of the most important lines
app.get('/vendorname', (req, res) => {
    console.log(req.body.name);

    var request = require('request');
    var options = {
        'method': 'POST',
        'url': 'https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365217166250/query',
        'headers': {
            'User-Agent': '{{UserAgent}}',
            'Accept': 'application/json',
            'Content-Type': 'application/text',
            // this auth key needs to change every few hours
            'Authorization': 'Bearer eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..QPDmJZvcPs3mooX0h67m5Q.daiTqsnAiAh6nZMXhwD8Hs7IlEH2UFIA2tGGoxzFsQO8V5dbT49_E2wS4Mvf0Rk-lHv7aqxY40bxBAPLAaHMH_jeLBup6JTLAsax_BGR4Sbq7qK-9pXNilc5gx_mlGvIa1U1hP5Jyr7j62G8dfTQ6gEGFN1FdRYpMKgS9Wi0g1BeQTiFRmM8R7EDRAcLr7W7ARh8LSbnSuu-K-avaH260D5m2c6ycSlJA66JxPzNv9jfTTEa7jW_NFgdavxIma6uAfeXeQBj464Mac5gNMfLq5EPyzxc0tp8HzkPkannR8cV2VnaXNXuEwYYDPJDdUpBCC0kbKLlkmIdIEZiTcuFJz28izcOL4KlRCvECiBL771POrFRAzXj8PG6JO9ex_kLLEJdxWAtqIlFV_blD1RhOukVrVC9OVOei4VRggr4pYyP8uoMTXCw_-IuUW8JDFUF3J5wQHpSLrcX2UHtc0gnoCaOVwt24JVkqM8kM9qWDmxrnQnPxHErbmcYAr1Yzh6q_70DZ9_R26KWF7FM1Pd8Qt8bslzU6TWvkSCWA8jz4mPz6uSUnGdeyEFSj8a8QUvFjhlvRKQlsferwbm6BGXeQNDk8bFLCaWHrCj6LdqhUmMq3S-joLsJ4taMZnpuStnpPop1oONMUFEzmaIo6wN4mc3SETynzw_NI9ezSc-OL1aQQpgwXyZoUUvKyQh9zBws7SMYVGMxgfNBAR8C-WNeqwi6UdNoVVc2qFY1o9n3-KzWot8QLnPpV-tWb_v6lUri.FVC8Wy3iaUedtHOBWH_eIA'
        },
        body: 'select DisplayName from vendor '

    };
    //making array for the (for loop)
    request(options, function(error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        var object = JSON.parse(response.body);
        console.log(object.QueryResponse.Vendor);
        //console.log(object.QueryResponse);
        var arrayName = new Array();
        var data = { vendors: [] } // initially empty

        //loop that pushes info into array
        for (let i = 0; i < object.QueryResponse.Vendor.length; i++) {
            //arrayName.push(object.QueryResponse.Vendor[i].DisplayName
            //arrayName.push(object.QueryResponse.Vendor[i].ID)
            //res.send(object.QueryResponse.Vendor.DisplayName);
            data.vendors.push({
                displayName: object.QueryResponse.Vendor[i].DisplayName,
                vendorID: object.QueryResponse.Vendor[i].Id
            });
        }




        // here i think we send text instead of array
        res.send(data) //send new array in place of "object.QueryResponse.Vendor"

    });

});





//used for testing
app.post('/loginPage', (req, res) => { //Route that handles signup logic

    console.log(req.body.name);

    console.log(req.body.username);

    console.log(req.body.password);

});




//used for primary test of sandbox
app.get('/test', (req, res) => {
    var request = require('request');
    var options = {
        'method': 'GET',
        'url': 'https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365217166250/companyinfo/4620816365217166250',
        'headers': {
            'User-Agent': '{{UserAgent}}',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..OEr-wxhOoYyTnj8MT-vYHQ.7l9a_R0UP5vM_P1be9Ogc19iEah4n2ZtKsLH5zH4pUFguHLehnS2NsDOcdeQsxPASmHZg2PW_aecOvXjjfzBZgbVk9eYs6Wv-9340DKVpgTCy2iM1xUUs982i0X02kLEQZjdywDAfRGYa_42SQoWyIFfsaRI5vlas9HK595Tt1yQLOC9CkjbNKAbrNddNtrx3luW9MWbdE6yIu5uHKy3TTH4tSanCa1j-hC7sltHH3pic_Kk9jfBA7n8G6Wx342L1UlsqSAAjPZhtHRpr_ph65tVNnjUxx3uQBD3hUXGiikXDYVBEulCt_c8KWfdOQYQ8ngenJv_s0X9poPG5XFjmMjUWaDCzmPdNHOYLZLSMzN6ZUvTSY6qzbfjEOF_T7O2Ijxh41riDyorQfv3hBSGvcMZLv7yP4kRB36v78nV0tAdVZbWUMy3_nDfBhHNMvJXJJMZh7EOdP1PEswPoZZLq-w_ylUsxVA_rhxhQ76wQguLpZuZQN6BUzSJyQU-m_0Hwup4QNkrMm1eSW3baXlR7k1jZEbgcrrdNFzh_YngpE_4la8WH7CaPcYgCwUutF4QPv5PgceMJpM0nJT6LDG0yMyQAWYjzRrHC2eUKGrK3pxWX5VwElJugNto9BsOAVVVI6_PELtw2VKni4LbHysiUeW6WS-87MlZQs0rVuYj6A4yTi8O19swZcJeSy8P4cA06lc4_bOFZaxjIq9lnOVMRVegy1HQejRaw1Pg_TiCd2FMBP3THpToo7eqI8Y5FTKD.zj4cCobKuf3RO9ktFBVN9w'
        }
    };
    request(options, function(error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        res.send(response.body)
    });;
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});