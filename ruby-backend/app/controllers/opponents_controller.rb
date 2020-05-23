# frozen_string_literal: true

# This controller specifies what given requests do when calling opponents.
class OpponentsController < ApplicationController

  before_action :set_opponent, only: %i[show update destroy]

  # GET /opponents
  def index
    @opponents = current_user.opponents
    json_response(@opponents)
  end

  # POST /opponents
  def create
    @opponent = current_user.opponents.create!(opponent_params)
    json_response(@opponent, :created)
  end

  # GET /opponents/:id
  def show
    json_response(@opponent)
  end

  # PUT /opponents/:id
  def update
    @opponent.update(opponent_params)
    head :no_content
  end

  # DELETE /opponents/:id
  def destroy
    @opponent.destroy
    head :no_content
  end

  private

  def opponent_params
    # whitelist params
    params.permit(:faction)
  end

  def set_opponent
    @opponent = Opponent.find(params[:id])
  end

end
