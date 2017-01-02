import { Injectable } from '@angular/core';
import { DataService } from '../../../../providers/data.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
@Injectable()
export class GeoCodingService {
    constructor (private dataService: DataService, private http: Http) {}

    geoCode(): any {
        var source = this._dataSource();
        return source;
    }    
      
    
    // private instance variable to hold base url for OpenCage 
     
     private _apiKey = 'f1cc451ffa0a0bcc531ff10b97816d0c';
    
     private _dataSource = function ( ) {
        this.apiKey = this._apiKey;
        this.logger = function (){}; // stub
        this.apiDomain = this.apiDomain || "api.opencagedata.com";
        this.version = this.version || "v1";


        this.requestData = function () {
            //debug("making request", queryOpts);
            var queryOpts = {
                key: this._apiKey
            };

            // openCageData query is encoded as per it's rules. URL encoding should not be done.
            var escapedQueryString = this.dataService.encode(queryOpts);
            var unescapedQueryString = this.dataService.decode(escapedQueryString);

            return this.http.get()
            ({
                method: "GET",
                host: this.apiDomain,
                port: 443,
                path: "/geocode/" + this.version + "/json?" + unescapedQueryString
            })
            .catch(function (err) {
            if (err.statusCode && err.statusCode >= 400 && err.statusCode < 500) {
                //debug("request error", err);
                if (err.hasOwnProperty("headers")) {
                this.logger("opencagedata:api:X-RateLimit-Reset", err.headers["X-RateLimit-Reset"]);
                }
                return err.response;
            } else {
                throw err;
            }
            })
            .then(function (res) {
                if (res.headers["X-RateLimit-Limit"] || res.headers["X-RateLimit-Remaining"]) {
                    this.logger("opencagedata:api:X-RateLimit-Limit", res.headers["X-RateLimit-Limit"]);
                    this.logger("opencagedata:api:X-RateLimit-Remaining", res.headers["X-RateLimit-Remaining"]);
                }

                var ct = res.headers["content-type"];
                if (ct.indexOf('json') > -1) {
                    res.body = JSON.parse(res.body);
                } else {
                    throw new Error("UNKNOWN_CONTENT_TYPE");
                }

                if (res.body.status.code !== 200) {
                    throw new Error(res.body.status.message);
                }

                //debug("Total results returned ", res.body.total_results);
                return res.body.results
                    .map(r => Object.assign(r, {confidenceInM: confidenceInM(r.confidence)}))
                    .sort((a,b) => (b.confidence - a.confidence));
            });
        };


        this.reverse = function (latitude, longitude, otherOpts) {
            if ([undefined, null, ""].indexOf(latitude) !== -1 || [undefined, null, ""].indexOf(longitude) !== -1) {
                return new Error("INVALID_ADDRESS");
            } else {
                return this.requestData(Object.assign({
                q: [latitude, longitude].join(",")
                }, otherOpts));
            }
        };

        this.search = function (address, otherOpts) {
            if ([undefined, null, ""].indexOf(address) !== -1) {
                return new Error("INVALID_ADDRESS");
            } else {
                //This must be URL encoded, ie spaces should be a +, and comma should be %2C.
                address = address.replace(/\s/g, "+").replace(/,/g,"%2C");
                return this.requestData(Object.assign({
                    q: address
                }, otherOpts));
            }
        };
    };



}



function confidenceInM (confidence) {
  // http://geocoder.opencagedata.com/api.html#confidence
  var confidenceInM = {
    10: 250,
    9: 500,
    8: 1000,
    7: 5000,
    6: 7500,
    5: 10000,
    4: 15000,
    3: 20000,
    2: 25000,
    1: Number.POSITIVE_INFINITY,
    0: Number.NaN
  };

  return confidenceInM[confidence] || Number.NaN;
}


