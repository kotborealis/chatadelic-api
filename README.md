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
<dt><a href="#queueInterval">queueInterval([data], [callback])</a> ⇒ <code>string</code></dt>
<dd><p>Set queue execution interval
If data and callback === undefined returns queue interval</p>
</dd>
<dt><a href="#chat">chat([data], [callback])</a> ⇒ <code>string</code></dt>
<dd><p>Set chat id
If data and callback === undefined returns chat id</p>
</dd>
<dt><a href="#username">username([data], [callback])</a> ⇒ <code>string</code></dt>
<dd><p>Set username
If data and callback === undefined returns username</p>
</dd>
<dt><a href="#password">password(data, [callback])</a></dt>
<dd><p>Set password</p>
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

<a name="queueInterval"></a>
## queueInterval([data], [callback]) ⇒ <code>string</code>
Set queue execution interval
If data and callback === undefined returns queue interval

**Kind**: global function  
**Returns**: <code>string</code> - username  

| Param | Type |
| --- | --- |
| [data] | <code>string</code> | 
| [callback] | <code>function</code> | 

<a name="chat"></a>
## chat([data], [callback]) ⇒ <code>string</code>
Set chat id
If data and callback === undefined returns chat id

**Kind**: global function  
**Returns**: <code>string</code> - username  

| Param | Type |
| --- | --- |
| [data] | <code>string</code> | 
| [callback] | <code>function</code> | 

<a name="username"></a>
## username([data], [callback]) ⇒ <code>string</code>
Set username
If data and callback === undefined returns username

**Kind**: global function  
**Returns**: <code>string</code> - username  

| Param | Type |
| --- | --- |
| [data] | <code>string</code> | 
| [callback] | <code>function</code> | 

<a name="password"></a>
## password(data, [callback])
Set password

**Kind**: global function  

| Param | Type |
| --- | --- |
| data | <code>string</code> | 
| [callback] | <code>function</code> | 

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

