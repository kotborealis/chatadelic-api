## ChatadelicApi v2
**Kind**: global class

* [ChatadelicApi](#ChatadelicApi)
    * [new ChatadelicApi(conf)](#new_ChatadelicApi_new)
    * [.login(callback)](#ChatadelicApi+login) ⇒ <code>[ChatadelicApi](#ChatadelicApi)</code>
    * [.logout(callback)](#ChatadelicApi+logout) ⇒ <code>[ChatadelicApi](#ChatadelicApi)</code>
    * [.message(obj, callback)](#ChatadelicApi+message) ⇒ <code>[ChatadelicApi](#ChatadelicApi)</code>
    * [.getOnline(callback)](#ChatadelicApi+getOnline) ⇒ <code>Array.&lt;String&gt;</code>

<a name="new_ChatadelicApi_new"></a>
### new ChatadelicApi(conf)

| Param | Type |
| --- | --- |
| conf |  |
| conf.username | <code>String</code> |
| conf.password | <code>String</code> |
| conf.chat | <code>Number</code> |
| [conf.interval] | <code>Number</code> |

<a name="ChatadelicApi+login"></a>
### chatadelicApi.login(callback) ⇒ <code>[ChatadelicApi](#ChatadelicApi)</code>
**Kind**: instance method of <code>[ChatadelicApi](#ChatadelicApi)</code>

| Param | Type |
| --- | --- |
| callback | <code>ChatadelicApiCallback</code> |

<a name="ChatadelicApi+logout"></a>
### chatadelicApi.logout(callback) ⇒ <code>[ChatadelicApi](#ChatadelicApi)</code>
**Kind**: instance method of <code>[ChatadelicApi](#ChatadelicApi)</code>

| Param | Type |
| --- | --- |
| callback | <code>ChatadelicApiCallback</code> |

<a name="ChatadelicApi+message"></a>
### chatadelicApi.message(obj, callback) ⇒ <code>[ChatadelicApi](#ChatadelicApi)</code>
**Kind**: instance method of <code>[ChatadelicApi](#ChatadelicApi)</code>

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>String</code> &#124; <code>Object</code> | Message text or object |
| obj.text | <code>String</code> | Message text |
| [obj.target] | <code>String</code> | Target of message (use this to send private messages) |
| callback | <code>ChatadelicApiCallback</code> |  |

<a name="ChatadelicApi+getOnline"></a>
### chatadelicApi.getOnline(callback) ⇒ <code>Array.&lt;String&gt;</code>
Get online list

**Kind**: instance method of <code>[ChatadelicApi](#ChatadelicApi)</code>

| Param | Type |
| --- | --- |
| callback | <code>ChatadelicApiCallback</code> |

