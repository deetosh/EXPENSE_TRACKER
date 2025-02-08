import { Sequelize } from "sequelize";
import config from "../../config/config";
import { ENV_NODE_ENV } from "../../secret";

const env_config = `${ENV_NODE_ENV}` == 'development'? config.development : config.production;

class EXTR_DB {
    private sequelizeConnection: Sequelize;
    constructor(){
        console.log(`Connecting database`);
        this.sequelizeConnection = new Sequelize(env_config.database, env_config.username, env_config.password, env_config);
    }

    getConnection(): Sequelize {
        try {
            return this.sequelizeConnection;
        }
        catch (error) {
            console.log("Database Connection Error: ", error);
            throw error;
        }
    }

    async testConnection(): Promise<boolean> {
        try {
            await this.sequelizeConnection.authenticate();
            return true;
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            return false;
        }
    }
}

export default new EXTR_DB();