# frozen_string_literal: true

# This class is a user with a name, email and secured password.
class User < ApplicationRecord
  # encrypt password
  has_secure_password

  # Model associations
  has_many :parties, foreign_key: :created_by
  has_many :opponents, foreign_key: :created_by

  # Validations
  validates_presence_of :name, :email, :password_digest
end
