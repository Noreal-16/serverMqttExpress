const mqtt = require('mqtt');
const mongodb = require('mongodb').MongoClient;

/**
 * Connection to MongoDB
 * @type {string}
 */


class MqttServer {
    constructor() {
        this.mqttClient = null;
        this.host = '192.168.100.30';
        this.port = '1883'
        this.username = 'riego'; // mqtt credentials if these are needed to connect
        this.password = '3435';
        this.uriMongo = 'mongodb://localhost:27017/mqttJs';
    }

    connect() {
        // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
        this.mqttClient = mqtt.connect(`mqtt://${this.host}:${this.port}`, { username: this.username, password: this.password });

        // Mqtt error calback
        this.mqttClient.on('error', (err) => {
            console.log(err);
            this.mqttClient.end();
        });

        // Connection callback
        this.mqttClient.on('connect', () => {
            console.log(`mqtt client connected`);
            const topic = ['home/sembrio1/humidity', 'home/sembrio1/temperature','home/sembrio1/humeditySolid'];
            this.mqttClient.subscribe(topic, ()=>{
                console.log(`Subcripción al topic ${topic}`);
            });
        });
        // When a message arrives, console.log it
        this.mqttClient.on('message', function (topic, payload) {
            console.log("El topic ",  topic ," y el mensaje ",  payload.toString());

            mongodb.connect('mongodb://localhost:27017/serverMqtt', function (error, client){
                if (error){
                    console.log("el error de la BD es " , error)
                }
                const myColection = client.db('serverMqtt').collection('serverMqtt');

                console.log(topic1);
                myColection.insertOne({
                    date: new Date(),
                    message: payload.toString(),
                    topic: topic
                },()=>{
                    console.log("Data enviada a MongoDb");
                    client.close();
                })
            })
        });

        this.mqttClient.on('close', () => {
            console.log(`mqtt client disconnected`);
        });
    }

    // Sends a mqtt message to topic: mytopic
    sendMessage(message) {
        this.mqttClient.publish('mytopic', message);
    }
}

module.exports = MqttServer;