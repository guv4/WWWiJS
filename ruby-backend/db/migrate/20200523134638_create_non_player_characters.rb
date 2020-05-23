class CreateNonPlayerCharacters < ActiveRecord::Migration[6.0]
  def change
    create_table :non_player_characters do |t|
      t.string :name
      t.string :description
      t.integer :hp
      t.integer :ac
      t.references :opponent, null: false, foreign_key: true

      t.timestamps
    end
  end
end
