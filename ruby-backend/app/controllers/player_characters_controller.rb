# frozen_string_literal: true

# This controller specifies what given requests do when calling pcs.
class PlayerCharactersController < ApplicationController
  before_action :set_party
  before_action :set_party_player_character, only: %i[show update destroy]

  # GET /parties/:party_id/player_characters
  def index
    json_response(@party.player_characters)
  end

  # GET /parties/:party_id/player_characters/:id
  def show
    json_response(@player_character)
  end

  # POST /parties/:party_id/player_characters
  def create
    @party.player_characters.create!(player_character_params)
    json_response(@party, :created)
  end

  # PUT /parties/:party_id/player_characters/:id
  def update
    @player_character.update(player_character_params)
    head :no_content
  end

  # DELETE /parties/:party_id/player_characters/:id
  def destroy
    @player_character.destroy
    head :no_content
  end

  private

  def player_character_params
    params.permit(:name, :description, :hp, :ac)
  end

  def set_party
    @party = Party.find(params[:party_id])
  end

  def set_party_player_character
    @player_character = @party.player_characters.find_by!(id: params[:id]) if @party
  end

end
