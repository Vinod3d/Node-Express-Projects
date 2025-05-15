import redis from 'redis';
import { createClient } from 'redis';
  
const client  = createClient({
    host: 'localhost',
    port: 6379
})

client.on('error', (err) => {
    console.log('Redis Client Error', err);
})

async function redisDataStructures() {
    await client.connect();
    console.log('Connected to Redis');
    
    // 1.  Strings
    await client.set('name', 'John Doe');
    const name = await client.get('name');
    console.log(`Name: ${name}`);

    await client.mSet('name', 'Jane Doe', 'age', '30');
    const multiGet = await client.mGet('name', 'age');
    console.log(`Multi Get: ${JSON.stringify(multiGet)}`);

    //2.  Hashes -> HSET, HGET, HGETALL, HDEL

    // A Redis Hash is a data structure that stores a mapping between string fields and string values, similar to a JavaScript object or a dictionary in Python.
    

    await client.hSet('user:1000', 'username', 'johndoe');
    await client.hSet('user:1000', 'email', 'john@gmail.com')
    await client.hSet('user:1000', 'age', '30');
    await client.hSet('user:1000', 'address', '123 Main St');
    const username = await client.hGet('user:1000', 'username');
    console.log(`Username: ${username}`);   
    const user = await client.hGetAll('user:1000');
    

    console.log(`User: ${JSON.stringify(user)}`);

    //3.  Lists -> LPUSH, RPUSH, LRANGE, LPOP, RPOP
    // await client.lPush('tasks', 'task1'); // Add multiple tasks
    const tasks = await client.lRange('tasks', 0, -1);
    console.log(`Tasks: ${JSON.stringify(tasks)}`);
    // await client.rPush('tasks', 'task4');
    const tasksAfterPush = await client.lRange('tasks', 0, -1);
    console.log(`Tasks after push: ${JSON.stringify(tasksAfterPush)}`);
    const firstTask = await client.lPop('tasks');
    console.log(`First task popped: ${firstTask}`);
    const lastTask = await client.rPop('tasks');
    console.log(`Last task popped: ${lastTask}`);


    //4.  Sets -> SADD, SMEMBERS, SREM, SISMEMBER


    await client.sAdd('fruits', 'apple', 'banana', 'orange');
    await client.sAdd('tags', 'tag1', 'tag2', 'tag3');
    await client.sRem('tags', 'tag1');
    const isMember = await client.sIsMember('tags', 'tag1');
    console.log(`Is tag1 a member of tags? ${isMember}`);
    const tags = await client.sMembers('fruits');
    console.log(`Tags: ${tags}`);

    //5.  Sorted Sets -> ZADD, ZRANGE, ZREM, ZSCORE, ZRANK, ZREVRANK, ZRANGEBYSCORE, ZREVRANGEBYSCORE, ZCARD,

    // A Sorted Set in Redis is a special type of data structure that stores a collection of unique string elements, each associated with a floating-point number called a score. The elements are automatically sorted by their scores in ascending order.

    // ```js
    //     ZADD	zAdd()	Add or update an element with a score
    //     ZRANGE	zRange()	Get members by index range (sorted by score, low → high)
    //     ZREM	zRem()	Remove a member
    //     ZSCORE	zScore()	Get a member's score
    //     ZRANK	zRank()	Get a member’s rank (position) ascending
    //     ZREVRANK	zRevRank()	Get rank descending
    //     ZCARD	zCard()	Total number of elements in the sorted set
    // ```
    
    await client.zAdd('scores', { score: 100, value: 'player1' });
    await client.zAdd('scores', { score: 200, value: 'player2' });
    await client.zAdd('scores', { score: 150, value: 'player3' });
    const player1Score = await client.zScore('scores', 'player1');
    console.log(`Player1 Score: ${player1Score}`);
    const player1Rank = await client.zRank('scores', 'player1');
    console.log(`Player1 Rank: ${player1Rank}`);
    const player2Rank = await client.zRevRank('scores', 'player2');
    console.log(`Player2 Rank: ${player2Rank}`);
    const player3Rank = await client.zRevRank('scores', 'player3');
    console.log(`Player3 Rank: ${player3Rank}`);
    const player1ScoreRange = await client.zRangeByScore('scores', 0, 150);
    console.log(`Player1 Score Range: ${JSON.stringify(player1ScoreRange)}`);


    const scores = await client.zRange('scores', 0, -1, { WITHSCORES: true });
    console.log(`Scores: ${JSON.stringify(scores)}`);
    
    await client.quit();
}

redisDataStructures()
    .catch(err => {
        console.error('Error connecting to Redis', err);
    });