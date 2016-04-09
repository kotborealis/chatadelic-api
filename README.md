## Functions

<dl>
<dt><a href="#onopen">onopen(e)</a></dt>
<dd><p>Event on websocket open</p>
</dd>
<dt><a href="#onmessage">onmessage(e)</a></dt>
<dd><p>Event on chat message</p>
</dd>
<dt><a href="#onlogin">onlogin(e)</a></dt>
<dd><p>Event on user login</p>
</dd>
<dt><a href="#onlogout">onlogout(e)</a></dt>
<dd><p>Event on user logout</p>
</dd>
<dt><a href="#setQueueInterval">setQueueInterval(data, callback)</a> ⇒ <code>ChatadelicApi</code></dt>
<dd></dd>
<dt><a href="#getQueueInterval">getQueueInterval()</a> ⇒ <code>number</code></dt>
<dd></dd>
<dt><a href="#setChat">setChat(data, callback)</a> ⇒ <code>ChatadelicApi</code></dt>
<dd></dd>
<dt><a href="#getChat">getChat()</a> ⇒ <code>number</code></dt>
<dd></dd>
<dt><a href="#setUsername">setUsername(data, callback)</a> ⇒ <code>ChatadelicApi</code></dt>
<dd></dd>
<dt><a href="#getUsername">getUsername()</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#setPassword">setPassword(data, callback)</a> ⇒ <code>ChatadelicApi</code></dt>
<dd></dd>
<dt><a href="#getPassword">getPassword()</a> ⇒ <code>string</code></dt>
<dd><p>DO NOT return password</p>
</dd>
<dt><a href="#init">init(callback)</a></dt>
<dd><p>Init chatadelcic session</p>
</dd>
<dt><a href="#login">login([callback])</a></dt>
<dd><p>Login</p>
</dd>
<dt><a href="#logout">logout([callback])</a></dt>
<dd><p>Logout</p>
</dd>
<dt><a href="#message">message(data, [callback])</a></dt>
<dd><p>Send message</p>
</dd>
<dt><a href="#privateMessage">privateMessage(user, message, callback)</a></dt>
<dd><p>Send private message to user</p>
</dd>
<dt><a href="#queueAdd">queueAdd(type, [data], [callback])</a></dt>
<dd><p>Add chatadelic act to queue</p>
</dd>
<dt><a href="#getOnline">getOnline()</a> ⇒ <code>Array</code></dt>
<dd></dd>
</dl>

<a name="onopen"></a>
## onopen(e)
Event on websocket open

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>Object</code> | event |

<a name="onmessage"></a>
## onmessage(e)
Event on chat message

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>Object</code> | event |

<a name="onlogin"></a>
## onlogin(e)
Event on user login

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>Object</code> | event |

<a name="onlogout"></a>
## onlogout(e)
Event on user logout

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>Object</code> | event |

<a name="setQueueInterval"></a>
## setQueueInterval(data, callback) ⇒ <code>ChatadelicApi</code>
**Kind**: global function  
**Returns**: <code>ChatadelicApi</code> - Returns this to chain methods  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>number</code> | Queue execution interval |
| callback | <code>function</code> |  |

<a name="getQueueInterval"></a>
## getQueueInterval() ⇒ <code>number</code>
**Kind**: global function  
**Returns**: <code>number</code> - Queue execution interval  
<a name="setChat"></a>
## setChat(data, callback) ⇒ <code>ChatadelicApi</code>
**Kind**: global function  
**Returns**: <code>ChatadelicApi</code> - Returns this to chain methods  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>number</code> | Chat id |
| callback | <code>function</code> |  |

<a name="getChat"></a>
## getChat() ⇒ <code>number</code>
**Kind**: global function  
**Returns**: <code>number</code> - Chat id  
<a name="setUsername"></a>
## setUsername(data, callback) ⇒ <code>ChatadelicApi</code>
**Kind**: global function  
**Returns**: <code>ChatadelicApi</code> - Returns this to chain methods  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | Username |
| callback | <code>function</code> |  |

<a name="getUsername"></a>
## getUsername() ⇒ <code>string</code>
**Kind**: global function  
**Returns**: <code>string</code> - Username  
<a name="setPassword"></a>
## setPassword(data, callback) ⇒ <code>ChatadelicApi</code>
**Kind**: global function  
**Returns**: <code>ChatadelicApi</code> - Returns this to chain methods  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | Password |
| callback | <code>function</code> |  |

<a name="getPassword"></a>
## getPassword() ⇒ <code>string</code>
DO NOT return password

**Kind**: global function  
**Returns**: <code>string</code> - Empty string  
<a name="init"></a>
## init(callback)
Init chatadelcic session

**Kind**: global function  

| Param |
| --- |
| callback | 

<a name="login"></a>
## login([callback])
Login

**Kind**: global function  

| Param | Type |
| --- | --- |
| [callback] | <code>function</code> | 

<a name="logout"></a>
## logout([callback])
Logout

**Kind**: global function  

| Param | Type |
| --- | --- |
| [callback] | <code>function</code> | 

<a name="message"></a>
## message(data, [callback])
Send message

**Kind**: global function  

| Param | Type |
| --- | --- |
| data | <code>string</code> | 
| [callback] | <code>function</code> | 

<a name="privateMessage"></a>
## privateMessage(user, message, callback)
Send private message to user

**Kind**: global function  

| Param |
| --- |
| user | 
| message | 
| callback | 

<a name="queueAdd"></a>
## queueAdd(type, [data], [callback])
Add chatadelic act to queue

**Kind**: global function  
**Access:** public  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| [data] | <code>string</code> | 
| [callback] | <code>function</code> | 

<a name="getOnline"></a>
## getOnline() ⇒ <code>Array</code>
**Kind**: global function  
**Returns**: <code>Array</code> - Online list  
