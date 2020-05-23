# frozen_string_literal: true

# This class is a hostile entity in the encounter.
class NonPlayerCharacter < ApplicationRecord
  # model association
  belongs_to :opponent

  # validation
  validates_presence_of :name, :description, :ac, :hp
end
