const passport = require("passport");

module.exports = app => {
    app.get(
        "/auth/google",
        passport.authenticate("google", {
            scope: ["profile", "email"]
        })
    );

    app.get(
        "/auth/google/callback",
        passport.authenticate("google"),
        (req, res) => {
            res.redirect("/");
        }
    );

    app.get(
      "/facebook", 
      passport.authenticate("facebook", {
        scope: ["email"]
      })
    );

    app.get(
      "/facebook/callback", 
      passport.authenticate("facebook", { failureRedirect: "/failedLogin" }),
      (req, res) => {
        if (process.env.NODE_ENV === "production") {
          return res.redirect("/");
        } else {
          return res.redirect("http://localhost:3000"); 
        }
      }
    );

    app.get("/api/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    app.get("/api/current_user", (req, res) => {
        res.send(req.user);
    });
};
