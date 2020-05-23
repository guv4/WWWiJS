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
|   Prefix | Verb   |  URI Pattern |              Controller#Action| 
  |       auth_login |  POST  |   /auth/login(.:format)  |             authentication#authenticate| 
     |        signup  | POST  |   /signup(.:format)      |        users#create| 
   |   party_player_characters  | GET   |   /parties/:party_id/player_characters(.:format)    |      player_characters#index| 
     |          |  POST  |   /parties/:party_id/player_characters(.:format)      |         player_characters#create| 
  |     party_player_character |  GET   |   /parties/:party_id/player_characters/:id(.:format)   |        player_characters#show| 
  |        |  PATCH  |  /parties/:party_id/player_characters/:id(.:format)   |        player_characters#update| 
  |        |  PUT   |   /parties/:party_id/player_characters/:id(.:format)   |        player_characters#update| 
  |        |  DELETE |  /parties/:party_id/player_characters/:id(.:format)   |        player_characters#destroy| 
  |     parties |  GET   |   /parties(.:format)           |       parties#index| 
  |        |  POST  |   /parties(.:format)          |        parties#create| 
  |       party |  GET   |   /parties/:id(.:format)      |        parties#show| 
 |         |  PATCH  |  /parties/:id(.:format)      |        parties#update| 
 |         |  PUT    |  /parties/:id(.:format)          |         parties#update| 
 |         |  DELETE  | /parties/:id(.:format)      |        parties#destroy| 
 |   opponent_non_player_characters |  GET   |   /opponents/:opponent_id/non_player_characters(.:format)   |        non_player_characters#index| 
 |         |  POST  |   /opponents/:opponent_id/non_player_characters(.:format)     |      non_player_characters#create| 
 |    opponent_non_player_character |  GET   |   /opponents/:opponent_id/non_player_characters/:id(.:format)    |        non_player_characters#show| 
 |         |  PATCH  |  /opponents/:opponent_id/non_player_characters/:id(.:format)   |         non_player_characters#update| 
  |        |  PUT   |   /opponents/:opponent_id/non_player_characters/:id(.:format)    |        non_player_characters#update| 
 |         |  DELETE |  /opponents/:opponent_id/non_player_characters/:id(.:format)    |        non_player_characters#destroy| 
 |         opponents  | GET   |   /opponents(.:format)          |      opponents#index| 
  |         | POST  |   /opponents(.:format)           |     opponents#create| 
 |     opponent |  GET   |   /opponents/:id(.:format)       |     opponents#show| 
  |         | PATCH  |  /opponents/:id(.:format)       |     opponents#update| 
  |         | PUT   |   /opponents/:id(.:format)       |     opponents#update| 
 |          | DELETE |  /opponents/:id(.:format)       |     opponents#destroy| 
