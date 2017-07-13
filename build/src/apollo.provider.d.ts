/// <reference types="angular" />
import { ApolloQueryResult } from 'apollo-client';
import { Observable } from 'rxjs/Observable';
import ApolloClient from 'apollo-client';
import * as angular from 'angular';
import 'rxjs/add/observable/from';
import { ApolloQueryObservable } from './ApolloQueryObservable';
export declare class Apollo {
    private client;
    private $q;
    constructor(client: ApolloClient, $q: any);
    query<T>(options: any): angular.IPromise<ApolloQueryResult<T>>;
    watchQuery<T>(options: any): ApolloQueryObservable<ApolloQueryResult<T>>;
    mutate<T>(options: any): angular.IPromise<ApolloQueryResult<T>>;
    subscribe(options: any): Observable<any>;
    private check();
    private wrap<R>(promise);
}
export declare class ApolloProvider implements angular.IServiceProvider {
    private client;
    $get: (string | (($q: any) => Apollo))[];
    defaultClient(client: ApolloClient): void;
}
export declare const name = "apollo";
export default name;
