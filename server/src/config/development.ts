import * as dotenv from 'dotenv';

dotenv.config()

const development = {
    app:{
        SERVER_PORT:process.env.SERVER_PORT || 5001
    }
}

export default development