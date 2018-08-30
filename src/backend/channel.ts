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
                       public CommFree: number,
                       public UseEIT: number,
                       public Visible: number,
                       public XMLTVID: string,
                       public DefaultAuth: string) {}

    public static fromJson(json: any): Channel {
        // console.log(json);
        return new Channel(json.ChanId[0],
            json.ChanNum[0],
            json.CallSign[0],
            json.IconURL[0],
            json.ChannelName[0],
            json.MplexId[0],
            json.ServiceId[0],
            json.ATSCMajorChan[0],
            json.ATSCMinorChan[0],
            json.FrequencyId[0],
            json.FineTune[0],
            json.SourceId[0],
            json.InputId[0],
            json.CommFree[0],
            json.UseEIT[0],
            json.Visible[0],
            json.XMLTVID[0],
            json.DefaultAuth[0]);
    }
}
