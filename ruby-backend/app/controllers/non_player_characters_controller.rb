# frozen_string_literal: true

# This controller specifies what given requests do when calling npcs.
class NonPlayerCharactersController < ApplicationController
  before_action :set_opponent
  before_action :set_opponent_non_player_character, only: %i[show update destroy]

  # GET /opponents/:opponent_id/non_player_characters
  def index
    json_response(@opponent.non_player_characters)
  end

  # GET /opponents/:opponent_id/non_player_characters/:id
  def show
    json_response(@non_player_character)
  end

  # POST /opponents/:opponent_id/non_player_characters
  def create
    @opponent.non_player_characters.create!(non_player_character_params)
    json_response(@opponent, :created)
  end

  # PUT /opponents/:opponent_id/non_player_characters/:id
  def update
    @non_player_character.update(non_player_character_params)
    head :no_content
  end

  # DELETE /opponents/:opponent_id/non_player_characters/:id
  def destroy
    @non_player_character.destroy
    head :no_content
  end

  private

  def non_player_character_params
    params.permit(:name, :description, :hp, :ac)
  end

  def set_opponent
    @opponent = Opponent.find(params[:opponent_id])
  end

  def set_opponent_non_player_character
    @non_player_character = @opponent.non_player_characters.find_by!(id: params[:id]) if @opponent
  end

end
