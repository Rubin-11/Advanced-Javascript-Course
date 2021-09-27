const express = require('express');
const fs = require('fs');
const cartRouter = require('./cartRouter');
const app = express(); // записывает в переменную app объект, который содержит основные методы express.
app.use(express.json()); // используй в себе. общение будет через строку json
app.use('/', express.static('../public')); // объясним серверу, что нужно отдавать статичные файлы, лежащие в определённой папке
app.use('/api/cart', cartRouter);
app.get('/api/products', (req, res) => { // научим сервер обрабатывать http-запросы
  fs.readFile('../server/db/products.json', 'utf-8', (err, data) => { // За чтение файлов отвечает метод readFile().
    if (err) {
      res.send(JSON.stringify({result: 0, text: err})); // С помощью res можно, например, отправить ответ. Для этого используется метод send():
      // res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      res.send(data);
    }
  });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening ${port} port`);
});
// app.get(); // READ
// app.post(); // CREATE
// app.put(); // UPDATE
// app.delete(); // DELETE
