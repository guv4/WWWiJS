# frozen_string_literal: true

# This class is a group of entities that are hostile in the encounter.
class Opponent < ApplicationRecord
  # model association
  has_many :non_player_characters, dependent: :destroy

  # validations
  validates_presence_of :faction, :created_by
end