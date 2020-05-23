class CreatePlayerCharacters < ActiveRecord::Migration[6.0]
  def change
    create_table :player_characters do |t|
      t.string :name
      t.string :description
      t.integer :hp
      t.integer :ac
      t.references :party, null: false, foreign_key: true

      t.timestamps
    end
  end
end
