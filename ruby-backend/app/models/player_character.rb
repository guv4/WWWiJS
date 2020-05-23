# frozen_string_literal: true

# This class is a friendly entity in the encounter.
class PlayerCharacter < ApplicationRecord
  # model association
  belongs_to :party

  # validation
  validates_presence_of :name, :description, :ac, :hp
end
