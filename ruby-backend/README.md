# Ruby on Rails API

## How to run it?
Make sure you have ruby and rails installed:
```
ruby -v
ruby 2.7.0p0 (2019-12-25 revision 647ee6f091) [x86_64-linux-gnu]
rails -v
Rails 5.2.3
```
If not, or there are some problems - run:
```
sudo apt install -y ruby-dev
sudo apt install -y ruby-railties
sudo apt-get install -y libxslt-dev libxml2-dev zlib1g-dev 
sudo apt-get install -y sqlite3 libsqlite3-dev
bundle install
```
if ```nokogiri``` still fails to install, run:
```
sudo apt-get install build-essential
bundle install
```

## What does it do?
Here is a table of endpoints it serves. All requests apart from signup and login have to be authenticated with a JWT given with aforementioned.

| Prefix        | Verb   | URI Pattern                                        |
|---------------|--------|----------------------------------------------------|
| auth_login    | POST   | /auth/login                                        |
| signup        | POST   | /signup                                            |
| party_PCs     | GET    | /parties/:party_id/player_characters               |
|               | POST   | /parties/:party_id/player_characters               |
| party_PC      | GET    | /parties/:party_id/player_characters/:id           |
|               | PATCH  | /parties/:party_id/player_characters/:id           |
|               | PUT    | /parties/:party_id/player_characters/:id           | 
|               | DELETE | /parties/:party_id/player_characters/:id           | 
| parties       | GET    | /parties                                           |
|               | POST   | /parties                                           |
| party         | GET    | /parties/:id                                       | 
|               | PATCH  | /parties/:id                                       |
|               | PUT    | /parties/:id                                       | 
|               | DELETE | /parties/:id                                       | 
| opponent_NPCs | GET    | /opponents/:opponent_id/non_player_characters      | 
|               | POST   | /opponents/:opponent_id/non_player_characters      | 
| opponent_NPC  | GET    | /opponents/:opponent_id/non_player_characters/:id  | 
|               | PATCH  | /opponents/:opponent_id/non_player_characters/:id  | 
|               | PUT    | /opponents/:opponent_id/non_player_characters/:id  | 
|               | DELETE | /opponents/:opponent_id/non_player_characters/:id  | 
| opponents     | GET    | /opponents                                         |
|               | POST   | /opponents                                         |
| opponent      | GET    | /opponents/:id                                     |
|               | PATCH  | /opponents/:id                                     |
|               | PUT    | /opponents/:id                                     | 
|               | DELETE | /opponents/:id                                     | 

