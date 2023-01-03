const { ServerApiVersion } = require('mongodb');
const mongoose = require ('mongoose');
const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN+"?retryWrites=true&w=majority" , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1
        });
        console.log('BD en linea V 1.0');
      } catch(error) {
        console.log(error);
        throw new Error("Error a la hora de inicializar BD");
    }
}

module.exports = {dbConnection}
