# frozen_string_literal: true

# This controller specifies what given requests do when calling parties.
class PartiesController < ApplicationController

  before_action :set_party, only: %i[show update destroy]

  # GET /parties
  def index
    @parties = current_user.parties
    json_response(@parties)
  end

  # POST /parties
  def create
    @party = current_user.parties.create!(party_params)
    json_response(@party, :created)
  end

  # GET /parties/:id
  def show
    json_response(@party)
  end

  # PUT /parties/:id
  def update
    @party.update(party_params)
    head :no_content
  end

  # DELETE /parties/:id
  def destroy
    @party.destroy
    head :no_content
  end

  private

  def party_params
    # whitelist params
    params.permit(:title)
  end

  def set_party
    @party = Party.find(params[:id])
  end

end
