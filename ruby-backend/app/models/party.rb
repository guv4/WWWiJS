# frozen_string_literal: true

# This class is a group of entities that are player-controlled in the encounter.
class Party < ApplicationRecord
  # model association
  has_many :player_characters, dependent: :destroy

  # validations
  validates_presence_of :title, :created_by
end