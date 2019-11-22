const friends = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        return res.json(friends);
    });
    app.post("/api/friends", function (req, res) {
        const newFriend = req.body;
        const scoresArr = newFriend.scores.map(function (score) {
            return parseInt(score);
        });

        function addTotal(a, b) {
            return a + b;
        }

        const friendsTotal = [];
        for (let i = 0; i < friends.length; i++) {
            friendsTotal.push(friends[i].scores.reduce(addTotal, 0));
        }

        const userTotal = scoresArr.reduce(addTotal, 0);
        const totalDifference = friendsTotal.map(function (value) {
            return Math.abs(value - userTotal)
        });

        const index = totalDifference.indexOf(Math.min.apply(null, totalDifference));
        friends.push(newFriend);
        return res.json(friends[index]);
    });
}
