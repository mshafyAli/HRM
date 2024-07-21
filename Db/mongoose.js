import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectDataBase = async()=>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log('Successfully connected to MongoDB');
    }catch(e){
        console.log(e);
        await mongoose.disconnect();
        process.exit(1);
    }
}
 connectDataBase().catch(console.dir)
     process.on('SIGINT', async () => {
        console.log('app is terminating');
        await mongoose.disconnect();
        process.exit(0);
        
});
export default connectDataBase;