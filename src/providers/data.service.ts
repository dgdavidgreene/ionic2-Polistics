import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

type CallbackFunctionVariadicAnyReturn = (...args: any[]) => any;

@Injectable()
export class DataService {
     // Resolve HTTP using the constructor
     constructor (private http: Http, private apiKey: string) {}
     // private instance variable to hold base url
     //private requestUrl = 'http://localhost:3000/api/comments';
    // private requestUrl = 'http://578f454de2fa491100415d08.mockapi.io/api/Comment'; 
     
     // Fetch all existing comments
     get(requestUrl: string) : Observable<any[]>{
         var headers = new Headers();
         headers.append('Content-Type', 'application/json; charset=utf-8');
         // ...using get request
         return this.http.get(requestUrl,{headers})
                        // ...and calling .json() on the response to return data
                         .map((res:Response) => res.json())
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
     }

     // Add a new comment
    add (requestUrl: string, body: Object): Observable<any[]> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(requestUrl, body, options) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }   

    // Update a comment
    update (requestUrl: string, body: Object): Observable<any[]> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.put(`${requestUrl}/${body['id']}`, body, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }   
    // Delete a comment
    remove (requestUrl: string, id:string): Observable<any[]> {
        return this.http.delete(`${requestUrl}/${id}`) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }   

    decode(qs: string, sep:string, eq:string, options: Object) {
        sep = sep || '&';
        eq = eq || '=';
        var obj = {};

        if (typeof qs !== 'string' || qs.length === 0) {
            return obj;
        }

        var regexp = /\+/g;
        var qsArray = [];
        qsArray = qs.split(sep);
        qs = qsArray.toString();

        var maxKeys = 1000;
        /*if (options && typeof options.maxKeys === 'number') {
            maxKeys = options.maxKeys;
        }*/

        var len = qs.length;
        // maxKeys <= 0 means that we should not limit keys count
        if (maxKeys > 0 && len > maxKeys) {
            len = maxKeys;
        }

        for (var i = 0; i < len; ++i) {
            var x = qs[i].replace(regexp, '%20'),
                idx = x.indexOf(eq),
                kstr, vstr, k, v;

            if (idx >= 0) {
            kstr = x.substr(0, idx);
            vstr = x.substr(idx + 1);
            } else {
            kstr = x;
            vstr = '';
            }

            k = decodeURIComponent(kstr);
            v = decodeURIComponent(vstr);

            if (!this.hasOwnProperty(obj, k)) {
            obj[k] = v;
            } else if (this.isArray(obj[k])) {
            obj[k].push(v);
            } else {
            obj[k] = [obj[k], v];
            }
        }

        return obj;
    }; 

    encode (obj: string, sep:string, eq:string, name:string){
        sep = sep || '&';
        eq = eq || '=';
        if (obj === null) {
            obj = undefined;
        }

        if (typeof obj === 'object') {
            return this.map(this.objectKeys(obj), function(k) {
            var ks = encodeURIComponent(this.stringifyPrimitive(k)) + eq;
            if (this.isArray(obj[k])) {
                return this.map(obj[k], function(v) {
                return ks + encodeURIComponent(this.stringifyPrimitive(v));
                }).join(sep);
            } else {
                return ks + encodeURIComponent(this.stringifyPrimitive(obj[k]));
            }
            }).join(sep);

        }

        if (!name) return '';
        return encodeURIComponent(this.stringifyPrimitive(name)) + eq +
                encodeURIComponent(this.stringifyPrimitive(obj));
    };



    private getHeaders(){
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
    }

    private hasOwnProperty(obj: Object, prop: string) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
    }

    private isArray(obj: any): boolean {
    return Array.isArray(obj);
    }

    private stringifyPrimitive(v) {
        switch (typeof v) {
            case 'string':
            return v;

            case 'boolean':
            return v ? 'true' : 'false';

            case 'number':
            return isFinite(v) ? v : '';

            default:
            return '';
        }
    }

    private map (xs:any[], f:CallbackFunctionVariadicAnyReturn) {
        if (xs.map) return xs.map(f);
        var res = [];
        for (var i = 0; i < xs.length; i++) {
            res.push(f(xs[i], i));
        }
        return res;
    }

    private objectKeys = Object.keys || function (obj) {
        var res = [];
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
        }
        return res;
    }

    
}