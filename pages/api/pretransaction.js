// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var https = require("https");
// const express = require('express')
// const app = express()
// const { parse } = require('querystring');
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'ejs');
// app.set('views', __dirname);
// app.use(express.static('./assets'));
// const port = 8080
const PaytmChecksum = require("paytmchecksum");

export default async function handler(req, res) {
  if (req.method === "POST") {
    // const Config = require('./config');
    // var orderId= "Ord_"+Date.now();
    // var amount = "1.00";

    var paytmParams = {};
    paytmParams.body = {
      requestType: "Payment",
      mid: process.env.NEXT_PUBLIC_MID,
      websiteName: "WEBSTAGING",
      orderId: req.body.oid,
      callbackUrl: `${process.env.NEXT_PUBLIC_PAYTM_HOST}/api/posttransaction`,
      txnAmount: {
        value: req.body.subTotal,
        currency: "INR",
      },
      userInfo: {
        custId: req.body.email,
      },
    };

    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      process.env.NEXT_PUBLIC_MKEY
    );

    paytmParams.head = {
      signature: checksum,
    };

    var post_data = JSON.stringify(paytmParams);

    const requestAsync = async () => {
      return new Promise((resolve, reject) => {
        var options = {
          /* for Staging */
          hostname: process.env.NEXT_PUBLIC_PAYTM_HOST,
          port: 443,
          path:
            "/theia/api/v1/initiateTransaction?mid=" +
            process.env.NEXT_PUBLIC_MID +
            "&orderId=" +
            req.body.oid,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": post_data.length,
          },
        };

        var response = "";
        var post_req = https.request(options, function (post_res) {
          post_res.on("data", function (chunk) {
            response += chunk;
          });

          // resolved
          resolve(response);
        });
        // post_req.write(post_data);
        // post_req.end();
      });
    };

    let myr = await requestAsync();
    res.status(200).json(myr);
  }
}
