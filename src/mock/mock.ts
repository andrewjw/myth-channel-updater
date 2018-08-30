import * as express from "express";

const app = express();

app.get("/Channel/GetChannelInfoList",
        (req, res) => {
            if (parseInt(req.query.SourceID, 10) !== 1
             || parseInt(req.query.StartIndex, 10) !== 1
             || req.query.Details !== "true"
             || req.query.OnlyVisible !== "false") {
                res.status(400).send("Only acceptable parameters are "
                    + "SourceID=1&StartIndex=1&Details=true&OnlyVisible=false");
                return;
             }

            res.sendFile("data/GetChannelInfoList.xml", {
                root: __dirname + "../../../",
            });
        });

app.listen(6544, () => console.log("MythTV Mock Backend Listening On 6544"));
