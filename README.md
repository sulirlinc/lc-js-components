# lc-js-components
js相关公共控件。

```javascript
import L from 'lc-js-components'
L.export.csv.execute('文件名',{
 csv:{
   "fields": [
     {
       "value": "paymentId",
       "label": "支付单号"
     },
     {
       "value": "outAmount",
       "label": "转出金额"
     },
     {
       "value": "feeAmount",
       "label": "手续费"
     },
     {
       "value": "balance",
       "label": "余额"
     },
     {
       "value": "operatorName",
       "label": "操作者"
     },
     {
       "value": "createAt",
       "label": "创建时间"
     }
   ],
   list: [{
     paymentId:1234591212323423,
     inAmount:100,
     feeAmount:1.02,
     balance:1000,
     operatorName: '黄小二',
     createAt: 1621592361
   }],//数据
   stringValues: ['paymentId'],//key 中对应的值 输出时，转换为字符串
   filters: (value, filter, enums) => {
     //过滤器
     //  value 每行的值。 
     // filter 过滤类型，对应着 "cast"中的值"filter";
     //比如可以过滤时间
     if (filter == "time") {
       return new Date(value);
     } else {
       return value
     }
   },
   "isCast": true,
   "cast": {
     "transactionType": {
       "filter": "emuns"
     },
     "createAt": {
       "filter": "time"
     }
   }
 }
})
```