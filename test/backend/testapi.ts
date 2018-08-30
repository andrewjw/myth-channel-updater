/* tslint:disable:no-unused-expression */

import { expect } from "chai";
import { describe, it } from "mocha";
import * as nock from "nock";

import MythTVAPI from "../../src/backend/api";

import { singleChannelInfo } from "./mock_responses";

const api = new MythTVAPI("mocked");

describe("Test GetChannels", () => {
  it("Should return list of one channel", (done) => {
    nock("http://mocked:6544")
      .get("/Channel/GetChannelInfoList?SourceID=1&StartIndex=1&Details=true&OnlyVisible=false")
      .reply(200, singleChannelInfo);

    api.getChannels((c) => {
        expect(c).to.have.lengthOf(1);
        expect(c[0].ChanId).to.be.equal(100);
        expect(c[0].ChanNum).to.be.equal(1);
        expect(c[0].CallSign).to.be.equal("First Channel");
        expect(c[0].ChannelName).to.be.equal("First Channel Name");
        expect(c[0].CommFree).to.be.false;
        expect(c[0].Visible).to.be.true;

        done();
    }, (err) => done(err));
  });
});
