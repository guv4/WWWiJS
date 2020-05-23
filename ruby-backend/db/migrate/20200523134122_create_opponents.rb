class CreateOpponents < ActiveRecord::Migration[6.0]
  def change
    create_table :opponents do |t|
      t.string :faction
      t.string :created_by

      t.timestamps
    end
  end
end
