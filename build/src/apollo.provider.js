"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_client_rxjs_1 = require("apollo-client-rxjs");
var Observable_1 = require("rxjs/Observable");
var angular = require("angular");
require("rxjs/add/observable/from");
var ApolloQueryObservable_1 = require("./ApolloQueryObservable");
var Apollo = (function () {
    function Apollo(client, $q) {
        this.client = client;
        this.$q = $q;
    }
    Apollo.prototype.query = function (options) {
        this.check();
        return this.wrap(this.client.query(options));
    };
    Apollo.prototype.watchQuery = function (options) {
        this.check();
        return new ApolloQueryObservable_1.ApolloQueryObservable(apollo_client_rxjs_1.rxify(this.client.watchQuery)(options));
    };
    Apollo.prototype.mutate = function (options) {
        this.check();
        return this.wrap(this.client.mutate(options));
    };
    Apollo.prototype.subscribe = function (options) {
        if (typeof this.client.subscribe === 'undefined') {
            throw new Error("Your version of ApolloClient doesn't support subscriptions");
        }
        return Observable_1.Observable.from(this.client.subscribe(options));
    };
    Apollo.prototype.check = function () {
        if (!this.client) {
            throw new Error('Client is missing. Use ApolloProvider.defaultClient');
        }
    };
    Apollo.prototype.wrap = function (promise) {
        return this.$q(function (resolve, reject) {
            promise.then(resolve).catch(reject);
        });
    };
    return Apollo;
}());
exports.Apollo = Apollo;
var ApolloProvider = (function () {
    function ApolloProvider() {
        var _this = this;
        this.$get = ['$q', function ($q) { return new Apollo(_this.client, $q); }];
    }
    ApolloProvider.prototype.defaultClient = function (client) {
        this.client = client;
    };
    return ApolloProvider;
}());
exports.ApolloProvider = ApolloProvider;
exports.name = 'apollo';
angular.module(exports.name, [])
    .provider('apollo', new ApolloProvider);
exports.default = exports.name;
//# sourceMappingURL=apollo.provider.js.map