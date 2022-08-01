'use strict';

//HOST SHOULD BE VPC
const host = 'localhost:9200';
// const host = 'vpc-telemetry-dev-2txxsa6mg6spymbjqvikavkxdi.us-east-2.es.amazonaws.com';
const protocol = 'https';
const auth = 'username:password'; // For testing only. Don't store credentials in code.
// var ca_certs_path = '/full/path/to/root-ca.pem';

// Optional client certificates if you don't want to use HTTP basic authentication.
// var client_cert_path = '/full/path/to/client.pem'
// var client_key_path = '/full/path/to/client-key.pem'

// Create a client with SSL/TLS enabled.
const { Client } = require('@opensearch-project/opensearch');
const fs = require('fs');
const client = new Client({
  //   node: protocol + '://' + auth + '@' + host,
  node: protocol + '://' + auth + '@' + host,
  // ssl: {
  //     ca: fs.readFileSync(ca_certs_path),
  //     // You can turn off certificate verification (rejectUnauthorized: false) if you're using self-signed certificates with a hostname mismatch.
  //     // cert: fs.readFileSync(client_cert_path),
  //     // key: fs.readFileSync(client_key_path)
  // }
});

async function test() {
  const index_name = 'purr';

  var response = await client.indices.create({
  	index: index_name,
  	// body: settings
  });

  console.log('Creating index:');
  console.log(response.body);

  // Add a document to the index.
//   const document = {
//     title: 'The Outsider',
//     author: 'Stephen King',
//     year: '2018',
//     genre: 'Crime fiction',
//   };

//   const response = await client.index({
//     index: index_name,
//     body: document,
//     refresh: false,
//   });

//   console.log('Adding document:');
//   console.log(response.body);
}

test()
  .then(() => console.log('Done'))
  .catch((ex) => console.log('err', ex));
