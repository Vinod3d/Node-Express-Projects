import redis from 'redis';
import { createClient } from 'redis';
  
const client  = createClient({
    host: 'localhost',
    port: 6379
})

client.on('error', (err) => {
    console.log('Redis Client Error', err);
})

async function testRedis(){
    try {
        await client.connect();
        console.log('Redis connected');

        await client.set('name', 'John Doe');
        const value = await client.get('name');
        console.log('Value from Redis:', value);
        const deleteCount = await client.del('name');
        console.log('Key deleted', deleteCount); 

        await client.set('age', 30);
        const incrementedValue = await client.incr('age');
        console.log('Incremented age value:', incrementedValue);
        
    } catch (error) {
        console.log('Error connecting to Redis', error);
    } finally {
        await client.quit();
        console.log('Redis connection closed');
    }
}

testRedis();