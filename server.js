const bodyParser = require('body-parser');
const path = require(`path`);
const express = require('express');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
    console.log({
        name: req.body.name,
        message: req.body.message
    });
    res.send('Thanks for your message!');
});

app.get('/', (req, res) => {
    res.send('Hello from App Engine!');
});

app.get('/loginPage', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/form.html'));
});

app.post('/loginPage', (req, res) => {
    console.log(req.body.name);
    console.log(req.body.username);
    console.log(req.body.password);
});

app.get('/createbill', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/createBill.html'));
});

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
            'Authorization': 'Bearer eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..b1O-XDb6lrYUDUsgLq0JcQ.Mj0nI-vc9VcHAyWXZCGgMZaOE-vRm0G4Bs5RJx8ZIdqjSiFs0T2Ph4crwtgHwGGGmcpBDXfTr2Pj_fxwzTpu_L3WsbX-bl_65LuY0t8aismt6KJhoaj2b1Gk_m5X-yDIe6oSh8wK3XPKcPG5s0Z0vff1DOKpCvSERVyCxRqN1l71zcCeDVfEr0dDr_HwwqTQLkURTW5YfSRag44de2-PGiqZrNgRM4jNRJcgUj1HZBqoDb_siGbfTUHB1XJg7n6TaZcY79W8-BYIWZtX6XI6gKN7P9Gkb_IQLFE-i9tP2WTUbrbwapgLBEImlrXWkjWypu8q9QY0CBbGnMeRFRyPaAevhvzdY31MgvyE6JimueQGUNhx-eXy31Ues6cxCDnmYXmtZNtvuVe6Ya8yfOfiBX0MUiff7b0Bkdr5h--_I7cMVuW_FKvVyeZ38SKBtSg6S55yZFfldYHhGkBXjWs5rFCTCQgUR8-8RARPn5l7YPM8QFOaEPC6zCCzte5k8H0FP8qBqC9_aurdDEEd5bdvdje1WVMdGrfhsRvRs5Rac8z1Czh0WyuXc68tJlHUpp8uZkvY7Hzka9wTt-PsPu5CMUJBWG8AqeIxb4GXlGOm1eiFUeoROz6gOgMiau2bVs6DZc1iOferVxLTsIucZ1oEImnWVnljTngoaiCFQRQRZ1rJkFXW5Ovl5HlGLfbeYsaiFLFJWeiTMNTkbHsqJZFIYQ2PVUaAP8c6FnicMUVtY4lw-lOkYlgNT5ub5IqgB7V0.QxYWdSQsoqWhVDxgNmylqg'
        },

        body: 'select * from vendor where DisplayName = \'' + req.body.name + '\''

    };
    request(options, function(error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        var object = JSON.parse(response.body);
        console.log(object.QueryResponse.Vendor[0].Id);
        res.send(response.body);
    });

});






app.post('/loginPage', (req, res) => { //Route that handles signup logic

    console.log(req.body.name);

    console.log(req.body.username);

    console.log(req.body.password);

});





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