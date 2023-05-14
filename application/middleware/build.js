module.exports = {
    buildNavBar: function (req, res, next) {
        res.locals.navLinks = [
          { text: "Home", link: "/" },
          { text: "Library", link: "/viewpost" },
        ],
        console.log();
        next();
    },
    buildMenu: function(req, res, next) {
        res.locals.links = [
          { text: "MeTube Studio", link: "/postvideo" }
        ],
        console.log();
        next();
    },
    buildFooter: function(req, res, next) {
        res.locals.footerLinks = [
          { text: "Term of Service", link: "#" },
          { text: "About US", link: "#" },
          { text: "Privacy Notice", link: "#" },
          { text: "Help", link: "#" }
        ],
        console.log();
        next();
      }
}