#!/bin/bash

# Initialize config server replicaset
docker-compose exec configsvr mongo --eval "rs.initiate({_id: 'configrs', configsvr: true, members: [{_id: 0, host: 'configsvr:27017'}]})"

# Initialize shard1 replicaset
docker-compose exec shard1 mongo --eval "rs.initiate({_id: 'shard1rs', members: [{_id: 0, host: 'shard1:27017'}]})"

# Initialize shard2 replicaset
docker-compose exec shard2 mongo --eval "rs.initiate({_id: 'shard2rs', members: [{_id: 0, host: 'shard2:27017'}]})"

# Wait for the replicasets to initialize
sleep 30

# Add shards to the cluster
docker-compose exec mongos mongo --eval "sh.addShard('shard1rs/shard1:27017')"
docker-compose exec mongos mongo --eval "sh.addShard('shard2rs/shard2:27017')"

# Enable sharding for the eldorado database
docker-compose exec mongos mongo --eval "sh.enableSharding('eldorado')"

# Create a sharded collection (replace 'items' with your actual collection name)
docker-compose exec mongos mongo --eval "sh.shardCollection('eldorado.items', {_id: 'hashed'})"