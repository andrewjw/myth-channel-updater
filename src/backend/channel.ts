export default class Channel {
    public constructor(public ChanId: number,
                       public ChanNum: number,
                       public CallSign: string,
                       public IconURL: string,
                       public ChannelName: string,
                       public MplexId: number,
                       public ServiceId: number,
                       public ATSCMajorChan: number,
                       public ATSCMinorChan: number,
                       public FrequencyId: number,
                       public FineTune: number,
                       public SourceId: number,
                       public InputId: number,
                       public CommFree: boolean,
                       public UseEIT: boolean,
                       public Visible: boolean,
                       public XMLTVID: string,
                       public DefaultAuth: string) {}

    public static fromJson(json: any): Channel {
        // console.log(json);
        return new Channel(parseInt(json.ChanId[0], 10),
            parseInt(json.ChanNum[0], 10),
            json.CallSign[0],
            json.IconURL[0],
            json.ChannelName[0],
            parseInt(json.MplexId[0], 10),
            parseInt(json.ServiceId[0], 10),
            parseInt(json.ATSCMajorChan[0], 10),
            parseInt(json.ATSCMinorChan[0], 10),
            parseInt(json.FrequencyId[0], 10),
            parseInt(json.FineTune[0], 10),
            parseInt(json.SourceId[0], 10),
            parseInt(json.InputId[0], 10),
            json.CommFree[0].toLowerCase() !== "false",
            json.UseEIT[0].toLowerCase() !== "false",
            json.Visible[0].toLowerCase() !== "false",
            json.XMLTVID[0],
            json.DefaultAuth[0]);
    }
}
