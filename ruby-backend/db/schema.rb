# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_05_23_144641) do

  create_table "non_player_characters", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.integer "hp"
    t.integer "ac"
    t.integer "opponent_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["opponent_id"], name: "index_non_player_characters_on_opponent_id"
  end

  create_table "opponents", force: :cascade do |t|
    t.string "faction"
    t.string "created_by"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "parties", force: :cascade do |t|
    t.string "title"
    t.string "created_by"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "player_characters", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.integer "hp"
    t.integer "ac"
    t.integer "party_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["party_id"], name: "index_player_characters_on_party_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "non_player_characters", "opponents"
  add_foreign_key "player_characters", "parties"
end
