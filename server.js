/**
 * Created by GSrikumar on 6/21/2017.
 */
const express = require(`express`);
const hbs = require(`hbs`);
const fs = require(`fs`);

let app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
app.set(`view engine`,`hbs`);
app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
   let now = new Date().toString();
   let log = `${now}: ${req.method} ${req.url}`;
   console.log(log);
   fs.appendFile(`server.log`,`${log}\n`, (err) => {
       if (err) {
           console.log(`Unable to append server.log`);
       }
   });
   next();
});

app.use((req, res, next) => {
   res.render(`maintenance.hbs`, {
       pageTitle: `Be Right Back....`,
       maintenanceMsg: `We are upgrading our page and will be back soon :)`
   });
});
hbs.registerHelper(`getCurrentYear`,() => new Date().getFullYear());

hbs.registerHelper(`screamIt`, (text) => text.toUpperCase());

app.get(`/`, (req, res) => {
   //res.send(`<h1>Hello Express!!</h1>`);
   //  res.send({
   //      name: `Sri`,
   //      likes: [
   //          `Driving`,
   //          `Music`
   //      ]
   //  });
    res.render(`home.hbs`, {
        pageTitle: `Home Page`,
        welcomeMsg: `Welcome to the home page`
    });
});

app.get(`/about`, (req, res) => {
    //res.send(`About Page`);
    res.render(`about.hbs`, {
        pageTitle: `About Page`
    });
});

app.get(`/bad`, (req, res) => {
   res.send({
      errorMessage: `Problem handling the request`
   });
});
app.listen(3000, () => console.log(`Server is up on port 3000`));