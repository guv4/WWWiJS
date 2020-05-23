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

## What does it do?
Here is a table of endpoints it serves. All requests apart from signup and login have to be authenticated with a JWT given with aforementioned.

| Prefix        | Verb   | URI Pattern                                                 |
|---------------|--------|-------------------------------------------------------------|
| auth_login    | POST   | /auth/login(.:format)                                       |
| signup        | POST   | /signup(.:format)                                           |
| party_PCs     | GET    | /parties/:party_id/player_characters(.:format)              |
|               | POST   | /parties/:party_id/player_characters(.:format)              |
| party_PC      | GET    | /parties/:party_id/player_characters/:id(.:format)          |
|               | PATCH  | /parties/:party_id/player_characters/:id(.:format)          |
|               | PUT    | /parties/:party_id/player_characters/:id(.:format)          | 
|               | DELETE | /parties/:party_id/player_characters/:id(.:format)          | 
| parties       | GET    | /parties(.:format)                                          |
|               | POST   | /parties(.:format)                                          |
| party         | GET    | /parties/:id(.:format)                                      | 
|               | PATCH  | /parties/:id(.:format)                                      |
|               | PUT    | /parties/:id(.:format)                                      | 
|               | DELETE | /parties/:id(.:format)                                      | 
| opponent_NPCs | GET    | /opponents/:opponent_id/non_player_characters(.:format)     | 
|               | POST   | /opponents/:opponent_id/non_player_characters(.:format)     | 
| opponent_NPC  | GET    | /opponents/:opponent_id/non_player_characters/:id(.:format) | 
|               | PATCH  | /opponents/:opponent_id/non_player_characters/:id(.:format) | 
|               | PUT    | /opponents/:opponent_id/non_player_characters/:id(.:format) | 
|               | DELETE | /opponents/:opponent_id/non_player_characters/:id(.:format) | 
| opponents     | GET    | /opponents(.:format)                                        |
|               | POST   | /opponents(.:format)                                        |
| opponent      | GET    | /opponents/:id(.:format)                                    |
|               | PATCH  | /opponents/:id(.:format)                                    | opponents#update              |
|               | PUT    | /opponents/:id(.:format)                                    | opponents#update              |
|               | DELETE | /opponents/:id(.:format)                                    | opponents#destroy             |
