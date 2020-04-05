const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});
const sub = redisClient.duplicate();

function fac(index) {
  return index ? index * fac(index - 1) : 1;
}

sub.on('message', (channel, message) => {
  redisClient.hset('values', message, fac(parseInt(message)));
});
sub.subscribe('insert');
