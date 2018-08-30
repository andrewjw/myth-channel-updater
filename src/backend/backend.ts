import MythTVAPI from "./api";
import Channel from "./channel";

const api = new MythTVAPI("localhost");

function printChannels(channels: Channel[]): void {
    channels.map((c) => console.log(c.SourceId, c.ChanNum, c.ChannelName));
}

api.getChannels(printChannels, console.log);
