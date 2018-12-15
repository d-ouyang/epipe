import axios from 'axios';
export const METHOD_GET = 'GET';
export const METHOD_POST = 'POST';
export const METHOD_PUT = 'PUT';
export const METHOD_DELETE = 'DELETE';
export const METHOD_PATCH = 'PATCH';
import Vue from 'vue';
export class Client {

    constructor(options = {}, callbacks = {}) {
        this.options = Object.assign({}, {
            disabledGlobalErrorHandler: false
        }, options);

        this.callbacks = Object.assign({}, {
            tokenGetter: () => {
                return '';
            },
            defaultHandler: error => {
            },
            globalErrorHandler: null,
        }, callbacks);

        this.client = axios.create(this.options);
    }

    /**
     *
     * @param method
     * @param url
     * @param params
     * @param headers
     * @param options
     * @returns {AxiosPromise<any>}
     */
    fetch(method, url, params, headers = {}, options = {}) {
        let $this = this;

        let originHeader = {};
        if($this.callbacks.tokenGetter()){
            originHeader['Authorization'] = $this.callbacks.tokenGetter();
            
        }
        // if (url = '') { 
        //     originHeader['Content-Type'] = 'application/x-www-form-urlencoded';
        // }
        let requestOptions = {
            url,
            method,
            headers: Object.assign({}, originHeader ,headers),
            ...Object.assign({}, $this.options, options)
        };

        method = method.toUpperCase();
        switch (method) {
            case METHOD_GET:
                requestOptions.params = params;
                break;
            case METHOD_POST:
                requestOptions.data = params;
                break;
            case METHOD_PUT:
                requestOptions.data = params;
                break;
            case METHOD_DELETE:
                requestOptions.params = params;
                break;
            case METHOD_PATCH:
                requestOptions.data = params;
                break;
            default:
                requestOptions.data = params;
                break;
        }
        return new Promise((resolve, reject) => {
            $this.client.request(requestOptions).then(response => {
                Vue.prototype.loadingClose()
                if(response.status== 200 &&response.data.code == 1000 ){
                    resolve(response);
                }else if(response.data.code == 2001){
                    resolve(response);
                }
                // else if (response.data.code == 201) {
                    
                // }
                else{
                    $this.callbacks.errCode(response)
                }
            }).catch(error => {
                $this.callbacks.defaultHandler(error);
                if (!requestOptions.disabledGlobalErrorHandler &&
                    $this.callbacks.globalErrorHandler
                ) {
                    $this.callbacks.globalErrorHandler(error);
                }
                reject(error);
            });
        });
    }

}
