import * as http from "http";
import * as xml2js from "xml2js";

import Channel from "./channel";

export default class MythTVAPI {
    private prefix: string;

    constructor(hostname: string, protocol: string = "http", port: number = 6544) {
        this.prefix = protocol + "://" + hostname + ":" + port;
    }

    public getChannels(callback: (channels: Channel[]) => void,
                       errCallback: (error: any) => void): void {
        const req = http.get(this.prefix
            + "/Channel/GetChannelInfoList?SourceID=1&StartIndex=1&Details=true&OnlyVisible=false",
            (res) => {
                if (res.statusCode !== 200) {
                    errCallback("Got statusCode " + res.statusCode);
                    return;
                }

                let body = "";
                res.setEncoding("utf8");
                res.on("data", (chunk: string) => {
                    body = body + chunk;
                });
                res.on("end", () => {
                    xml2js.parseString(body, (err, result) => {
                        if (err) {
                            errCallback(err);
                        } else {
                            callback(result.ChannelInfoList.ChannelInfos[0].ChannelInfo.map(Channel.fromJson));
                        }
                    });
                });
            });

        req.on("error", errCallback);
    }
}
