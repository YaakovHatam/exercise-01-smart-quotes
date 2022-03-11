const fs = require('fs');
const os = require('os');

const current = require('./db/db.json');

fs.readFile('./db/oscar', 'utf8', function (err, data) {
   const rows = data.split(os.EOL);
   const mappedRows = rows.filter(Boolean).map(r => ({
      "quote": r.replace(/^"(.*)"$/, '$1'),
      "by": {
         "name": "Oscar Wilde",
         "picUrl": "https://cdn.britannica.com/21/94621-050-58D29508/Oscar-Wilde-1882.jpg?w=400&h=300&c=crop"
      },
      "rating": 0.0,
      "ratersCount": 0
   }));

   const mergedArray = current.concat(mappedRows);

   // remove dups
   const uniqueArray = mergedArray.filter((r, idx) => mergedArray.findIndex(rr => rr.quote == r.quote) === idx);

   // rebuild id's
   uniqueArray.forEach((r, idx) => r.id = idx + 1);

   console.log(uniqueArray);

   fs.writeFileSync('./db/db.json', JSON.stringify(uniqueArray));
})