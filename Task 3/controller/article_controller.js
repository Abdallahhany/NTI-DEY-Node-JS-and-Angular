const connection = require("../database/connect");
const { ObjectId } = require("mongodb");

class Article {
  static all = (req, res) => {
    connection((err, db) => {
      db.collection("articles")
        .find()
        .toArray((e, articles) => {
          if (e) return res.render("err404");
          res.render("all_articles", {
            pageTitle: "all",
            articles,
          });
        });
    });
  }; //done

  static add = (req, res) => {
    res.render("add_article", { pageTitle: "add Article" });
  }; //done

  static addController = (req, res) => {
    let errors = {};
    if (!req.body.title) errors.title = "Please add Article Title";
    if (!req.body.content) errors.content = "Please add Article content";
    if (Object.keys(errors).length != 0)
      return res.render("add_article", { data: req.body, errors });
    connection((err, db) => {
      if (err) return res.redirect("/error");
      db.collection("articles")
        .insertOne(req.body)
        .then(() => res.redirect("/"))
        .catch((e) => res.redirect("/error"));
    });
  }; //done

  static edit = (req, res) => {
    const articleId = req.params.id;
    connection((err, db) => {
      if (err) return res.send(err.message);
      db.collection("articles")
        .findOne({ _id: new ObjectId(articleId) })
        .then((article) => {
          res.render("edit_article", { pageTitle: "edit", article });
        })
        .catch((e) => res.send(e.message));
    });
  }; //done

  static editController = (req, res) => {
    const articleId = req.params.id;
    connection((err, db) => {
      if (err) return res.send(err.message);
      db.collection("articles")
        .updateOne({ _id: new ObjectId(articleId) }, { $set: req.body })
        .then((article) => {
          res.redirect("/");
        })
        .catch((e) => res.send(e.message));
    });
  }; //done

  static single = (req, res) => {
    const articleId = req.params.id;
    connection((err, db) => {
      if (err) return res.send(err.message);
      db.collection("articles")
        .findOne({ _id: new ObjectId(articleId) })
        .then((article) => {
          res.render("single_article", { pageTitle: "single", article });
        })
        .catch((e) => res.send(e.message));
    });
  }; //done

  static deleteController = (req, res) => {
    const articleId = req.params.id;
    connection((err, db) => {
      if (err) return res.send(err.message);
      db.collection("articles")
        .deleteOne({ _id: new ObjectId(articleId) })
        .then((article) => {
          res.redirect("/");
        })
        .catch((e) => res.send(e.message));
    });
  }; //done

  static addComment = (req, res) => {
    res.render("comment", {
      pageTitle: "Comment in Article",
      _id: req.params._id,
    });
  };

  static addCommentController = (req, res) => {
    const articleId = req.params.id;
    connection((err, db) => {
      if (err) return res.send(err.message);
      db.collection("articles")
        .findOneAndUpdate(
          { _id: new ObjectId(articleId) },
          {
            $set: {
              comments: [{ name: req.body.name, details: req.body.details }],
            },
          }
        )
        .then((article) => {
          res.redirect("/");
        })
        .catch((e) => res.send(e.message));
    });
  };
}

module.exports = Article;
