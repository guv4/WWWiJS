class CreateParties < ActiveRecord::Migration[6.0]
  def change
    create_table :parties do |t|
      t.string :title
      t.string :created_by

      t.timestamps
    end
  end
end
