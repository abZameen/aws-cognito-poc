const apiNamespace = '/api';

module.exports = (app) => {
  app.get(`${apiNamespace}/users`, async (req, res) => {
    try {
      res.json({
        users: [
          {
            name: "Ahmad Bilal",
            email: "ahmad.bilal@zameen.com",
            designation: "Software Engineer"
          },
          {
            name: "Muneeb Sajjad",
            email: "muneeb.sajjad@zameen.com",
            designation: "Software Engineer"
          },
          {
            name: "Faheem Arshad",
            email: "faheem.arshad@zameen.com",
            designation: "Software Engineer"
          },
          {
            name: "Usman Shafique",
            email: "usman.shafique@zameen.com",
            designation: "SQA Engineer"
          },
          {
            name: "Numan Manj",
            email: "numan.manj@zameen.com",
            designation: "SQA Engineer"
          }
        ]
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
}