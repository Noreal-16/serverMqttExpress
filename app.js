'use strict';
const express = require('express');
var bodyParser = require("body-parser");

const indexRouter = require('./routes/index');

const app = express();
const mqtt = require('mqtt');
const MqttServer = require('./Controller/MqttServer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*const dir_Ip_Broker = '192.168.100.30';
const port = '1883';
const client = (`mqtt://${dir_Ip_Broker}:${port}`);
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;*/

app.use('/', indexRouter);

app.get('/', function (req, res){
    res.send('Servidor levantado');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

/*const connectClient = mqtt.connect(client, {
    clientId,
    clean: true,
    connectTimeout:4000,
    username:'riego',
    password:'3435',
    reconnectPeriod:1000,
})

const topic = ['home/sembrio1/humidity', 'home/sembrio1/temperature','home/sembrio1/humeditySolid'];

connectClient.on('connect', ()=>{
    console.log('Conectado');
    /!**
     * Suscriptor puede recivir varios topic
     *!/
    connectClient.subscribe(topic, ()=>{
        console.log(`Subcripción al topic ${topic}`);
    })
})

connectClient.on('message', (topic,payload)=>{
    console.log("Mensaje Recibido " + topic + " Valor "+ payload);

})*/
const mqttCLient = new MqttServer();
mqttCLient.connect();

app.get("/dataServer", (req, res)=>{
    mqttCLient.su
})

app.listen(3000, ()=>{
    console.log("Servidor conectado");
});

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});